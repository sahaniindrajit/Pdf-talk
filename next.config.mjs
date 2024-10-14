/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'avatars.githubusercontent.com', // GitHub avatars
            'lh3.googleusercontent.com'       // Google avatars
        ],
    },
    experimental: {
        runtime: 'nodejs',
    },
};

export default nextConfig;
