import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import { prisma } from "~/server/utils/prismaclient";
import { normalizeImageToWebP } from "~/server/utils/nomineeImage";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const { id } = getRouterParams(event);
    const nominee = await prisma.nominee.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                },
            },
        },
    });
    if (!nominee?.user?.id) {
        throw createError({ statusCode: 404, statusMessage: "Nominee not found" });
    }

    const form = await readMultipartFormData(event);

    if (!form) {
        throw createError({ statusCode: 400, statusMessage: "No form data" });
    }

    const file = form.find((i) => i.name === "file");

    if (!file || !file.data) {
        throw createError({ statusCode: 400, statusMessage: "File missing" });
    }

    const baseDir = config.uploadStoragePath || "public/images";
    const dirPath = path.join(baseDir, "nominee", nominee.id, "image");

    if (!existsSync(dirPath)) {
        await fs.mkdir(dirPath, { recursive: true });
    }

    const idBase = crypto.randomUUID();
    const fileName = `${idBase}.webp`;
    const filePath = path.join(dirPath, fileName);

    if (existsSync(filePath)) {
        throw createError({
            statusCode: 400,
            message: "Image already exists.",
        });
    }

    let webp: Buffer;
    try {
        webp = await normalizeImageToWebP(file.data);
    } catch {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid or unsupported image",
        });
    }

    await fs.writeFile(filePath, webp);

    const photoURL = path.posix.join("nominee", nominee.id, "image", fileName);

    const addedImage = await prisma.nominee.update({
        where: {
            id: nominee.id,
        },
        data: {
            photoURL,
        },
    });

    console.log(addedImage);

    setResponseStatus(event, 201);

    return {
        message: "Added profile picture to logged in user.",
    };
});
