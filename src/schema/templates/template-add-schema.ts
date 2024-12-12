import { z } from "zod";
import {
    templateNewBannerVariableSchema,
    templateNewTextVariableSchema,
} from "./template-variables-schemas";

export const templateBaseSchema = z.object({
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
});

export const templateAddSchema = templateBaseSchema.extend({
    variables: z.array(
        z.discriminatedUnion("type", [
            templateNewTextVariableSchema,
            templateNewBannerVariableSchema,
        ]),
    ),
});

export type TemplateAddSchema = z.infer<typeof templateAddSchema>;
