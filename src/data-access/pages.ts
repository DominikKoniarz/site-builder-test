import "server-only";

import type { PageWithVariablesDTO } from "@/dto/pages.dto";
import { createPageWithVariablesDTO } from "@/dto/pages.mappers";
import prisma from "@/lib/prisma";

export const getPageWithVariables = async (
    id: string,
): Promise<PageWithVariablesDTO | null> => {
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
                orderBy: {
                    templateVariable: {
                        order: "asc",
                    },
                },
                select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    templateVariable: {
                        select: {
                            id: true,
                            name: true,
                            tag: true,
                            type: true,
                            createdAt: true,
                            updatedAt: true,
                            order: true,
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

    return page ? createPageWithVariablesDTO(page) : null;
};

// TODO: Check prisma select types with currently used selects
