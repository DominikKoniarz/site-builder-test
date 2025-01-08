import "server-only";

import {
    CopyObjectCommand,
    DeleteObjectCommand,
    GetObjectCommand,
    GetObjectCommandOutput,
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

type DownloadTmpImageReturn =
    | [GetObjectCommandOutput, null]
    | [null, NoSuchKey];

export const downloadTmpImage = async (
    tmpImageId: string,
    tmpImageName: string,
): Promise<DownloadTmpImageReturn> => {
    try {
        const response = await R2.send(
            new GetObjectCommand({
                Bucket: env.R2_BUCKET_NAME,
                Key: generateTmpImageKey(tmpImageId, tmpImageName),
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
