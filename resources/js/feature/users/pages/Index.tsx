
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Search,
    ShieldCheck,
    Trash2,
    UserRound,
    Users,
    X,
} from "lucide-react";

import AdminLayout from "../../../layouts/AdminLayout";
import { useAuth } from "../../../hooks/useAuth";

interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "author";
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    users: {
        data: User[];
        total: number;
        current_page: number;
        last_page: number;
        from: number | null;
        to: number | null;
        prev_page_url: string | null;
        next_page_url: string | null;
        links: PaginationLink[];
    };
    roleCounts: {
        admins: number;
        authors: number;
    };
}

export default function Index({ users, roleCounts }: Props) {
    const { user: currentUser } = useAuth();
    const { errors } = usePage().props;

    const [search, setSearch] = useState("");
    const [processingId, setProcessingId] = useState<number | null>(null);

    const filteredUsers = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) return users.data;

        return users.data.filter(
            (user) =>
                user.name.toLowerCase().includes(keyword) ||
                user.email.toLowerCase().includes(keyword) ||
                user.role.toLowerCase().includes(keyword),
        );
    }, [users.data, search]);

    const handleChangeRole = (user: User) => {
        const nextRole = user.role === "admin" ? "author" : "admin";

        if (
            !window.confirm(
                `Change ${user.name}'s role to ${nextRole}?`,
            )
        ) {
            return;
        }

        setProcessingId(user.id);

        router.patch(
            `/users/${user.id}/role`,
            { role: nextRole },
            {
                preserveScroll: true,
                onFinish: () => setProcessingId(null),
            },
        );
    };

    const handleDelete = (user: User) => {
        if (
            !window.confirm(
                `Are you sure you want to delete "${user.name}"? This action cannot be undone.`,
            )
        ) {
            return;
        }

        setProcessingId(user.id);

        router.delete(`/users/${user.id}`, {
            preserveScroll: true,
            onFinish: () => setProcessingId(null),
        });
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    const getInitials = (name: string) =>
        name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join("");

    return (
        <AdminLayout>
            <Head title="Users - Blog CMS" />

            <div className="text-[#14223B]">
                {/* Page heading */}
                <header className="mb-8 flex flex-wrap items-end justify-between gap-5 border-b border-[#DCE3F0] pb-7">
                    <div>
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#4C6CE5]">
                            Administration / People
                        </p>

                        <h1 className="text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">
                            People
                            <span className="text-[#4C6CE5]">.</span>
                        </h1>

                        <p className="mt-3 text-sm text-[#72809A]">
                            Manage the people behind your publication.
                        </p>
                    </div>

                    <span className="flex h-12 w-12 items-center justify-center bg-[#E7EDFA] text-[#4C6CE5]">
                        <Users size={23} strokeWidth={1.7} />
                    </span>
                </header>

                {/* Statistics */}
                <section className="mb-10 grid grid-cols-3 border-y border-[#DCE3F0]">
                    {[
                        {
                            label: "Total members",
                            value: users.total,
                            icon: Users,
                        },
                        {
                            label: "Administrators",
                            value: roleCounts.admins,
                            icon: ShieldCheck,
                        },
                        {
                            label: "Authors",
                            value: roleCounts.authors,
                            icon: UserRound,
                        },
                    ].map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.label}
                                className="min-w-0 border-r border-[#DCE3F0] px-3 py-6 last:border-r-0 sm:px-7 sm:first:pl-0"
                            >
                                <div className="mb-5 flex items-center justify-between gap-2">
                                    <span className="text-[11px] text-[#72809A] sm:text-xs">
                                        {stat.label}
                                    </span>

                                    <Icon
                                        size={17}
                                        className="hidden text-[#8190A8] sm:block"
                                    />
                                </div>

                                <p className="text-3xl font-semibold tracking-[-0.06em] sm:text-5xl">
                                    {stat.value.toLocaleString()}
                                </p>
                            </div>
                        );
                    })}
                </section>

                {/* Directory */}
                <section>
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
                        <div>
                            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4C6CE5]">
                                Member directory
                            </p>

                            <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                                All members
                                <span className="text-[#4C6CE5]">.</span>
                            </h2>
                        </div>

                        <div className="relative w-full sm:w-[270px]">
                            <Search
                                size={17}
                                className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#8190A8]"
                            />

                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search this page..."
                                aria-label="Search members on current page"
                                className="w-full border border-[#DCE3F0] bg-white py-3 pr-10 pl-10 text-sm text-[#14223B] outline-none placeholder:text-[#9AA7BA] focus:border-[#4C6CE5]"
                            />

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    aria-label="Clear search"
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-[#8190A8] hover:text-[#14223B]"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {(typeof errors.role === "string" ||
                        typeof errors.delete === "string") && (
                        <div
                            role="alert"
                            className="mb-5 border-l-2 border-[#D65C5C] bg-[#FFF0F0] px-4 py-3 text-sm text-[#B44545]"
                        >
                            {typeof errors.role === "string"
                                ? errors.role
                                : errors.delete}
                        </div>
                    )}

                    <div className="overflow-x-auto border-t border-[#DCE3F0]">
                        <table className="w-full min-w-[720px] text-left">
                            <thead>
                                <tr className="border-b border-[#DCE3F0] text-[10px] font-bold uppercase tracking-[0.12em] text-[#8190A8]">
                                    <th className="py-4 pr-4 font-semibold">
                                        Member
                                    </th>
                                    <th className="px-4 py-4 font-semibold">
                                        Role
                                    </th>
                                    <th className="px-4 py-4 font-semibold">
                                        Joined
                                    </th>
                                    <th className="py-4 pl-4 text-right font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[#DCE3F0]">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="py-16 text-center"
                                        >
                                            <UserRound
                                                size={28}
                                                className="mx-auto mb-3 text-[#9AA7BA]"
                                            />

                                            <p className="text-sm font-semibold">
                                                No members found
                                            </p>

                                            <p className="mt-2 text-xs text-[#8190A8]">
                                                Try another search keyword.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => {
                                        const isSelf =
                                            currentUser?.id === user.id;

                                        const isProcessing =
                                            processingId === user.id;

                                        return (
                                            <tr
                                                key={user.id}
                                                className="group transition-colors hover:bg-[#EFF3FC]"
                                            >
                                                <td className="py-4 pr-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#E7EDFA] text-xs font-bold text-[#4C6CE5]">
                                                            {getInitials(user.name)}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-semibold">
                                                                    {user.name}
                                                                </p>

                                                                {isSelf && (
                                                                    <span className="bg-[#DCE7FF] px-2 py-0.5 text-[10px] font-bold text-[#4C6CE5]">
                                                                        YOU
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <p className="mt-1 text-xs text-[#8190A8]">
                                                                {user.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span
                                                        className={`inline-flex px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                                                            user.role === "admin"
                                                                ? "bg-[#E7EDFA] text-[#4C6CE5]"
                                                                : "bg-[#E8F2E2] text-[#568044]"
                                                        }`}
                                                    >
                                                        {user.role}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4 text-xs text-[#72809A]">
                                                    {formatDate(user.created_at)}
                                                </td>

                                                <td className="py-4 pl-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            disabled={
                                                                isSelf ||
                                                                processingId !== null
                                                            }
                                                            onClick={() =>
                                                                handleChangeRole(user)
                                                            }
                                                            className="inline-flex items-center gap-2 border border-[#DCE3F0] bg-white px-3 py-2 text-[11px] font-semibold text-[#52637E] transition-colors hover:border-[#4C6CE5] hover:text-[#4C6CE5] disabled:cursor-not-allowed disabled:opacity-40"
                                                        >
                                                            {isProcessing
                                                                ? "Processing..."
                                                                : user.role === "admin"
                                                                  ? "Make author"
                                                                  : "Make admin"}

                                                            {!isProcessing && (
                                                                <ArrowUpRight size={14} />
                                                            )}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                isSelf ||
                                                                processingId !== null
                                                            }
                                                            onClick={() =>
                                                                handleDelete(user)
                                                            }
                                                            title={`Delete ${user.name}`}
                                                            aria-label={`Delete ${user.name}`}
                                                            className="flex h-[34px] w-[34px] items-center justify-center border border-[#DCE3F0] bg-white text-[#8190A8] transition-colors hover:border-[#D65C5C] hover:bg-[#FFF0F0] hover:text-[#D65C5C] disabled:cursor-not-allowed disabled:opacity-40"
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#DCE3F0] pt-5">
                        <p className="text-xs text-[#8190A8]">
                            Showing {users.from ?? 0}–{users.to ?? 0} of{" "}
                            {users.total} members
                        </p>

                        {users.last_page > 1 && (
                            <div className="flex items-center gap-2">
                                {users.prev_page_url ? (
                                    <Link
                                        href={users.prev_page_url}
                                        preserveScroll
                                        className="flex h-9 w-9 items-center justify-center border border-[#DCE3F0] bg-white hover:border-[#4C6CE5]"
                                        aria-label="Previous page"
                                    >
                                        <ArrowLeft size={16} />
                                    </Link>
                                ) : (
                                    <span className="flex h-9 w-9 items-center justify-center border border-[#DCE3F0] text-[#B7C1D0]">
                                        <ArrowLeft size={16} />
                                    </span>
                                )}

                                <span className="px-3 text-xs font-semibold">
                                    {users.current_page} / {users.last_page}
                                </span>

                                {users.next_page_url ? (
                                    <Link
                                        href={users.next_page_url}
                                        preserveScroll
                                        className="flex h-9 w-9 items-center justify-center border border-[#DCE3F0] bg-white hover:border-[#4C6CE5]"
                                        aria-label="Next page"
                                    >
                                        <ArrowRight size={16} />
                                    </Link>
                                ) : (
                                    <span className="flex h-9 w-9 items-center justify-center border border-[#DCE3F0] text-[#B7C1D0]">
                                        <ArrowRight size={16} />
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <div className="mt-10 flex items-center justify-between gap-3 border-t border-[#DCE3F0] pt-5">
                    <span className="text-[11px] text-[#8190A8]">
                        Blog CMS / People management
                    </span>

                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-[#52637E] hover:text-[#4C6CE5]"
                    >
                        Back to overview
                        <ArrowUpRight size={15} />
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
