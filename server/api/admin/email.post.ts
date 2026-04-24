import { prisma } from '~/server/utils/prismaclient'
import { sendEmail, routeRecipient } from '~/server/utils/mailer'
import { adminSendEmailSchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { name, email, type } = await readValidatedBody(event, b => adminSendEmailSchema.parse(b));

  const template = await prisma.emailTemplate.findUnique({
    where: { key: type },
  });

  if (!template || !template.enabled) {
    throw createError({
      statusCode: 404,
      statusMessage: `Email template "${type}" not found or disabled`,
    });
  }

  const html = template.html.replace(/\{\{name\}\}/g, name);
  const subject = template.subject.replace(/\{\{name\}\}/g, name);

  await sendEmail(routeRecipient(email), subject, html);

  return { ok: true };
});
