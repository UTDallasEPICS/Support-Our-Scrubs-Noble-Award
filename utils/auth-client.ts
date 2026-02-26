import { createAuthClient } from "better-auth/vue" // make sure to import from better-auth/vue
import { magicLinkClient, inferAdditionalFields } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        magicLinkClient(),
        inferAdditionalFields<typeof auth>()
    ]
})