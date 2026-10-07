/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  experimental: {
    // src/app/global-not-found.tsx → out/404.html, isolated from other routes' CSS
    globalNotFound: true,
  },
};

export default nextConfig;
