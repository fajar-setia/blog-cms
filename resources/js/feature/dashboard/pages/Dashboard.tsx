
import { Head, Link } from "@inertiajs/react";
import {
    ArrowRight,
    ArrowUpRight,
    BookOpen,
    FolderOpen,
    PenLine,
    Users,
} from "lucide-react";

import AdminLayout from "../../../layouts/AdminLayout";

interface DashboardStats {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalCategories: number;
    totalUsers: number;
}

interface RecentPost {
    id: number;
    title: string;
    status: "published" | "draft";
    created_at: string;
    user: {
        name: string;
    } | null;
    category: {
        name: string;
    } | null;
}

interface DashboardProps {
    stats: DashboardStats;
    recentPosts: RecentPost[];
}

export default function Dashboard({
    stats,
    recentPosts,
}: DashboardProps) {
    const statistics = [
        {
            label: "Total articles",
            value: stats.totalPosts,
            number: "01",
        },
        {
            label: "Published",
            value: stats.publishedPosts,
            number: "02",
        },
        {
            label: "Drafts",
            value: stats.draftPosts,
            number: "03",
        },
        {
            label: "Categories",
            value: stats.totalCategories,
            number: "04",
        },
        {
            label: "Registered users",
            value: stats.totalUsers,
            number: "05",
        },
    ];

    const quickLinks = [
        {
            title: "All articles",
            description: "Manage published stories and drafts.",
            href: "/posts",
            icon: BookOpen,
        },
        {
            title: "Categories",
            description: "Organize your publication.",
            href: "/categories",
            icon: FolderOpen,
        },
        {
            title: "Users",
            description: "Manage your community.",
            href: "/users",
            icon: Users,
        },
    ];

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    return (
        <AdminLayout>
            <Head title="Dashboard - Blog CMS" />

            <div className="text-[#14223B]">
                {/* Header */}
                <header className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-[#DCE3F0] pb-7">
                    <div>
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#4C6CE5]">
                            Administration / Dashboard
                        </p>

                        <h1 className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                            Overview
                            <span className="text-[#4C6CE5]">.</span>
                        </h1>

                        <p className="mt-3 text-sm text-[#72809A]">
                            Your publishing workspace at a glance.
                        </p>
                    </div>

                    <Link
                        href="/posts/create"
                        className="inline-flex items-center gap-5 bg-[#4C6CE5] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#3957D0]"
                    >
                        New article
                        <ArrowUpRight size={17} />
                    </Link>
                </header>

                {/* Statistics */}
                <section className="mb-10">
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.16em]">
                            Platform at a glance
                        </h2>

                        <span className="text-[11px] text-[#8190A8]">
                            Live database statistics
                        </span>
                    </div>

                    <div className="grid grid-cols-2 border-t border-l border-[#DCE3F0] sm:grid-cols-3 xl:grid-cols-5">
                        {statistics.map((item) => (
                            <div
                                key={item.number}
                                className="min-w-0 border-r border-b border-[#DCE3F0] p-5 lg:p-6"
                            >
                                <div className="mb-7 flex items-start justify-between gap-2">
                                    <span className="text-xs text-[#72809A]">
                                        {item.label}
                                    </span>

                                    <span className="text-[10px] text-[#A3AEC0]">
                                        /{item.number}
                                    </span>
                                </div>

                                <p className="text-4xl font-semibold tracking-[-0.06em] lg:text-5xl">
                                    {item.value.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recent posts + Side panel */}
                <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
                    <div className="min-w-0">
                        <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-[#DCE3F0] pb-4">
                            <div>
                                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4C6CE5]">
                                    Publishing activity
                                </p>

                                <h2 className="text-3xl font-semibold tracking-[-0.04em]">
                                    Recent articles
                                    <span className="text-[#4C6CE5]">.</span>
                                </h2>
                            </div>

                            <Link
                                href="/posts"
                                className="inline-flex items-center gap-2 text-xs font-semibold hover:text-[#4C6CE5]"
                            >
                                View all
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>

                        {recentPosts.length === 0 ? (
                            <div className="flex min-h-[240px] flex-col items-center justify-center border border-dashed border-[#CAD5E8] px-6 text-center">
                                <BookOpen
                                    size={28}
                                    className="mb-4 text-[#8FA5C5]"
                                />

                                <h3 className="text-lg font-semibold">
                                    No articles yet
                                </h3>

                                <p className="mt-2 text-sm text-[#72809A]">
                                    Start creating your first article.
                                </p>

                                <Link
                                    href="/posts/create"
                                    className="mt-5 text-xs font-bold uppercase tracking-wider text-[#4C6CE5]"
                                >
                                    Create article ↗
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-[#DCE3F0]">
                                {recentPosts.map((post, index) => (
                                    <Link
                                        key={post.id}
                                        href={`/posts/${post.id}/edit`}
                                        className="group flex items-center gap-4 py-5 transition-colors hover:bg-[#EFF3FC]"
                                    >
                                        <span className="w-6 shrink-0 text-[11px] font-medium text-[#9AA7BA]">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-base font-semibold tracking-tight transition-colors group-hover:text-[#4C6CE5]">
                                                {post.title}
                                            </h3>

                                            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#8190A8]">
                                                <span>
                                                    {post.user?.name ?? "Unknown author"}
                                                </span>

                                                <span>·</span>

                                                <span>
                                                    {post.category?.name ?? "Uncategorized"}
                                                </span>

                                                <span>·</span>

                                                <span>
                                                    {formatDate(post.created_at)}
                                                </span>
                                            </div>
                                        </div>

                                        <span
                                            className={`hidden shrink-0 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider sm:inline-flex ${
                                                post.status === "published"
                                                    ? "bg-[#E1F0DC] text-[#4C7A43]"
                                                    : "bg-[#FFF0CF] text-[#977125]"
                                            }`}
                                        >
                                            {post.status}
                                        </span>

                                        <ArrowUpRight
                                            size={19}
                                            className="shrink-0 text-[#9AA7BA] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#4C6CE5]"
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Publishing panel */}
                    <aside className="flex flex-col justify-between bg-[#DCE7FF] p-7">
                        <div>
                            <div className="mb-12 flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#526BA5]">
                                    Publishing desk
                                </span>

                                <PenLine
                                    size={20}
                                    className="text-[#4C6CE5]"
                                />
                            </div>

                            <h2 className="text-3xl font-semibold leading-[1.15] tracking-[-0.05em]">
                                Every great story starts with an idea.
                            </h2>

                            <p className="mt-4 text-sm leading-6 text-[#52637E]">
                                Create new articles, organize your content,
                                and keep your publication moving forward.
                            </p>
                        </div>

                        <Link
                            href="/posts/create"
                            className="mt-10 inline-flex items-center justify-between border-t border-[#AFC2E8] pt-4 text-xs font-bold uppercase tracking-wider hover:text-[#4C6CE5]"
                        >
                            Start writing
                            <ArrowRight size={19} />
                        </Link>
                    </aside>
                </section>

                {/* Quick access */}
                <section className="mt-12">
                    <div className="mb-5 flex items-end justify-between border-b border-[#DCE3F0] pb-4">
                        <div>
                            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4C6CE5]">
                                Administration
                            </p>

                            <h2 className="text-2xl font-semibold tracking-[-0.04em]">
                                Quick access
                                <span className="text-[#4C6CE5]">.</span>
                            </h2>
                        </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                        {quickLinks.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group flex items-start justify-between gap-4 border border-[#DCE3F0] bg-white p-5 transition-colors hover:border-[#B7C8EB] hover:bg-[#F0F4FF]"
                                >
                                    <div>
                                        <Icon
                                            size={22}
                                            strokeWidth={1.7}
                                            className="mb-5 text-[#4C6CE5]"
                                        />

                                        <h3 className="text-base font-semibold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-xs leading-5 text-[#72809A]">
                                            {item.description}
                                        </p>
                                    </div>

                                    <ArrowUpRight
                                        size={18}
                                        className="shrink-0 text-[#8190A8] group-hover:text-[#4C6CE5]"
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <footer className="mt-10 border-t border-[#DCE3F0] pt-5 text-[11px] text-[#8190A8]">
                    Blog CMS / Administrative workspace
                </footer>
            </div>
        </AdminLayout>
    );
}
