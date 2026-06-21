import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/dat-hue",
  images: { unoptimized: true },
};

export default nextConfig;
