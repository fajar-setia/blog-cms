import type { ReactNode } from "react";

import {Navbar, Footer} from "../components/navigation";

interface PublicLayoutProps {
    children: ReactNode;
}

export default function PublicLayout({
    children,
}: PublicLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer/>
        </div>
    );
}
