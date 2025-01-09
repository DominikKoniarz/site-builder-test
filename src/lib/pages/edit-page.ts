import "server-only";

import type { PageEditSchema } from "@/schema/pages/page-edit-schema";
import { getPageById, updatePage } from "@/data-access/pages";
import { BadRequestError, ForbiddenError } from "@/types/errors";
import { after } from "next/server";
import { scheduleBannerImagesProcessing } from "./banner-images";

export const editPage = async (data: PageEditSchema) => {
    const foundPage = await getPageById(data.id);
    // protection againt editing processed page
    if (!foundPage) throw new BadRequestError("Page not found");

    if (foundPage.state === "PROCESSING")
        throw new ForbiddenError(
            "Page is being processed. Please try again later",
        );

    // for now updating only textVariables
    await updatePage(data);

    const queue = scheduleBannerImagesProcessing(data);

    after(() => queue.start());

    return foundPage;
};
