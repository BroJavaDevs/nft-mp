/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.seadn.io",
      },
      {
        protocol: "https",
        hostname: "i.seadn.io",
      },
    ],
  },
};

module.exports = nextConfig;
