import { defineDocs, defineConfig } from "fumadocs-mdx/config";

import {
  remarkDocGen,
  fileGenerator,
  typescriptGenerator,
} from "fumadocs-docgen";
import { rehypeCode } from "fumadocs-core/mdx-plugins";

export const { docs, meta } = defineDocs();

export default defineConfig({
  mdxOptions: {
    rehypePlugins: [[rehypeCode]],
    remarkPlugins: [
      [remarkDocGen, { generators: [typescriptGenerator(), fileGenerator()] }],
    ],
  },
});
