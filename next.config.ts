import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out', 
  trailingSlash: true,  // This helps with static hosting 
  experimental: {
    // Enable case insensitive paths but not supported with output: 'export',
    caseSensitiveRoutes: false
  }
};

export default nextConfig;