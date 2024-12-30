import { env } from "@/env";
import { S3Client } from "@aws-sdk/client-s3";

// client to use Cloudflare R2
export const S3 = new S3Client({
    region: "auto",
    endpoint: env.R2_ENDPOINT,
    credentials: {
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
    bucketEndpoint: false,
});
