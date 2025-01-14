import { type GenerateImageUploadUrlSchema } from "@/schema/pages/page-images-schemas";
import {
    type PageEditBannerImageNewSchema,
    type PageEditBannerImageLoadingSchema,
} from "@/schema/pages/page-variables-schemas";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_UPLOAD_SIZE } from "@/constants/images";
import { generateImageUploadUrlAction } from "@/actions/pages";
import { useAction } from "next-safe-action/hooks";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import usePageForm from "./use-page-form";
import { nanoid } from "nanoid";
import { actionError } from "@/lib/action-error";
import toast from "react-hot-toast";

const usePageBannerVariableDropzone = (index: number) => {
    const form = usePageForm();

    const { executeAsync } = useAction(generateImageUploadUrlAction);

    const removeImageAfterUploadError = useCallback(
        (frontendId: string) => {
            form.setValue(`variables.${index}.images`, [
                ...form
                    .getValues(`variables.${index}.images`)
                    .filter((image) => image.frontendId !== frontendId),
            ]);
        },
        [form, index],
    );

    const uploadImage = useCallback(
        async (file: File) => {
            const bannerVariable = form.getValues(`variables.${index}`);
            if (bannerVariable.type !== "BANNER") return; // type check

            const images = bannerVariable.images;
            const frontendId = nanoid();

            const highestOrder = Math.max(
                ...images.map((image) => image.order),
            );

            const newImage: PageEditBannerImageLoadingSchema = {
                type: "loading",
                frontendId,
                order: highestOrder + 1,
            };

            const actionData: GenerateImageUploadUrlSchema = {
                image: {
                    frontendId,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                },
            };

            form.setValue(`variables.${index}.images`, [...images, newImage]);

            try {
                const response = await executeAsync(actionData);
                if (!response) return;

                if (response.data) {
                    const { url, tmpImageId } = response.data;

                    fetch(url, {
                        method: "PUT",
                        body: file,
                    })
                        .then(() => {
                            const foundImage = form
                                .getValues(`variables.${index}.images`)
                                .find(
                                    (image) => image.frontendId === frontendId,
                                );

                            if (foundImage) {
                                form.setValue(`variables.${index}.images`, [
                                    ...form
                                        .getValues(`variables.${index}.images`)
                                        .filter(
                                            (image) =>
                                                image.frontendId !== frontendId,
                                        ),
                                    {
                                        type: "new",
                                        imageName: file.name,
                                        frontendId,
                                        order: foundImage.order,
                                        tmpImageId: tmpImageId,
                                        cropData: null,
                                    } satisfies PageEditBannerImageNewSchema,
                                ]);
                            }
                        })
                        .catch((error) => {
                            removeImageAfterUploadError(frontendId);
                            toast.error("Error uploading image", {
                                duration: 5000,
                            });

                            console.error(error);
                        });
                } else {
                    actionError({
                        input: undefined,
                        error: {
                            bindArgsValidationErrors:
                                response.bindArgsValidationErrors,
                            serverError: response.serverError,
                            validationErrors: response.validationErrors,
                        },
                    })
                        .serverError()
                        .validationErrors();
                }
            } catch (error) {
                removeImageAfterUploadError(frontendId);
                toast.error("Error uploading image", { duration: 5000 });

                console.error(error);
            }
        },
        [executeAsync, form, index, removeImageAfterUploadError],
    );

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            await Promise.all(acceptedFiles.map(uploadImage));
        },
        [uploadImage],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ALLOWED_IMAGE_TYPES,
        maxSize: MAX_IMAGE_UPLOAD_SIZE,
    });

    return {
        getRootProps,
        getInputProps,
        isDragActive,
    };
};

export default usePageBannerVariableDropzone;
