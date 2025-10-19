// lib/mdx.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { mdxComponents } from "@/components/mdx-components";

export type PostFrontmatter = {
    title: string;
    description?: string;
    summary?: string;
    date: string;          // YYYY-MM-DD
    updated?: string;
    tags?: string[];
    thumbnail?: string;
    draft?: boolean;
};

export type Post = {
    slug: string;
    frontmatter: PostFrontmatter;
    content: string; // raw MDX（必要なら）
};

const POSTS_DIR = path.join(process.cwd(), "contents", "posts");
const EXCERPT_LENGTH = 140;

function stripMarkdown(value: string) {
    return value
        .replace(/```[\s\S]*?```/g, "")
        .replace(/`[^`]*`/g, "")
        .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/&[a-z#0-9]+;/gi, " ")
        .replace(/[#>*_~\-]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function buildExcerpt(frontmatter: PostFrontmatter, content: string) {
    const lead = frontmatter.summary ?? frontmatter.description;
    if (lead) return lead;

    const stripped = stripMarkdown(content);
    if (!stripped) return "";

    return stripped.length > EXCERPT_LENGTH
        ? `${stripped.slice(0, EXCERPT_LENGTH).trim()}…`
        : stripped;
}

export function getAllPostSlugs() {
    if (!fs.existsSync(POSTS_DIR)) return [];
    return fs
        .readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
        .map((f) => f.replace(/\.mdx$/, ""))
        .filter((slug) => {
            const { data } = getPostSource(slug);
            return !data?.draft;
        });
}

export function getPostSource(slug: string) {
    const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
    const file = fs.readFileSync(fullPath, "utf-8");
    return matter(file); // { content, data }
}

export async function compilePost(slug: string) {
    const { content, data } = getPostSource(slug);

    // Frontmatterの最低限バリデーション
    if (data.draft) {
        throw new Error(`Draft post ${slug} is not accessible`);
    }

    if (!data.title || !data.date) {
        throw new Error(`Frontmatter missing in ${slug}.mdx`);
    }

    const mdx = await compileMDX<PostFrontmatter>({
        source: content,
        components: mdxComponents,
        options: {
            parseFrontmatter: false, // gray-matterで取得済み
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                ],
            },
        },
    });

    return {
        slug,
        frontmatter: data as PostFrontmatter,
        // mdx.content は ReactNode（RSCコンポーネント）として利用
        mdxContent: mdx.content,
    };
}

export function getAllPostsMeta() {
    const slugs = getAllPostSlugs();
    const posts = slugs.map((slug) => {
        const { data, content } = getPostSource(slug);
        const frontmatter = data as PostFrontmatter;
        return {
            slug,
            frontmatter,
            excerpt: buildExcerpt(frontmatter, content),
        };
    });

    // draftを除外 & 日付降順
    return posts
        .filter((p) => !p.frontmatter.draft)
        .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}
