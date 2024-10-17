import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);


    const username = body.username;
    const password = body.password;
    const position = body.position;

    let newAdmin = null;

    try {

        newAdmin = await prisma.admin.create({
            data: {
                username: username,
                password: password,
                Position: position
            }
        });
    } catch (error) {
        console.log(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Error creating admin",
        });
    }

    return newAdmin;
});
