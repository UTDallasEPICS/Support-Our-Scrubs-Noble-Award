import { prisma } from "../../utils/prismaclient";
import { adminCreateSimpleSchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, b => adminCreateSimpleSchema.parse(b));

  const position = "admin";

  try {
    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      user = await prisma.user.create({ data: { email } })
    }

    const newAdmin = await prisma.admin.create({
      data: {
        user: { connect: { id: user.id } },
        Position: position,
      },
      include: { user: true },
    });

    return newAdmin
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error creating new admin",
    });
  }
});
