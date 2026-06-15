import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d34bpsez1zvxwv.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;