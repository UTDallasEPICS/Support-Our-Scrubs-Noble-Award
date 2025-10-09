import { prisma } from "../../../utils/prismaclient";


export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const template = await prisma.emailTemplate.upsert({
        where: { type: "SIGNUP" },
        create: {
            type: "SIGNUP",
            subject: body.subject,
            content: body.content
        },
        update: {
            subject: body.subject,
            content: body.content
        }
    });
});