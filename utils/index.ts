export function getFullName(
    user?: { firstName?: string | null; lastName?: string | null } | null,
): string {
    return `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
}

/** Public URL to the nominee image stream (served as WebP from upload normalization). */
export function getImageLink(
    photoURL: string | null | undefined,
    id: string,
): string | undefined {
    return photoURL ? `/api/nominee/${id}/image` : undefined;
}