import "server-only";

import type { RemovedBannerImage } from "@/types/images";
import {
    CopyObjectCommand,
    DeleteObjectCommand,
    DeleteObjectsCommand,
    GetObjectCommand,
    GetObjectCommandOutput,
    ListObjectsV2Command,
    NoSuchKey,
    PutObjectCommand,
    waitUntilObjectExists,
    waitUntilObjectNotExists,
} from "@aws-sdk/client-s3";
import { R2 } from ".";
import {
    generateBannerImageKey,
    generateTmpImageKey,
    getMimeFromName,
} from "../images";
import { env } from "@/env";

type DownloadImageReturn = [GetObjectCommandOutput, null] | [null, NoSuchKey];

export const downloadImage = async (
    key: string,
): Promise<DownloadImageReturn> => {
    try {
        const response = await R2.send(
            new GetObjectCommand({
                Bucket: env.R2_BUCKET_NAME,
                Key: key,
            }),
        );

        return [response, null];
    } catch (error) {
        if (error instanceof NoSuchKey) {
            return [null, error];
        }

        throw error;
    }
};

export const uploadCroppedBannerImage = (
    buffer: Buffer,
    pageId: string,
    pageVariableId: string,
    imageId: string,
    imageName: string,
) => {
    const key = generateBannerImageKey(
        pageId,
        pageVariableId,
        imageId,
        "crop",
        imageName,
    );
    const mimeType = getMimeFromName(imageName);

    return R2.send(
        new PutObjectCommand({
            Bucket: env.R2_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: mimeType,
        }),
    );
};

export const copyTmpImageToPage = async (
    pageId: string,
    pageVariableId: string,
    imageId: string,
    imageName: string,
    tmpImageId: string,
) => {
    const key = generateBannerImageKey(
        pageId,
        pageVariableId,
        imageId,
        "original",
        imageName,
    );

    await R2.send(
        new CopyObjectCommand({
            Bucket: env.R2_BUCKET_NAME,
            CopySource: `${env.R2_BUCKET_NAME}/${generateTmpImageKey(
                tmpImageId,
                imageName,
            )}`,
            Key: key,
        }),
    );

    await waitUntilObjectExists(
        { client: R2, maxWaitTime: 15 },
        {
            Bucket: env.R2_BUCKET_NAME,
            Key: key,
        },
    );
};

export const removeTmpImage = async (
    tmpImageId: string,
    tmpImageName: string,
) => {
    await R2.send(
        new DeleteObjectCommand({
            Bucket: env.R2_BUCKET_NAME,
            Key: generateTmpImageKey(tmpImageId, tmpImageName),
        }),
    );

    await waitUntilObjectNotExists(
        { client: R2, maxWaitTime: 15 },
        {
            Bucket: env.R2_BUCKET_NAME,
            Key: generateTmpImageKey(tmpImageId, tmpImageName),
        },
    );
};

export const removeMultipleTmpImages = async (keys: string[]) => {
    if (keys.length === 0) throw new Error("No images keys to remove");

    await R2.send(
        new DeleteObjectsCommand({
            Bucket: env.R2_BUCKET_NAME,
            Delete: {
                Objects: keys.map((Key) => ({ Key })),
            },
        }),
    );

    await Promise.allSettled(
        keys.map((key) =>
            waitUntilObjectNotExists(
                { client: R2, maxWaitTime: 10, minDelay: 0.5 },
                {
                    Bucket: env.R2_BUCKET_NAME,
                    Key: key,
                },
            ),
        ),
    );
};

export const removeBannerImages = async (images: RemovedBannerImage[]) => {
    if (images.length === 0) throw new Error("No images to remove");

    const keys: { Key: string }[] = images.flatMap((image) => [
        {
            Key: generateBannerImageKey(
                image.pageId,
                image.pageVariableId,
                image.id,
                "crop",
                image.imageName,
            ),
        },
        {
            Key: generateBannerImageKey(
                image.pageId,
                image.pageVariableId,
                image.id,
                "original",
                image.imageName,
            ),
        },
    ]);

    await R2.send(
        new DeleteObjectsCommand({
            Bucket: env.R2_BUCKET_NAME,
            Delete: {
                Objects: keys,
            },
        }),
    );

    await Promise.allSettled(
        keys.map((key) =>
            waitUntilObjectNotExists(
                { client: R2, maxWaitTime: 5, minDelay: 0.5 },
                {
                    Bucket: env.R2_BUCKET_NAME,
                    Key: key.Key,
                },
            ),
        ),
    );
};

export const listObjectsByPrefix = async (prefix: string) => {
    const response = await R2.send(
        new ListObjectsV2Command({
            Bucket: env.R2_BUCKET_NAME,
            Prefix: prefix,
        }),
    );

    return response;
};
