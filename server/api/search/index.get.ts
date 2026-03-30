import { prisma } from "../../utils/prismaclient";
import { searchQuerySchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { searchTerm } = await getValidatedQuery(event, q => searchQuerySchema.parse(q));

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
            //{ email: { contains: searchTerm,},},
            { occupation: { contains: searchTerm } },
            { placeOfWork: { contains: searchTerm,},},
            //{ description: { contains: searchTerm } },
            //{ aboutme: { contains: searchTerm, },},
            //{ phoneNumber: { contains: searchTerm,},},
            //{ address: { contains: searchTerm } },
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