"use server";

import { actionClient } from "@/lib/safe-action";
import { createTemplate } from "@/lib/templates/create-template";
import { templateAddSchema } from "@/schema/templates/template-add-schema";
import { redirect } from "next/navigation";

export const addTemplateAction = actionClient
    .schema(templateAddSchema)
    .action(async ({ parsedInput }) => {
        const template = await createTemplate(parsedInput);

        redirect(`/templates/${template.id}`);
    });
