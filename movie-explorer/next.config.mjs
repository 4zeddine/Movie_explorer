/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY, // the API key from .env.local
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};

export default nextConfig;
