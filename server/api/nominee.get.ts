// import { prisma, Status } from "../utils/prismaclient";
// import { getQuery } from 'h3';


// export default defineEventHandler(async (event) => {
//     const query = getQuery(event);
//     const findId = typeof query.findId === 'string' ? query.findId : undefined;
//     const stat = typeof query.stat === 'string' ? query.stat : undefined;
//     const nomId = typeof query.nomId === 'string' ? query.nomId : undefined;
//     const email = typeof query.email === 'string' ? query.email : undefined;

//     try {
//         let nominees;
       
//         if (findId) {
//             nominees = await prisma.nominee.findUnique({
//                 where: { id: findId },
//             });
//         } 
//         else if (email) {
//             nominees = await prisma.nominee.findMany({
//                 where: { email },
//             });
//         }
//         else if(stat || nomId){
//             const filterConditions: {
//                 status?: Status;
//                 nominatorId?: string;
//             } = {};

//             if (stat && Object.values(Status).includes(stat as Status)) {
//                 filterConditions.status = stat as Status;
//             }
    
//             if (nomId) {
//                 filterConditions.nominatorId = nomId;
//             }
    
//             nominees = await prisma.nominee.findMany({
//                 where: filterConditions,
//             });
    
//         }
//         else if (!stat && !findId) {
//             nominees = await prisma.nominee.findMany();
//         }

//         return nominees;
//     }
//     catch (error) {
//         console.log(error);
//         throw createError({
//             statusCode: 500,
//             statusMessage: "Error getting nominee",
//         });
//     }
// });
     
// Minimal Prisma client (avoid re-instantiating in hot reload)
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  // Select just what you need for the table
  const rows = await prisma.nominee.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      status: true,
      slug: true,
    },
    orderBy: { lastName: 'asc' },
    take: 50
  })
  return rows
})
