
import { Head, Link } from "@inertiajs/react";

import AdminLayout from "../../../layouts/AdminLayout";
import AuthorLayout from "../../../layouts/AuthorLayout";
import { useAuth } from "../../../hooks/useAuth";

import PostForm from "../components/PostForm";
import type {
    CategoryOption,
    Post,
} from "../types/post.types";

interface PostEditProps {
    post: Post;
    categories: CategoryOption[];
}

export default function Edit({
    post,
    categories,
}: PostEditProps) {
    const { isAdmin } = useAuth();
    const Layout = isAdmin ? AdminLayout : AuthorLayout;

    return (
        <Layout>
            <Head title={`Edit ${post.title} - Blog CMS`} />

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

                    <div className="mb-2 flex flex-wrap items-center gap-3">
                        <p
                            className={`text-[11px] font-bold uppercase tracking-[0.16em] ${
                                isAdmin
                                    ? "text-blue-600"
                                    : "text-author-primary-hover"
                            }`}
                        >
                            Editorial / Edit article
                        </p>

                        <span
                            className={`text-[10px] font-semibold uppercase tracking-wider ${
                                isAdmin
                                    ? "text-slate-500"
                                    : "text-author-muted"
                            }`}
                        >
                            {post.status}
                        </span>
                    </div>

                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        Edit your story
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
                        className={`mt-3 max-w-2xl text-sm ${
                            isAdmin
                                ? "text-slate-500"
                                : "text-author-muted"
                        }`}
                    >
                        Currently editing:{" "}
                        <span className="font-semibold">
                            {post.title}
                        </span>
                    </p>
                </header>

                <section
                    className={`p-5 sm:p-7 lg:p-8 ${
                        isAdmin
                            ? "rounded-xl bg-white shadow-sm"
                            : "border border-author-border bg-author-surface"
                    }`}
                >
                    <PostForm
                        post={post}
                        categories={categories}
                    />
                </section>
            </div>
        </Layout>
    );
}
