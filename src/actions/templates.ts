"use server";

import { actionClient } from "@/lib/safe-action";
import { templateAddSchema } from "@/schema/templates/template-add-schema";

export const createTemplate = actionClient
    .schema(templateAddSchema)
    .action(async ({ parsedInput }) => {
        // do something
        console.log(parsedInput);
        return { success: true };
    });
