import { prisma } from "../../../utils/prismaclient";

export default defineEventHandler(async (event) => {
  try {
    const template = await prisma.emailTemplate.findUnique({
      where: { key: "ACCEPTED" }
    });
    return template;
  } catch (error) {
    return null;
  }
});
