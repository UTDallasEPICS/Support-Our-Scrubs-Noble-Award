import { auth } from "~/utils/auth"
import { z } from "zod"

const querySchema = z.object({
    token: z.string(),
    callbackURL: z.string().optional()
})

export default defineEventHandler(async (event) => {
    
    const query = await getValidatedQuery(event, rawQuery => querySchema.safeParse(rawQuery))

    if (!query.success)
        throw createError({
            status: 400,
            statusMessage: "Bad Request",
            message: query.error.issues.map(issue => issue.message).join(', ')
    })

    try {
        const response = await auth.api.magicLinkVerify({
            query: {
                token: query.data.token,
                callbackURL: query.data.callbackURL
            },
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
