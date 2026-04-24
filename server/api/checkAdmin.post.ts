import { prisma } from '~/server/utils/prismaclient'
import { emailBodySchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, b => emailBodySchema.parse(b))

  const user = await prisma.user.findUnique({
    where: { email },
    include: { admin: true },
  })

  if (!user?.admin) {
    return { ok: false, role: null }
  }

  return { ok: true, role: 'admin' }
})
