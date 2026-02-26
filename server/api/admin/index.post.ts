import { prisma } from "~/server/utils/prismaclient";


export default defineEventHandler(async (event) => {
    const body = await readBody(event);


    const userEmail = body.email;
    const position = body.position;

    let newAdmin = null;

    try {

        newAdmin = await prisma.admin.create({
            data: {
                email: userEmail,
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