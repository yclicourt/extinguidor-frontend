import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        port: "4000",
        hostname: "localhost",
        pathname: '/api/v1/uploads/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",// aumentamos el limite del body
    },
  },
};

export default nextConfig;
