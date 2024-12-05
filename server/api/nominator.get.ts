import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const nominators = await prisma.nominator.findMany();
        return nominators;
    } catch (error) {
        console.log(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Error fetching nominators",
        });
    }
});
