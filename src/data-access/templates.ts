import "server-only";

import type { TemplateAddSchema } from "@/schema/templates/template-add-schema";
import type {
    TemplateDTO,
    TemplateWithVariablesDTO,
} from "@/dto/templates.dto";
import {
    createTemplateDTO,
    createTemplateWithVariablesDTO,
} from "@/dto/templates.mappers";
import prisma from "@/lib/prisma";

export const getAllTemplates = async (): Promise<TemplateDTO[]> => {
    const templates = await prisma.template.findMany();

    return templates.map((template) => createTemplateDTO(template));
};

export const getTemplateById = async (
    id: string,
): Promise<TemplateWithVariablesDTO | null> => {
    const template = await prisma.template.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            description: true,
            variables: {
                select: {
                    id: true,
                    name: true,
                    type: true,
                    tag: true,
                    order: true,
                    createdAt: true,
                    updatedAt: true,
                    bannerTemplateVariableConfig: {
                        select: {
                            id: true,
                            imageHeight: true,
                            imageWidth: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            },
        },
    });

    return template ? createTemplateWithVariablesDTO(template) : null;
};

export const getTemplateByName = async (
    name: string,
): Promise<TemplateDTO | null> => {
    const template = await prisma.template.findUnique({
        where: {
            name,
        },
    });

    return template ? createTemplateDTO(template) : null;
};

export const addNewTemplate = async (data: TemplateAddSchema) => {
    const template = await prisma.template.create({
        data: {
            name: data.name,
            description: data.description,
            variables: {
                create: data.variables.map((variable) => ({
                    name: variable.name,
                    type: variable.type,
                    tag: variable.tag,
                    order: variable.order,
                    bannerTemplateVariableConfig:
                        variable.type === "BANNER"
                            ? {
                                  create: {
                                      imageHeight: variable.imageHeight,
                                      imageWidth: variable.imageWidth,
                                  },
                              }
                            : undefined,
                })),
            },
        },
    });

    return createTemplateDTO(template);
};
