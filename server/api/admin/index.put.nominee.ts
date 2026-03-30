import { prisma } from "~/server/utils/prismaclient";
import { adminUpdateNomineeSchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const {
    adminId, nomineeId, firstName, lastName,
    phoneNumber, address, placeOfWork, occupation,
    email, description, status,
  } = await readValidatedBody(event, b => adminUpdateNomineeSchema.parse(b));

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: adminId }
    });

    if (!admin) {
      throw createError({ statusCode: 403, statusMessage: "Unauthorized: Admin not found" });
    }

    const updatedNominee = await prisma.nominee.update({
      where: { id: nomineeId },
      data: {
        phoneNumber,
        address,
        placeOfWork,
        occupation,
        description,
        status,
        admin: { connect: { id: adminId } },
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
    });

    return updatedNominee
  } catch (error) {
    if ((error as any)?.statusCode) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: "Error updating nominee",
    });
  }
});
