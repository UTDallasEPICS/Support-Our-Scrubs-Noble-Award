import { prisma } from "../../utils/prismaclient";

export default defineEventHandler(async (event) => {
    try {
        const admins = await prisma.admin.findMany();
        return admins;
    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 500,
      statusMessage: "Error getting admin list",
        });
    }
})
