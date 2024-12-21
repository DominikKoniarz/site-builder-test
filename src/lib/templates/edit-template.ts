import "server-only";

import type { TemplateEditSchema } from "@/schema/templates/template-edit-schema";
import {
    getTemplateByIdWithVariables,
    updateTemplate,
} from "@/data-access/templates";
import { BadRequestError } from "@/types/errors";
import {
    getAllPagesIds,
    updatePagesAfterTemplateUpdate,
} from "@/data-access/pages";

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

    const updatedTemplate = await updateTemplate(
        data,
        variablesIdsToDelete,
        variablesToAdd,
        variablesToUpdate,
    );

    const foundPagesIds = await getAllPagesIds(updatedTemplate.id);

    const varsToAddOnPages = updatedTemplate.variables.filter(
        (variable) =>
            // all variables that are in updated template but not in old template
            !foundTemplate.variables.find((v) => v.id === variable.id),
    );

    const varsToDeleteOnPages = foundTemplate.variables.filter(
        (variable) =>
            // all variables that are in old template but not in updated template
            !updatedTemplate.variables.find((v) => v.id === variable.id),
    );

    console.log(foundTemplate);
    console.log(updatedTemplate);

    // await updatePagesAfterTemplateUpdate(
    //     varsToAddOnPages,
    //     varsToDeleteOnPages,
    //     foundPagesIds,
    // );

    // after that remove pages files if needed

    return updatedTemplate;
};
