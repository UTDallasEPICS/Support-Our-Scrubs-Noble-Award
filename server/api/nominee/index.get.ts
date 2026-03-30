import { prisma } from "../../utils/prismaclient";

export default defineEventHandler(async (event) => {
  const nominee = await prisma.nominee.findMany({
    where:{
      status: "APPROVED",
     },
    select: {
      id: true,
      slug: true,
      description: true,
      occupation: true,
      placeOfWork: true,
      photoURL: true,
    },
  })

  if (!nominee) return null

  return nominee.map((n) => ({
    slug: n.slug,
    id: n.id,
    occupation: n.occupation,
    description: n.description,
    placeOfWork : n.placeOfWork,
    photoURL: n.photoURL,
  }))

});
