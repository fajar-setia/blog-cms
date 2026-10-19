
import { useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import { ArrowUpRight, LoaderCircle, X } from "lucide-react";

import type { Category } from "../types/category.types";

interface CategoryEditFormProps {
    category: Category;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function CategoryEditForm({
    category,
    onCancel,
    onSuccess,
}: CategoryEditFormProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(`/categories/${category.id}`, {
            preserveScroll: true,
            onSuccess,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="edit-category-name"
                    className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#52637E]"
                >
                    Category name <span className="text-[#4C6CE5]">*</span>
                </label>

                <input
                    id="edit-category-name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    maxLength={255}
                    autoComplete="off"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                        errors.name ? "edit-category-name-error" : undefined
                    }
                    className="w-full border border-[#C7D5EE] bg-white px-4 py-3.5 text-sm text-[#14223B] outline-none transition-colors focus:border-[#4C6CE5] focus:ring-1 focus:ring-[#4C6CE5]"
                />

                {errors.name ? (
                    <p
                        id="edit-category-name-error"
                        role="alert"
                        className="mt-2 text-xs text-[#C64C4C]"
                    >
                        {errors.name}
                    </p>
                ) : (
                    <p className="mt-2 text-xs leading-5 text-[#8190A8]">
                        Changing the name will also update its URL slug.
                    </p>
                )}
            </div>

            <div className="space-y-3">
                <button
                    type="submit"
                    disabled={processing || !data.name.trim()}
                    className="flex w-full items-center justify-between gap-3 bg-[#4C6CE5] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#3957D0] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <span>
                        {processing ? "Saving changes..." : "Save changes"}
                    </span>

                    {processing ? (
                        <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                        <ArrowUpRight size={18} />
                    )}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={processing}
                    className="flex w-full items-center justify-center gap-2 border border-[#C7D5EE] bg-transparent px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[#52637E] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <X size={16} />
                    Cancel editing
                </button>
            </div>
        </form>
    );
}
