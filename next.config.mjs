/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
  },
  // transpilePackages: ["@react-pdf/renderer"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.getyourcollege.com",
        port: "",
        pathname: "/*/**",
      },
    ],
  },
};

export default nextConfig;
