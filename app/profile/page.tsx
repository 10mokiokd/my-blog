import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { compilePage, getPageSource } from "@/lib/mdx";

export async function generateMetadata(): Promise<Metadata> {
    try {
        const { data } = getPageSource("profile");
        const description =
            typeof data.description === "string"
                ? data.description
                : typeof data.summary === "string"
                ? data.summary
                : undefined;

        return {
            title: data.title ?? "Profile",
            description,
        };
    } catch {
        return {
            title: "Profile",
        };
    }
}

export default async function ProfilePage() {
    try {
        const page = await compilePage("profile");
        return (
            <ArticleLayout frontmatter={page.frontmatter}>
                {page.mdxContent}
            </ArticleLayout>
        );
    } catch {
        notFound();
    }
}
