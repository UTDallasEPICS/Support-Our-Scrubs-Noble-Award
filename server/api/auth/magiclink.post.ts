import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const email = body.email?.toLowerCase().trim() as string;

    if (!email) {
        throw createError({ statusCode: 400, message: 'Must provide destination email' });
    }
    
    const dbEmail = await prisma.nominator.findUnique({
        where: { email: email }
    });
    if (!dbEmail) {
        throw createError({ statusCode: 400, message: 'Requested email does not exist' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: '15m' });

    await prisma.magicToken.create({
        data: {
            token,
            email,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000)
        }
    });

    const magicLink = `${process.env.FRONTEND_URL}/verify?token=${token}`;
    await sendTemplateEmail(email, "SIGNUP", {
        name: dbEmail.firstName,
        link: magicLink
    });
});