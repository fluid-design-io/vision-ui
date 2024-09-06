import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config";

import {
  remarkDocGen,
  fileGenerator,
  typescriptGenerator,
} from "fumadocs-docgen";
import { rehypeCode } from "fumadocs-core/mdx-plugins";
import { z } from "zod";
``;

export const { docs, meta } = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      preview: z.string().optional(),
      index: z.boolean().default(false),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    rehypePlugins: [[rehypeCode]],
    remarkPlugins: [
      [remarkDocGen, { generators: [typescriptGenerator(), fileGenerator()] }],
    ],
  },
});
