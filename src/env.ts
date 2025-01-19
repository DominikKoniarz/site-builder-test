import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    /*
     * Serverside Environment variables, not available on the client.
     * Will throw if you access these variables on the client.
     */
    server: {
        DATABASE_URL: z.string().min(1),
        R2_ENDPOINT: z.string().url(),
        R2_BUCKET_NAME: z.string().min(1),
        R2_ACCESS_KEY_ID: z.string().min(1),
        R2_SECRET_ACCESS_KEY: z.string().min(1),
        INSTANCE_ID: z.string().optional(),
    },
    /*
     * Environment variables available on the client (and server).
     *
     * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
     */
    client: {
        NEXT_PUBLIC_IS_DEV: z.boolean(),
        NEXT_PUBLIC_IS_PROD: z.boolean(),
        NEXT_PUBLIC_R2_BUCKET_HOSTNAME: z.string().min(1),
    },
    /*
     * Due to how Next.js bundles environment variables on Edge and Client,
     * we need to manually destructure them to make sure all are included in bundle.
     *
     * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
     */
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NEXT_PUBLIC_IS_DEV: process.env.NODE_ENV === "development",
        NEXT_PUBLIC_IS_PROD: process.env.NODE_ENV === "production",
        R2_ENDPOINT: process.env.R2_ENDPOINT,
        R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
        R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
        R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
        NEXT_PUBLIC_R2_BUCKET_HOSTNAME:
            process.env.NEXT_PUBLIC_R2_BUCKET_HOSTNAME,
        INSTANCE_ID: process.env.INSTANCE_ID,
    },
});
