import sharp from "sharp";

const MAX_EDGE_PX = 2048;
const WEBP_QUALITY = 85;

/**
 * Decodes an uploaded image, auto-orients, downscales, and encodes to WebP.
 * Used by the nominee upload API so all stored files match extension and content.
 */
export async function normalizeImageToWebP(
    input: Buffer | Uint8Array,
): Promise<Buffer> {
    return sharp(input, { failOn: "error" })
        .rotate()
        .resize(MAX_EDGE_PX, MAX_EDGE_PX, {
            fit: "inside",
            withoutEnlargement: true,
        })
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toBuffer();
}
