import "server-only";

import type { PageEditSchema } from "@/schema/pages/page-edit-schema";
import { getPageWithVariablesById, updatePage } from "@/data-access/pages";
import { BadRequestError, ForbiddenError } from "@/types/errors";
import { after } from "next/server";
import { scheduleBannerImagesProcessing } from "./banner-images";

export const editPage = async (data: PageEditSchema) => {
    const foundPage = await getPageWithVariablesById(data.id);

    if (!foundPage) throw new BadRequestError("Page not found");

    // protection againt editing processed page
    if (foundPage.state === "PROCESSING")
        throw new ForbiddenError(
            "Page is being processed. Please try again later",
        );

    await updatePage(data);

    const queue = await scheduleBannerImagesProcessing(data, foundPage);

    after(() => queue.start());

    return foundPage;
};
