import { defineEventHandler, sendError, createError } from 'h3'
import { prisma } from '../server/utils/prismaclient' // adjust path

export default defineEventHandler(async (event) => {
  // Get user from your session (however you're storing the OTP result)
  const user = event.context.user

  if (!user?.email) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    )
  }

  // Check admin table
  const admin = await prisma.admin.findUnique({
    where: { email: user.email },
  })

  if (!admin) {
    return sendError(
      event,
      createError({ statusCode: 403, statusMessage: 'Forbidden' })
    )
  }

  // user *is* an admin → allow access
})
