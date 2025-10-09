import { prisma } from "../../../utils/prismaclient";


export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const template = await prisma.emailTemplate.upsert({
        where: { type: "ACCEPTED" },
        create: {
            type: "ACCEPTED",
            subject: body.subject,
            content: body.content
        },
        update: {
            subject: body.subject,
            content: body.content
        }
    });
});