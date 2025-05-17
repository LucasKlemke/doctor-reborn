import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    matcher: ['/((?!_next|favicon.ico).*)'],
};

export default nextConfig;
