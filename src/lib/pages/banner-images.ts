import "server-only";

import type { PageEditSchema } from "@/schema/pages/page-edit-schema";
import type { PageEditBannerImageCropDataSchema } from "@/schema/pages/page-variables-schemas";
import type { ChangedBannerImage, RemovedBannerImage } from "@/types/images";
import { Queue } from "../queue";
import {
    getTmpImageById,
    removeTmpImageFromDb,
} from "@/data-access/tmp-images";
import {
    generateBannerImageKey,
    generateTmpImageKey,
    sanitizeCropData,
} from "../images";
import {
    changePageState,
    createBannerImage,
    getBannerImageById,
    getPageBannerVariableConfig,
    removeBannerImagesFromDb,
    updateBannerImageCropData,
    updateBannerImageOrder,
} from "@/data-access/pages";
import { cropAndResizeImage, getMetadata, resizeImage } from "../sharp";
import {
    copyTmpImageToPage,
    removeTmpImage,
    downloadImage,
    uploadCroppedBannerImage,
    removeBannerImages,
} from "../r2/files";
import { v4 as uuidv4 } from "uuid";
import { PageWithVariablesDTO } from "@/dto/pages.dto";

const queue = new Queue("process-new-banner-images");

type ProsessNewBannerImageProps = {
    pageId: string;
    pageVariableId: string;
    bannerVariableId: string;
    tmpImageId: string;
    order: number;
    cropData: PageEditBannerImageCropDataSchema;
};

const processNewBannerImage = async (props: ProsessNewBannerImageProps) => {
    const [foundTmpImage, bannerVariableConfig] = await Promise.all([
        getTmpImageById(props.tmpImageId),
        getPageBannerVariableConfig(props.pageVariableId),
    ]);

    if (!foundTmpImage) {
        console.error("Tmp image not found");
        return;
    }

    if (!bannerVariableConfig) {
        console.error("Banner variable config not found");
        return;
    }

    const key = generateTmpImageKey(foundTmpImage.id, foundTmpImage.imageName);

    const [response, error] = await downloadImage(key);

    if (error) {
        console.error("Error downloading tmp image. No such key", error);
        return;
    }

    const buffer = await response.Body?.transformToByteArray();
    if (!buffer) {
        console.error("Buffer not found");
        return;
    }

    if (props.cropData) {
        const metadata = await getMetadata(buffer);

        if (!metadata.width || !metadata.height) {
            console.error("Image metadata not found");
            return;
        }

        const cropData = sanitizeCropData(
            props.cropData,
            metadata.width,
            metadata.height,
        );

        const croppedBuffer = await cropAndResizeImage(
            buffer,
            cropData,
            bannerVariableConfig.imageWidth,
            bannerVariableConfig.imageHeight,
        );

        const uuid = uuidv4();

        await Promise.all([
            uploadCroppedBannerImage(
                croppedBuffer,
                props.pageId,
                props.pageVariableId,
                uuid,
                foundTmpImage.imageName,
            ),
            copyTmpImageToPage(
                props.pageId,
                props.pageVariableId,
                uuid,
                foundTmpImage.imageName,
                props.tmpImageId,
            ),
        ]);

        await createBannerImage({
            id: uuid,
            imageName: foundTmpImage.imageName,
            order: props.order,
            bannerVariableId: props.bannerVariableId,
            cropData,
        });
    } else {
        // no crop data, just resize
        const croppedBuffer = await resizeImage(
            buffer,
            bannerVariableConfig.imageWidth,
            bannerVariableConfig.imageHeight,
        );

        const uuid = uuidv4();

        await Promise.all([
            uploadCroppedBannerImage(
                croppedBuffer,
                props.pageId,
                props.pageVariableId,
                uuid,
                foundTmpImage.imageName,
            ),
            copyTmpImageToPage(
                props.pageId,
                props.pageVariableId,
                uuid,
                foundTmpImage.imageName,
                props.tmpImageId,
            ),
        ]);

        await createBannerImage({
            id: uuid,
            imageName: foundTmpImage.imageName,
            order: props.order,
            bannerVariableId: props.bannerVariableId,
        });
    }

    await Promise.allSettled([
        await removeTmpImage(props.tmpImageId, foundTmpImage.imageName),
        await removeTmpImageFromDb(props.tmpImageId),
    ]);
};

const deleteUnusedBannerImages = async (
    imagesToRemove: RemovedBannerImage[],
) => {
    if (imagesToRemove.length === 0) return;

    await removeBannerImagesFromDb(imagesToRemove);

    await removeBannerImages(imagesToRemove);
};

