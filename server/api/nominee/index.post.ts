import { prisma } from '~/server/utils/prismaclient'
import { sendEmail, routeRecipient } from '~/server/utils/mailer'
import { auth } from '~/server/utils/auth'
import { nomineeCreateSchema } from '~/shared/types'

function toSlug(a: string, b: string) {
  return (a + '-' + b).toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default defineEventHandler(async (event) => {
  // Handle CORS + preflight
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  })
  if (getMethod(event) === 'OPTIONS') {
    return new Response(null, { status: 204 })
  }

  // Require authentication
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const userId = session.session.userId
  
  const raw = await readMultipartFormData(event)
  if (!raw) {
    throw createError({ statusCode: 400, message: 'Expected multipart/form-data' })
  }

  const fields: Record<string, string> = {}
  for (const field of raw) {
    if (!field.name) continue
    fields[field.name] = field.data.toString()
  }

  const {
    firstName, lastName, phoneNumber, address,
    placeOfWork, occupation, email, description, photoURL,
  } = nomineeCreateSchema.parse(fields)

  try {
    // The logged-in user is the nominator — ensure they have a Nominator record
    const nominatorUser = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: { nominator: true },
    })

    let nominator = nominatorUser.nominator
    if (!nominator) {
      nominator = await prisma.nominator.create({
        data: { user: { connect: { id: userId } } },
      })
    }

    // Make a unique slug to avoid P2002
    const base = toSlug(firstName, lastName)
    let slug = base
    for (let i = 1; ; i++) {
      const exists = await prisma.nominee.findUnique({ where: { slug } })
      if (!exists) break
      slug = `${base}-${i}`
    }

    // Find or create a User for the nominee if an email was provided
    let nomineeUserId: string | undefined
    if (email) {
      let nomineeUser = await prisma.user.findUnique({ where: { email } })
      if (!nomineeUser) {
        nomineeUser = await prisma.user.create({
          data: { email: email, firstName: firstName, lastName: lastName },
        })
      }
      nomineeUserId = nomineeUser.id
    }

    const newNominee = await prisma.nominee.create({
      data: {
        nominator: { connect: { id: nominator.id } },
        phoneNumber: phoneNumber,
        address: address,  
        placeOfWork: placeOfWork,
        occupation: occupation,
        description: description,
        photoURL: photoURL ?? '',
        slug,
        ...(nomineeUserId ? { user: { connect: { id: nomineeUserId } } } : {}),
      },
      include: { user: true },
    })

    const nominatorName = [nominatorUser.firstName, nominatorUser.lastName].filter(Boolean).join(' ') || nominatorUser.email
    const nominatorEmail = nominatorUser.email

    // Fire-and-forget emails
    ;(async () => {
      try {
        await sendEmail(
        routeRecipient(nominatorEmail),
          `We received your nomination for ${firstName} ${lastName}`,
          `
          <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2 style="color: #2c3e50; margin-bottom: 10px;">
              Thank you, ${nominatorName}!
            </h2>
            <p style="font-size: 15px; line-height: 1.5; margin-bottom: 12px;">
              Your nomination for <b>${firstName} ${lastName}</b> has been received.
            </p>
            <p style="font-size: 15px; line-height: 1.5; margin-bottom: 20px;">
              We'll review it and get back to you soon.
            </p>

            <div
              style="
                margin-top: 25px;
                padding: 14px 18px;
                background: #f3f6fa;
                border-left: 4px solid #2c3e50;
                border-radius: 6px;
                font-size: 14px;
                line-height: 1.5;
              "
            >
              If you have any additional information you'd like to share, feel free to reply
              directly to this email.
            </div>
          </div>
          `
      )
      } catch (e) {
        console.error('[email] nominator failed:', e)
      }

      if (process.env.ADMIN_TO) {
        try {
          await sendEmail(
            routeRecipient(process.env.ADMIN_TO),
            `New Nomination: ${firstName} ${lastName}`,
            `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
              <h2 style="color: #2c3e50; margin-bottom: 15px;">New Nomination Submitted</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0;"><strong>Nominee:</strong></td>
                  <td>${firstName} ${lastName} (${email})</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;"><strong>Occupation:</strong></td>
                  <td>${occupation}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;"><strong>Place of Work:</strong></td>
                  <td>${placeOfWork}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;"><strong>Nominator:</strong></td>
                  <td>${nominatorName} (${nominatorEmail})</td>
                </tr>
              </table>

              <div
                style="
                  margin-top: 20px;
                  background: #f7f7f7;
                  padding: 12px 16px;
                  border-radius: 8px;
                  line-height: 1.5;
                  white-space: pre-wrap;
                "
              >
                ${description}
              </div>
            </div>
            `
          )
        } catch (e) {
          console.error('[email] admin failed:', e)
        }
      } else {
        console.warn('[email] ADMIN_TO not set; admin email skipped')
      }
    })()

    return newNominee
  } catch (err: any) {
    // Prisma readable errors
    if (err?.code === 'P2002') {
      return sendError(event, createError({ statusCode: 409, statusMessage: `Duplicate field: ${err.meta?.target}` }))
    }
    if (err?.code === 'P2003') {
      return sendError(event, createError({ statusCode: 400, statusMessage: `Invalid relation: ${err.meta?.field_name}` }))
    }
    console.error('[nominee.post] unexpected:', err)
    throw createError({ statusCode: 500, statusMessage: 'Error creating nominee' })
  }
})
