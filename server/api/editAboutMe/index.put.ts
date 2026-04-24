import { prisma } from '~/server/utils/prismaclient'
import { auth } from '~/server/utils/auth'
import { aboutMeSchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const { aboutMe } = await readValidatedBody(event, b => aboutMeSchema.parse(b))

  const updated = await prisma.nominee.update({
    where: { userId: session.session.userId },
    data: {
      aboutme: aboutMe,
      status: 'PENDING',
    },
    select: {
      aboutme: true,
      status: true,
    },
  })

  return {
    aboutMe: updated.aboutme,
    status: updated.status,
  }
})
