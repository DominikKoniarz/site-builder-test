import "server-only";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { R2 } from ".";
import { env } from "@/env";

export const getTmpImageSignedUrl = (key: string) => {
    return getSignedUrl(
        R2,
        new PutObjectCommand({
            Bucket: env.R2_BUCKET_NAME,
            Key: key,
        }),
        { expiresIn: 60 * 5 }, // 5 minutes
    );
};
