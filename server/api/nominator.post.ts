import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const username = body.username;
    const password = body.password;

    let newNominator = null;

    try {
        const existingNominator = await prisma.nominator.findUnique({
            where: { email: email }
        });

        if (existingNominator) {
            throw createError({
                statusCode: 400,
                statusMessage: "Email already exists",
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        newNominator = await prisma.nominator.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: hashedPassword
            }
        });
    } catch (error) {
        console.log(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Error creating nominator",
        });
    }

    return newNominator;
});
