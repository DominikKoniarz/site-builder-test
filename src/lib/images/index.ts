import type { PageEditBannerImageNewSchema } from "@/schema/pages/page-variables-schemas";
import { env } from "@/env";

const tmpDirPrefix: string = "tmp-image";

export const generateImagePublicURL = (
    image: PageEditBannerImageNewSchema,
): string => {
    return `https://${env.NEXT_PUBLIC_R2_BUCKET_HOSTNAME}/${tmpDirPrefix}/${image.tmpImageId}/${image.imageName}`;
};

export const generateTmpImageKey = (tmpImageId: string, imageName: string) => {
    return `${tmpDirPrefix}/${tmpImageId}/${imageName}`;
};
