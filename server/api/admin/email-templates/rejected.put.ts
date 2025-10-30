import { prisma } from "../../../utils/prismaclient";


export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const template = await prisma.emailTemplate.upsert({
        where: { type: "REJECTED" },
        create: {
            type: "REJECTED",
            subject: body.subject,
            content: body.content
        },
        update: {
            subject: body.subject,
            content: body.content
        }
    });
});