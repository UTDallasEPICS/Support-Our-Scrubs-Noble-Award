import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

     setResponseHeaders(event, {
    'Access-Control-Allow-Origin': 'http://localhost:3000', // or specific origin
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
    
    const body = await readBody(event);

    const firstName = body.firstName;
    const lastName = body.lastName;
    const phoneNumber = body.phoneNumber;
    const address = body.address;
    const placeOfWork  = body.placeOfWork;
    const occupation = body.occupation;
    const email = body.email;
    const description = body.description;
    const photoURL = body.photoURL;
    const nominatorId = body.nominatorId;
    const adminId = body.adminId;
    const nominatorName = body.nominatorName;
    const nominatorEmail = body.nominatorEmail;

    let newNominee = null;
    const nomineeId = uuidv4();
    try {

        let nominator = await prisma.nominator.findUnique({
          where: { id: nominatorId }
        });
4
        if (!nominator) {
          nominator = await prisma.nominator.create({
            data: {
              id: nominatorId,
              firstName: nominatorName,
              lastName: nominatorName,
              email: nominatorEmail
            }
          });

        }

        newNominee = await prisma.nominee.create({
            data: {
                nominator: {
                    connect: {
                        id: nominatorId
                    }
                },
                id: nomineeId,
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
    console.log("sucess!");

    return newNominee;
})
