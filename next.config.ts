import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        dynamicIO: true,
        ppr: true,
    },
};

export default nextConfig;
