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

        deletedNominee = await prisma.nominee.update({
            where: { id: nomineeId },
            data: { deleted: true }
        });
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Error soft deleting nominee",
        });
    }

    return deletedNominee;
});
