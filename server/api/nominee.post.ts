import { prisma } from '~/server/utils/prismaclient'
import { sendEmail, routeRecipient } from '~/server/utils/mailer'
import { v4 as uuidv4 } from 'uuid'

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

  const body = await readBody(event)
  const {
    firstName, lastName, phoneNumber, address, placeOfWork,
    occupation, email, description, photoURL,
    nominatorId, nominatorName, nominatorEmail
  } = body ?? {}

  // Minimal required-field guard (use Zod later)
  for (const [k, v] of Object.entries({
    firstName, lastName, phoneNumber, address, placeOfWork,
    occupation, email, description, nominatorName, nominatorEmail
  })) {
    if (!v) throw createError({ statusCode: 400, statusMessage: `Missing field: ${k}` })
  }

  const nomineeId = uuidv4()

  try {
    // Find or create nominator (let Prisma default id when not provided)
    let nominator = await prisma.nominator.findUnique({ where: { email: nominatorEmail } })
    if (!nominator) {
      nominator = await prisma.nominator.create({
        data: {
          id: nominatorId ?? uuidv4(),
          firstName: nominatorName,
          lastName: nominatorName,
          email: nominatorEmail,
        }
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

    const newNominee = await prisma.nominee.create({
      data: {
        nominator: { connect: { id: nominator.id } },
        id: nomineeId,
        firstName, lastName, phoneNumber, address,
        placeOfWork, occupation, email, description,
        photoURL: photoURL ?? '',         // if your schema requires String
        slug,
        // adminId: adminId ?? null,      // only if your model allows nullable
      }
    })

    // Send emails but do NOT fail the request if SMTP errors
    ;(async () => {
      try {
        console.log('[email] sending to nominator:', nominatorEmail)
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
              We’ll review it and get back to you soon.
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
      console.log('[email] nominator email sent (or at least attempted)')
      } catch (e) {
        console.error('[email] nominator failed:', e)
      }

      if (process.env.ADMIN_TO) {
        try {
          console.log('[email] sending to admin:', process.env.ADMIN_TO)
          await sendEmail(
            routeRecipient(process.env.ADMIN_TO),
            `New Nomination: ${firstName} ${lastName}`,
            `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
              <h2 style="color: #2c3e50; margin-bottom: 15px;">
                New Nomination Submitted
              </h2>

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
          console.log('[email] admin email sent (or at least attempted)') 
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
