import { z } from "zod";
import {
    templateEditBannerVariableSchema,
    templateEditTextVariableSchema,
} from "./template-variables-schemas";
import { templateBaseSchema } from "./template-add-schema";

export const templateEditSchema = templateBaseSchema.extend({
    id: z.string().uuid({ message: "Invalid template id" }),
    variables: z.array(
        z.discriminatedUnion("type", [
            templateEditTextVariableSchema,
            templateEditBannerVariableSchema,
        ]),
    ),
});

export type TemplateEditTextVariableSchema = z.infer<
    typeof templateEditTextVariableSchema
>;
export type TemplateEditBannerVariableSchema = z.infer<
    typeof templateEditBannerVariableSchema
>;

export type TemplateEditSchema = z.infer<typeof templateEditSchema>;
