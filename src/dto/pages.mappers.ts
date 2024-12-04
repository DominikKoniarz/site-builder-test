import type { Page } from "@prisma/client";
import type { PageDTO, PageWithVariablesDTO } from "./pages.dto";
import type { DbFetchedPageWithVariables } from "@/types/pages";
import { createPageVariableDTO } from "./variables.mappers";

export const createPageDTO = (template: Page): PageDTO => {
    return {
        id: template.id,
        name: template.name,
        description: template.description,
        slug: template.slug,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
    };
};

export const createPageWithVariablesDTO = (
    template: DbFetchedPageWithVariables,
): PageWithVariablesDTO => {
    return {
        id: template.id,
        name: template.name,
        description: template.description,
        slug: template.slug,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
        variables: template.variables.map((variable) =>
            createPageVariableDTO(variable),
        ),
    };
};
