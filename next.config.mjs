/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['*'], // Allows images from any domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow any hostname over HTTPS

      },
    ],
  },
};

export default nextConfig;