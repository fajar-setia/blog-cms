
import { useState } from "react";
import type { ReactNode } from "react";

import { AdminHeader, Sidebar } from "../components/navigation";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F7F8FC] font-sans text-[#14223B]">
            <Sidebar
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                onToggleCollapse={() => setCollapsed((prev) => !prev)}
                onCloseMobile={() => setMobileOpen(false)}
            />

            <div
                className={`min-w-0 transition-all duration-200 ${
                    collapsed ? "lg:pl-[76px]" : "lg:pl-[260px]"
                }`}
            >
                <AdminHeader
                    onOpenSidebar={() => setMobileOpen(true)}
                />

                <main className="mx-auto w-full max-w-[1600px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
                    {children}
                </main>
            </div>
        </div>
    );
}
