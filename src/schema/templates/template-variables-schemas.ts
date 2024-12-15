import { VariableType } from "@prisma/client";
import { z } from "zod";

const templateNewVariableBaseSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Variable name must be at least 1 character long" })
        .max(255, {
            message: "Variable name must be at most 255 characters long",
        }),
    tag: z
        .string()
        .min(1, { message: "Variable tag must be at least 1 character long" })
        .max(255, {
            message: "Variable tag must be at most 255 characters long",
        }),
    order: z
        .number({ message: "Variable order must be a number" })
        .int({ message: "Variable order must be an integer" }),
    // for the sake of frontend (not used in backend)
    // it's used to identify variables (and for sorting)
    frontendId: z.string(),
});

export const templateNewTextVariableSchema =
    templateNewVariableBaseSchema.extend({
        type: z.literal(VariableType.TEXT, {
            message: "Invalid variable type",
        }),
    });

export const templateNewBannerVariableSchema =
    templateNewVariableBaseSchema.extend({
        type: z.literal(VariableType.BANNER, {
            message: "Invalid variable type",
        }),
        imageWidth: z
            .number({
                message: "Image width must be a number",
            })
            .int({
                message: "Image width must be an integer",
            })
            .positive({
                message: "Image width must be a positive number",
            }),
        imageHeight: z
            .number({
                message: "Image height must be a number",
            })
            .int({
                message: "Image height must be an integer",
            })
            .positive({
                message: "Image height must be a positive number",
            }),
    });

export const templateEditTextVariableSchema =
    templateNewTextVariableSchema.extend({
        id: z.string().uuid({ message: "Invalid variable id" }),
    });

export const templateEditBannerVariableSchema =
    templateNewBannerVariableSchema.extend({
        id: z.string().uuid({ message: "Invalid variable id" }),
    });
