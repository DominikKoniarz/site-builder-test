import "server-only";

import type { PageWithVariablesDTO } from "@/dto/pages.dto";
import { createPageDTO, createPageWithVariablesDTO } from "@/dto/pages.mappers";
import prisma from "@/lib/prisma";
import { PageAddSchema } from "@/schema/pages/page-add-schema";
import { TemplateWithVariablesDTO } from "@/dto/templates.dto";

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

export const addPage = async (
    data: PageAddSchema,
    template: TemplateWithVariablesDTO,
) => {
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
                            ? { create: true }
                            : undefined,
                })),
            },
        },
    });

    return createPageDTO(page);
};
