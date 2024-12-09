import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const body = await readBody(event);


    const id = body.id;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const phoneNumber = body.phoneNumber;
    const address = body.address;
    const placeOfWork  = body.placeOfWork;
    const occupation = body.occupation;
    const email = body.email;
    const description = body.description;
    const photoURL = "";
    const nominatorId = body.nominatorId;
    const adminId = body.adminId;
    const status = body.status;

    let updatedNominee = null;

    try {
        updatedNominee = await prisma.nominee.update({
            where: {
                id: id
            },
            data: {
                nominator: {
                    connect: {
                        id: nominatorId
                    }
                },
                admin: {
                    connect: {
                        id: adminId
                    }
                },
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                address: address,
                placeOfWork: placeOfWork,
                occupation: occupation,
                email: email,
                description: description,
                photoURL: photoURL,
                status: status,
            }
        })
    }

    catch(error) {
        console.log(error);
        throw createError({ statusCode: 500, statusMessage: "Error creating nominee", });
    }

    return updatedNominee;
})