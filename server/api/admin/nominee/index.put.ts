import { prisma } from "~/server/utils/prismaclient";
import { adminUpdateNomineeSchema } from "~/shared/types";
import { auth } from "~/server/utils/auth";
import { useCheckAdmin } from "~/composables/useCheckAdmin";

export default defineEventHandler(async (event) => {
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
    const {
        nomineeId,
        firstName,
        lastName,
        phoneNumber,
        address,
        placeOfWork,
        occupation,
        email,
        description,
        status,
    } = await readValidatedBody(event, (b) =>
        adminUpdateNomineeSchema.parse(b),
    );

    try {
        const updatedNominee = await prisma.nominee.update({
            where: { id: nomineeId },
            data: {
                phoneNumber,
                address,
                placeOfWork,
                occupation,
                description,
                status,
                admin: { connect: { userId: session.user.id } },
                ...(firstName || lastName || email
                    ? {
                          user: {
                              update: {
                                  ...(firstName !== undefined
                                      ? { firstName }
                                      : {}),
                                  ...(lastName !== undefined
                                      ? { lastName }
                                      : {}),
                                  ...(email !== undefined ? { email } : {}),
                              },
                          },
                      }
                    : {}),
            },
            include: { user: true },
        });

        return updatedNominee;
    } catch (error) {
        if ((error as any)?.statusCode) throw error;
        throw createError({
            statusCode: 500,
            statusMessage: "Error updating nominee",
        });
    }
});
