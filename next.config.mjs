/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.v0.app',
      },
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },

  output: 'standalone',

  compress: true,

  poweredByHeader: false,
}

export default nextConfig
