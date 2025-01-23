import "server-only";

import type { _Object } from "@aws-sdk/client-s3";
import { TMP_IMAGE_LIFE_TIME_MS } from "@/constants/images";
import {
    getAllTmpImages,
    removeMultipleTmpImagesFromDb,
} from "@/data-access/tmp-images";
import { listObjectsByPrefix, removeMultipleTmpImages } from "../r2/files";
import { generateTmpImageKey, TMP_DIR_PREFIX } from ".";
import { CronJob } from "cron";
import { env } from "@/env";

const safetyCronWrapper = async (fn: () => Promise<void>) => {
    try {
        await fn();
    } catch (error) {
        console.error(
            "Error in cron job:",
            error instanceof Error ? error.stack : error,
        );
    }
};

export const handleTmpImagesCron = async () => {
    const [images, objects] = await Promise.allSettled([
        getAllTmpImages(),
        listObjectsByPrefix(TMP_DIR_PREFIX),
    ]);

    if (images.status === "rejected") {
        console.error("Error fetching temporary images:", images.reason);
        return;
    }

    if (objects.status === "rejected") {
        console.error("Error listing objects by prefix:", objects.reason);
        return;
    }

    const outdatedImages = images.value.filter((image) => {
        const now = new Date();
        const diff = now.getTime() - image.createdAt.getTime();

        return diff > TMP_IMAGE_LIFE_TIME_MS;
    });

    const imagesNotFoundInDb: _Object[] =
        objects.value.Contents?.filter((object) => {
            return !images.value.some((image) => {
                const key = generateTmpImageKey(image.id, image.imageName);
                return key === object.Key;
            });
        }) ?? [];

    const tmpImagesKeysToRemove: string[] = [];
    const tmpImagesIdsToRemove: string[] = [];

    outdatedImages.forEach((image) => {
        const key = generateTmpImageKey(image.id, image.imageName);

        tmpImagesKeysToRemove.push(key);
        tmpImagesIdsToRemove.push(image.id);
    });

    imagesNotFoundInDb.forEach((object) => {
        if (object.Key) {
            const id = object.Key.split("/")[1];

            tmpImagesKeysToRemove.push(object.Key);
            tmpImagesIdsToRemove.push(id);
        }
    });

    if (tmpImagesKeysToRemove.length > 0 && tmpImagesIdsToRemove.length > 0) {
        await Promise.allSettled([
            removeMultipleTmpImages(tmpImagesKeysToRemove),
            removeMultipleTmpImagesFromDb(tmpImagesIdsToRemove),
        ]);
    }
};

// const everyMinute = "* * * * *";
const everyHour = "0 * * * *";
const everyDay = "0 0 * * *";

export const tmpImagesCron = new CronJob(
    env.NEXT_PUBLIC_IS_PROD ? everyDay : everyHour,
    () => safetyCronWrapper(handleTmpImagesCron),
);
