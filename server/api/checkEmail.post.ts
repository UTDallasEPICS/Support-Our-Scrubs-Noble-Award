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
      throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    let role: 'admin' | 'nominator' | 'nominee' | null = null

    if (user.admin) role = 'admin'
    else if (user.nominator) role = 'nominator'
    else if (user.nominee) role = 'nominee'
    else return { role }

    return { role }
  } catch (err) {
    console.error('Error checking email', err)
    throw createError({ statusCode: 500, statusMessage: 'Error checking email' })
  }
})
