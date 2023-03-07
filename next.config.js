/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["randomuser.me", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
