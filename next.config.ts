import type { NextConfig } from "next";
import { env } from "@/env";

const WITH_DOCKER = process.env.WITH_DOCKER === "true";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: env.NEXT_PUBLIC_R2_BUCKET_HOSTNAME,
                // port: "",
                // search: "",
                // pathname: "",
            },
        ],
    },
    output: WITH_DOCKER ? "standalone" : undefined,
};

export default nextConfig;
