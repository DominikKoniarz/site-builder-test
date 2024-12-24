import { z } from "zod";
import { pageBaseSchema } from "./page.base.schema";

export const pageAddSchema = pageBaseSchema.extend({
    templateId: z
        .string({ invalid_type_error: "Valid template is required" })
        .uuid({
            message: "Please select a valid template",
        }),
});

export type PageAddSchema = z.infer<typeof pageAddSchema>;
