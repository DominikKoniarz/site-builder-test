import { type GenerateImageUploadUrlSchema } from "@/schema/pages/page-images-schemas";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { R2 } from "../r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/env";
import { addTmpImage } from "@/data-access/tmp-images";

type GeneratedUrlData = {
    tmpImageId: string;
    frontendId: string;
    url: string;
};

const generateTmpImageKey = (dbId: string, name: string) => {
    return `tmp-image/${dbId}/${name}`;
};

export const generateImageUploadUrl = async (
    data: GenerateImageUploadUrlSchema,
): Promise<GeneratedUrlData> => {
    const { image } = data;

    const dbTmpImage = await addTmpImage(image.name);

    const key = generateTmpImageKey(dbTmpImage.id, image.name);

    const url: string = await getSignedUrl(
        R2,
        new PutObjectCommand({
            Bucket: env.R2_BUCKET_NAME,
            Key: key,
        }),
        { expiresIn: 60 * 5 }, // 5 minutes
    );

    return {
        tmpImageId: dbTmpImage.id,
        frontendId: image.frontendId,
        url,
    };
};
