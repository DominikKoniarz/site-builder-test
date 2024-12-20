import { z } from "zod";

export const pageAddSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Template name must be at least 1 character long",
        })
        .max(255, {
            message: "Template name must be at most 255 characters long",
        }),
    description: z.preprocess(
        (arg) =>
            typeof arg === "string" ? (arg.length > 0 ? arg : null) : arg,
        z
            .string()
            .min(1, {
                message:
                    "Template description must be at least 1 character long",
            })
            // size of TEXT in POSTGRES
            .max(65535, {
                message:
                    "Template description must be at most 65535 characters long",
            })
            .nullable(),
    ),
    slug: z
        .string()
        .min(1, {
            message: "Slug must be at least 1 character long",
        })
        .max(255, {
            message: "Slug must be at most 255 characters long",
        }),
    templateId: z
        .string({ invalid_type_error: "Template ID must be a string" })
        .uuid({
            message: "Template ID must be a valid UUID",
        }),
});

export type PageAddSchema = z.infer<typeof pageAddSchema>;
