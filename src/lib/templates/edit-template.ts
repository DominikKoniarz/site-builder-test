import "server-only";

import type { TemplateEditSchema } from "@/schema/templates/template-edit-schema";
import {
    getTemplateByIdWithVariables,
    updateTemplate,
} from "@/data-access/templates";
import { BadRequestError } from "@/types/errors";
import {
    addVarsToPagesAfterTemplateUpdate,
    getAllPagesIdsByTemplateId,
    deletePagesVarsAfterTemplateUpdate,
} from "@/data-access/pages";
import { revalidatePath } from "next/cache";

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

    const foundPagesIds = await getAllPagesIdsByTemplateId(foundTemplate.id);

    const filesToRemove = await deletePagesVarsAfterTemplateUpdate(
        variablesIdsToDelete,
        foundPagesIds,
    );

    const updatedTemplate = await updateTemplate(
        data,
        variablesIdsToDelete,
        variablesToAdd,
        variablesToUpdate,
    );

    const varsToAddOnPages = updatedTemplate.variables.filter(
        (variable) =>
            // all variables that are in updated template but not in old template
            !foundTemplate.variables.find((v) => v.id === variable.id),
    );

    await addVarsToPagesAfterTemplateUpdate(varsToAddOnPages, foundPagesIds);

    // TODO: after that remove pages files if needed (filesToRemove)
    filesToRemove;

    foundPagesIds.forEach((pageId) => {
        revalidatePath(`/pages/${pageId}`);
    });

    return updatedTemplate;
};
