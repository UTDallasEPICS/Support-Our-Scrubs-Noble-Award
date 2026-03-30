import { prisma } from '~/server/utils/prismaclient'
import { sendEmail, routeRecipient } from '~/server/utils/mailer'
import { adminSendEmailSchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { name, email, type } = await readValidatedBody(event, b => adminSendEmailSchema.parse(b));

    const nomineeName = body.name;
    const destinationEmail = body.email;
    const type = body.type.toLowerCase();
    
    await sendTemplateEmail(destinationEmail, (type === "accepted") ? "ACCEPTED" : "REJECTED", {
        name: nomineeName
    });
});