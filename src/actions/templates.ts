"use server";

import { actionClient } from "@/lib/safe-action";
import { createTemplate } from "@/lib/templates/create-template";
import { editTemplate } from "@/lib/templates/edit-template";
import { templateAddSchema } from "@/schema/templates/template-add-schema";
import { templateEditSchema } from "@/schema/templates/template-edit-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addTemplateAction = actionClient
    .schema(templateAddSchema)
    .action(async ({ parsedInput }) => {
        const template = await createTemplate(parsedInput);

        revalidatePath(`/templates`);
        redirect(`/templates/${template.id}`);
    });

export const editTemplateAction = actionClient
    .schema(templateEditSchema)
    .action(async ({ parsedInput }) => {
        const template = await editTemplate(parsedInput);

        revalidatePath(`/templates`);
        revalidatePath(`/templates/${template.id}`);
    });
