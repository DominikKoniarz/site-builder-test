import "server-only";

import { type GenerateImageUploadUrlSchema } from "@/schema/pages/page-images-schemas";
import { addTmpImage } from "@/data-access/tmp-images";
import { generateTmpImageKey } from "../images";
import { getTmpImageSignedUrl } from "../r2/presigner";

type GeneratedUrlData = {
    tmpImageId: string;
    frontendId: string;
    url: string;
};

export const generateImageUploadUrl = async (
    data: GenerateImageUploadUrlSchema,
): Promise<GeneratedUrlData> => {
    const { image } = data;

    const dbTmpImage = await addTmpImage(image.name);

    const key = generateTmpImageKey(dbTmpImage.id, image.name);

    const url: string = await getTmpImageSignedUrl(key);

    return {
        tmpImageId: dbTmpImage.id,
        frontendId: image.frontendId,
        url,
    };
};
