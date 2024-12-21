import "server-only";

import type { PageDTO, PageWithVariablesDTO } from "@/dto/pages.dto";
import { createPageDTO, createPageWithVariablesDTO } from "@/dto/pages.mappers";
import prisma from "@/lib/prisma";
import { PageAddSchema } from "@/schema/pages/page-add-schema";
import { TemplateWithVariablesDTO } from "@/dto/templates.dto";
import { TemplateVariableDTO } from "@/dto/template-variables.dto";

const pageWithVariablesSelect = {
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

export const getPageWithVariables = async (
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

export const getAllPagesIds = async (templateId: string): Promise<string[]> => {
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

export const updatePagesAfterTemplateUpdate = async (
    varsToAddOnPages: TemplateVariableDTO[],
    varsToDeleteOnPages: TemplateVariableDTO[],
    pagesIds: string[],
) => {
    await prisma.$transaction(async (tx) => {
        const bannersToDelete = await tx.bannerVariable.findMany({
            where: {
                pageVariableId: {
                    in: varsToDeleteOnPages.map((variable) => variable.id),
                },
            },
            select: {
                id: true,
                pageVariable: {
                    select: {
                        id: true,
                        page: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
                images: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        // delete banner images
        await Promise.all(
            bannersToDelete.map((banner) =>
                banner.images.map((image) =>
                    tx.bannerImage.delete({
                        where: {
                            id: image.id,
                        },
                    }),
                ),
            ),
        );

        // delete banner variables
        await Promise.all(
            bannersToDelete.map((banner) =>
                tx.bannerVariable.delete({
                    where: {
                        id: banner.id,
                    },
                }),
            ),
        );

        // delete variables from pages
        await Promise.all(
            varsToDeleteOnPages.map((variable) =>
                tx.pageVariable.deleteMany({
                    where: {
                        templateVariableId: variable.id,
                        pageId: {
                            in: pagesIds,
                        },
                    },
                }),
            ),
        );

        // add new variables to pages
        await Promise.all(
            varsToAddOnPages.map((variable) =>
                tx.pageVariable.createMany({
                    data: pagesIds.map((pageId) => ({
                        pageId,
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
                }),
            ),
        );

        return {
            bannerImagesIdsToDelete: bannersToDelete.flatMap((b) => b.images),
        };
    });
};
