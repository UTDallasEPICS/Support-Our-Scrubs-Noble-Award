import prisma from "../../../utils/prisma";

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
