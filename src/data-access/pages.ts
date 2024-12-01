import prisma from "@/lib/prisma";

// NOT FINISHED YET
export const getPage = async (id: string) => {
    const page = await prisma.page.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            description: true,
            slug: true,
            createdAt: true,
            updatedAt: true,
            variables: {
                select: {
                    id: true,
                    templateVariable: {
                        select: {
                            id: true,
                            name: true,
                            tag: true,
                            type: true,
                        },
                    },
                    bannerVariable: {
                        select: {
                            id: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                        include: {
                            images: {
                                select: {
                                    id: true,
                                    imageName: true,
                                    order: true,
                                    createdAt: true,
                                    updatedAt: true,
                                },
                            },
                        },
                    },
                    textVariable: {
                        select: {
                            id: true,
                            value: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            },
        },
    });

    return page;
};
