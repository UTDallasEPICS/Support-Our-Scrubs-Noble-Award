import { prisma } from "~/server/utils/prismaclient";
import { auth } from "~/server/utils/auth";
import { useCheckAdmin } from "~/composables/useCheckAdmin";

export default defineEventHandler(async (event) => {
    try {
        // Guard: User is authenticated
        const session = await auth.api.getSession({ headers: event.headers });
        if (!session?.user) {
            throw createError({
                statusCode: 401,
                statusMessage: "Not authenticated",
            });
        }
        // Guard: User is an admin
        const { ok } = await useCheckAdmin(session.user.email);
        if (!ok) {
            throw createError({
                statusCode: 403,
                statusMessage: "Unauthorized: User is not an admin",
            });
        }

        const nominees = await prisma.nominee.findMany({
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                }
            },
        });

        return nominees;
    } catch (error) {
        if ((error as any)?.statusCode) throw error;
        throw createError({
            statusCode: 500,
            statusMessage: "Error updating nominee",
        });
    }
});
