import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const userEmail = body.email;
    const position = "admin";

    let newAdmin = null;
    try {
        newAdmin = await prisma.admin.create({
            data: {
                email: userEmail,
                Position: position
            }
        });
    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Error creating new admin"
        });
    }

    return newAdmin;
});