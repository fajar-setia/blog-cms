
import { useForm } from "@inertiajs/react";
import type { FormEvent } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";

export default function CategoryForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post("/categories", {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label
                    htmlFor="category-name"
                    className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#52637E]"
                >
                    Category name <span className="text-[#4C6CE5]">*</span>
                </label>

                <input
                    id="category-name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="e.g. Technology"
                    maxLength={255}
                    autoComplete="off"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "category-name-error" : undefined}
                    className="w-full border border-[#C7D5EE] bg-white px-4 py-3.5 text-sm text-[#14223B] outline-none transition-colors placeholder:text-[#A3AEC0] focus:border-[#4C6CE5] focus:ring-1 focus:ring-[#4C6CE5]"
                />

                {errors.name ? (
                    <p
                        id="category-name-error"
                        role="alert"
                        className="mt-2 text-xs text-[#C64C4C]"
                    >
                        {errors.name}
                    </p>
                ) : (
                    <p className="mt-2 text-xs leading-5 text-[#8190A8]">
                        A unique URL slug will be generated automatically.
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={processing || !data.name.trim()}
                className="flex w-full items-center justify-between gap-3 bg-[#4C6CE5] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#3957D0] disabled:cursor-not-allowed disabled:opacity-50"
            >
                <span>
                    {processing ? "Creating category..." : "Create category"}
                </span>

                {processing ? (
                    <LoaderCircle size={18} className="animate-spin" />
                ) : (
                    <ArrowUpRight size={18} />
                )}
            </button>
        </form>
    );
}
