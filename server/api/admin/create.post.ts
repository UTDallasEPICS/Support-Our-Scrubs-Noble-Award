import { prisma } from "../../utils/prismaclient";
import { adminCreateSimpleSchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, b => adminCreateSimpleSchema.parse(b));

    const userEmail = body.email;
    const position = "admin";

    let newAdmin = null;
    try {
        newAdmin = await prisma.admin.create({
            data: {
                email: userEmail,
                Position: position
            }
        });
    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Error creating new admin"
        });
    }

    return newAdmin;
});