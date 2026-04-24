import fs from "node:fs";
import path from "node:path";
import { useRuntimeConfig } from "#imports";
import { prisma } from "~/server/utils/prismaclient";

/**
 * Serves the stored WebP for a nominee. GET matches `<img :src="getImageLink(...)">`.
 */
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const nomineeId = getRouterParam(event, "id");

    if (!nomineeId) {
        throw createError({ statusCode: 400, statusMessage: "Missing nominee id" });
    }

    const nominee = await prisma.nominee.findUnique({
        where: { id: nomineeId },
        select: { photoURL: true },
    });

    const imagePath = nominee?.photoURL;
    if (!imagePath) {
        throw createError({ statusCode: 404, statusMessage: "Image not set" });
    }

    const filePath = path.join(
        config.uploadStoragePath || "public/images",
        ...imagePath.split("/").filter(Boolean),
    );

    if (!fs.existsSync(filePath)) {
        throw createError({ statusCode: 404, statusMessage: "File not found" });
    }

    const fileStream = fs.createReadStream(filePath);
    setHeader(event, "Content-Type", "image/webp");
    setHeader(event, "Cache-Control", "public, max-age=3600");
    return sendStream(event, fileStream);
});
