import { prisma } from "../utils/prismaclient";
import jwt from 'jsonwebtoken'


export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const token = body.token;
    if (!token) {
        throw createError({ statusCode: 400, message: "No token supplied" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    } catch (error) {
        throw createError({ statusCode: 401, message: "Invalid token" });
    }

    const dbToken = await prisma.magicToken.findFirst({
        where: {
            token,
            email: decoded.email,
            used: false,
            expiresAt: { gt: new Date() }
        }
    });

    if (!dbToken) {
        throw createError({ statusCode: 401, message: "Invalid token" });
    }

    await prisma.magicToken.update({
        where: { id: dbToken.id },
        data: { used: true }
    });

    const user = await prisma.nominator.findUnique({
        where: { email: decoded.email }
    });

    const sessionToken = jwt.sign(
        { userId: user!.id },
        process.env.SESSION_SECRET!,
        { expiresIn: '7d' }
    );

    setCookie(event, "auth_token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 604800,
        path: "/"
    });
})