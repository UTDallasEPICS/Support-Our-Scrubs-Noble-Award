// /server/api/profile/about-me.get.ts
import { prisma } from '~/server/utils/prismaclient'
import { auth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({headers: event.headers})
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated',
    })
  }

  
  // Adjust this to your schema: Nominee / Nominator table, etc.
  const profile = await prisma.nominee.findUnique({ where: { userId: session.session.userId }, select: { aboutme: true } })

  return {
    aboutMe: profile?.aboutme ?? '',
  }
})
