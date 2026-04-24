// to get a nominee by slug
import { prisma } from "~/server/utils/prismaclient";

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, "slug");

    const nominee = await prisma.nominee.findUnique({
        where: { slug },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
    });
    if (!nominee)
        throw createError({
            statusCode: 404,
            statusMessage: "No nominees found",
        });

    return nominee;
});
