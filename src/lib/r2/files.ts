import "server-only";

import {
    GetObjectCommand,
    GetObjectCommandOutput,
    NoSuchKey,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import { R2 } from ".";
import { generateTmpImageKey, getMimeFromName } from "../images";
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

export const uploadTmpImage = (buffer: Buffer, imageName: string) => {
    const mimeType = getMimeFromName(imageName);

    return R2.send(
        new PutObjectCommand({
            Bucket: env.R2_BUCKET_NAME,
            // for testing purposes, we add a random number to the key
            Key: `test/${Math.floor(Math.random() * 100000)}/${imageName}`,
            Body: buffer,
            ContentType: mimeType,
        }),
    );
};
