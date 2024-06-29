/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', "fastly.picsum.photos", "picsum.photos"]
    },
    reactStrictMode: true,
    swcMinify: true,
};

export default nextConfig;
