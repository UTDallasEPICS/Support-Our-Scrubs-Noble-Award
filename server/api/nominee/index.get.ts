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

  if (!nominees) return null

  return nominees.map((n) => ({
    slug: n.slug,
    id: n.id,
    firstName: n.user?.firstName,
    lastName: n.user?.lastName,
    email: n.user?.email,
    occupation: n.occupation,
    description: n.description,
    placeOfWork: n.placeOfWork,
    photoURL: n.photoURL,
  }))
});
