// server/api/my-nominees.get.ts
import { prisma } from '~/server/utils/prismaclient'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    console.log("❌ Supabase auth error:", error)
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  }

  const user = data.user
  const email = user.email
    console.log("📧 Logged-in user email:", email)


  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'User has no email' })
  }

  // Find nominator by email
  const nominator = await prisma.nominator.findUnique({
    where: { email },
    include: {
      Nominees: true, // assumes relation nominees[] on Nominator
    },
  })


  console.log("👤 NOMINATOR RECORD:", nominator)
  console.log("🧾 NOMINATOR.Nominees:", nominator?.Nominees)

  if (!nominator) {
    // No nominator record yet: return empty list
    return []
  }
  // IMPORTANT: we do NOT filter by "accepted" status here
  // so they can see nominees even if not accepted yet.
  return nominator.Nominees
})
