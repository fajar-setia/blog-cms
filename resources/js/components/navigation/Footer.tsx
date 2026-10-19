import { Link } from "@inertiajs/react";

export function Footer() {
    return (
        <footer className="mt-auto w-full bg-[#F8F9FA] px-3 pb-6 pt-4 md:px-8">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Colorful Accent Bar (Tembus dengan tema Navbar) */}
                <div className="flex h-1 w-full overflow-hidden">
                    <div className="flex-1 bg-[#84cc16]" />
                    <div className="flex-1 bg-[#a3e635]" />
                    <div className="flex-1 bg-[#facc15]" />
                    <div className="flex-1 bg-[#fbbf24]" />
                    <div className="flex-1 bg-[#fb923c]" />
                </div>

                {/* Footer Content */}
                <div className="flex flex-col items-center justify-between gap-4 px-6 py-5 text-xs font-medium text-slate-500 sm:flex-row">
                    {/* Brand & Copyright */}
                    <div className="flex items-center gap-2">
                        <p className="text-slate-700">
                            © {new Date().getFullYear()}{" "}
                            <span className="font-bold text-slate-900">
                                Blog CMS
                            </span>
                            . All rights reserved.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1 font-semibold text-slate-600 transition hover:text-[#84cc16]"
                        >
                            <span>Landing Page</span>
                            <span className="text-[10px]">↗</span>
                        </Link>
                        <Link
                            href="/blog"
                            className="font-semibold text-slate-600 transition hover:text-[#84cc16]"
                        >
                            Explore Blog
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}