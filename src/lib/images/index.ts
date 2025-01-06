import type { PageEditBannerImageNewSchema } from "@/schema/pages/page-variables-schemas";
import type { CropData } from "@/types/images";
import { env } from "@/env";

const tmpDirPrefix: string = "tmp-image";

export const generateTmpImagePublicURL = (
    image: PageEditBannerImageNewSchema,
): string => {
    return `https://${env.NEXT_PUBLIC_R2_BUCKET_HOSTNAME}/${tmpDirPrefix}/${image.tmpImageId}/${image.imageName}`;
};

export const generateTmpImageKey = (tmpImageId: string, imageName: string) => {
    return `${tmpDirPrefix}/${tmpImageId}/${imageName}`;
};

export const sanitizeCropData = (
    cropData: CropData,
    imageWidth: number,
    imageHeight: number,
): CropData => {
    const x: number = Math.max(0, cropData.x);
    const y: number = Math.max(0, cropData.y);
    const width: number =
        cropData.width + x > imageWidth ? imageWidth - x : cropData.width;
    const height: number =
        cropData.height + y > imageHeight ? imageHeight - y : cropData.height;

    return {
        x: parseInt(x.toString(), 10),
        y: parseInt(y.toString(), 10),
        width: parseInt(width.toString(), 10),
        height: parseInt(height.toString(), 10),
    };
};

export const getMimeFromName = (name: string): string => {
    const lastDotIndex = name.lastIndexOf(".");
    const ext = name.slice(lastDotIndex + 1);
    console.log(ext);

    switch (ext) {
        case "jpg":
        case "jpeg":
            return "image/jpeg";
        case "png":
            return "image/png";
        case "webp":
            return "image/webp";
        default:
            throw new Error("Unsupported image type");
    }
};
