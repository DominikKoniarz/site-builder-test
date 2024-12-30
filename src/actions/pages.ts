"use server";

import { createPage } from "@/lib/pages/create-page";
import { editPage } from "@/lib/pages/edit-page";
import { actionClient } from "@/lib/safe-action";
import { pageAddSchema } from "@/schema/pages/page-add-schema";
import { pageEditSchema } from "@/schema/pages/page-edit-schema";
import { generateImageUploadUrlSchema } from "@/schema/pages/page-images-schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addPageAction = actionClient
    .schema(pageAddSchema)
    .action(async ({ parsedInput }) => {
        const page = await createPage(parsedInput);

        revalidatePath(`/pages`);
        redirect(`/pages/${page.id}`);
    });

export const editPageAction = actionClient
    .schema(pageEditSchema)
    .action(async ({ parsedInput }) => {
        const page = await editPage(parsedInput);

        revalidatePath(`/pages`);
        revalidatePath(`/pages/${page.id}`);
    });

export const generateImagesUploadUrl = actionClient
    .schema(generateImageUploadUrlSchema)
    .action(async ({ parsedInput }) => {
        console.log(parsedInput);
        return { url: "https://example.com" };
    });
