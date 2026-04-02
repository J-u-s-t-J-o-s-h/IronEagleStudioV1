/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  /** Allow dev HMR / resources when opening the site from another device on your LAN */
  allowedDevOrigins: ['192.168.3.138'],
}

export default nextConfig
