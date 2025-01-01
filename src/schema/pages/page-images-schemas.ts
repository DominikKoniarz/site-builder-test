import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_UPLOAD_SIZE } from "@/constants/images";
import { z } from "zod";

export const generateImageUploadUrlSchema = z.object({
    image: z.object({
        frontendId: z
            .string({
                invalid_type_error: "Valid frontendId is required",
            })
            .min(1, { message: "frontendId is required" }),
        name: z
            .string({
                invalid_type_error: "Valid image name is required",
            })
            .min(1, { message: "Image name is required" })
            .max(4096, {
                message: "Image name must be at most 4096 characters long",
            }),
        size: z
            .number({
                invalid_type_error: "Valid image size is required",
            })
            .min(1, {
                message: "Image size is required",
            })
            .max(MAX_IMAGE_UPLOAD_SIZE, {
                message: `Image size must be at most ${MAX_IMAGE_UPLOAD_SIZE / (1024 * 1024)} MB`,
            }),
        // mime type
        type: z
            .string({
                invalid_type_error: "Valid image type is required",
            })
            .min(1, { message: "Image type is required" })
            .refine(
                (arg) => {
                    return Object.keys(ALLOWED_IMAGE_TYPES).includes(arg);
                },
                { message: "Invalid image type" },
            ),
    }),
});

export type GenerateImageUploadUrlSchema = z.infer<
    typeof generateImageUploadUrlSchema
>;
