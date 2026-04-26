/**
 * Thin typed wrapper around the `POST /api/checkEmail` authorization endpoint.
 * Returns the caller's primary role. The server-side handler
 * (`server/api/checkEmail.post.ts`) throws 404 when the email has no role at all,
 * so callers should wrap this in try/catch if that's a possibility.
 */
export async function useCheckEmail(email: string) {

        const data = await $fetch<{ role: "admin" | "nominator" | "nominee" | null }>(
        "/api/checkEmail",
        {
            method: "POST",
            body: { email },
        },
    );
    if (!data) {
        throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }
    return data
}
