import jwt from "jsonwebtoken";
import fs from "fs";
import { defineEventHandler, getCookie, sendRedirect, setCookie } from "h3";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const protectedRoutes = ["/nominator/viewnominees"];

export default defineEventHandler(async (event) => {
  const cvtoken = getCookie(event, "cvtoken");
  const requestedUrl = event.node.req.url || "/";

  console.log("Requested URL:", requestedUrl);
  console.log("cvtoken:", cvtoken);

  if (!protectedRoutes.includes(requestedUrl)) {
    return;
  }

  if (!cvtoken) {
    console.error("cvtoken not found. Redirecting to homepage.");
    return await sendRedirect(event, "/");
  }

  try {
    const claims = jwt.verify(cvtoken, fs.readFileSync(process.cwd() + "/cert-dev.pem")) as jwt.JwtPayload;

    if (typeof claims === "object" && claims.email) {
      const user = await client.nominator.findUnique({ where: { email: claims.email } }) || 
                   await client.admin.findFirst({ where: { username: claims.email } });

      if (!user) {
        console.error(`User not found for email: ${claims.email}`);
        setCookie(event, "cvtoken", "", { httpOnly: true });
        return await sendRedirect(event, "/");
      }

      event.context.user = user;
      console.log("Authenticated user:", user);
    } else {
      throw new Error("Invalid token payload structure.");
    }
  } catch (error) {
    console.error("Authentication error:", error);
    setCookie(event, "cvtoken", "", { httpOnly: true });
    return await sendRedirect(event, "/");
  }
});
