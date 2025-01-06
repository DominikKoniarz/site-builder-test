import type { TmpImage } from "@prisma/client";
import type { TmpImageDto } from "./tmp-images.dto";

export const createTmpImageDTO = (tmpImage: TmpImage): TmpImageDto => {
    return {
        id: tmpImage.id,
        imageName: tmpImage.imageName,
        createdAt: tmpImage.createdAt,
        updatedAt: tmpImage.updatedAt,
    };
};
