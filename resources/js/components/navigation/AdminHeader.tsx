
import { Link } from "@inertiajs/react";
import { ArrowUpRight, Menu } from "lucide-react";

interface AdminHeaderProps {
    onOpenSidebar: () => void;
}

export function AdminHeader({
    onOpenSidebar,
}: AdminHeaderProps) {
    return (
        <header className="sticky top-0 z-20 flex h-[78px] items-center justify-between border-b border-[#E0E6F0] bg-[#F7F8FC]/95 px-5 backdrop-blur-sm sm:px-8 lg:px-10">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onOpenSidebar}
                    aria-label="Open navigation"
                    className="text-[#14223B] lg:hidden"
                >
                    <Menu size={22} />
                </button>

                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8190A8]">
                        Blog CMS / Administration
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#14223B]">
                        Workspace
                    </p>
                </div>
            </div>

            <Link
                href="/blog"
                className="hidden items-center gap-2 text-xs font-semibold text-[#52637E] transition-colors hover:text-[#4C6CE5] sm:inline-flex"
            >
                Visit website
                <ArrowUpRight size={16} />
            </Link>
        </header>
    );
}
