import type { MetadataRoute } from "next";

import { getAllPostsMeta } from "@/lib/mdx";

const FALLBACK_URL = "https://my-blog.com";

function resolveBaseUrl() {
    const target = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_URL;
    return target.endsWith("/") ? target.slice(0, -1) : target;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = resolveBaseUrl();
    const posts = getAllPostsMeta();

    const staticEntries: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
        },
    ];

    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.frontmatter.updated ?? post.frontmatter.date),
    }));

    return [...staticEntries, ...postEntries];
}
