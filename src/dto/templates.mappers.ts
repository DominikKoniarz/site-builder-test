import type { DbFetchedTemplateWithVariables } from "@/types/templates";
import type { TemplateDTO, TemplateWithVariablesDTO } from "./templates.dto";
import type { Template } from "@prisma/client";
import { createTemplateVariableDTO } from "./template-variables.mappers";

export const createTemplateDTO = (template: Template): TemplateDTO => {
    return {
        id: template.id,
        name: template.name,
        description: template.description,
        order: template.order,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
    };
};

export const createTemplateWithVariablesDTO = (
    template: DbFetchedTemplateWithVariables,
): TemplateWithVariablesDTO => {
    return {
        ...createTemplateDTO(template),
        variables: template.variables.map((variable) =>
            createTemplateVariableDTO(variable),
        ),
    };
};
