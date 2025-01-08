import "server-only";

import type { PageDTO, PageWithVariablesDTO } from "@/dto/pages.dto";
import type { PageState } from "@prisma/client";
import { createPageDTO, createPageWithVariablesDTO } from "@/dto/pages.mappers";
import prisma from "@/lib/prisma";
import { PageAddSchema } from "@/schema/pages/page-add-schema";
import { TemplateWithVariablesDTO } from "@/dto/templates.dto";
import { TemplateVariableDTO } from "@/dto/template-variables.dto";
import { PageEditSchema } from "@/schema/pages/page-edit-schema";
import { DbFetchedPageWithVariables } from "@/types/pages";

const pageWithVariablesSelect = {
    select: {
        id: true,
        state: true,
        name: true,
        description: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        variables: {
            orderBy: {
                templateVariable: {
                    order: "asc" as const,
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
                        bannerTemplateVariableConfig: {
                            select: {
                                id: true,
                                imageHeight: true,
                                imageWidth: true,
                            },
                        },
                    },
                },
                bannerVariable: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        images: {
                            select: {
                                id: true,
                                imageName: true,
                                order: true,
                                createdAt: true,
                                updatedAt: true,
                                cropX: true,
                                cropY: true,
                                cropWidth: true,
                                cropHeight: true,
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
};

export const getAllPages = async () => {
    const pages = await prisma.page.findMany();

    return pages.map((page) => createPageDTO(page));
};

export const getPageByName = async (name: string) => {
    const page = await prisma.page.findFirst({
        where: {
            name,
        },
    });

    return page ? createPageDTO(page) : null;
};

export const getPageById = async (id: string) => {
    const page = await prisma.page.findUnique({
        where: {
            id,
        },
    });

    return page ? createPageDTO(page) : null;
};

export const getPageBySlug = async (slug: string) => {
    const page = await prisma.page.findFirst({
        where: {
            slug,
        },
    });

    return page ? createPageDTO(page) : null;
};

export const getPageWithVariablesBySlug = async (
    slug: string,
): Promise<DbFetchedPageWithVariables | null> => {
    const page = await prisma.page.findFirst({
        where: {
            slug,
        },
        ...pageWithVariablesSelect,
    });

    return page;
};

export const getPageWithVariablesById = async (
    id: string,
): Promise<PageWithVariablesDTO | null> => {
    const page = await prisma.page.findUnique({
        where: {
            id,
        },
        ...pageWithVariablesSelect,
    });

    return page ? createPageWithVariablesDTO(page) : null;
};

export const addPage = async (
    data: PageAddSchema,
    template: TemplateWithVariablesDTO,
): Promise<PageDTO> => {
    const page = await prisma.page.create({
        data: {
            state: "READY",
            name: data.name,
            slug: data.slug,
            description: data.description,
            templateId: data.templateId,
            variables: {
                create: template.variables.map((variable) => ({
                    templateVariableId: variable.id,
                    textVariable:
                        variable.type === "TEXT"
                            ? {
                                  create: {
                                      value: null,
                                  },
                              }
                            : undefined,
                    bannerVariable:
                        variable.type === "BANNER"
                            ? {
                                  create: {
                                      images: undefined,
                                  },
                              }
                            : undefined,
                })),
            },
        },
    });

    return createPageDTO(page);
};

export const getAllPagesIdsByTemplateId = async (
    templateId: string,
): Promise<string[]> => {
    const pages = await prisma.page.findMany({
        where: {
            templateId,
        },
        select: {
            id: true,
        },
    });

    return pages.map((page) => page.id);
};

export const addVarsToPagesAfterTemplateUpdate = async (
    templateVarsToAddOnPages: TemplateVariableDTO[],
    pagesIds: string[],
) => {
    await prisma.$transaction(
        pagesIds.map((pageId) =>
            prisma.page.update({
                where: {
                    id: pageId,
                },
                data: {
                    variables: {
                        create: templateVarsToAddOnPages.map((variable) => ({
                            templateVariableId: variable.id,
                            textVariable:
                                variable.type === "TEXT"
                                    ? {
                                          create: {
                                              value: null,
                                          },
                                      }
                                    : undefined,
                            bannerVariable:
                                variable.type === "BANNER"
                                    ? {
                                          create: {
                                              images: undefined,
                                          },
                                      }
                                    : undefined,
                        })),
                    },
                },
            }),
        ),
    );
};

export const deletePagesVarsAfterTemplateUpdate = async (
    templateVarsIdsToDeleteOnPages: string[],
    pagesIds: string[],
) => {
    return prisma.$transaction(async (tx) => {
        if (!templateVarsIdsToDeleteOnPages.length) return null;

        const varsWithBannersToDelete = await tx.pageVariable.findMany({
            where: {
                templateVariableId: {
                    in: templateVarsIdsToDeleteOnPages,
                },
                pageId: {
                    in: pagesIds,
                },
                templateVariable: {
                    type: "BANNER",
                },
            },
            select: {
                id: true,
                bannerVariable: {
                    select: {
                        id: true,
                        images: {
                            select: {
                                id: true,
                                imageName: true,
                            },
                        },
                    },
                },
            },
        });

        // all records by relations are deleted with onDelete: CASCADE

        // delete variables from pages
        if (templateVarsIdsToDeleteOnPages.length)
            await tx.pageVariable.deleteMany({
                where: {
                    templateVariableId: {
                        in: templateVarsIdsToDeleteOnPages,
                    },
                    pageId: {
                        in: pagesIds,
                    },
                },
            });

        return {
            bannersToDelete: varsWithBannersToDelete.map((v) => ({
                varId: v.id,
                bannerId: v.bannerVariable?.id,
                images: v.bannerVariable?.images.map((i) => ({
                    id: i.id,
                    imageName: i.imageName,
                })),
            })),
        };
    });
};

// for now updating only textVariables
export const updatePage = async (data: PageEditSchema) => {
    await prisma.$transaction([
        prisma.page.update({
            where: {
                id: data.id,
            },
            data: {
                state: "PROCESSING",
                name: data.name,
                slug: data.slug,
                description: data.description,
            },
        }),
        ...data.variables
            .filter((variable) => variable.type === "TEXT")
            .map((variable) =>
                prisma.textVariable.update({
                    where: {
                        id: variable.textVariableId,
                    },
                    data: {
                        value: variable.value,
                    },
                }),
            ),
    ]);
};

export const getPageBannerVariableConfig = async (
    pageVariableId: string,
): Promise<{
    id: string;
    imageWidth: number;
    imageHeight: number;
} | null> => {
    const data = await prisma.pageVariable.findUnique({
        where: {
            id: pageVariableId,
        },
        select: {
            templateVariable: {
                select: {
                    bannerTemplateVariableConfig: {
                        select: {
                            id: true,
                            imageHeight: true,
                            imageWidth: true,
                        },
                    },
                },
            },
        },
    });

    if (data?.templateVariable?.bannerTemplateVariableConfig) {
        return data.templateVariable.bannerTemplateVariableConfig;
    }

    return null;
};

export const createBannerImage = (data: {
    id: string;
    imageName: string;
    order: number;
    bannerVariableId: string;
    cropWidth: number;
    cropHeight: number;
    cropX: number;
    cropY: number;
}) => {
    return prisma.bannerImage.create({
        data: {
            id: data.id,
            bannerId: data.bannerVariableId,
            imageName: data.imageName,
            order: data.order,
            cropWidth: data.cropWidth,
            cropHeight: data.cropHeight,
            cropX: data.cropX,
            cropY: data.cropY,
        },
    });
};

export const changePageState = (id: string, state: PageState) => {
    return prisma.page.update({
        where: {
            id,
        },
        data: {
            state,
        },
    });
};
