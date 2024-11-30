/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ugm-patients-info.s3.eu-north-1.amazonaws.com', // Your S3 bucket domain for images
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
