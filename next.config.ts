// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      // Uncomment the line below if you also want to allow Unsplash images:
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
