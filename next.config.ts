
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['retrieve-ibbn.onrender.com'], // Thêm domain ảnh ở đây
  },

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "pino-pretty": false, // chặn module không cần thiết
    };
    return config;
  },
};

export default nextConfig;
