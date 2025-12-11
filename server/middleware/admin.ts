import { defineEventHandler, sendError, createError } from 'h3'
import { prisma } from '@/server/utils/prismaclient'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  if (!user) {
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
