import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qnkoqrtusgtw72oc.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
