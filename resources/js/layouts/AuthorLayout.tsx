
import type { ReactNode } from "react";

import { Navbar, Footer } from "../components/navigation";
import { useAuth } from "../hooks/useAuth";

interface AuthorLayoutProps {
    children: ReactNode;
}

export default function AuthorLayout({
    children,
}: AuthorLayoutProps) {
    const { user } = useAuth();

    return (
        <div
            className="flex min-h-screen flex-col bg-[#F2FFD6]"
            style={
                {
                    "--color-primary": "#16A34A",
                } as React.CSSProperties
            }
        >
            <Navbar />

            <main className="mx-auto w-full max-w-[1440px] flex-1 px-5 py-6 sm:px-8 lg:px-12 lg:py-8">

                {children}
            </main>

            <Footer />
        </div>
    );
}
