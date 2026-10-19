
import { Head, Link } from "@inertiajs/react";

import AdminLayout from "../../../layouts/AdminLayout";
import AuthorLayout from "../../../layouts/AuthorLayout";
import { useAuth } from "../../../hooks/useAuth";

import PostForm from "../components/PostForm";
import type { PostCreateProps } from "../types/post.types";

export default function Create({ categories }: PostCreateProps) {
    const { isAdmin } = useAuth();
    const Layout = isAdmin ? AdminLayout : AuthorLayout;

    return (
        <Layout>
            <Head title="Write New Story - Blog CMS" />

            <div
                className={`mx-auto w-full max-w-6xl ${
                    isAdmin ? "text-slate-900" : "text-author-text"
                }`}
            >
                <header
                    className={`mb-6 border-b pb-6 ${
                        isAdmin
                            ? "border-slate-200"
                            : "border-author-border"
                    }`}
                >
                    <Link
                        href="/posts"
                        className={`mb-5 inline-flex items-center gap-2 text-xs font-semibold transition-colors ${
                            isAdmin
                                ? "text-slate-500 hover:text-blue-600"
                                : "text-author-muted hover:text-author-text"
                        }`}
                    >
                        <span aria-hidden="true">←</span>
                        Back to articles
                    </Link>

                    <p
                        className={`mb-2 text-[11px] font-bold uppercase tracking-[0.16em] ${
                            isAdmin
                                ? "text-blue-600"
                                : "text-author-primary-hover"
                        }`}
                    >
                        Editorial / New article
                    </p>

                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        Write a new story
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
                        Create your article, add the details, and publish when ready.
                    </p>
                </header>

                <section
                    className={`p-5 sm:p-7 lg:p-8 ${
                        isAdmin
                            ? "rounded-xl bg-white shadow-sm"
                            : "border border-author-border bg-author-surface"
                    }`}
                >
                    <PostForm categories={categories} />
                </section>
            </div>
        </Layout>
    );
}
