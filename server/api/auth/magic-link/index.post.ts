import { auth } from "@/utils/auth"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const response = await auth.api.signInMagicLink({
        body: {
            email: body.email,
            callbackURL: "/"
        },
        headers: event.headers
    })

    return response
})