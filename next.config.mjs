/** @type {import('next').NextConfig} */
const extraAllowedDevOrigins =
  typeof process.env.NEXT_DEV_ALLOWED_HOSTS === 'string'
    ? process.env.NEXT_DEV_ALLOWED_HOSTS.split(/[\s,]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : []

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  /**
   * Hostnames (no scheme/port) allowed to load dev internals (`/_next/*`, HMR) from this machine.
   * Must match the LAN IP you open in the phone browser (DHCP can change it — update or set NEXT_DEV_ALLOWED_HOSTS).
   */
  allowedDevOrigins: [
    '192.168.3.138', // Wi‑Fi (verified ipconfig on this machine)
    '192.168.1.250', // Ethernet
    ...extraAllowedDevOrigins,
  ],
}

export default nextConfig
