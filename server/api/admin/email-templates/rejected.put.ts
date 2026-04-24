import { prisma } from "../../../utils/prismaclient";
import { emailTemplateUpdateSchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { subject, html } = await readValidatedBody(event, b => emailTemplateUpdateSchema.parse(b));

  const template = await prisma.emailTemplate.upsert({
    where: { key: "REJECTED" },
    create: { key: "REJECTED", subject, html },
    update: { subject, html },
  });

  return template;
});
