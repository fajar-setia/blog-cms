
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import { useAuth } from "../../../hooks/useAuth";
import type { CategoryOption, Post } from "../types/post.types";

interface PostFormProps {
    categories: CategoryOption[];
    post?: Post;
}

export default function PostForm({ categories, post }: PostFormProps) {
    const { isAdmin } = useAuth();
    const isEditing = Boolean(post);

    const [coverPreview, setCoverPreview] = useState<string | null>(
        post?.cover_image ? `/storage/${post.cover_image}` : null,
    );

    const {
        data,
        setData,
        post: submitPost,
        processing,
        errors,
        progress,
    } = useForm({
        title: post?.title ?? "",
        category_id: post?.category?.id?.toString() ?? "",
        content: post?.content ?? "",
        status: post?.status ?? "draft",
        cover_image: null as File | null,
        _method: post ? "PUT" : "POST",
    });

    useEffect(() => {
        if (!data.cover_image) {
            setCoverPreview(
                post?.cover_image ? `/storage/${post.cover_image}` : null,
            );
            return;
        }

        const url = URL.createObjectURL(data.cover_image);
        setCoverPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [data.cover_image, post?.cover_image]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (post) {
            submitPost(`/posts/${post.id}`, {
                forceFormData: true,
            });
        } else {
            submitPost("/posts", {
                forceFormData: true,
            });
        }
    };

    const inputClass = isAdmin
        ? "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
        : "w-full border border-author-border bg-author-surface px-4 py-3 text-sm text-author-text outline-none transition focus:border-author-primary focus:ring-2 focus:ring-author-primary/15";

    const labelClass = isAdmin
        ? "mb-2 block text-xs font-semibold text-slate-700"
        : "mb-2 block text-xs font-semibold text-author-text";

    const mutedClass = isAdmin ? "text-slate-500" : "text-author-muted";

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
                {/* Writing area */}
                <div className="min-w-0 space-y-7">
                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <p
                                className={`text-[11px] font-bold uppercase tracking-[0.16em] ${
                                    isAdmin
                                        ? "text-blue-600"
                                        : "text-author-primary-hover"
                                }`}
                            >
                                01 / The story
                            </p>

                            <span className={`text-xs ${mutedClass}`}>
                                {data.content.trim().split(/\s+/).filter(Boolean).length} words
                            </span>
                        </div>

                        <label htmlFor="title" className={labelClass}>
                            Article title
                        </label>

                        <input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder="Give your story a title..."
                            className={`${inputClass} text-lg font-semibold sm:text-xl`}
                            required
                        />

                        {errors.title && (
                            <p className="mt-2 text-xs text-red-600">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label htmlFor="content" className={labelClass}>
                                Your story
                            </label>

                            <span className={`text-[11px] ${mutedClass}`}>
                                Start writing below
                            </span>
                        </div>

                        <textarea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            rows={18}
                            placeholder="Every great story starts with a first sentence..."
                            className={`${inputClass} min-h-[420px] resize-y leading-7`}
                            required
                        />

                        {errors.content && (
                            <p className="mt-2 text-xs text-red-600">
                                {errors.content}
                            </p>
                        )}
                    </div>
                </div>

                {/* Article settings */}
                <aside className="min-w-0">
                    <div
                        className={`mb-5 border-b pb-4 ${
                            isAdmin
                                ? "border-slate-200"
                                : "border-author-border"
                        }`}
                    >
                        <p
                            className={`mb-2 text-[11px] font-bold uppercase tracking-[0.16em] ${
                                isAdmin
                                    ? "text-blue-600"
                                    : "text-author-primary-hover"
                            }`}
                        >
                            02 / Article details
                        </p>

                        <h2 className="text-xl font-semibold tracking-tight">
                            Settings
                        </h2>

                        <p className={`mt-1 text-xs leading-5 ${mutedClass}`}>
                            Manage how your article appears to readers.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Category */}
                        <div>
                            <label htmlFor="category" className={labelClass}>
                                Category
                            </label>

                            <select
                                id="category"
                                value={data.category_id}
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                                className={inputClass}
                                required
                            >
                                <option value="">Select a category</option>

                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>

                            {errors.category_id && (
                                <p className="mt-2 text-xs text-red-600">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        {/* Cover image */}
                        <div>
                            <label htmlFor="cover_image" className={labelClass}>
                                Cover image
                            </label>

                            <label
                                htmlFor="cover_image"
                                className={`group relative flex aspect-[16/10] cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed transition-colors ${
                                    isAdmin
                                        ? "border-slate-300 bg-slate-50 hover:border-blue-500"
                                        : "border-author-border bg-author-soft hover:border-author-primary"
                                }`}
                            >
                                {coverPreview ? (
                                    <>
                                        <img
                                            src={coverPreview}
                                            alt="Article cover preview"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />

                                        <div className="absolute inset-0 flex items-end justify-center bg-black/35 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                                            <span className="bg-white px-3 py-2 text-xs font-semibold text-slate-900">
                                                Change image
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span className="mb-2 text-3xl">＋</span>

                                        <span className="text-xs font-semibold">
                                            Upload cover image
                                        </span>

                                        <span className={`mt-1 text-[11px] ${mutedClass}`}>
                                            Click to browse files
                                        </span>
                                    </>
                                )}
                            </label>

                            <input
                                id="cover_image"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) =>
                                    setData(
                                        "cover_image",
                                        e.target.files?.[0] ?? null,
                                    )
                                }
                                className="sr-only"
                            />

                            <p className={`mt-2 text-[11px] ${mutedClass}`}>
                                JPG, PNG, or WebP. Maximum 2 MB.
                            </p>

                            {errors.cover_image && (
                                <p className="mt-2 text-xs text-red-600">
                                    {errors.cover_image}
                                </p>
                            )}

                            {progress && (
                                <div className="mt-3">
                                    <div
                                        className={`h-1.5 overflow-hidden ${
                                            isAdmin
                                                ? "bg-slate-100"
                                                : "bg-author-soft"
                                        }`}
                                    >
                                        <div
                                            className={`h-full transition-all ${
                                                isAdmin
                                                    ? "bg-blue-600"
                                                    : "bg-author-primary"
                                            }`}
                                            style={{
                                                width: `${progress.percentage ?? 0}%`,
                                            }}
                                        />
                                    </div>

                                    <p className={`mt-1 text-[11px] ${mutedClass}`}>
                                        Uploading {progress.percentage ?? 0}%
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className={labelClass}>
                                Publication status
                            </label>

                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData(
                                        "status",
                                        e.target.value as "draft" | "published",
                                    )
                                }
                                className={inputClass}
                            >
                                <option value="draft">Save as draft</option>
                                <option value="published">Published</option>
                            </select>

                            <p className={`mt-2 text-[11px] leading-5 ${mutedClass}`}>
                                {data.status === "published"
                                    ? "This article will be visible on your public blog."
                                    : "Your article will stay private until you publish it."}
                            </p>

                            {errors.status && (
                                <p className="mt-2 text-xs text-red-600">
                                    {errors.status}
                                </p>
                            )}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Actions */}
            <div
                className={`mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6 ${
                    isAdmin
                        ? "border-slate-200"
                        : "border-author-border"
                }`}
            >
                <Link
                    href="/posts"
                    className={`text-xs font-semibold transition-colors ${
                        isAdmin
                            ? "text-slate-500 hover:text-slate-900"
                            : "text-author-muted hover:text-author-text"
                    }`}
                >
                    ← Cancel and go back
                </Link>

                <button
                    type="submit"
                    disabled={processing}
                    className={`inline-flex items-center justify-center gap-5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                        isAdmin
                            ? "rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-author-primary text-author-text hover:bg-author-primary-hover"
                    }`}
                >
                    {processing
                        ? "Saving..."
                        : isEditing
                          ? "Save changes"
                          : data.status === "published"
                            ? "Publish article"
                            : "Save draft"}

                    {!processing && <span className="text-lg leading-none">↗</span>}
                </button>
            </div>
        </form>
    );
}
