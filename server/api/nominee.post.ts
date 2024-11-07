import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    // const nomSample = await prisma.nominator.create({
    //     data: {
    //         username: "username",
    //         password: "pass",
    //     }
    // })

    const adminSample = await prisma.admin.create({
        data: {
            username: "admin",
            password: "adpass",
            Position: "position",
        }
    })



    const body = await readBody(event);

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



    let newNominee = null;

    try {
        newNominee = await prisma.nominee.create({
            data: {
                nominator: {
                    connect: {
                        id: "71d6c0f7-a066-4578-ba79-674107ec6ca5"
                    }
                },
                admin: {
                    connect: {
                        id: "0ef46c5b-fa51-4a28-8e00-fd13774419cd"
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
            }
        })
    }

    catch(error) {
        console.log(error);
        throw createError({ statusCode: 500, statusMessage: "Error creating nominee", });
    }

    return newNominee;
})
