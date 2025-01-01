import type { NextConfig } from "next";
import { env } from "@/env";

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
};

export default nextConfig;
