import { z } from "zod";
import { pageBaseSchema } from "./page.base.schema";
import { VariableType } from "@prisma/client";

const variableBaseSchema = z.object({
    id: z
        .string({ invalid_type_error: "Valid var id is required" })
        .uuid({ message: "Valid var id is required" }),
});

const textVariableSchema = variableBaseSchema.extend({
    value: z.preprocess(
        (arg) =>
            typeof arg === "string" ? (arg.length > 0 ? arg : null) : arg,
        z
            .string({ invalid_type_error: "Valid var value is required" })
            .min(1, { message: "Variable value is required" })
            .max(65535, {
                message: "Variable value must be at most 65535 characters long",
            })
            .nullable(),
    ),
    type: z.literal(VariableType.TEXT, {
        message: "Invalid variable type",
    }),
});

const bannerImageSchema = z.object({
    id: z
        .string({ invalid_type_error: "Valid image id is required" })
        .uuid({ message: "Valid image id is required" })
        .nullable(), // null if new image,
    imageName: z
        .string({ invalid_type_error: "Valid image name is required" })
        .min(1, {
            message: "Image name is required",
        })
        .max(4096, {
            message: "Image name must be at most 4096 characters long",
        }),
    order: z
        .number({ message: "Image order must be a type of number" })
        .int({ message: "Image order must be an integer" }),
});

const bannerVariableSchema = variableBaseSchema.extend({
    type: z.literal(VariableType.BANNER, {
        message: "Invalid variable type",
    }),
    images: z.array(bannerImageSchema),
});

export const pageEditSchema = pageBaseSchema.extend({
    id: z.string({ invalid_type_error: "Valid pageId is required" }).uuid({
        message: "Valid pageId is required",
    }),
    variables: z.array(z.union([textVariableSchema, bannerVariableSchema])),
});

export type PageEditSchema = z.infer<typeof pageEditSchema>;
export type PageEditTextVariableSchema = z.infer<typeof textVariableSchema>;
export type PageEditBannerVariableSchema = z.infer<typeof bannerVariableSchema>;
