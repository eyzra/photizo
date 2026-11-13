/**
 * Static export so the site can be hosted on GitHub Pages (or any static host).
 *
 * If the site lives at a sub-path such as https://eyzra.github.io/photizo,
 * build with NEXT_PUBLIC_BASE_PATH=/photizo. For a custom domain, leave it empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
