import { generateImagesUploadUrl } from "@/actions/pages";
import { MAX_IMAGE_UPLOAD_SIZE } from "@/constants/images";
import { useAction } from "next-safe-action/hooks";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const usePageBannerVariable = (index: number) => {
    const { execute } = useAction(generateImagesUploadUrl, {
        onSuccess: (data) => {
            console.log(data);
        },
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        execute({
            images: acceptedFiles.map((file) => ({
                name: file.name,
                size: file.size,
            })),
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
            "image/webp": [".webp"],
        },
        maxSize: MAX_IMAGE_UPLOAD_SIZE,
    });

    return {
        getRootProps,
        getInputProps,
        isDragActive,
    };
};

export default usePageBannerVariable;
