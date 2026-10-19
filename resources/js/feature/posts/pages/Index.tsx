
import { Head, Link, router } from "@inertiajs/react";
import { useMemo, useState } from "react";

import AdminLayout from "../../../layouts/AdminLayout";
import AuthorLayout from "../../../layouts/AuthorLayout";
import { useAuth } from "../../../hooks/useAuth";
import type { PostIndexProps } from "../types/post.types";

type Filter = "all" | "published" | "draft";

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

export default function Index({ posts }: PostIndexProps) {
    const { isAdmin } = useAuth();
    const Layout = isAdmin ? AdminLayout : AuthorLayout;

    const [filter, setFilter] = useState<Filter>("all");

    const filteredPosts = useMemo(() => {
        if (filter === "all") return posts.data;

        return posts.data.filter((post) => post.status === filter);
    }, [posts.data, filter]);

    const handleDelete = (id: number, title: string) => {
        if (!window.confirm(`Delete post "${title}"?`)) return;

        router.delete(`/posts/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <Layout>
            <Head title="My Posts - Blog CMS" />

            <div className={isAdmin ? "text-slate-900" : "text-author-text"}>
                {/* Page heading */}
                <header
                    className={`mb-7 flex flex-col justify-between gap-5 border-b pb-6 sm:flex-row sm:items-end ${
                        isAdmin
                            ? "border-slate-200"
                            : "border-author-border"
                    }`}
                >
                    <div>
                        <p
                            className={`mb-2 text-[11px] font-bold uppercase tracking-[0.16em] ${
                                isAdmin
                                    ? "text-blue-600"
                                    : "text-author-primary-hover"
                            }`}
                        >
                            {isAdmin ? "Content management" : "Your editorial space"}
                        </p>

                        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                            {isAdmin ? "All posts" : "Your articles"}
                            <span
                                className={
                                    isAdmin
                                        ? "text-blue-600"
                                        : "text-author-primary"
                                }
                            >
                                .
                            </span>
                        </h1>

                        <p
                            className={`mt-3 text-sm ${
                                isAdmin
                                    ? "text-slate-500"
                                    : "text-author-muted"
                            }`}
                        >
                            {isAdmin
                                ? "Review and manage articles across the platform."
                                : "Everything you've written, all in one place."}
                        </p>
                    </div>

                    <Link
                        href="/posts/create"
                        className={`inline-flex shrink-0 items-center justify-center gap-5 px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                            isAdmin
                                ? "rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-author-primary text-author-text hover:bg-author-primary-hover"
                        }`}
                    >
                        Write new story
                        <span className="text-lg leading-none">↗</span>
                    </Link>
                </header>

                {/* Filters */}
                <div
                    className={`mb-5 flex flex-wrap items-center justify-between gap-4 border-b pb-3 ${
                        isAdmin
                            ? "border-slate-200"
                            : "border-author-border"
                    }`}
                >
                    <div className="flex items-center gap-6">
                        {(["all", "published", "draft"] as const).map(
                            (item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setFilter(item)}
                                    className={`relative pb-3 text-xs font-semibold capitalize transition-colors ${
                                        filter === item
                                            ? isAdmin
                                                ? "text-blue-600"
                                                : "text-author-text"
                                            : isAdmin
                                              ? "text-slate-400 hover:text-slate-800"
                                              : "text-author-muted hover:text-author-text"
                                    }`}
                                >
                                    {item === "draft" ? "Drafts" : item}

                                    {filter === item && (
                                        <span
                                            className={`absolute inset-x-0 -bottom-[13px] h-[2px] ${
                                                isAdmin
                                                    ? "bg-blue-600"
                                                    : "bg-author-primary"
                                            }`}
                                        />
                                    )}
                                </button>
                            ),
                        )}
                    </div>

                    <span
                        className={`text-xs ${
                            isAdmin
                                ? "text-slate-400"
                                : "text-author-muted"
                        }`}
                    >
                        {filteredPosts.length} articles on this page
                    </span>
                </div>

                {/* Article list */}
                <div
                    className={`divide-y ${
                        isAdmin
                            ? "divide-slate-200"
                            : "divide-author-border"
                    }`}
                >
                    {filteredPosts.length === 0 ? (
                        <div className="py-16 text-center">
                            <h2 className="text-2xl font-semibold">
                                No articles found.
                            </h2>

                            <p
                                className={`mt-2 text-sm ${
                                    isAdmin
                                        ? "text-slate-500"
                                        : "text-author-muted"
                                }`}
                            >
                                {filter === "all"
                                    ? "Start by writing your first article."
                                    : `There are no ${filter} articles on this page.`}
                            </p>

                            {filter === "all" && (
                                <Link
                                    href="/posts/create"
                                    className="mt-5 inline-block border-b border-current pb-1 text-xs font-bold uppercase tracking-widest"
                                >
                                    Create article ↗
                                </Link>
                            )}
                        </div>
                    ) : (
                        filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="group grid gap-5 py-5 sm:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[210px_minmax(0,1fr)_auto] lg:items-center"
                            >
                                {/* Cover */}
                                <Link
                                    href={`/posts/${post.id}/preview`}
                                    className={`block aspect-[16/10] overflow-hidden ${
                                        isAdmin
                                            ? "rounded-lg bg-slate-100"
                                            : "bg-author-soft"
                                    }`}
                                >
                                    {post.cover_image ? (
                                        <img
                                            src={`/storage/${post.cover_image}`}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <span
                                                className={`text-5xl font-semibold ${
                                                    isAdmin
                                                        ? "text-slate-300"
                                                        : "text-author-primary"
                                                }`}
                                            >
                                                a.
                                            </span>
                                        </div>
                                    )}
                                </Link>

                                {/* Content */}
                                <div className="min-w-0">
                                    <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
                                        <span
                                            className={
                                                isAdmin
                                                    ? "text-blue-600"
                                                    : "text-author-primary-hover"
                                            }
                                        >
                                            {post.category?.name ?? "Uncategorized"}
                                        </span>

                                        <span className="text-slate-400">·</span>

                                        <span
                                            className={
                                                isAdmin
                                                    ? "text-slate-400"
                                                    : "text-author-muted"
                                            }
                                        >
                                            {formatDate(post.created_at)}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/posts/${post.id}/preview`}
                                        className={`block text-xl font-semibold leading-snug tracking-tight transition-colors sm:text-2xl ${
                                            isAdmin
                                                ? "hover:text-blue-600"
                                                : "hover:text-author-primary-hover"
                                        }`}
                                    >
                                        {post.title}
                                    </Link>

                                    <div className="mt-3 flex flex-wrap items-center gap-3">
                                        <span
                                            className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide ${
                                                post.status === "published"
                                                    ? isAdmin
                                                        ? "text-green-700"
                                                        : "text-author-primary-hover"
                                                    : "text-amber-700"
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

                                            {post.status}
                                        </span>

                                        {isAdmin && (
                                            <span className="text-xs text-slate-500">
                                                by {post.user?.name ?? "Unknown"}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-5 lg:justify-end">
                                    <Link
                                        href={`/posts/${post.id}/preview`}
                                        className={`text-xs font-semibold transition-colors ${
                                            isAdmin
                                                ? "text-slate-500 hover:text-blue-600"
                                                : "text-author-muted hover:text-author-text"
                                        }`}
                                    >
                                        Preview
                                    </Link>

                                    <Link
                                        href={`/posts/${post.id}/edit`}
                                        className={`text-xs font-semibold transition-colors ${
                                            isAdmin
                                                ? "text-blue-600 hover:text-blue-800"
                                                : "text-author-text hover:text-author-primary-hover"
                                        }`}
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(post.id, post.title)
                                        }
                                        className="text-xs font-semibold text-red-600 transition-colors hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {posts.last_page > 1 && (
                    <nav
                        aria-label="Posts pagination"
                        className={`mt-6 flex flex-wrap items-center gap-2 border-t pt-5 ${
                            isAdmin
                                ? "border-slate-200"
                                : "border-author-border"
                        }`}
                    >
                        {posts.links.map((link, index) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    preserveScroll
                                    className={`px-3 py-2 text-xs font-semibold transition-colors ${
                                        link.active
                                            ? isAdmin
                                                ? "rounded-md bg-blue-600 text-white"
                                                : "bg-author-primary text-author-text"
                                            : isAdmin
                                              ? "rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200"
                                              : "bg-author-soft text-author-text hover:bg-author-primary"
                                    }`}
                                >
                                    {link.label
                                        .replace("&laquo;", "«")
                                        .replace("&raquo;", "»")}
                                </Link>
                            ) : (
                                <span
                                    key={index}
                                    className={`px-3 py-2 text-xs ${
                                        isAdmin
                                            ? "text-slate-400"
                                            : "text-author-muted"
                                    }`}
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
        </Layout>
    );
}
