import Slug from "~/pages/profile/[slug].vue";
import { prisma, Status } from "../utils/prismaclient";
import { getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  // const query = getQuery(event);
  // const findId = typeof query.findId === 'string' ? query.findId : undefined;
  // const stat = typeof query.stat === 'string' ? query.stat : undefined;
  // const nomId = typeof query.nomId === 'string' ? query.nomId : undefined;
  // const email = typeof query.email === 'string' ? query.email : undefined;
  // const slug = typeof query.slug === 'string' ? query.slug : undefined;

  // try {
  //   if (slug) {
  //     const nominee = await prisma.nominee.findUnique({
  //       where: { slug },
  //     });
  //     return nominee;
  //   }

  //   if (findId) {
  //     const nominee = await prisma.nominee.findUnique({
  //       where: { id: findId },
  //     });
  //     return nominee;
  //   }

  //   if (email) {
  //     const nominees = await prisma.nominee.findMany({ where: { email } });
  //     return nominees;
  //   }

  //   if (stat || nomId) {
  //     const filterConditions: { status?: Status; nominatorId?: string } = {};
  //     if (stat && Object.values(Status).includes(stat as Status)) {
  //       filterConditions.status = stat as Status;
  //     }
  //     if (nomId) {
  //       filterConditions.nominatorId = nomId;
  //     }

  //     const nominees = await prisma.nominee.findMany({
  //       where: filterConditions,
  //     });
  //     return nominees;
  //   }

  //   // Default: return all nominees
  //   const nominees = await prisma.nominee.findMany();
  //   return nominees;
  // } catch (error) {
  //   console.error(error);
  //   throw createError({
  //     statusCode: 500,
  //     statusMessage: "Error getting nominee",
  //   });
  // }

  // const query = getQuery(event)
  // const slug = query.slug as string | undefined

  // if (!slug) {
  //   return null
  // }

  const nominee = await prisma.nominee.findMany({
    where:{
      status: "APPROVED",
     },
    select: {
      id: true,
      slug: true,
      firstName: true,
      lastName: true,
      description: true,
      occupation: true,
      placeOfWork: true,
      photoURL: true,
      aboutme: true,
    },
  })

  if (!nominee) return null

  return nominee.map((n) => ({
    slug: n.slug,
    id: n.id,
    name: `${n.firstName} ${n.lastName}`,
    occupation: n.occupation,
    description: n.description,
    placeOfWork : n.placeOfWork,
    photoURL: n.photoURL,
    aboutme: n.aboutme,
  }))

});
