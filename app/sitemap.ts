import fs from "node:fs";
import type { MetadataRoute } from "next";

import { getAllPagesMeta, getAllPostsMeta } from "@/lib/mdx";

const FALLBACK_URL = "https://my-blog.com";

function resolveBaseUrl() {
    const target = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_URL;
    return target.endsWith("/") ? target.slice(0, -1) : target;
}

function resolveLastModified(
    candidate: string | undefined,
    fallback: Date = new Date(),
) {
    if (typeof candidate === "string") {
        const parsed = new Date(candidate);
        if (!Number.isNaN(parsed.getTime())) {
            return parsed;
        }
    }
    return fallback;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = resolveBaseUrl();
    const posts = getAllPostsMeta();
    const pages = getAllPagesMeta();

    const pageEntries: MetadataRoute.Sitemap = pages
        .filter((page) => page.slug !== "index")
        .map((page) => {
            const fallbackStat = fs.statSync(page.filePath);
            return {
                url: `${baseUrl}/${page.slug}`,
                lastModified: resolveLastModified(
                    page.frontmatter.updated ?? page.frontmatter.date,
                    fallbackStat.mtime,
                ),
            };
        });

    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: resolveLastModified(
            post.frontmatter.updated ?? post.frontmatter.date,
        ),
    }));

    const latestTimestamp = [...pageEntries, ...postEntries].reduce(
        (acc, entry) => Math.max(acc, entry.lastModified.getTime()),
        0,
    );

    const staticEntries: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: latestTimestamp ? new Date(latestTimestamp) : new Date(),
        },
    ];

    return [...staticEntries, ...pageEntries, ...postEntries];
}
