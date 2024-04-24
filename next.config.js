/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_HOST: 'localhost:3000',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jsmonkey.netlify.app',
        pathname: '**',
      },
    ],
  }
}

module.exports = nextConfig
