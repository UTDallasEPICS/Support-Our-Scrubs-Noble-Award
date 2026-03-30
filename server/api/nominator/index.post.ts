import { prisma } from "~/server/utils/prismaclient";
import { nominatorCreateSchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
    const { firstName, lastName, email } = await readValidatedBody(event, b => nominatorCreateSchema.parse(b));

  try {
    // Check if a user with this email already has a nominator record
    const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingNominator) {
            throw createError({
                statusCode: 400,
                statusMessage: "Email already exists",
            });
        }

        newNominator = await prisma.nominator.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
            }
        });
    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Error creating nominator",
        });
    }

    return newNominator;
});
