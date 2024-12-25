import "server-only";

import type { PageEditSchema } from "@/schema/pages/page-edit-schema";
import { getPageById, updatePage } from "@/data-access/pages";
import { BadRequestError } from "@/types/errors";

export const editPage = async (data: PageEditSchema) => {
    const foundPage = await getPageById(data.id);

    if (!foundPage) throw new BadRequestError("Page not found");

    // for now updating only textVariables
    await updatePage(data);

    return foundPage;
};
