/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_HOST: 'localhost:3000',
  },
}

module.exports = nextConfig
