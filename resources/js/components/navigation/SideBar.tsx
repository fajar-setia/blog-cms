
import { Link, router, usePage } from "@inertiajs/react";
import {
    BookOpen,
    ChevronRight,
    FolderOpen,
    LayoutDashboard,
    LogOut,
    PanelLeftClose,
    PanelLeftOpen,
    Users,
    X,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

interface SidebarProps {
    collapsed: boolean;
    mobileOpen: boolean;
    onToggleCollapse: () => void;
    onCloseMobile: () => void;
}

const navigation = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "All posts", href: "/posts", icon: BookOpen },
    { label: "Categories", href: "/categories", icon: FolderOpen },
    { label: "Users", href: "/users", icon: Users },
];

export function Sidebar({
    collapsed,
    mobileOpen,
    onToggleCollapse,
    onCloseMobile,
}: SidebarProps) {
    const { url } = usePage();
    const { user } = useAuth();

    const currentPath = url.split("?")[0];

    const isActive = (href: string) =>
        currentPath === href || currentPath.startsWith(`${href}/`);

    return (
        <>
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={onCloseMobile}
                    className="fixed inset-0 z-40 bg-[#14223B]/60 lg:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#14223B] text-white transition-all duration-200 lg:z-30 ${
                    collapsed ? "lg:w-[76px]" : "lg:w-[260px]"
                } ${
                    mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }`}
            >
                {/* Brand */}
                <div className="flex h-[78px] shrink-0 items-center justify-between border-b border-white/10 px-5">
                    <Link
                        href="/dashboard"
                        onClick={onCloseMobile}
                        className="flex min-w-0 items-center gap-3"
                    >

                        {!collapsed && (
                            <span className="text-xl font-bold tracking-[-0.06em]">
                                blogcms<span className="text-[#A9C5FF]">.</span>
                            </span>
                        )}
                    </Link>

                    <button
                        type="button"
                        onClick={onCloseMobile}
                        className="text-[#9BAFCB] lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>

                    <button
                        type="button"
                        onClick={onToggleCollapse}
                        className="hidden text-[#9BAFCB] hover:text-white lg:block"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? (
                            <PanelLeftOpen size={18} />
                        ) : (
                            <PanelLeftClose size={18} />
                        )}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
                    {!collapsed && (
                        <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7185A5]">
                            Workspace
                        </p>
                    )}

                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onCloseMobile}
                                title={collapsed ? item.label : undefined}
                                className={`flex min-h-11 items-center gap-3 px-3 py-3 text-sm font-medium transition-colors ${
                                    active
                                        ? "bg-[#31476D] text-white"
                                        : "text-[#A9B9D0] hover:bg-white/5 hover:text-white"
                                } ${collapsed ? "lg:justify-center" : ""}`}
                            >
                                <Icon
                                    size={18}
                                    strokeWidth={1.8}
                                    className={
                                        active
                                            ? "shrink-0 text-[#BFD2FF]"
                                            : "shrink-0 text-[#8FA5C5]"
                                    }
                                />

                                <span
                                    className={collapsed ? "lg:hidden" : ""}
                                >
                                    {item.label}
                                </span>

                                {active && !collapsed && (
                                    <ChevronRight
                                        size={15}
                                        className="ml-auto text-[#BFD2FF]"
                                    />
                                )}
                            </Link>
                        );
                    })}

                    {!collapsed && (
                        <div className="mt-8 px-3">
                            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7185A5]">
                                Website
                            </p>

                            <Link
                                href="/blog"
                                onClick={onCloseMobile}
                                className="flex items-center gap-3 py-2 text-sm text-[#A9B9D0] hover:text-white"
                            >
                                <BookOpen size={17} />
                                View public blog
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Account */}
                <div className="shrink-0 border-t border-white/10 p-3">
                    <div className="flex items-center gap-3 px-3 py-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#365481] text-sm font-bold">
                            {user?.name?.charAt(0).toUpperCase() ?? "A"}
                        </div>

                        <div className={collapsed ? "min-w-0 lg:hidden" : "min-w-0"}>
                            <p className="truncate text-xs font-semibold">
                                {user?.name ?? "Administrator"}
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#8FA5C5]">
                                Administrator
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.post("/logout")}
                        title={collapsed ? "Sign out" : undefined}
                        className={`mt-1 flex w-full items-center gap-3 px-3 py-3 text-sm text-[#A9B9D0] hover:bg-white/5 hover:text-white ${
                            collapsed ? "lg:justify-center" : ""
                        }`}
                    >
                        <LogOut size={17} />
                        <span className={collapsed ? "lg:hidden" : ""}>
                            Sign out
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
}
