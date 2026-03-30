import { readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prismaclient'
import { emailBodySchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, b => emailBodySchema.parse(b))

  try {
    const [admin, nominator, nominee] = await Promise.all([
      prisma.admin.findUnique({ where: { email } }),
      prisma.nominee.findUnique({ where: { email }}),
      prisma.nominator.findUnique({ where: { email }})
    ])  

    if (!admin && !nominator && !nominee) {
      // generic so you don't leak which emails exist
      return { ok: false, reason: 'not_found' as const }
    }

    let role: 'admin' | 'nominator' | 'nominee'

    if (admin) role = 'admin'
    else if (nominator) role = 'nominator'
    else role = 'nominee'

    return { ok: true, role }
  } catch (err) {
    // log server-side if you want details
    console.error('check-email error:', err)
    return { ok: false, reason: 'server_error' as const }
  }
})