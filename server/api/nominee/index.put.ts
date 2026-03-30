import { prisma } from "../../utils/prismaclient";
import { nomineeUpdateSchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const {
    id, firstName, lastName, phoneNumber, address,
    placeOfWork, occupation, email, description,
    aboutme, photoURL, nominatorId, adminId, status,
  } = await readValidatedBody(event, b => nomineeUpdateSchema.parse(b));

  try {
    const [updatedNominee] = await prisma.$transaction([
      prisma.nominee.update({
        where: { id },
        data: {
          phoneNumber,
          address,
          placeOfWork,
          occupation,
          description,
          aboutme,
          photoURL,
          status,
          ...(nominatorId ? { nominator: { connect: { id: nominatorId } } } : {}),
          ...(adminId ? { admin: { connect: { id: adminId } } } : {}),
          ...(firstName || lastName || email
            ? {
                user: {
                  update: {
                    ...(firstName !== undefined ? { firstName } : {}),
                    ...(lastName !== undefined ? { lastName } : {}),
                    ...(email !== undefined ? { email } : {}),
                  },
                },
              }
            : {}),
        },
        include: { user: true },
      }),
    ])

    return updatedNominee
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, statusMessage: "Error updating nominee" });
  }
})
