import "server-only";

import type { PageEditSchema } from "@/schema/pages/page-edit-schema";
import { getPageById, updatePage } from "@/data-access/pages";
import { BadRequestError } from "@/types/errors";

// const queue = new Queue("process-images");

export const editPage = async (data: PageEditSchema) => {
    const foundPage = await getPageById(data.id);

    if (!foundPage) throw new BadRequestError("Page not found");

    // for now updating only textVariables
    await updatePage(data);

    // after(() => {
    //     data.variables.forEach((variable) => {
    //         if (variable.type === "BANNER") {
    //             variable.images.forEach((image) => {
    //                 if (image.type === "new") {
    //                     queue.addTask(() => {
    //                         console.log("Processing image", image);
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // });

    return foundPage;
};
