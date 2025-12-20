/* eslint-disable @next/next/no-img-element */

// the component shows related posts, shows suggest posts at the end of articles
// finds related content based on tags
// displays similar blog posts for readers to continue browsing
import { docs, meta } from "@/.source/server";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { loader } from "fumadocs-core/source";
import Link from "next/link";

const blogSource = loader({
    baseUrl: "/blog",
    source: toFumadocsSource(docs, meta),
});

const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

interface BlogData {
    title: string;
    description: string;
    date: string;
    tags?: string[];
    featured?: boolean;
    readTime?: string;
    author?: string;
    authorImage?: string;
    thumbnail?: string;
}

interface BlogPage {
    url: string;
    data: BlogData;
}

interface ReadMoreSectionProps {
    currentSlug: string[];
    currentTags?: string[];
}

export function ReadMoreSection({
                                    currentSlug,
                                    currentTags = [],
                                }: ReadMoreSectionProps) {
    // Get all blog posts from the source
    const allPages = blogSource.getPages().map(page => ({
        url: page.url,
        data: page.data as BlogData
    }));

    // Build the current post's URL to exclude it from suggestions
    const currentUrl = `/blog/${currentSlug.join("/")}`;

    // Find and rank related posts
    const otherPosts = allPages
        // Exclude the current post
        .filter((page) => page.url !== currentUrl)
        // Calculate relevance score for each post
        .map((page) => {
            // Count how many tags match between current post and this post
            const tagOverlap = currentTags.filter((tag) =>
                page.data.tags?.includes(tag)
            ).length;

            return {
                ...page,
                relevanceScore: tagOverlap, // Higher score = more relevant
                date: new Date(page.data.date),
            };
        })
        // Sort by relevance, then by date
        .sort((a, b) => {
            // First priority: posts with more matching tags
            if (a.relevanceScore !== b.relevanceScore) {
                return b.relevanceScore - a.relevanceScore;
            }
            // Second priority: newer posts first (if relevance is equal)
            return b.date.getTime() - a.date.getTime();
        })
        // Take only the top 3 most relevant posts
        .slice(0, 3);

    // Don't show section if there are no other posts to suggest
    if (otherPosts.length === 0) {
        return null;
    }

    return (
        <section className="border-t border-border p-0">
            <div className="p-6 lg:p-10">
                <h2 className="text-2xl font-medium mb-8">Read more</h2>

                <div className="flex flex-col gap-8">
                    {/* Loop through and display each suggested post */}
                    {otherPosts.map((post) => {
                        const formattedDate = formatDate(post.date);

                        return (
                            <Link
                                key={post.url}
                                href={post.url}
                                className="group grid grid-cols-1 lg:grid-cols-12 items-center gap-4 cursor-pointer"
                            >
                                {/* Thumbnail image (4 columns on desktop) */}
                                {post.data.thumbnail && (
                                    <div className="flex-shrink-0 col-span-1 lg:col-span-4">
                                        <div className="relative w-full h-full">
                                            <img
                                                src={post.data.thumbnail}
                                                alt={post.data.title}
                                                className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                                            />
                                        </div>
                                    </div>
                                )}
                                {/* Post details (8 columns on desktop) */}
                                <div className="space-y-2 flex-1 col-span-1 lg:col-span-8">
                                    {/* Post title - underlines on hover */}
                                    <h3 className="text-lg group-hover:underline underline-offset-4 font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                                        {post.data.title}
                                    </h3>
                                    {/* Post description - limited to 3 lines */}
                                    <p className="text-muted-foreground text-sm line-clamp-3 group-hover:underline underline-offset-4">
                                        {post.data.description}
                                    </p>
                                    {/* Publish date */}
                                    <time className="block text-xs font-medium text-muted-foreground">
                                        {formattedDate}
                                    </time>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}