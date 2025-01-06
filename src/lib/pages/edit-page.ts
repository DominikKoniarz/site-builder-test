import "server-only";

import type { PageEditSchema } from "@/schema/pages/page-edit-schema";
import { getPageById, updatePage } from "@/data-access/pages";
import { BadRequestError } from "@/types/errors";
import { after } from "next/server";
import { scheduleNewBannerImagesProcessing } from "./banner-images";

export const editPage = async (data: PageEditSchema) => {
    const foundPage = await getPageById(data.id);

    if (!foundPage) throw new BadRequestError("Page not found");

    // for now updating only textVariables
    // maybe should rethink using ids of subvariables instead of main variables records!!!!!!!
    await updatePage(data);

    // after(scheduleNewBannerImagesProcessing(data));
    const queue = scheduleNewBannerImagesProcessing(data);

    after(() => queue.start());

    return foundPage;
};
