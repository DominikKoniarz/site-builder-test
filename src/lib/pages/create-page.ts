import "server-only";

import type { PageAddSchema } from "@/schema/pages/page-add-schema";
import { addPage, getPageByName } from "@/data-access/pages";
import { BadRequestError, ForbiddenError } from "@/types/errors";
import { getTemplateByIdWithVariables } from "@/data-access/templates";

export const createPage = async (data: PageAddSchema) => {
    const foundPage = await getPageByName(data.name);

    if (foundPage) {
        throw new BadRequestError("Page with this name already exists");
    }

    const foundTemplate = await getTemplateByIdWithVariables(data.templateId);

    if (!foundTemplate) {
        throw new ForbiddenError("Selected template does not exist");
    }

    const page = await addPage(data, foundTemplate);

    return page;
};
