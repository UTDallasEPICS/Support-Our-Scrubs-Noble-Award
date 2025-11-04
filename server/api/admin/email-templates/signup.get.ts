import { prisma } from "../../../utils/prismaclient";


export default defineEventHandler(async (event) => {
    try {
        const template = await prisma.emailTemplate.findUnique({
            where: { type: "SIGNUP" }
        });
        return template;
    } catch (error) {
        return null;
    }
});