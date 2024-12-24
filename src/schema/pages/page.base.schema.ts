import { z } from "zod";

export const pageBaseSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Page name is required",
        })
        .max(255, {
            message: "Page name must be at most 255 characters long",
        }),
    description: z.preprocess(
        (arg) =>
            typeof arg === "string" ? (arg.length > 0 ? arg : null) : arg,
        z
            .string()
            .min(1, {
                message: "Page description must be at least 1 character long",
            })
            // size of TEXT in POSTGRES
            .max(65535, {
                message:
                    "Page description must be at most 65535 characters long",
            })
            .nullable(),
    ),
    slug: z
        .string()
        .min(1, {
            message: "Slug is required",
        })
        .max(255, {
            message: "Slug must be at most 255 characters long",
        }),
});