const updateExistingBannerImage = async (data: ChangedBannerImage) => {
    const [foundBannerImage, bannerVariableConfig] = await Promise.all([
        getBannerImageById(data.id),
        getPageBannerVariableConfig(data.pageVariableId),
    ]);

    if (!foundBannerImage) {
        console.error("Banner image not found");
        return;
    }

    await updateBannerImageOrder({
        // for now here queued after main update request (adds delay and waiting time, but works)
        id: data.id,
        order: data.order,
    });

    if (!data.isCropDataChanged) return; // if crop data is not changed, no need to process image

    if (!bannerVariableConfig) {
        console.error("Banner variable config not found");
        return;
    }

    const originalImageKey = generateBannerImageKey(
        data.pageId,
        data.pageVariableId,
        data.id,
        "original",
        data.imageName,
    );

    const [response, error] = await downloadImage(originalImageKey);

    if (error) {
        console.error("Error downloading original image. No such key", error);
        return;
    }

    const buffer = await response.Body?.transformToByteArray();
    if (!buffer) {
        console.error("Buffer not found");
        return;
    }

    if (data.cropData) {
        const metadata = await getMetadata(buffer);

        if (!metadata.width || !metadata.height) {
            console.error("Image metadata not found");
            return;
        }

        const cropData = sanitizeCropData(
            data.cropData,
            metadata.width,
            metadata.height,
        );

        const croppedBuffer = await cropAndResizeImage(
            buffer,
            cropData,
            bannerVariableConfig.imageWidth,
            bannerVariableConfig.imageHeight,
        );

        await uploadCroppedBannerImage(
            croppedBuffer,
            data.pageId,
            data.pageVariableId,
            data.id,
            data.imageName,
        );
    } else {
        // no crop data, just resize
        const croppedBuffer = await resizeImage(
            buffer,
            bannerVariableConfig.imageWidth,
            bannerVariableConfig.imageHeight,
        );

        await uploadCroppedBannerImage(
            croppedBuffer,
            data.pageId,
            data.pageVariableId,
            data.id,
            data.imageName,
        );
    }

    await updateBannerImageCropData({
        id: data.id,
        cropData: data.cropData,
    });
};

export const scheduleBannerImagesProcessing = async (
    data: PageEditSchema,
    currentPageData: PageWithVariablesDTO,
) => {
    const newImagesToProcess: ProsessNewBannerImageProps[] = [];

    // new images
    data.variables.forEach((variable) => {
        if (variable.type === "BANNER") {
            variable.images.forEach((image, index) => {
                if (image.type === "new") {
                    newImagesToProcess.push({
                        pageId: data.id,
                        pageVariableId: variable.id,
                        bannerVariableId: variable.bannerVariableId,
                        tmpImageId: image.tmpImageId,
                        order: index,
                        cropData: image.cropData,
                    });
                }
            });
        }
    });

    // queue to process new images
    if (newImagesToProcess.length > 0) {
        newImagesToProcess.forEach((image) => {
            queue.addTask(() => processNewBannerImage(image));
        });
    }

    // banner images to remove
    const imagesToRemove: RemovedBannerImage[] = [];

    currentPageData.variables.forEach((variable) => {
        if (variable.type === "BANNER") {
            variable.images.forEach((image) => {
                const foundVar = data.variables.find(
                    (v) => v.id === variable.id,
                );
                if (!foundVar || foundVar.type !== "BANNER") return;

                const found = foundVar.images.find(
                    (i) => i.type === "existing" && i.id === image.id,
                );

                if (!found) {
                    imagesToRemove.push({
                        id: image.id,
                        pageId: data.id,
                        pageVariableId: variable.id,
                        imageName: image.imageName,
                    });
                }
            });
        }
    });

    // queue to remove unused images
    if (imagesToRemove.length > 0) {
        queue.addTask(() => deleteUnusedBannerImages(imagesToRemove));
    }

    const changedBannerImages: ChangedBannerImage[] = [];

    data.variables.forEach((variable) => {
        if (variable.type === "BANNER") {
            variable.images.forEach((image, index) => {
                if (image.type === "existing") {
                    const foundVar = currentPageData.variables.find(
                        (v) => v.id === variable.id,
                    );

                    if (!foundVar || foundVar.type !== "BANNER") return;

                    const found = foundVar.images.find(
                        (i) => i.id === image.id,
                    );

                    if (!found) return;

                    let isCropDataChanged: boolean = true;

                    if (
                        (!image.cropData && !found.cropData) ||
                        (image.cropData &&
                            found.cropData &&
                            image.cropData.x === found.cropData.x &&
                            image.cropData.y === found.cropData.y &&
                            image.cropData.width === found.cropData.width &&
                            image.cropData.height === found.cropData.height)
                    ) {
                        isCropDataChanged = false;
                    }

                    changedBannerImages.push({
                        id: image.id,
                        pageId: data.id,
                        pageVariableId: variable.id,
                        bannerVariableId: variable.bannerVariableId,
                        imageName: image.imageName,
                        order: index,
                        isCropDataChanged,
                        cropData: image.cropData,
                    });
                }
            });
        }
    });

    if (changedBannerImages.length > 0) {
        changedBannerImages.forEach((image) => {
            queue.addTask(() => updateExistingBannerImage(image));
        });
    }

    if (queue.getQueueLength() > 0) {
        queue.addTask(async () => {
            await changePageState(data.id, "READY");
        });
    } else {
        await changePageState(data.id, "READY");
    }

    return queue;
};
