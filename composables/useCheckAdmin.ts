/**
 * Thin typed wrapper around the `POST /api/checkAdmin` authorization endpoint.
 * Returns `{ ok, role }` where `ok === true` iff the email belongs to an admin user.
 * The server-side handler (`server/api/checkAdmin.post.ts`) validates the body
 * with `emailBodySchema` and never throws for unknown users - it just returns
 * `{ ok: false, role: null }`.
 */
export async function useCheckAdmin(email: string) {
    return $fetch<{ ok: boolean; role: "admin" | null }>("/api/checkAdmin", {
        method: "POST",
        body: { email },
    });
}
