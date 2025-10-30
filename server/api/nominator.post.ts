import { prisma } from "../utils/prismaclient";


export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
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

        newNominator = await prisma.nominator.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
            }
        });
    } catch (error) {
        console.error(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Error creating nominator",
        });
    }

    return newNominator;
});
