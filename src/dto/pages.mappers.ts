import type { Page } from "@prisma/client";
import type { PageDTO, PageWithVariablesDTO } from "./pages.dto";
import type { DbFetchedPageWithVariables } from "@/types/pages";
import { createPageVariableDTO } from "./variables.mappers";

export const createPageDTO = (page: Page): PageDTO => {
    return {
        id: page.id,
        state: page.state,
        name: page.name,
        description: page.description,
        slug: page.slug,
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
    };
};

export const createPageWithVariablesDTO = (
    page: DbFetchedPageWithVariables,
): PageWithVariablesDTO => {
    return {
        id: page.id,
        state: page.state,
        name: page.name,
        description: page.description,
        slug: page.slug,
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
        variables: page.variables.map((variable, index) =>
            createPageVariableDTO(variable, index),
        ),
    };
};
