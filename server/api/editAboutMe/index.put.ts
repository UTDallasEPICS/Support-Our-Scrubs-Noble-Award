import { prisma } from '~/server/utils/prismaclient'
import { auth } from '~/utils/auth'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({headers: event.headers})
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authenticated',
    })
  }


  const body = await readBody<{ aboutMe?: string }>(event)
  const aboutMe = body.aboutMe ?? ''

  // Optional: clamp length so users can’t paste a novel
  const trimmed = aboutMe.slice(0, 300)

  // Again: adjust model + unique key to match your DB
  const updated = await prisma.nominee.update({
    where: {
      userId: session.session.userId
    },
    data: {
      aboutme: trimmed,
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
