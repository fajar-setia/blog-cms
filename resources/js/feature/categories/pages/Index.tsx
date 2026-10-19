
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    ArrowUpRight,
    FolderOpen,
    Pencil,
    Plus,
    Tag,
    Trash2,
    X,
} from "lucide-react";

import AdminLayout from "../../../layouts/AdminLayout";
import CategoryForm from "../components/CategoryForm";
import CategoryEditForm from "../components/CategoryEditForm";

import type {
    Category,
    CategoryIndexProps,
} from "../types/category.types";

export default function Index({ categories }: CategoryIndexProps) {
    const [editingCategory, setEditingCategory] =
        useState<Category | null>(null);

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    const { errors } = usePage().props;

    const handleDelete = (category: Category) => {
        if (!window.confirm(`Delete category "${category.name}"?`)) {
            return;
        }

        setDeletingId(category.id);

        router.delete(`/categories/${category.id}`, {
            preserveScroll: true,
            onFinish: () => setDeletingId(null),
        });
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);

        document
            .getElementById("category-editor")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    return (
        <AdminLayout>
            <Head title="Categories - Blog CMS" />

            <div className="text-[#14223B]">
                {/* Page heading */}
                <header className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-[#DCE3F0] pb-7">
                    <div>
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#4C6CE5]">
                            Administration / Content organization
                        </p>

                        <h1 className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                            Categories
                            <span className="text-[#4C6CE5]">.</span>
                        </h1>

                        <p className="mt-3 text-sm text-[#72809A]">
                            Keep your publication organized with meaningful topics.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setEditingCategory(null);

                            document
                                .getElementById("category-editor")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                });
                        }}
                        className="inline-flex items-center gap-4 bg-[#4C6CE5] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#3957D0]"
                    >
                        <Plus size={17} />
                        Add category
                    </button>
                </header>

                {/* Summary strip */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE3F0] pb-6">
                    <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center bg-[#E7EDFA] text-[#4C6CE5]">
                            <FolderOpen size={22} strokeWidth={1.7} />
                        </span>

                        <div>
                            <p className="text-3xl font-semibold leading-none tracking-[-0.05em]">
                                {categories.length.toLocaleString()}
                            </p>

                            <p className="mt-1 text-xs text-[#72809A]">
                                Total categories
                            </p>
                        </div>
                    </div>

                    <span className="text-[11px] uppercase tracking-[0.12em] text-[#8190A8]">
                        Content taxonomy / Directory
                    </span>
                </div>

                <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_350px]">
                    {/* Category directory */}
                    <section className="min-w-0">
                        <div className="mb-5 flex items-end justify-between border-b border-[#DCE3F0] pb-4">
                            <div>
                                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4C6CE5]">
                                    Category directory
                                </p>

                                <h2 className="text-2xl font-semibold tracking-[-0.04em]">
                                    All topics
                                    <span className="text-[#4C6CE5]">.</span>
                                </h2>
                            </div>

                            <span className="text-[11px] text-[#8190A8]">
                                {categories.length} entries
                            </span>
                        </div>

                        {typeof errors.delete === "string" && (
                            <div
                                role="alert"
                                className="mb-5 border-l-2 border-[#D65C5C] bg-[#FFF0F0] px-4 py-3 text-sm text-[#B44545]"
                            >
                                {errors.delete}
                            </div>
                        )}

                        {categories.length === 0 ? (
                            <div className="flex min-h-[280px] flex-col items-center justify-center border border-dashed border-[#CAD5E8] px-6 text-center">
                                <Tag
                                    size={30}
                                    strokeWidth={1.5}
                                    className="mb-4 text-[#8FA5C5]"
                                />

                                <h3 className="text-lg font-semibold">
                                    No categories yet
                                </h3>

                                <p className="mt-2 max-w-xs text-sm leading-6 text-[#72809A]">
                                    Create your first category to start
                                    organizing articles.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-[#DCE3F0]">
                                {categories.map((category, index) => (
                                    <div
                                        key={category.id}
                                        className={`group flex flex-wrap items-center gap-4 py-5 transition-colors hover:bg-[#EFF3FC] sm:flex-nowrap ${
                                            editingCategory?.id === category.id
                                                ? "bg-[#EFF3FC]"
                                                : ""
                                        }`}
                                    >
                                        <span className="w-7 shrink-0 text-[11px] font-medium text-[#9AA7BA]">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#E7EDFA] text-[#4C6CE5]">
                                            <Tag size={19} strokeWidth={1.7} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-base font-semibold tracking-tight">
                                                {category.name}
                                            </h3>

                                            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#8190A8]">
                                                <span className="max-w-[180px] truncate">
                                                    /{category.slug}
                                                </span>

                                                <span>·</span>

                                                <span>
                                                    {formatDate(category.created_at)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="ml-auto flex shrink-0 items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(category)}
                                                title={`Edit ${category.name}`}
                                                aria-label={`Edit ${category.name}`}
                                                className="flex h-9 w-9 items-center justify-center border border-[#DCE3F0] text-[#52637E] transition-colors hover:border-[#4C6CE5] hover:bg-[#E7EDFA] hover:text-[#4C6CE5]"
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(category)}
                                                disabled={deletingId !== null}
                                                title={`Delete ${category.name}`}
                                                aria-label={`Delete ${category.name}`}
                                                className="flex h-9 w-9 items-center justify-center border border-[#DCE3F0] text-[#8190A8] transition-colors hover:border-[#D65C5C] hover:bg-[#FFF0F0] hover:text-[#D65C5C] disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                {deletingId === category.id ? (
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                ) : (
                                                    <Trash2 size={16} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Form editor */}
                    <aside
                        id="category-editor"
                        className="scroll-mt-24 bg-[#E8EFFD] p-6 sm:p-7"
                    >
                        <div className="mb-8 flex items-start justify-between">
                            <div>
                                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4C6CE5]">
                                    Category editor / 01
                                </p>

                                <h2 className="text-2xl font-semibold tracking-[-0.045em]">
                                    {editingCategory
                                        ? "Edit category"
                                        : "New category"}
                                    <span className="text-[#4C6CE5]">.</span>
                                </h2>
                            </div>

                            {editingCategory ? (
                                <button
                                    type="button"
                                    onClick={() => setEditingCategory(null)}
                                    title="Cancel editing"
                                    aria-label="Cancel editing"
                                    className="flex h-9 w-9 items-center justify-center border border-[#C7D5EE] text-[#52637E] hover:bg-white"
                                >
                                    <X size={17} />
                                </button>
                            ) : (
                                <span className="flex h-10 w-10 items-center justify-center bg-[#D5E2FA] text-[#4C6CE5]">
                                    <Plus size={21} />
                                </span>
                            )}
                        </div>

                        <p className="mb-6 text-sm leading-6 text-[#64748B]">
                            {editingCategory
                                ? "Update the category name. Its URL slug will be generated automatically."
                                : "Give your category a clear name. Its URL slug will be generated automatically."}
                        </p>

                        <div className="[&_input]:w-full [&_input]:rounded-none [&_input]:border-[#C7D5EE] [&_input]:bg-white [&_input]:focus:border-[#4C6CE5] [&_button[type=submit]]:rounded-none">
                            {editingCategory ? (
                                <CategoryEditForm
                                    key={editingCategory.id}
                                    category={editingCategory}
                                    onCancel={() => setEditingCategory(null)}
                                    onSuccess={() => setEditingCategory(null)}
                                />
                            ) : (
                                <CategoryForm />
                            )}
                        </div>

                        <div className="mt-8 flex items-start gap-3 border-t border-[#C7D5EE] pt-5">
                            <ArrowUpRight
                                size={17}
                                className="mt-0.5 shrink-0 text-[#4C6CE5]"
                            />

                            <p className="text-xs leading-5 text-[#64748B]">
                                Categories help readers discover articles
                                based on their interests.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </AdminLayout>
    );
}
