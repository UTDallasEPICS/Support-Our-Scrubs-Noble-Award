import { prisma } from '~/server/utils/prismaclient'
import { emailBodySchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, b => emailBodySchema.parse(b))

  const admin = await prisma.admin.findUnique({
    where: { email } // make sure email is unique in your Admin model
  })

  if (!admin) {
    return { ok: false, role: null }
  }

  return { ok: true, role: 'admin' }
})
