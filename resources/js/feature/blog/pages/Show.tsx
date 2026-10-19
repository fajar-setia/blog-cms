
import { Head, Link } from "@inertiajs/react";

import PublicLayout from "../../../layouts/PublicLayout";
import type { BlogShowProps } from "../types/blog.types";

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

export default function Show({ post }: BlogShowProps) {
    const wordCount = post.content
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <PublicLayout>
            <Head title={`${post.title} - Blog CMS`} />

            <main className="mx-auto w-full max-w-[1440px] px-5 py-7 text-[#24291F] sm:px-8 lg:px-12 lg:py-9">
                {/* Top navigation */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#DDE4D5] pb-5">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-[#747B6D] transition-colors hover:text-[#24291F]"
                    >
                        <span className="text-lg leading-none">←</span>
                        Back to the journal
                    </Link>

                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#81877B]">
                        The Journal / Article
                    </span>
                </div>

                <article>
                    {/* Article header */}
                    <header className="mx-auto max-w-[920px] text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#63843B]">
                            {post.category?.name ?? "Editorial"}
                        </p>

                        <h1 className="mx-auto mt-4 max-w-[900px] text-4xl font-semibold leading-[1.12] tracking-[-0.045em] sm:text-5xl lg:text-[64px]">
                            {post.title}
                            <span className="text-[#91BD48]">.</span>
                        </h1>

                        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-[#81877B]">
                            <span>
                                By{" "}
                                <span className="font-semibold text-[#24291F]">
                                    {post.user?.name ?? "Editorial team"}
                                </span>
                            </span>

                            <span aria-hidden="true">·</span>

                            <time dateTime={post.created_at}>
                                {formatDate(post.created_at)}
                            </time>

                            <span aria-hidden="true">·</span>

                            <span>{readingTime} min read</span>
                        </div>
                    </header>

                    {/* Cover image */}
                    {post.cover_image && (
                        <figure className="mt-9">
                            <div className="aspect-[16/8] w-full overflow-hidden bg-[#E8EBDD]">
                                <img
                                    src={`/storage/${post.cover_image}`}
                                    alt={post.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </figure>
                    )}

                    {/* Article body */}
                    <div className="mx-auto mt-10 max-w-[760px] sm:mt-12">
                        <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#DDE4D5] pb-4">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#91BD48]" />

                                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#747B6D]">
                                    The story
                                </span>
                            </div>

                            <span className="text-[11px] text-[#81877B]">
                                {wordCount} words
                            </span>
                        </div>

                        <div className="whitespace-pre-wrap wrap-break-word text-[16px] leading-[1.95] text-[#3F473B] sm:text-[18px]">
                            {post.content}
                        </div>

                        {/* End of article */}
                        <div className="mt-10 flex items-center justify-center gap-3">
                            <span className="h-px w-10 bg-[#DDE4D5]" />
                            <span className="text-lg font-semibold text-[#91BD48]">
                                ✳
                            </span>
                            <span className="h-px w-10 bg-[#DDE4D5]" />
                        </div>
                    </div>
                </article>

                {/* Article footer */}
                <footer className="mx-auto mt-10 max-w-[760px] border-t border-[#DDE4D5] pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-5">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#63843B]">
                                Keep exploring
                            </p>

                            <p className="mt-1 text-lg font-semibold">
                                More stories await.
                            </p>
                        </div>

                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-4 bg-[#91BD48] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#24291F] transition-colors hover:bg-[#7DA637]"
                        >
                            All articles
                            <span className="text-lg leading-none">↗</span>
                        </Link>
                    </div>
                </footer>
            </main>
        </PublicLayout>
    );
}
