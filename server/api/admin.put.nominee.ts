import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const adminId = body.adminId;   
    const nomineeId = body.nomineeId; 

    const firstName = body.firstName;
    const lastName = body.lastName;
    const phoneNumber = body.phoneNumber;
    const address = body.address;
    const placeOfWork = body.placeOfWork;
    const occupation = body.occupation;
    const email = body.email;
    const description = body.description;
    const status = body.status; 

    let updatedNominee = null;

    try {
       
        const admin = await prisma.admin.findUnique({
            where: { id: adminId }
        });

        if (!admin) {
            throw createError({ statusCode: 403, statusMessage: "Unauthorized: Admin not found" });
        }


        updatedNominee = await prisma.nominee.update({
            where: {
                id: nomineeId,
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                address: address,
                placeOfWork: placeOfWork,
                occupation: occupation,
                email: email,
                description: description,
                admin: {
                    connect: {
                        id: adminId
                    }
                },
                status: status,  
            },
        });
    } catch (error) {
        console.log(error);
        throw createError({
            statusCode: 500,
            statusMessage: "Error updating nominee",
        });
    }

    return updatedNominee;
});
