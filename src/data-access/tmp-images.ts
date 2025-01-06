import "server-only";

import type { TmpImageDto } from "@/dto/tmp-images.dto";
import prisma from "@/lib/prisma";
import { createTmpImageDTO } from "@/dto/tmp-images.mappers";

export const addTmpImage = (name: string) => {
    return prisma.tmpImage.create({
        data: {
            imageName: name,
        },
    });
};

export const getTmpImageById = async (
    id: string,
): Promise<TmpImageDto | null> => {
    const foundImage = await prisma.tmpImage.findUnique({
        where: {
            id,
        },
    });

    return foundImage ? createTmpImageDTO(foundImage) : null;
};
