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
    if (data?.draft) {
      throw new Error("Draft posts are not publicly accessible");
    }
    const description =
      typeof data.description === "string"
        ? data.description
        : typeof data.summary === "string"
        ? data.summary
        : undefined;
    const metadata: Metadata = {
      title: data.title,
      description,
    };
    if (typeof data.thumbnail === "string" && data.thumbnail.trim().length > 0) {
      metadata.openGraph = {
        images: [
          {
            url: data.thumbnail,
            width: 1200,
            height: 630,
          },
        ],
      };
      metadata.twitter = {
        card: "summary_large_image",
        images: [data.thumbnail],
      };
    }
    return metadata;
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
  } catch {
    notFound();
  }
}
