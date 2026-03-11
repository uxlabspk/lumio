import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login");
    }

    const user = {
        name: session.user.name ?? "User",
        role: session.user.role ?? "USER",
        avatar: session.user.avatar ?? undefined,
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
