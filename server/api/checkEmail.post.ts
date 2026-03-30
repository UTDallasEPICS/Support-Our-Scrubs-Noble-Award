import { prisma } from '~/server/utils/prismaclient'
import { emailBodySchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, b => emailBodySchema.parse(b))

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        admin: true,
        nominator: true,
        nominee: true,
      },
    })

    if (!user) {
      return { ok: false, reason: 'not_found' as const }
    }

    let role: 'admin' | 'nominator' | 'nominee'

    if (user.admin) role = 'admin'
    else if (user.nominator) role = 'nominator'
    else if (user.nominee) role = 'nominee'
    else return { ok: false, reason: 'not_found' as const }

    return { ok: true, role }
  } catch (err) {
    // log server-side if you want details
    console.error('check-email error:', err)
    return { ok: false, reason: 'server_error' as const }
  }
})
