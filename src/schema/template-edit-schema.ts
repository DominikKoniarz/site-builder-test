import { VariableType } from "@prisma/client";
import { z } from "zod";

export const templateTextVariableSchema = z.object({
    id: z.string().uuid({ message: "Invalid variable id" }),
    name: z
        .string()
        .min(1, { message: "Variable name must be at least 1 character long" }),
    tag: z
        .string()
        .min(1, { message: "Variable tag must be at least 1 character long" }),
    type: z.literal(VariableType.TEXT),
    order: z.number().int(),
});

export const templateBannerVariableSchema = z.object({
    id: z.string().uuid({ message: "Invalid variable id" }),
    name: z
        .string()
        .min(1, { message: "Variable name must be at least 1 character long" }),
    tag: z
        .string()
        .min(1, { message: "Variable tag must be at least 1 character long" }),
    type: z.literal(VariableType.BANNER),
    order: z.number().int(),
    imageWidth: z.number().int(),
    imageHeight: z.number().int(),
});

export const templateEditSchema = z.object({
    id: z.string().uuid({ message: "Invalid template id" }),
    name: z
        .string()
        .min(1, { message: "Template name must be at least 1 character long" }),
    description: z
        .string()
        .min(1, {
            message: "Template description must be at least 1 character long",
        })
        .nullable(),
    variables: z.array(
        z.discriminatedUnion("type", [
            templateTextVariableSchema,
            templateBannerVariableSchema,
        ]),
    ),
});

export type TemplateTextVariableSchema = z.infer<
    typeof templateTextVariableSchema
>;
export type TemplateBannerVariableSchema = z.infer<
    typeof templateBannerVariableSchema
>;

export type TemplateEditSchema = z.infer<typeof templateEditSchema>;
