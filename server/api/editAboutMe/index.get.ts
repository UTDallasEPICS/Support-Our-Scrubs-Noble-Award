// /server/api/profile/about-me.get.ts
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

  // Adjust this to your schema: Nominee / Nominator table, etc.
  const profile = await prisma.nominee.findUnique({
    where: {
      email: supaUser.email!, // or use supaUser.id if you store it
    },
    select: {
      aboutme: true,
    },
  })

  return {
    aboutMe: profile?.aboutme ?? '',
  }
})
