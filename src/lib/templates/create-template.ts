import "server-only";

import { addNewTemplate, getTemplateByName } from "@/data-access/templates";
import { TemplateAddSchema } from "@/schema/templates/template-add-schema";
import { BadRequestError } from "@/types/errors";

export const createTemplate = async (data: TemplateAddSchema) => {
    const foundTemplate = await getTemplateByName(data.name);

    if (foundTemplate) {
        throw new BadRequestError("Template with this name already exists");
    }

    const template = await addNewTemplate(data);

    return template;
};
