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

export const removeTmpImageFromDb = (id: string) => {
    return prisma.tmpImage.delete({
        where: {
            id,
        },
    });
};

export const getAllTmpImages = async (): Promise<TmpImageDto[]> => {
    const images = await prisma.tmpImage.findMany();

    return images.map((image) => createTmpImageDTO(image));
};

export const removeMultipleTmpImagesFromDb = (ids: string[]) => {
    return prisma.tmpImage.deleteMany({
        where: {
            id: {
                in: ids,
            },
        },
    });
};
