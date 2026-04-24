import { auth } from "~/server/utils/auth"
import { magicLinkVerifyQuerySchema } from '~/shared/types'

export default defineEventHandler(async (event) => {
  const { token, callbackURL } = await getValidatedQuery(event, q => magicLinkVerifyQuerySchema.parse(q))

  try {
    const response = await auth.api.magicLinkVerify({
      query: { token, callbackURL },
      headers: event.headers,
      asResponse: true
    })

    if (response.status === 302) {
      const location = response.headers.get("location")
      if (location) {
        for (const [key, value] of response.headers.entries()) {
          if (key.toLowerCase() === "location") continue
          appendResponseHeader(event, key, value)
        }
        return sendRedirect(event, location, 302)
      }
    }

    return response
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Magic link verification failed"
    throw createError({
      status: 401,
      statusMessage: "Unauthorized",
      message
    })
  }
})
