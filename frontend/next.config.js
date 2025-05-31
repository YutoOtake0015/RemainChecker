/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();

const nextConfig = removeImports({
  reactStrictMode: true,
  transpilePackages: ["@mui/x-data-grid"],
  webpack(config, options) {
    return config;
  },
});

module.exports = nextConfig;
