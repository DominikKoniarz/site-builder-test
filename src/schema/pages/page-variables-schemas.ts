import { VariableType } from "@prisma/client";
import { z } from "zod";

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

const bannerImageCropDataSchema = z
    .object({
        x: z.number(),
        y: z.number(),
        width: z.number(),
        height: z.number(),
    })
    .nullable();

const bannerImageBaseSchema = z.object({
    order: z
        .number({ message: "Image order must be a type of number" })
        .int({ message: "Image order must be an integer" }),
});

// before successfull upload of new image
const loadingBannerImageSchema = bannerImageBaseSchema.extend({
    type: z.literal("loading"),
    frontendId: z.string(),
});

const newBannerImageSchema = bannerImageBaseSchema.extend({
    tmpImageId: z
        .string({ invalid_type_error: "Valid tmp image id is required" })
        .uuid({ message: "Valid tmp image id is required" }),
    frontendId: z.string(),
    imageName: z.string(),
    type: z.literal("new"),
    cropData: bannerImageCropDataSchema,
});

const existingBannerImageSchema = bannerImageBaseSchema.extend({
    id: z
        .string({ invalid_type_error: "Valid image id is required" })
        .uuid({ message: "Valid image id is required" }),
    frontendId: z.string(),
    imageName: z
        .string({ invalid_type_error: "Valid image name is required" })
        .min(1, {
            message: "Image name is required",
        })
        .max(4096, {
            message: "Image name must be at most 4096 characters long",
        }),
    type: z.literal("existing"),
    cropData: bannerImageCropDataSchema,
});

const bannerImageSchema = z.union([
    loadingBannerImageSchema,
    newBannerImageSchema,
    existingBannerImageSchema,
]);

const bannerVariableSchema = variableBaseSchema.extend({
    type: z.literal(VariableType.BANNER, {
        message: "Invalid variable type",
    }),
    images: z.array(bannerImageSchema),
});

export { textVariableSchema, bannerVariableSchema };

export type PageEditTextVariableSchema = z.infer<typeof textVariableSchema>;
export type PageEditBannerVariableSchema = z.infer<typeof bannerVariableSchema>;

export type PageEditBannerImageLoadingSchema = z.infer<
    typeof loadingBannerImageSchema
>;
export type PageEditBannerImageExistingSchema = z.infer<
    typeof existingBannerImageSchema
>;
export type PageEditBannerImageNewSchema = z.infer<typeof newBannerImageSchema>;

export type PageEditBannerImageCropDataSchema = z.infer<
    typeof bannerImageCropDataSchema
>;
