/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Environment variables that will be available at build time
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/token',
  },
}

module.exports = nextConfig
