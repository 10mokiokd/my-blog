import { notFound } from "next/navigation";
import ArticleLayout from "@/components/ArticleLayout";
import { compilePost, getAllPostSlugs, getPostSource } from "@/lib/mdx";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const { data } = getPostSource(params.slug);
    const description =
      typeof data.description === "string"
        ? data.description
        : typeof data.summary === "string"
        ? data.summary
        : undefined;
    return {
      title: data.title,
      description,
    };
  } catch {
    return {};
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const post = await compilePost(params.slug);

    return (
      <ArticleLayout frontmatter={post.frontmatter}>
        {post.mdxContent}
      </ArticleLayout>
    );
  } catch (error) {
    notFound();
  }
}
