import { prisma } from "~/server/utils/prismaclient";
import { nominatorCreateSchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { firstName, lastName, email } = await readValidatedBody(event, b => nominatorCreateSchema.parse(b));

  try {
    // Check if a user with this email already has a nominator record
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { nominator: true },
    })

    if (existingUser?.nominator) {
      throw createError({
        statusCode: 400,
        statusMessage: "A nominator with this email already exists",
      });
    }

    // Find or create the User, then create the Nominator
    const user = existingUser ?? await prisma.user.create({
      data: { email, firstName, lastName },
    })

    const newNominator = await prisma.nominator.create({
      data: {
        user: { connect: { id: user.id } },
      },
      include: { user: true },
    })

    return newNominator
  } catch (error) {
    if ((error as any)?.statusCode) throw error;
    throw createError({
      statusCode: 500,
      statusMessage: "Error creating nominator",
    });
  }
});
