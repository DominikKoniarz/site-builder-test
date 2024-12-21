import "server-only";

import type { PageAddSchema } from "@/schema/pages/page-add-schema";
import { addPage, getPageByName, getPageBySlug } from "@/data-access/pages";
import { BadRequestError, ForbiddenError } from "@/types/errors";
import { getTemplateByIdWithVariables } from "@/data-access/templates";

export const createPage = async (data: PageAddSchema) => {
    const [foundPageByName, foundPageBySlug] = await Promise.all([
        getPageByName(data.name),
        getPageBySlug(data.slug),
    ]);

    if (foundPageByName) {
        throw new BadRequestError("Page with this name already exists");
    }

    if (foundPageBySlug) {
        throw new BadRequestError("Page with this slug already exists");
    }

    const foundTemplate = await getTemplateByIdWithVariables(data.templateId);

    if (!foundTemplate) {
        throw new ForbiddenError("Selected template does not exist");
    }

    const page = await addPage(data, foundTemplate);

    return page;
};
