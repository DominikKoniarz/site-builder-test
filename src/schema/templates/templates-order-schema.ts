import { z } from "zod";

export const templatesOrderSchema = z.object({
    templatesIds: z
        .array(
            z
                .string({
                    invalid_type_error: "Template id has to be a string",
                })
                .uuid({
                    message: "Template id has to be a valid UUID",
                }),
            { required_error: "Templates ids are required" },
        )
        .min(1, { message: "Templates ids are required!" }),
});

export type TemplatesOrderSchema = z.infer<typeof templatesOrderSchema>;
