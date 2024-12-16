import "server-only";

import type { TemplateEditSchema } from "@/schema/templates/template-edit-schema";
import {
    getTemplateByIdWithVariables,
    updateTemplate,
} from "@/data-access/templates";
import { BadRequestError } from "@/types/errors";

export const editTemplate = async (data: TemplateEditSchema) => {
    const foundTemplate = await getTemplateByIdWithVariables(data.id);

    if (!foundTemplate) {
        throw new BadRequestError("Template not found");
    }

    const variablesIdsToDelete: string[] = [];

    for (const variable of foundTemplate.variables) {
        if (!data.variables.find((v) => v.id === variable.id)) {
            variablesIdsToDelete.push(variable.id);
        }
    }

    const variablesToAdd: TemplateEditSchema["variables"] =
        data.variables.filter((variable) => !variable.id);

    const variablesToUpdate: TemplateEditSchema["variables"] =
        data.variables.filter((variable) => variable.id);

    const template = await updateTemplate(
        data,
        variablesIdsToDelete,
        variablesToAdd,
        variablesToUpdate,
    );

    return template;
};