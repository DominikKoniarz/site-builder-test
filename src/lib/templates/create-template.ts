import { addNewTemplate } from "@/data-access/templates";
import { TemplateAddSchema } from "@/schema/templates/template-add-schema";
import "server-only";

export const createTemplate = async (data: TemplateAddSchema) => {
    const template = await addNewTemplate(data);

    return template;
};
