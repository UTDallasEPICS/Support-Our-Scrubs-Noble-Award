import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const { nomineeId } = getQuery(event);

    if (!nomineeId || typeof nomineeId !== "string") {
        throw createError({
            statusCode: 400,
            statusMessage: "Nominee ID must be a string",
        });
    }

    let deletedNominee = null;

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
        console.log("Error soft deleting nominee:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Error soft deleting nominee",
        });
    }

    return deletedNominee;
});
