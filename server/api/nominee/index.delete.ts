import { prisma } from "../../utils/prismaclient";
import { nomineeDeleteQuerySchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { nomineeId } = await getValidatedQuery(event, q => nomineeDeleteQuerySchema.parse(q));

  try {
    const existingNominee = await prisma.nominee.findUnique({
      where: { id: nomineeId }
    });

    if (!existingNominee) {
      throw createError({
        statusCode: 404,
        statusMessage: "Nominee not found",
      });
    }

    const deletedNominee = await prisma.nominee.update({
      where: { id: nomineeId },
      data: { deleted: true }
    });

    return deletedNominee;
  } catch (error) {
    if ((error as any)?.statusCode) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: "Error soft deleting nominee",
    });
  }
});
