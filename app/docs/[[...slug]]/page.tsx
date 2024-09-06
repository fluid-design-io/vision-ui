import { getPage, getPages } from "@/app/source";
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
  DocsCategory,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultComponents from "fumadocs-ui/mdx";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import { Metadata } from "next";
import { ComponentWrapper } from "@/components/component-wrapper";
import { getGithubLastEdit } from "fumadocs-core/server";

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const page = getPage(params.slug);

  if (!page) notFound();

  const time = await getGithubLastEdit({
    owner: "fluid-design-io",
    repo: "vision-ui",
    path: `content/docs/${page.file.path}`,
  });

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
      }}
      lastUpdate={time ? new Date(time) : undefined}
      editOnGithub={{
        owner: "fluid-design-io",
        repo: "vision-ui",
        sha: "main",
        path: `content/docs/${page.file.path}`,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultComponents,
            AutoTypeTable,
            ComponentWrapper,
            Tab,
            Tabs,
          }}
        />
        {page.data.index ? (
          <DocsCategory page={page} pages={getPages()} />
        ) : null}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = getPage(params.slug);

  if (page == null) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}
