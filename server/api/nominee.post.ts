import { prisma } from "~/server/utils/prismaclient";
import { sendTemplateEmail } from '~/utils/sendTemplateEmail';
import { v4 as uuidv4 } from 'uuid';


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
    const slug = body.slug

    let newNominee = null;
    const nomineeId = uuidv4();

    try {
        console.log("yo")

        let nominator = await prisma.nominator.findUnique({
          where: { email: nominatorEmail }
        });

        if (!nominator) {
          nominator = await prisma.nominator.create({
            data: {
              firstName: nominatorName,
              lastName: nominatorName,
              email: nominatorEmail,
              id: nominatorId
            }
          });

        }

        newNominee = await prisma.nominee.create({
            data: {
                nominator: {
                    connect: {
                        id: nominator.id
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
                slug: slug,
            }
        });

        await sendTemplateEmail(email, "NOMINATION", {
          name: firstName
        });
    }

    catch(error) {
        console.error(error);
        throw createError({ statusCode: 500, statusMessage: "Error creating nomineelol", });
    }

    return newNominee;
})