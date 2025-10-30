import { readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prismaclient'

export default defineEventHandler(async (event) => {
  // ---- 1) Read body ONCE and validate plainly ----
  const body = await readBody<{ email?: string }>(event).catch(() => ({} as any))
  const emailRaw = typeof body?.email === 'string' ? body.email : ''
  const email = emailRaw.trim().toLowerCase()

  // simple email guard (regex is lightweight and OK here)
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!validEmail || email.length > 254) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email' })
  }

  // ---- 2) Query your allowed tables ----
  try {
    const [admin, nominee] = await Promise.all([
      prisma.admin.findUnique({ where: { email } }),
      prisma.nominee.findUnique({ where: { email }}),
    ])  

    if (!admin && !nominee) {
      // generic so you don't leak which emails exist
      return { ok: false, reason: 'not_found' as const }
    }

    const role = admin ? 'admin' : 'nominator'
    return { ok: true, role }
  } catch (err) {
    // log server-side if you want details
    console.error('check-email error:', err)
    return { ok: false, reason: 'server_error' as const }
  }
})
