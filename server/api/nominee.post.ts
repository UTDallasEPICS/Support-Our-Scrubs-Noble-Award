import { prisma } from '~/server/utils/prismaclient'
import { v4 as uuidv4 } from 'uuid'
import { supabaseAdmin } from '~/server/utils/supabaseAdmin'


export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  })

  const body = await readBody(event)
  const {
    firstName, lastName, phoneNumber, address, placeOfWork,
    occupation, email, description, photoURL,
    nominatorId, adminId, nominatorName, nominatorEmail
  } = body

  const nomineeId = uuidv4()
  try {
    let nominator = await prisma.nominator.findUnique({ where: { email: nominatorEmail } })
    if (!nominator) {
      nominator = await prisma.nominator.create({
        data: {
          firstName: nominatorName,
          lastName: nominatorName,
          email: nominatorEmail,
          id: nominatorId,
        }
      })
    }

    const newNominee = await prisma.nominee.create({
      data: {
        nominator: { connect: { id: nominator.id } },
        id: nomineeId,
        firstName, lastName, phoneNumber, address,
        placeOfWork, occupation, email, description, photoURL,
        slug: (firstName + lastName).toLowerCase()
      }
    })

    // 🔔 Send emails via a Supabase Edge Function
    const { data, error } = await supabaseAdmin.functions.invoke('send-nomination-emails', {
      body: {
        nominee: {
          id: newNominee.id,
          firstName: newNominee.firstName,
          lastName: newNominee.lastName,
          email: newNominee.email,
          placeOfWork: newNominee.placeOfWork,
          occupation: newNominee.occupation,
          description: newNominee.description,
        },
        nominator: {
          name: nominatorName,
          email: nominatorEmail
        },
        admin: {
          id: adminId // optional; your function can route to a fixed admin list
        }
      }
    })

    if (error) {
      console.error('Email function failed:', error)
      // don't throw; the create succeeded. Return with a soft warning if you want.
    }

    return newNominee
  } catch (err) {
    console.error(err)
    throw createError({ statusCode: 500, statusMessage: 'Error creating nominee' })
  }
})
