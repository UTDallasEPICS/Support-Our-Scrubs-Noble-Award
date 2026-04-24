import { auth } from "~/server/utils/auth"
import { magicLinkSchema } from '~/shared/types'
import { prisma } from "~/server/utils/prismaclient"

async function magicLinkCallbackUrlForEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { nominee: true },
  })
  if (!user) return "/"
  if (user.nominee && user.nominee.aboutme == null) return "/profile"
  return "/"
}

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, b => magicLinkSchema.parse(b))

  const callbackURL = await magicLinkCallbackUrlForEmail(email)

  const response = await auth.api.signInMagicLink({
    body: { email, callbackURL },
    headers: event.headers
  })

  return response
})
