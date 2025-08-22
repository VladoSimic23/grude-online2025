import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.grude-online.info",
        pathname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:path",
        destination: "/category/crna-kronika/:path",
      },
      // {
      //   source: "/tag/:slug",
      //   destination: "/category/tag/:slug",
      // },
    ];
  },
};

export default nextConfig;
