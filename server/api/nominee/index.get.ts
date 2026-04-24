import { prisma } from "~/server/utils/prismaclient";

export default defineEventHandler(async (event) => {
  const nominees = await prisma.nominee.findMany({
    where: {
      status: "APPROVED",
    },
    select: {
      id: true,
      slug: true,
      description: true,
      occupation: true,
      placeOfWork: true,
      photoURL: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  })

  if (!nominees) throw createError({ statusCode: 404, statusMessage: "No nominees found" });

  return nominees
});
