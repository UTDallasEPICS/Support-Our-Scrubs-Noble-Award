import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    try{
        const nominee = await prisma.nominee.findMany({
        })
        console.dir(nominee, { depth: null })
    }

    catch(error) {
        console.log(error);
        throw createError({ statusCode: 500, statusMessage: "Error getting nominees", });
    }

})