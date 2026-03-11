import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // TODO: Replace with session-based user data
    const user = {
        name: "Amir Bagjian",
        role: "TEACHER",
        avatar: undefined,
    };

    return (
        <div className="flex h-screen overflow-hidden bg-zinc-50">
            <Sidebar user={user} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header
                    breadcrumbs={[{ label: "Lumio", href: "/dashboard" }]}
                />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
