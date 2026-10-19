
import { Head, Link } from "@inertiajs/react";

import AdminLayout from "../../../layouts/AdminLayout";
import AuthorLayout from "../../../layouts/AuthorLayout";
import { useAuth } from "../../../hooks/useAuth";

import type { Post } from "../types/post.types";

interface PreviewProps {
    post: Post;
}

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

export default function Preview({ post }: PreviewProps) {
    const { isAdmin } = useAuth();
    const Layout = isAdmin ? AdminLayout : AuthorLayout;

    return (
        <Layout>
            <Head title={`Preview: ${post.title} - Blog CMS`} />

            <div
                className={`mx-auto w-full max-w-6xl ${
                    isAdmin ? "text-slate-900" : "text-author-text"
                }`}
            >
                {/* Navigation */}
                <div
                    className={`mb-7 flex flex-wrap items-center justify-between gap-4 border-b pb-5 ${
                        isAdmin
                            ? "border-slate-200"
                            : "border-author-border"
                    }`}
                >
                    <Link
                        href="/posts"
                        className={`inline-flex items-center gap-2 text-xs font-semibold transition-colors ${
                            isAdmin
                                ? "text-slate-500 hover:text-blue-600"
                                : "text-author-muted hover:text-author-text"
                        }`}
                    >
                        <span className="text-base">←</span>
                        Back to articles
                    </Link>

                    <div className="flex flex-wrap items-center gap-4">
                        <span
                            className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider ${
                                isAdmin
                                    ? "text-slate-500"
                                    : "text-author-muted"
                            }`}
                        >
                            <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                    post.status === "published"
                                        ? isAdmin
                                            ? "bg-green-600"
                                            : "bg-author-primary"
                                        : "bg-amber-500"
                                }`}
                            />
                            Preview / {post.status}
                        </span>

                        <Link
                            href={`/posts/${post.id}/edit`}
                            className={`px-4 py-2.5 text-xs font-bold transition-colors ${
                                isAdmin
                                    ? "rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-author-primary text-author-text hover:bg-author-primary-hover"
                            }`}
                        >
                            Edit article ↗
                        </Link>
                    </div>
                </div>

                {/* Article */}
                <article>
                    {/* Article header */}
                    <header className="mx-auto max-w-4xl text-center">
                        <p
                            className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
                                isAdmin
                                    ? "text-blue-600"
                                    : "text-author-primary-hover"
                            }`}
                        >
                            {post.category?.name ?? "Uncategorized"}
                        </p>

                        <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-[1.15] tracking-[-0.04em] sm:text-5xl lg:text-[60px]">
                            {post.title}
                        </h1>

                        <div
                            className={`mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs ${
                                isAdmin
                                    ? "text-slate-500"
                                    : "text-author-muted"
                            }`}
                        >
                            <span>
                                By{" "}
                                <span
                                    className={
                                        isAdmin
                                            ? "font-semibold text-slate-800"
                                            : "font-semibold text-author-text"
                                    }
                                >
                                    {post.user?.name ?? "Unknown author"}
                                </span>
                            </span>

                            <span aria-hidden="true">·</span>

                            <time dateTime={post.created_at}>
                                {formatDate(post.created_at)}
                            </time>
                        </div>
                    </header>

                    {/* Cover image */}
                    {post.cover_image && (
                        <figure className="mt-8">
                            <div
                                className={`aspect-[16/8] w-full overflow-hidden ${
                                    isAdmin
                                        ? "rounded-xl bg-slate-100"
                                        : "bg-author-soft"
                                }`}
                            >
                                <img
                                    src={`/storage/${post.cover_image}`}
                                    alt={post.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </figure>
                    )}

                    {/* Reading area */}
                    <div className="mx-auto mt-9 max-w-[760px] sm:mt-11">
                        <div
                            className={`mb-6 flex items-center gap-3 border-b pb-4 ${
                                isAdmin
                                    ? "border-slate-200"
                                    : "border-author-border"
                            }`}
                        >
                            <span
                                className={`h-2 w-2 rounded-full ${
                                    isAdmin
                                        ? "bg-blue-600"
                                        : "bg-author-primary"
                                }`}
                            />

                            <span
                                className={`text-[11px] font-bold uppercase tracking-[0.16em] ${
                                    isAdmin
                                        ? "text-slate-500"
                                        : "text-author-muted"
                                }`}
                            >
                                The story
                            </span>
                        </div>

                        <div
                            className={`whitespace-pre-wrap wrap-break-word text-[15px] leading-[1.95] sm:text-[17px] ${
                                isAdmin
                                    ? "text-slate-700"
                                    : "text-author-text"
                            }`}
                        >
                            {post.content}
                        </div>
                    </div>
                </article>

                {/* Bottom navigation */}
                <footer
                    className={`mx-auto mt-12 flex max-w-[760px] flex-wrap items-center justify-between gap-4 border-t pt-6 ${
                        isAdmin
                            ? "border-slate-200"
                            : "border-author-border"
                    }`}
                >
                    <Link
                        href="/posts"
                        className={`text-xs font-semibold transition-colors ${
                            isAdmin
                                ? "text-slate-500 hover:text-blue-600"
                                : "text-author-muted hover:text-author-text"
                        }`}
                    >
                        ← All articles
                    </Link>

                    <Link
                        href={`/posts/${post.id}/edit`}
                        className={`border-b pb-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                            isAdmin
                                ? "border-blue-600 text-blue-600 hover:text-blue-800"
                                : "border-author-text text-author-text hover:text-author-primary-hover"
                        }`}
                    >
                        Continue editing ↗
                    </Link>
                </footer>
            </div>
        </Layout>
    );
}
