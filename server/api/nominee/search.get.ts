import { prisma } from "~/server/utils/prismaclient";
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
          { user: { firstName: { contains: searchTerm } } },
          { user: { lastName: { contains: searchTerm } } },
          { occupation: { contains: searchTerm } },
          { placeOfWork: { contains: searchTerm } },
        ],
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return results;
  } catch (error) {
    if ((error as any)?.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: "Error searching for nominees" });
  }
});