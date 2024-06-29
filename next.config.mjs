/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', "fastly.picsum.photos", "picsum.photos"]
    },
    reactStrictMode: true,
    swcMinify: true,
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL
    }
};

export default nextConfig;
