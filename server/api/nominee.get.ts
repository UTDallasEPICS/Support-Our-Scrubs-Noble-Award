import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const findId = body.findId;

    try{
        const nominee = await prisma.nominee.findUnique({
            where: {
            id: findId,
            },
        })

        return nominee;
    }

    catch(error) {
        console.log(error);
        throw createError({ statusCode: 500, statusMessage: "Error getting nominee", });
    }


});