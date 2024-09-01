import createMDX from "fumadocs-mdx/config";
import {
  remarkDocGen,
  fileGenerator,
  typescriptGenerator,
} from "fumadocs-docgen";

const withMDX = createMDX({
  mdxOptions: {
    remarkPlugins: [
      [remarkDocGen, { generators: [typescriptGenerator(), fileGenerator()] }],
    ],
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.unsplash.com",
      },
    ],
  },
  experimental: {},
};

export default withMDX(config);
