import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@prisma/client";
import { magicLink } from "better-auth/plugins"
import { sendEmail } from "@/server/utils/mailer";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite", // or "mysql", "postgresql", ...etc
    }),
    user: {
        additionalFields: {
            firstName: {
                type: "string",
                input: true,
                required: false,
            },
            lastName: {
                type: "string",
                input: true,
                required: false,
            },
        },
    },
    databaseHooks: {
        user: {
            // Create a new user with a name derived from the first and last name
            create: {
                before: async (user) => {
                    const u = user as typeof user & { firstName?: string | null; lastName?: string | null };
                    const derived = [u.firstName, u.lastName].filter(Boolean).join(" ");
                    return {
                        data: {
                            ...u,
                            name: u.name ?? (derived || undefined),
                        },
                    };
                },
            },
            // Update the user's name when the first or last name is updated
            update: {
                after: async (user) => {
                    const u = user as typeof user & { firstName?: string | null; lastName?: string | null };
                    const computed = [u.firstName, u.lastName].filter(Boolean).join(" ") || null;
                    if (computed !== (u.name ?? null)) {
                        await prisma.user.update({
                            where: { id: u.id },
                            data: { name: computed },
                        });
                    }
                },
            },
        },
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