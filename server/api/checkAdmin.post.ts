import { prisma } from '~/server/utils/prismaclient'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = body.email

  if (!email) {
    return { ok: false, reason: 'no_email' }
  }

  const admin = await prisma.admin.findUnique({
    where: { email } // make sure email is unique in your Admin model
  })

  if (!admin) {
    return { ok: false, role: null }
  }

  return { ok: true, role: 'admin' }
})
