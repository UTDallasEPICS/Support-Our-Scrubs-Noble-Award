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
            message: query.error.issues.toString()
    })

    const data = await auth.api.magicLinkVerify({
        query: {
            token: query.data.token,
            callbackURL: query.data.callbackURL
        },
        headers: event.headers
    })
    
    return data
    

})
