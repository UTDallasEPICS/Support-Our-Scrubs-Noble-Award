import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite", // or "mysql", "postgresql", ...etc
    }),
    user:{
        additionalFields: {
            firstName: {
                type: "string",
                input: true
            },
            secondName: {
                type: "string",
                input: true
            }
        }
    }
});

type Session = typeof auth.$Infer.Session