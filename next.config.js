/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ctftime.org",
            },
            {
                protocol: "https",
                hostname: "cups.online",
            },
            {
                protocol: "https",
                hostname: "img.icons8.com",
            },
        ],
    },
};

module.exports = nextConfig;