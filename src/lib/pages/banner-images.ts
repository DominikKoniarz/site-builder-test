import "server-only";

import type { PageEditSchema } from "@/schema/pages/page-edit-schema";
import type { PageEditBannerImageCropDataSchema } from "@/schema/pages/page-variables-schemas";
import { Queue } from "../queue";
import {
    getTmpImageById,
    removeTmpImageFromDb,
} from "@/data-access/tmp-images";
import { revalidatePath } from "next/cache";
import { sanitizeCropData } from "../images";
import {
    changePageState,
    createBannerImage,
    getPageBannerVariableConfig,
} from "@/data-access/pages";
import { cropAndResizeImage, getMetadata, resizeImage } from "../sharp";
import {
    copyTmpImageToPage,
    removeTmpImage,
    downloadTmpImage,
    uploadCroppedBannerImage,
} from "../r2/files";
import { v4 as uuidv4 } from "uuid";

const queue = new Queue("process-new-banner-images");

type ProsessNewBannerImageProps = {
    pageId: string;
    pageVariableId: string;
    bannerVariableId: string;
    tmpImageId: string;
    order: number;
    cropData: PageEditBannerImageCropDataSchema;
};

export const processNewBannerImage = async (
    props: ProsessNewBannerImageProps,
) => {
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

    const [response, error] = await downloadTmpImage(
        foundTmpImage.id,
        foundTmpImage.imageName,
    );

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

    revalidatePath(`/pages/${props.pageId}`);
};

export const scheduleBannerImagesProcessing = (data: PageEditSchema) => {
    // new images
    data.variables.forEach((variable) => {
        if (variable.type === "BANNER") {
            variable.images.forEach((image) => {
                if (image.type === "new") {
                    queue.addTask(() =>
                        processNewBannerImage({
                            pageId: data.id,
                            pageVariableId: variable.id,
                            bannerVariableId: variable.bannerVariableId,
                            tmpImageId: image.tmpImageId,
                            order: image.order,
                            cropData: image.cropData,
                        }),
                    );
                }
            });
        }
    });

    queue.addTask(async () => {
        await changePageState(data.id, "READY");
        revalidatePath(`/pages/${data.id}`);
    });

    return queue;
};
