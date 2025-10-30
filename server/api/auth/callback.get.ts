// server/api/auth/callback.get.ts
import { prisma } from '~/server/utils/prismaclient'

export default defineEventHandler(async (event) => {
  const token = getQuery(event).token as string | undefined
  if (!token) throw createError({ statusCode: 400, statusMessage: 'Missing token' })

  const now = new Date()

  // Find the token by its unique "token" field
  const record = await prisma.magicToken.findUnique({ where: { token } })
  if (!record || record.used || record.expiresAt < now) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid or expired link' })
  }

  // Mark token as used (one-time)
  await prisma.magicToken.update({
    where: { token },
    data: { used: true },
  })

  // Determine role from email (Admin vs Nominator)
  const email = record.email.toLowerCase()
  const [admin, nominator] = await Promise.all([
    prisma.admin.findUnique({ where: { email } }),
    prisma.nominator.findUnique({ where: { email } }),
  ])

  // (Optional) Create a session/cookie here
  // setCookie(event, 'session', someJwtOrSessionId, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' })

  const dest = admin ? '/admin/dashboard' : '/user/home'
  return sendRedirect(event, dest, 302)
})
