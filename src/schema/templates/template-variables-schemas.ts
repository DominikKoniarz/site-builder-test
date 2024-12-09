import { VariableType } from "@prisma/client";
import { z } from "zod";

// More validation here
export const templateNewTextVariableSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Variable name must be at least 1 character long" }),
    tag: z
        .string()
        .min(1, { message: "Variable tag must be at least 1 character long" }),
    type: z.literal(VariableType.TEXT),
    order: z.number().int(),
});

export const templateNewBannerVariableSchema = z.object({
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

export const templateEditTextVariableSchema =
    templateNewTextVariableSchema.merge(
        z.object({
            id: z.string().uuid({ message: "Invalid variable id" }),
        }),
    );

export const templateEditBannerVariableSchema =
    templateNewBannerVariableSchema.merge(
        z.object({
            id: z.string().uuid({ message: "Invalid variable id" }),
        }),
    );
