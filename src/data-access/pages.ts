import "server-only";

import type { PageDTO, PageWithVariablesDTO } from "@/dto/pages.dto";
import type { PageState } from "@prisma/client";
import type { RemovedBannerImage } from "@/types/images";
import { createPageDTO, createPageWithVariablesDTO } from "@/dto/pages.mappers";
import prisma from "@/lib/prisma";
import { PageAddSchema } from "@/schema/pages/page-add-schema";
import { TemplateWithVariablesDTO } from "@/dto/templates.dto";
import { TemplateVariableDTO } from "@/dto/template-variables.dto";
import { PageEditSchema } from "@/schema/pages/page-edit-schema";

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
                                cropData: {
                                    select: {
                                        id: true,
                                        width: true,
                                        height: true,
                                        x: true,
                                        y: true,
                                    },
                                },
                            },
                            orderBy: {
                                order: "asc" as const,
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
): Promise<PageWithVariablesDTO | null> => {
    const page = await prisma.page.findFirst({
        where: {
            slug,
        },
        ...pageWithVariablesSelect,
    });

    return page ? createPageWithVariablesDTO(page) : null;
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
): Promise<RemovedBannerImage[] | null> => {
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
                pageId: true,
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
        // TODO: change this behavior to delete with code maybe

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

        const data: RemovedBannerImage[] = varsWithBannersToDelete.flatMap(
            (v) =>
                v.bannerVariable?.images.map(
                    (i) =>
                        ({
                            id: i.id,
                            pageId: v.pageId,
                            pageVariableId: v.id,
                            imageName: i.imageName,
                        }) satisfies RemovedBannerImage,
                ) ?? [],
        );

        return data;
    });
};

// for now updating only textVariables
export const updatePage = (data: PageEditSchema) => {
    return prisma.$transaction([
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
    cropData?: {
        width: number;
        height: number;
        x: number;
        y: number;
    };
}) => {
    return prisma.bannerImage.create({
        data: {
            id: data.id,
            bannerId: data.bannerVariableId,
            imageName: data.imageName,
            order: data.order,
            cropData: data.cropData
                ? {
                      create: {
                          width: data.cropData.width,
                          height: data.cropData.height,
                          x: data.cropData.x,
                          y: data.cropData.y,
                      },
                  }
                : undefined,
        },
    });
};

export const getBannerImageById = (id: string) => {
    return prisma.bannerImage.findUnique({
        where: {
            id,
        },
    });
};

export const updateBannerImageOrder = (data: { id: string; order: number }) => {
    return prisma.bannerImage.update({
        where: {
            id: data.id,
        },
        data: {
            order: data.order,
        },
    });
};

export const updateBannerImageCropData = (data: {
    id: string;
    cropData?: {
        width: number;
        height: number;
        x: number;
        y: number;
    } | null;
}) => {
    if (!data.cropData)
        return prisma.bannerImageCropData.deleteMany({
            // delete many to skip error if no crop data
            where: {
                bannerImageId: data.id,
            },
        });
    else
        return prisma.bannerImageCropData.upsert({
            where: {
                bannerImageId: data.id,
            },
            update: {
                width: data.cropData.width,
                height: data.cropData.height,
                x: data.cropData.x,
                y: data.cropData.y,
            },
            create: {
                bannerImageId: data.id,
                width: data.cropData.width,
                height: data.cropData.height,
                x: data.cropData.x,
                y: data.cropData.y,
            },
        });
};

export const removeBannerImagesFromDb = (images: RemovedBannerImage[]) => {
    if (!images.length) throw new Error("No images to remove");

    return prisma.$transaction([
        prisma.bannerImageCropData.deleteMany({
            where: {
                bannerImageId: {
                    in: images.map((image) => image.id),
                },
            },
        }),
        prisma.bannerImage.deleteMany({
            where: {
                id: {
                    in: images.map((image) => image.id),
                },
            },
        }),
    ]);
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
