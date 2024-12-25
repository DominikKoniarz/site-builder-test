"use server";

import { createPage } from "@/lib/pages/create-page";
import { actionClient } from "@/lib/safe-action";
import { pageAddSchema } from "@/schema/pages/page-add-schema";
import { pageEditSchema } from "@/schema/pages/page-edit-schema";
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
        console.log(parsedInput);

        revalidatePath(`/pages`);
        redirect(`/pages/${parsedInput.id}`);
    });
