// server/api/auth/request-link.post.ts
import { prisma } from '~/server/utils/prismaclient'
import { randomBytes } from 'crypto'
import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string }>(event)
  const email = (body?.email || '').toLowerCase().trim()
  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'Email is required' })
  }

  // Check if this email exists as Admin or Nominator (role-aware)
  const [admin, nominator] = await Promise.all([
    prisma.admin.findUnique({ where: { email } }),
    prisma.nominator.findUnique({ where: { email } }),
  ])

  // (Option A) strict: reject unknown emails
  if (!admin && !nominator) {
    // To avoid user enumeration you *could* still return 200 here
    throw createError({ statusCode: 404, statusMessage: 'No account found for this email' })
  }

  // Create token
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

  await prisma.magicToken.create({
    data: {
      token,
      email,
      expiresAt,
      used: false,
    },
  })

  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl // e.g., https://your-domain.com
  const loginUrl = `${baseUrl}/auth/callback?token=${token}`

  const resend = new Resend(config.resendApiKey)
  await resend.emails.send({
    from: 'Support Our Scrubs <no-reply@sossite.org>',
    to: email,
    subject: 'Your sign-in link',
    html: `
      <p>Hello!</p>
      <p>Click the secure link below to sign in. This link expires in 15 minutes.</p>
      <p><a href="${loginUrl}">Sign in to Support Our Scrubs</a></p>
      <p>If you didn't request this, you can ignore this email.</p>
    `,
  })

  return { ok: true }
})
