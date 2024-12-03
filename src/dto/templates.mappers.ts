import type { DbFetchedTemplateWithVariables } from "@/types/templates";
import type {
    TemplateBannerVariableDTO,
    TemplateDTO,
    TemplateTextVariableDTO,
    TemplateWithVariablesDTO,
} from "./templates.dto";
import { Template } from "@prisma/client";

export const createTemplateDTO = (template: Template): TemplateDTO => {
    return {
        id: template.id,
        name: template.name,
        description: template.description,
    };
};

export const createTemplateVariableDTO = (
    variable: DbFetchedTemplateWithVariables["variables"][number],
): TemplateTextVariableDTO | TemplateBannerVariableDTO => {
    if (variable.type === "TEXT") {
        return {
            id: variable.id,
            name: variable.name,
            tag: variable.tag,
            type: variable.type,
            order: variable.order,
            createdAt: variable.createdAt,
            updatedAt: variable.updatedAt,
        };
    } else {
        return {
            id: variable.id,
            name: variable.name,
            tag: variable.tag,
            type: variable.type,
            order: variable.order,
            createdAt: variable.createdAt,
            updatedAt: variable.updatedAt,
            config: variable.bannerTemplateVariableConfig
                ? {
                      id: variable.bannerTemplateVariableConfig.id,
                      imageWidth:
                          variable.bannerTemplateVariableConfig.imageWidth,
                      imageHeight:
                          variable.bannerTemplateVariableConfig.imageHeight,
                      createdAt:
                          variable.bannerTemplateVariableConfig.createdAt,
                      updatedAt:
                          variable.bannerTemplateVariableConfig.updatedAt,
                  }
                : null,
        };
    }
};

export const createTemplateWithVariablesDTO = (
    template: DbFetchedTemplateWithVariables,
): TemplateWithVariablesDTO => {
    return {
        id: template.id,
        name: template.name,
        description: template.description,
        variables: template.variables.map((variable) =>
            createTemplateVariableDTO(variable),
        ),
    };
};
