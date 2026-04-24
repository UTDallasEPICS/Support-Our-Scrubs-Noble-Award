import { prisma } from "../../utils/prismaclient";

export default defineEventHandler(async (event) => {
  try {
    const admins = await prisma.admin.findMany({
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
    return admins;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error getting admin list",
    });
  }
})
