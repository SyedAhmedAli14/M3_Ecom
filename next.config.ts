import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React Strict Mode
  eslint: {
    // Ignore specific ESLint rules during development and builds
    ignoreDuringBuilds: true, // Skip ESLint checks during builds
  },
};

export default nextConfig;