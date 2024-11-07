import { PrismaClient, Status } from "@prisma/client";
import { getQuery } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const findId = typeof query.findId === 'string' ? query.findId : undefined;
    const stat = typeof query.stat === 'string' ? query.stat : undefined;
    const nomId = typeof query.nomId === 'string' ? query.nomId : undefined;

    try {
        let nominees;
       
        if (findId) {
            nominees = await prisma.nominee.findUnique({
                where: { id: findId },
            });
        } 
        else if(stat || nomId){
            const filterConditions: {
                status?: Status;
                nominatorId?: string;
            } = {};

            if (stat && Object.values(Status).includes(stat as Status)) {
                filterConditions.status = stat as Status;
            }
    
            if (nomId) {
                filterConditions.nominatorId = nomId;
            }
    
            // Fetch nominees based on constructed filter
            nominees = await prisma.nominee.findMany({
                where: filterConditions,
            });
    
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
     