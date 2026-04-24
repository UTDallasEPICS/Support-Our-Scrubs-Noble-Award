export const handlePhotoUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement | null;
    if (!target?.files || target.files.length === 0) return;
    const file = target.files[0];
    return file;
};

export function getFullName(
    user?: { firstName?: string | null; lastName?: string | null } | null,
): string {
    return `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
}