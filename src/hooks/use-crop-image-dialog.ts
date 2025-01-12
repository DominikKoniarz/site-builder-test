import type { Crop, PixelCrop } from "react-image-crop";
import { useMemo, useRef, useState } from "react";
import { usePageBannerVarContext } from "@/context/page-banner-var-context";
import usePageForm from "./use-page-form";

const useCropImageDialog = (imageIndex: number) => {
    const { index, dbVariable } = usePageBannerVarContext();
    const form = usePageForm();

    const imgRef = useRef<HTMLImageElement | null>(null);
    const [crop, setCrop] = useState<Crop | undefined>();

    const resetCrop = () => {
        const image = form.getValues(`variables.${index}.images.${imageIndex}`);
        if (image.type === "loading") return;

        form.setValue(`variables.${index}.images.${imageIndex}`, {
            ...image,
            cropData: null,
        });

        setCrop(undefined);
    };

    const onCrop = (data: PixelCrop) => {
        const image = form.getValues(`variables.${index}.images.${imageIndex}`);
        if (image.type === "loading") return;

        // calculate real image size crop data
        const img = imgRef.current;
        if (!img) return;

        const realWidth = img.naturalWidth;
        const realHeight = img.naturalHeight;

        const cropData = {
            x: (data.x / img.width) * realWidth,
            y: (data.y / img.height) * realHeight,
            width: (data.width / img.width) * realWidth,
            height: (data.height / img.height) * realHeight,
        };

        form.setValue(`variables.${index}.images.${imageIndex}`, {
            ...image,
            cropData,
        });

        setCrop(data);
    };

    const aspectRatio: number = useMemo(
        () =>
            dbVariable.config
                ? dbVariable.config.imageWidth / dbVariable.config.imageHeight
                : 1,
        [dbVariable.config],
    );

    const onImgLoad = () => {
        const img = imgRef.current;
        if (!img) return;

        const cropData = form.getValues(
            `variables.${index}.images.${imageIndex}.cropData`,
        );
        if (!cropData || Object.values(cropData).every((v) => !v)) return;

        const realWidth = img.naturalWidth;
        const realHeight = img.naturalHeight;

        setCrop({
            x: (cropData.x / realWidth) * img.width,
            y: (cropData.y / realHeight) * img.height,
            width: (cropData.width / realWidth) * img.width,
            height: (cropData.height / realHeight) * img.height,
            unit: "px",
        });
    };

    return {
        imgRef,
        crop,
        onCrop,
        aspectRatio,
        onImgLoad,
        resetCrop,
    };
};

export default useCropImageDialog;
