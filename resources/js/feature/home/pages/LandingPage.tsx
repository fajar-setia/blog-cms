
import { Head, Link } from "@inertiajs/react";

import PublicLayout from "../../../layouts/PublicLayout";

export default function LandingPage() {
    return (
        <PublicLayout>
            <Head title="Stories, Ideas & Perspectives - Blog CMS" />

            <div className="overflow-hidden bg-[#FAFAF7] text-[#24291F]">
                {/* HERO */}
                <section className="mx-auto max-w-[1440px] px-5 pt-9 pb-12 sm:px-8 lg:px-12 lg:pt-12 lg:pb-16">
                    <div className="mb-7 flex items-center justify-between border-b border-[#DDE4D5] pb-4">
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#63843B]">
                            An independent writing space
                        </span>

                        <span className="hidden text-[11px] uppercase tracking-[0.14em] text-[#81877B] sm:block">
                            Read / Write / Discover
                        </span>
                    </div>

                    <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.5fr)]">
                        <div>
                            <h1 className="max-w-[950px] text-[clamp(4rem,9vw,9rem)] font-semibold leading-[0.93] tracking-[-0.075em]">
                                Words
                                <br />
                                that <span className="italic">move</span>
                                <br />
                                <span className="relative inline-block">
                                    people
                                    <span className="text-[#91BD48]">.</span>
                                </span>
                            </h1>
                        </div>

                        <div className="max-w-sm pb-2 lg:justify-self-end">
                            <span className="mb-5 block h-1 w-12 bg-[#91BD48]" />

                            <p className="text-lg leading-[1.65] text-[#555E50]">
                                A home for curious minds, original ideas,
                                and stories worth sharing.
                            </p>

                            <Link
                                href="/blog"
                                className="mt-7 inline-flex items-center justify-between gap-10 bg-[#91BD48] px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:bg-[#7DA637]"
                            >
                                Explore stories
                                <span className="text-xl leading-none">↗</span>
                            </Link>
                        </div>
                    </div>

                    {/* Editorial visual */}
                    <div className="relative mt-12 grid min-h-[280px] overflow-hidden bg-[#DCE8CB] sm:min-h-[360px] lg:mt-14 lg:min-h-[430px] lg:grid-cols-[1fr_0.8fr]">
                        <div className="relative flex flex-col justify-between p-7 sm:p-10 lg:p-14">
                            <span className="text-[11px] font-bold uppercase tracking-[0.18em]">
                                The Journal — A space for expression
                            </span>

                            <div className="relative z-10 max-w-xl">
                                <p className="text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[1.05] tracking-[-0.06em]">
                                    Every story
                                    <br />
                                    starts somewhere.
                                </p>

                                <Link
                                    href="/register"
                                    className="mt-7 inline-flex items-center gap-3 border-b border-[#24291F] pb-2 text-xs font-bold uppercase tracking-[0.12em] hover:text-[#63843B]"
                                >
                                    Start yours
                                    <span>↗</span>
                                </Link>
                            </div>
                        </div>

                        <div className="relative hidden items-center justify-center overflow-hidden bg-[#F6D66B] lg:flex">
                            <div className="absolute -top-20 -right-24 h-[400px] w-[400px] rounded-full border-[55px] border-[#24291F]" />

                            <div className="absolute -bottom-32 -left-28 h-[380px] w-[380px] rounded-full bg-[#91BD48]" />

                            <span className="relative z-10 -rotate-12 text-[220px] font-semibold leading-none tracking-[-0.12em] text-[#24291F]">
                                a*
                            </span>

                            <span className="absolute right-8 bottom-7 text-[11px] font-bold uppercase tracking-[0.2em]">
                                Ideas in motion ↗
                            </span>
                        </div>
                    </div>
                </section>

                {/* INTRODUCTION */}
                <section className="border-y border-[#DDE4D5] bg-[#F1F5E9]">
                    <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.45fr_1fr] lg:gap-16 lg:px-12 lg:py-16">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#63843B]">
                                01 / About the space
                            </p>
                        </div>

                        <div>
                            <h2 className="max-w-4xl text-3xl font-semibold leading-[1.2] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                                Good ideas deserve more than a passing thought.
                            </h2>

                            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                                <p className="max-w-lg text-sm leading-7 text-[#747B6D]">
                                    This is a place to explore different
                                    perspectives, discover meaningful stories,
                                    and share your own voice with the world.
                                </p>

                                <Link
                                    href="/blog"
                                    className="shrink-0 border-b border-[#24291F] pb-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:text-[#63843B]"
                                >
                                    Browse the journal ↗
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* EXPLORE */}
                <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
                    <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                        <div>
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#63843B]">
                                02 / Explore
                            </p>

                            <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                                Find your next
                                <br />
                                great read<span className="text-[#91BD48]">.</span>
                            </h2>
                        </div>

                        <p className="max-w-xs text-sm leading-6 text-[#747B6D]">
                            Different voices, fresh perspectives, and a little
                            inspiration for your day.
                        </p>
                    </div>

                    <Link
                        href="/blog"
                        className="group grid min-h-[220px] items-end gap-6 overflow-hidden bg-[#24291F] p-7 text-[#FAFAF7] transition-colors hover:bg-[#35412D] sm:grid-cols-[1fr_auto] sm:p-10 lg:min-h-[270px]"
                    >
                        <div>
                            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#B8D98B]">
                                Discover the journal
                            </p>

                            <h3 className="text-4xl font-semibold leading-none tracking-[-0.055em] sm:text-6xl">
                                A world of
                                <br />
                                stories awaits.
                            </h3>
                        </div>

                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D7FF3F] text-3xl text-[#24291F] transition-transform group-hover:rotate-45 sm:h-24 sm:w-24 sm:text-5xl">
                            ↗
                        </span>
                    </Link>
                </section>

                {/* WRITER CTA */}
                <section className="bg-[#F5E1DC]">
                    <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-12 lg:py-16">
                        <div>
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#775A53]">
                                03 / Your turn to write
                            </p>

                            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.12] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                                Have something
                                <br />
                                to say?
                            </h2>

                            <p className="mt-4 max-w-lg text-sm leading-7 text-[#775A53]">
                                Your perspective matters. Create an account
                                and start sharing your stories.
                            </p>
                        </div>

                        <Link
                            href="/register"
                            className="inline-flex items-center justify-between gap-12 bg-[#24291F] px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#43503B]"
                        >
                            Become a writer
                            <span className="text-xl leading-none">↗</span>
                        </Link>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
