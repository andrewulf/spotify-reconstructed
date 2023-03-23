/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["mosaic.scdn.co", "seed-mix-image.spotifycdn.com", "i.scdn.co"],
  },
};

module.exports = nextConfig;
