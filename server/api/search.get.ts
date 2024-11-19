import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const searchTerm = typeof query.searchTerm === 'string' ? query.searchTerm : undefined;
  if (!searchTerm) {
    return { results: [] };  
  }

  try {
    // Query the database using Prisma's $contains or $search methods
    const results = await prisma.nominee.findMany({
      where: {
        OR: [
            { firstName: { contains: searchTerm,},},
            { lastName: { contains: searchTerm } },
            { email: { contains: searchTerm,},},
            { occupation: { contains: searchTerm } },
            { placeOfWork: { contains: searchTerm,},},
            { description: { contains: searchTerm } },
            { phoneNumber: { contains: searchTerm,},},
            { address: { contains: searchTerm } },
          ],
      },
    });

    return { results };
  } catch (error) {
        console.error(error);
        return { results: [] };  // Return empty results on error
  } finally {
        await prisma.$disconnect();  // Disconnect Prisma client
  }
});