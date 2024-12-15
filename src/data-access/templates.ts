import "server-only";

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

export const getTemplate = async (
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
