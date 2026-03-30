import { prisma } from '~/server/utils/prismaclient'
import { auth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })

  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const userId = session.session.userId

  // Find nominator by userId
  const nominator = await prisma.nominator.findUnique({
    where: { userId },
    include: {
      Nominees: {
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
    },
  })

  if (!nominator) {
    throw createError({ statusCode: 404, statusMessage: 'Nominator not found' })
  }
  // IMPORTANT: we do NOT filter by "accepted" status here
  // so they can see nominees even if not accepted yet.
  return nominator.Nominees
})
