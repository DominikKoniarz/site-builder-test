import { z } from "zod";

export const generateImageUploadUrlSchema = z.object({
    images: z
        .array(
            z.object({
                name: z
                    .string({
                        invalid_type_error: "Valid image name is required",
                    })
                    .min(1, { message: "Image name is required" })
                    .max(4096, {
                        message:
                            "Image name must be at most 4096 characters long",
                    }),
                // add type here
                size: z
                    .number({
                        invalid_type_error: "Valid image size is required",
                    })
                    .min(1, {
                        message: "Image size is required",
                    }),
            }),
        )
        .min(1, { message: "At least one image is required" }),
});
