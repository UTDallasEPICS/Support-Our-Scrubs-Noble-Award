import { auth } from "~/server/utils/auth"
import { magicLinkSchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, b => magicLinkSchema.parse(b))

  const response = await auth.api.signInMagicLink({
    body: { email, callbackURL: "/"},
    headers: event.headers
  })

  return response
})
