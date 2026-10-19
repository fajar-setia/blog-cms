
import { Head, Link } from "@inertiajs/react";
import AuthorLayout from "../../../layouts/AuthorLayout";
import { useAuth } from "../../../hooks/useAuth";

interface RecentPost {
    id: number;
    title: string;
    slug: string;
    status: "draft" | "published";
    cover_image: string | null;
    created_at: string;
    category: {
        id: number;
        name: string;
    } | null;
}

interface BerandaProps {
    stats: {
        total: number;
        published: number;
        draft: number;
    };
    recentPosts: RecentPost[];
}

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const coverUrl = (post: RecentPost) =>
    post.cover_image
        ? `/storage/${post.cover_image}`
        : null;

function PostCover({
    post,
    className = "",
}: {
    post: RecentPost;
    className?: string;
}) {
    const src = coverUrl(post);

    return src ? (
        <img
            src={src}
            alt={post.title}
            className={`h-full w-full object-cover ${className}`}
        />
    ) : (
        <div
            className={`flex h-full w-full items-center justify-center bg-author-soft ${className}`}
        >
            <span className="font-serif text-7xl italic text-author-primary">
                a.
            </span>
        </div>
    );
}

export default function Index({
    stats,
    recentPosts,
}: BerandaProps) {
    const { user } = useAuth();

    const featuredPost = recentPosts?.[0];
    const otherPosts = (recentPosts ?? []).slice(1, 5);

    return (
        <AuthorLayout>
            <Head title="Author Home" />

            <div className="text-author-text">
                {/* Editorial masthead */}
                <header className="mb-6 border-b border-author-border pb-5">
                    <div className="mb-3 flex items-center justify-between gap-4">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-author-muted">
                            Your editorial space
                        </span>

                        <span className="text-[11px] font-medium uppercase tracking-widest text-author-muted">
                            Author / Home
                        </span>
                    </div>

                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <h1 className="font-sans text-4xl font-bold leading-tight tracking-[-0.045em] sm:text-5xl lg:text-[56px]">
                                The writing desk<span className="text-author-primary">.</span>
                            </h1>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-author-muted">
                                Welcome back, {user?.name ?? "Author"}.
                                A place to pick up where you left off,
                                explore your latest work, and start something new.
                            </p>
                        </div>

                        <Link
                            href="/posts/create"
                            className="inline-flex shrink-0 items-center justify-center gap-4 self-start bg-author-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:bg-author-primary-hover md:self-auto"
                        >
                            Write a story
                            <span className="text-lg leading-none">↗</span>
                        </Link>
                    </div>
                </header>

                {/* Section heading */}
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-author-primary" />
                        <p className="text-xs font-bold uppercase tracking-[0.16em]">
                            From your desk
                        </p>
                    </div>

                    <span className="text-xs text-author-muted">
                        Latest writing
                    </span>
                </div>

                {/* Main editorial layout */}
                <section className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(310px,0.8fr)] lg:gap-7">
                    <div className="min-w-0">
                        {featuredPost ? (
                            <article className="group">
                                <Link
                                    href={`/posts/${featuredPost.id}/preview`}
                                    className="block"
                                >
                                    <div className="relative aspect-[16/8.5] overflow-hidden bg-author-soft">
                                        <PostCover
                                            post={featuredPost}
                                            className="transition-transform duration-500 group-hover:scale-[1.035]"
                                        />

                                        <span className="absolute left-5 top-5 bg-author-surface px-3 py-2 text-[10px] font-bold uppercase tracking-widest">
                                            {featuredPost.status}
                                        </span>
                                    </div>

                                    <div className="pt-4">
                                        <div className="mb-2 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-author-muted">
                                            <span className="text-author-primary-hover">
                                                {featuredPost.category?.name ?? "Uncategorized"}
                                            </span>
                                            <span>—</span>
                                            <span>{formatDate(featuredPost.created_at)}</span>
                                        </div>

                                        <h2 className="max-w-3xl font-sans text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-author-primary-hover sm:text-3xl lg:text-[34px]">
                                            {featuredPost.title}
                                        </h2>
                                    </div>
                                </Link>

                                <div className="mt-4 flex items-center gap-5">
                                    <Link
                                        href={`/posts/${featuredPost.id}/preview`}
                                        className="border-b border-author-text pb-1 text-xs font-bold uppercase tracking-widest"
                                    >
                                        Read preview ↗
                                    </Link>

                                    <Link
                                        href={`/posts/${featuredPost.id}/edit`}
                                        className="text-xs font-semibold uppercase tracking-widest text-author-muted hover:text-author-text"
                                    >
                                        Edit article
                                    </Link>
                                </div>
                            </article>
                        ) : (
                            <div className="flex min-h-[340px] flex-col justify-center bg-author-soft px-8 py-12 sm:px-14">
                                <span className="mb-4 font-serif text-6xl italic text-author-primary">
                                    a.
                                </span>

                                <h2 className="max-w-md text-3xl font-bold tracking-tight sm:text-4xl">
                                    Your first story starts here.
                                </h2>

                                <p className="mt-3 max-w-sm text-sm leading-6 text-author-muted">
                                    You haven't written anything yet.
                                    Create your first article to see it here.
                                </p>

                                <Link
                                    href="/posts/create"
                                    className="mt-5 w-fit border-b border-author-text pb-1 text-xs font-bold uppercase tracking-widest"
                                >
                                    Start writing ↗
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Latest posts */}
                    <aside className="min-w-0 border-t border-author-border pt-4 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                        <div className="mb-4 flex items-baseline justify-between">
                            <h3 className="text-2xl font-bold tracking-tight">
                                Latest posts
                            </h3>

                            <span className="text-xs text-author-muted">
                                01 — 04
                            </span>
                        </div>

                        <div className="divide-y divide-author-border">
                            {otherPosts.map((post, index) => (
                                <article
                                    key={post.id}
                                    className="group py-3.5 first:pt-0"
                                >
                                    <Link
                                        href={`/posts/${post.id}/preview`}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="h-[80px] w-[100px] shrink-0 overflow-hidden bg-author-soft sm:w-[108px]">
                                            <PostCover
                                                post={post}
                                                className="transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-author-primary-hover">
                                                {post.category?.name ?? "Uncategorized"}
                                            </p>

                                            <h4 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-author-primary-hover">
                                                {post.title}
                                            </h4>

                                            <p className="mt-1.5 text-[11px] text-author-muted">
                                                {formatDate(post.created_at)}
                                            </p>
                                        </div>

                                        <span className="hidden text-xs text-author-muted xl:block">
                                            0{index + 1}
                                        </span>
                                    </Link>
                                </article>
                            ))}

                            {otherPosts.length === 0 && (
                                <p className="py-10 text-sm leading-7 text-author-muted">
                                    More articles will appear here as you write.
                                </p>
                            )}
                        </div>

                        <Link
                            href="/posts"
                            className="mt-4 inline-flex items-center gap-4 border-b border-author-text pb-2 text-xs font-bold uppercase tracking-widest transition-colors hover:text-author-primary-hover"
                        >
                            Browse all articles
                            <span>↗</span>
                        </Link>
                    </aside>
                </section>

                {/* Editorial statistics */}
                <section className="mt-11 border-t border-author-border pt-7 lg:mt-12">
                    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-author-primary-hover">
                                A little progress report
                            </p>

                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Your work, in numbers.
                            </h2>
                        </div>

                        <Link
                            href="/posts"
                            className="w-fit border-b border-author-text pb-1 text-xs font-bold uppercase tracking-widest"
                        >
                            Manage articles ↗
                        </Link>
                    </div>

                    <div className="grid border-y border-author-border sm:grid-cols-3">
                        {[
                            {
                                number: stats?.total ?? 0,
                                label: "Total articles",
                                description: "Everything you've written",
                            },
                            {
                                number: stats?.published ?? 0,
                                label: "Published",
                                description: "Available for readers",
                            },
                            {
                                number: stats?.draft ?? 0,
                                label: "In draft",
                                description: "Still being worked on",
                            },
                        ].map((item, index) => (
                            <div
                                key={item.label}
                                className={`py-5 sm:px-7 ${
                                    index !== 0
                                        ? "border-t border-author-border sm:border-l sm:border-t-0"
                                        : ""
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <span className="text-[11px] font-semibold uppercase tracking-widest text-author-muted">
                                        {item.label}
                                    </span>

                                    <span className="text-xs text-author-muted">
                                        0{index + 1}
                                    </span>
                                </div>

                                <p className="mt-4 text-5xl font-bold leading-none tracking-tight sm:text-6xl">
                                    {String(item.number).padStart(2, "0")}
                                </p>

                                <p className="mt-2 text-xs text-author-muted">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AuthorLayout>
    );
}
