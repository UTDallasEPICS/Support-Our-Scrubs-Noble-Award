import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@prisma/client";
import { magicLink } from "better-auth/plugins"
import { sendEmail } from "../server/utils/mailer";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite", // or "mysql", "postgresql", ...etc
    }),
    user:{
        fields: {
            name: "firstName"
        },
        additionalFields: {
            lastName: {
                type: "string",
                input: true,
                required: false,
            }
        }
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) =>{
                    return {
                        data: {
                            ...user,
                            firstName: user.name,       // map name → firstName
                            name: undefined             // drop the name field
                        }
                    }
                }
            }
        }
    },
    plugins: [
        magicLink({
            sendMagicLink: async ({email, token, url}, ctx) => {
                // nodemailer
                await sendEmail(
                    email, 
                    "Your sign-in link", 
                    `<p>Hello!</p>
                    <p>Click the secure link below to sign in. This link expires in 15 minutes.</p>
                    <p><a href="${url}">Sign in to Support Our Scrubs</a></p>
                    <p>If you didn't request this, you can ignore this email.</p>`
                );
            },
            expiresIn: 300      // expires in 5 mins
            
        }),
    ]
});

type Session = typeof auth.$Infer.Session