import { z } from "zod";
import {
    templateNewBannerVariableSchema,
    templateNewTextVariableSchema,
} from "./template-variables-schemas";

export const templateBaseSchema = z.object({
    name: z.string().min(1, {
        message: "Template name must be at least 1 character long",
    }),
    description: z
        .string()
        .min(1, {
            message: "Template description must be at least 1 character long",
        })
        .nullable(),
});

export const templateAddSchema = templateBaseSchema.merge(
    z.object({
        variables: z.array(
            z.discriminatedUnion("type", [
                templateNewTextVariableSchema,
                templateNewBannerVariableSchema,
            ]),
        ),
    }),
);

export type TemplateAddSchema = z.infer<typeof templateAddSchema>;
