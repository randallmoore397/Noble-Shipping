/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      }
    ],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    return config
  },
  async headers() {
    return [
      {
        source: '/Scripts/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript'
          }
        ]
      }
    ]
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  outputFileTracingRoot: __dirname
}

module.exports = nextConfig