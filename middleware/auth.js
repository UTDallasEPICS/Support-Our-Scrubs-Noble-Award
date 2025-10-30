// import jwt from "jsonwebtoken";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default defineEventHandler(async (event) => {
//     const path = getRequestURL(event).pathname;

//     const publicRoutes = ["/", "/roster", "/profile", "/donate", "/contact", "/login", "/verify", "/api/auth", "/api/nominator"];
//     if (publicRoutes.some(route => path.startsWith(route))) {
//         return;
//     }

//     const token = getCookie(event, "auth_token");
//     if (!token) {
//         return sendRedirect(event, "/login");
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.SESSION_SECRET!) as jwt.JwtPayload;
//         const user = await prisma.nominator.findUnique({
//             where: { id: decoded.userId },
//             select: { id: true, email: true }
//         });

//         if (!user) {
//             throw new Error("User not found!");
//         }

//         if (path.startsWith("/admin")) {
//             const admin = await prisma.admin.findFirst({
//                 where: { email: user.email }
//             });

//             if (!admin) {
//                 return sendRedirect(event, "/login");
//             }
//         }
//     } catch (error) {
//         deleteCookie(event, "auth_token");
//         return sendRedirect(event, "/login");
//     }
// })


export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/auth/callback')) return

  const user = useSupabaseUser()
  const showing = to.query.showLogin === '1'

  if (!user.value && !showing) {
    return navigateTo({
      path: to.path,
      query: { ...to.query, showLogin: '1' },
      replace: true
    })
  }
})
