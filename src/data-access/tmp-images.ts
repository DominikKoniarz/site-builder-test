import prisma from "@/lib/prisma";

export const addTmpImage = (name: string) => {
    return prisma.tmpImage.create({
        data: {
            imageName: name,
        },
    });
};
