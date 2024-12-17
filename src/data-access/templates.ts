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
import { TemplateEditSchema } from "@/schema/templates/template-edit-schema";

const variablesSelect = {
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
        orderBy: {
            order: "asc" as const,
        },
    },
};

export const getAllTemplates = async (): Promise<TemplateDTO[]> => {
    const templates = await prisma.template.findMany();

    return templates.map((template) => createTemplateDTO(template));
};

export const getTemplateById = async (
    id: string,
): Promise<TemplateDTO | null> => {
    const template = await prisma.template.findUnique({
        where: {
            id,
        },
    });

    return template ? createTemplateDTO(template) : null;
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

export const getTemplateByIdWithVariables = async (
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
            ...variablesSelect,
        },
    });

    return template ? createTemplateWithVariablesDTO(template) : null;
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

export const updateTemplate = async (
    data: Pick<TemplateEditSchema, "id" | "name" | "description">,
    variablesIdsToDelete: string[],
    variablesToAdd: TemplateEditSchema["variables"],
    variablesToUpdate: TemplateEditSchema["variables"], // has to have id string
) => {
    if (variablesToUpdate.some((variable) => !variable.id))
        throw new Error("Variables to edit must have id");

    const [template] = await prisma.$transaction(
        [
            prisma.template.update({
                where: {
                    id: data.id,
                },
                data: {
                    name: data.name,
                    description: data.description,
                },
            }),
            ...variablesToAdd.map((variable) =>
                prisma.templateVariable.create({
                    data: {
                        templateId: data.id,
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
                    },
                }),
            ),
            ...variablesToUpdate.map((variable) =>
                prisma.templateVariable.update({
                    where: {
                        id: variable.id!,
                    },
                    data: {
                        name: variable.name,
                        type: variable.type,
                        tag: variable.tag,
                        order: variable.order,
                    },
                }),
            ),
            // update (or create) config if type is banner
            ...variablesToUpdate
                .filter((variable) => variable.type === "BANNER")
                .map((variable) => {
                    return prisma.bannerTemplateVariableConfig.upsert({
                        where: {
                            templateVariableId: variable.id!,
                        },
                        create: {
                            templateVariableId: variable.id!,
                            imageHeight: variable.imageHeight,
                            imageWidth: variable.imageWidth,
                        },
                        update: {
                            imageHeight: variable.imageHeight,
                            imageWidth: variable.imageWidth,
                        },
                    });
                }),
            //remove config if type changes
            prisma.bannerTemplateVariableConfig.deleteMany({
                where: {
                    templateVariable: {
                        id: {
                            in: variablesToUpdate
                                .filter(
                                    (variable) =>
                                        variable.type !== "BANNER" &&
                                        variable.id,
                                )
                                .map((variable) => variable.id!),
                        },
                    },
                },
            }),
            ...variablesIdsToDelete.map((id) =>
                prisma.templateVariable.delete({
                    where: {
                        id,
                    },
                }),
            ),
        ],
        { isolationLevel: "Serializable" },
    );

    return createTemplateDTO(template);
};
