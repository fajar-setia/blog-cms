import { Link, router, usePage } from "@inertiajs/react";
import { useAuth } from "../../hooks/useAuth";

export function Navbar() {
    const { url } = usePage();
    const { user, isAdmin, isAuthor } = useAuth();

    const homeHref = isAdmin ? "/dashboard" : isAuthor ? "/beranda" : "/";

    const tabs = [
        { label: "Home", href: homeHref, color: "#84cc16" },
        { label: "Blog", href: "/blog", color: "#a3e635" },
        ...(isAuthor
            ? [{ label: "My Posts", href: "/posts", color: "#facc15" }]
            : []),
        ...(!user
            ? [
                  { label: "Login", href: "/login", color: "#fbbf24" },
                  { label: "Register", href: "/register", color: "#fb923c" },
              ]
            : []),
    ];

    const isActive = (href: string) =>
        url === href || (href !== "/" && url.startsWith(`${href}/`));

    const secondaryNavigation = [
        { label: "Start Page", href: homeHref, icon: "⌂" },
        {
            label: "Articles",
            href: isAuthor ? "/posts" : "/blog",
            icon: "▤",
        },
        {
            label: "Write",
            href: isAuthor ? "/posts/create" : "/blog",
            icon: "✎",
        },
        {
            label: user ? "Account" : "Join Us",
            href: user ? homeHref : "/register",
            icon: "◈",
        },
    ];

    return (
        <header className="w-full bg-[#F8F9FA] px-3 pt-3 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <nav className="flex min-w-0 flex-1 items-end overflow-x-auto scrollbar-none">
                        {tabs.map((tab, index) => (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className="relative -mr-1 flex h-9 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-t-xl px-3 text-[11px] font-bold uppercase tracking-wider text-slate-900 transition-all hover:brightness-95 sm:max-w-36 sm:text-xs shadow-sm"
                                style={{
                                    backgroundColor: tab.color,
                                    zIndex: isActive(tab.href)
                                        ? 20
                                        : tabs.length - index,
                                    height: isActive(tab.href) ? 42 : 36,
                                }}
                            >
                                <span className="inline-flex items-center justify-center leading-none">
                                    {tab.label}
                                </span>
                                <span className="hidden h-2 w-2 shrink-0 rounded-full border border-black/20 bg-white/40 sm:block" />
                            </Link>
                        ))}
                    </nav>

                    {user && (
                        <div className="flex items-center justify-between sm:justify-end gap-3 pb-2 sm:pb-1 border-b sm:border-b-0 border-slate-200">
                            <span className="max-w-[150px] truncate text-xs font-bold text-slate-700">
                                Hai, {user.name}
                            </span>
                            <button
                                type="button"
                                onClick={() => router.post("/logout")}
                                className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-200"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                <div className="h-2 rounded-tr-xl bg-[#84cc16]" />

                <div className="overflow-hidden rounded-b-xl bg-white border border-t-0 border-slate-200 shadow-sm">
                    <nav className="grid grid-cols-4 divide-x divide-slate-100">
                        {secondaryNavigation.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex h-10 items-center justify-center px-1 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                            >
                                <div className="inline-flex items-center justify-center gap-1.5">
                                    <span className="flex items-center justify-center w-4 h-4 text-sm leading-none text-slate-500 shrink-0">
                                        {item.icon}
                                    </span>
                                    <span className="leading-none transform translate-y-[0.5px]">
                                        {item.label}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </nav>

                    {/* Bottom colorful stripe */}
                    <div className="mx-4 mb-2 flex h-1 overflow-hidden rounded-full">
                        <div className="flex-1 bg-[#84cc16]" />
                        <div className="flex-1 bg-[#a3e635]" />
                        <div className="flex-1 bg-[#facc15]" />
                        <div className="flex-1 bg-[#fbbf24]" />
                        <div className="flex-1 bg-[#fb923c]" />
                    </div>
                </div>
            </div>
        </header>
    );
}