import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // standalone output bundles only what's needed - required for the Docker build
  output: 'standalone',
};

export default nextConfig;
