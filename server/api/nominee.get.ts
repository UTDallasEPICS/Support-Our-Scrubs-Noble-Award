import { PrismaClient, Status } from "@prisma/client";
import { getQuery } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const findId = typeof query.findId === 'string' ? query.findId : undefined;
    const stat = typeof query.stat === 'string' ? query.stat : undefined;

    try {
        let nominees;
       
        if (findId) {
            nominees = await prisma.nominee.findUnique({
                where: { id: findId },
            });
        } 
        else if(stat)
        {
            if (Object.values(Status).includes(stat as Status)) {
                nominees = await prisma.nominee.findMany({
                    where: { status: stat as Status }, // Cast to Status enum
                });
            }
        }
        else if (!stat && !findId) {
            nominees = await prisma.nominee.findMany();
        }

        return nominees;
    }
    catch (error) {
        console.log(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Error getting nominee",
        });
    }
});
     