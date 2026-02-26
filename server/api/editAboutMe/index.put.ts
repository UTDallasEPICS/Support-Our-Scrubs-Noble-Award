import { prisma } from '~/server/utils/prismaclient'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supaUser = await serverSupabaseUser(event)

  if (!supaUser) {
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
      email: supaUser.email!,
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
