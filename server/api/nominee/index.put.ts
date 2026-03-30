import { prisma } from "../../utils/prismaclient";
import { nomineeUpdateSchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const {
    id, firstName, lastName, phoneNumber, address,
    placeOfWork, occupation, email, description,
    aboutme, photoURL, nominatorId, adminId, status,
  } = await readValidatedBody(event, b => nomineeUpdateSchema.parse(b));

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
                aboutme: aboutme,
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
