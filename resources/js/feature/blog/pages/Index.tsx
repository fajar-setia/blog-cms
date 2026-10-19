
import { Head, Link } from "@inertiajs/react";

import PublicLayout from "../../../layouts/PublicLayout";
import type { BlogIndexProps } from "../types/blog.types";

type BlogPost = BlogIndexProps["posts"]["data"][number];

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

function ArticleImage({
    post,
    className = "",
}: {
    post: BlogPost;
    className?: string;
}) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className={`group block overflow-hidden bg-[#E8EBDD] ${className}`}
        >
            {post.cover_image ? (
                <img
                    src={`/storage/${post.cover_image}`}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#E8EBDD]">
                    <span className="text-6xl font-semibold tracking-tighter text-[#A5B68C]">
                        a.
                    </span>
                </div>
            )}
        </Link>
    );
}

function ArticleMeta({ post }: { post: BlogPost }) {
    return (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.12em]">
            <span className="text-[#63843B]">
                {post.category?.name ?? "Editorial"}
            </span>

            <span className="text-[#B4B9AE]">/</span>

            <span className="text-[#81877B]">
                {formatDate(post.created_at)}
            </span>
        </div>
    );
}

export default function Index({ posts }: BlogIndexProps) {
    const [featured, ...remaining] = posts.data;
    const sidePosts = remaining.slice(0, 2);
    const latestPosts = remaining.slice(2);

    return (
        <PublicLayout>
            <Head title="The Journal - Blog CMS" />

            <div className="mx-auto w-full max-w-[1440px] px-5 py-8 text-[#24291F] sm:px-8 lg:px-12 lg:py-10">
                {/* Masthead */}
                <header className="mb-8 border-b border-[#DDE4D5] pb-7">
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#63843B]">
                            The Journal / Stories & Ideas
                        </p>

                        <span className="hidden text-[11px] font-medium uppercase tracking-[0.14em] text-[#81877B] sm:block">
                            Read. Explore. Discover.
                        </span>
                    </div>

                    <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-6xl lg:text-[76px]">
                        Stories worth
                        <br />
                        reading<span className="text-[#91BD48]">.</span>
                    </h1>

                    <p className="mt-4 max-w-xl text-sm leading-6 text-[#747B6D] sm:text-base">
                        Fresh perspectives, thoughtful writing, and ideas
                        that deserve to be shared.
                    </p>
                </header>

                {posts.data.length === 0 ? (
                    <div className="border border-[#DDE4D5] bg-[#F4F7EB] px-6 py-20 text-center">
                        <p className="text-2xl font-semibold">
                            No stories published yet.
                        </p>

                        <p className="mt-2 text-sm text-[#747B6D]">
                            New articles will appear here soon.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Featured stories */}
                        <section aria-labelledby="featured-heading">
                            <div className="mb-4 flex items-center justify-between">
                                <h2
                                    id="featured-heading"
                                    className="text-[11px] font-bold uppercase tracking-[0.16em]"
                                >
                                    Featured stories
                                </h2>

                                <span className="text-xs text-[#81877B]">
                                    Editor's selection
                                </span>
                            </div>

                            <div className="grid gap-8 border-t border-[#DDE4D5] pt-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)] lg:gap-9">
                                {/* Main featured article */}
                                <article className="min-w-0">
                                    <ArticleImage
                                        post={featured}
                                        className="aspect-[16/9] w-full"
                                    />

                                    <div className="mt-5">
                                        <ArticleMeta post={featured} />

                                        <h3 className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-4xl lg:text-[44px]">
                                            <Link
                                                href={`/blog/${featured.slug}`}
                                                className="transition-colors hover:text-[#63843B]"
                                            >
                                                {featured.title}
                                            </Link>
                                        </h3>

                                        <p className="mt-3 line-clamp-3 max-w-2xl text-sm leading-7 text-[#747B6D]">
                                            {featured.content}
                                        </p>

                                        <div className="mt-5 flex items-center justify-between gap-3">
                                            <span className="text-xs font-medium text-[#747B6D]">
                                                By {featured.user?.name ?? "Editorial team"}
                                            </span>

                                            <Link
                                                href={`/blog/${featured.slug}`}
                                                className="border-b border-[#24291F] pb-1 text-xs font-bold uppercase tracking-wider transition-colors hover:border-[#63843B] hover:text-[#63843B]"
                                            >
                                                Read story ↗
                                            </Link>
                                        </div>
                                    </div>
                                </article>

                                {/* Side articles */}
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
                                    {sidePosts.map((post) => (
                                        <article
                                            key={post.id}
                                            className="grid min-w-0 gap-4 border-b border-[#DDE4D5] pb-5 last:border-b-0 last:pb-0 lg:grid-cols-[145px_minmax(0,1fr)] xl:grid-cols-[180px_minmax(0,1fr)]"
                                        >
                                            <ArticleImage
                                                post={post}
                                                className="aspect-[4/3] w-full lg:aspect-square"
                                            />

                                            <div className="min-w-0">
                                                <ArticleMeta post={post} />

                                                <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight lg:text-[22px]">
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        className="transition-colors hover:text-[#63843B]"
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </h3>

                                                <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#747B6D]">
                                                    {post.content}
                                                </p>

                                                <span className="mt-3 block text-[11px] text-[#81877B]">
                                                    By {post.user?.name ?? "Editorial team"}
                                                </span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Latest articles */}
                        {latestPosts.length > 0 && (
                            <section
                                aria-labelledby="latest-heading"
                                className="mt-14"
                            >
                                <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#DDE4D5] pb-4">
                                    <div>
                                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#63843B]">
                                            Keep exploring
                                        </p>

                                        <h2
                                            id="latest-heading"
                                            className="text-3xl font-semibold tracking-tight sm:text-4xl"
                                        >
                                            The latest stories<span className="text-[#91BD48]">.</span>
                                        </h2>
                                    </div>

                                    <span className="hidden text-xs text-[#81877B] sm:block">
                                        More to discover ↘
                                    </span>
                                </div>

                                <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                                    {latestPosts.map((post) => (
                                        <article key={post.id} className="min-w-0">
                                            <ArticleImage
                                                post={post}
                                                className="aspect-[16/10] w-full"
                                            />

                                            <div className="mt-4">
                                                <ArticleMeta post={post} />

                                                <h3 className="mt-2 text-[22px] font-semibold leading-snug tracking-tight">
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        className="transition-colors hover:text-[#63843B]"
                                                    >
                                                        {post.title}
                                                    </Link>
                                                </h3>

                                                <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#747B6D]">
                                                    {post.content}
                                                </p>

                                                <div className="mt-4 flex items-center justify-between gap-3">
                                                    <span className="text-xs text-[#81877B]">
                                                        {post.user?.name ?? "Editorial team"}
                                                    </span>

                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        className="text-xs font-bold transition-colors hover:text-[#63843B]"
                                                        aria-label={`Read ${post.title}`}
                                                    >
                                                        Read ↗
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}

                {/* Pagination */}
                {posts.last_page > 1 && (
                    <nav
                        aria-label="Blog pagination"
                        className="mt-12 flex flex-wrap items-center justify-center gap-2 border-t border-[#DDE4D5] pt-7"
                    >
                        {posts.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    preserveScroll
                                    className={`px-4 py-2.5 text-xs font-semibold transition-colors ${
                                        link.active
                                            ? "bg-[#91BD48] text-[#24291F]"
                                            : "bg-[#F4F7EB] text-[#747B6D] hover:bg-[#E5EDDA] hover:text-[#24291F]"
                                    }`}
                                >
                                    {link.label
                                        .replace("&laquo;", "«")
                                        .replace("&raquo;", "»")}
                                </Link>
                            ) : (
                                <span
                                    key={index}
                                    className="px-4 py-2.5 text-xs text-[#A5AA9E]"
                                >
                                    {link.label
                                        .replace("&laquo;", "«")
                                        .replace("&raquo;", "»")}
                                </span>
                            ),
                        )}
                    </nav>
                )}
            </div>
        </PublicLayout>
    );
}
