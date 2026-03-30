import { prisma } from "~/server/utils/prismaclient";

export default defineEventHandler(async (event) => {
  try {
    const nominators = await prisma.nominator.findMany({
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
    return nominators;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching nominators",
    });
  }
});
