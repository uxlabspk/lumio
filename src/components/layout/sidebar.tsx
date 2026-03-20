"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    ClipboardCheck,
    GraduationCap,
    FileText,
    Calendar,
    Users,
    MessageSquare,
    BarChart3,
    PieChart,
    Settings,
    Newspaper,
    Activity,
    Zap,
    ChevronLeft,
    ChevronRight,
    LogOut,
    UserPlus,
    School,
    UserCheck,
    Award,
    BookOpenCheck,
} from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { resolveDashboardRole, type DashboardRole } from "@/lib/roles";

const mainNav = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard, roles: ["ADMIN", "TEACHER", "STUDENT"] as DashboardRole[] },

    // Admin-specific: Enrollment, Class & Teacher Management
    { label: "Enrollment", href: "/dashboard/enrollment", icon: UserPlus, roles: ["ADMIN"] as DashboardRole[] },
    { label: "Classes", href: "/dashboard/classes", icon: School, roles: ["ADMIN"] as DashboardRole[] },
    { label: "Teachers", href: "/dashboard/teachers", icon: UserCheck, roles: ["ADMIN"] as DashboardRole[] },

    // Teacher: Student & Grade Management
    { label: "Students", href: "/dashboard/students", icon: Users, roles: ["TEACHER"] as DashboardRole[] },
    { label: "Grades", href: "/dashboard/grades", icon: Award, roles: ["TEACHER"] as DashboardRole[] },
    { label: "Class Preparation", href: "/dashboard/class-prep", icon: BookOpen, roles: ["TEACHER"] as DashboardRole[] },
    { label: "Assignments", href: "/dashboard/assignments", icon: FileText, roles: ["TEACHER"] as DashboardRole[] },
    { label: "Exams", href: "/dashboard/exams", icon: GraduationCap, roles: ["TEACHER"] as DashboardRole[] },
    { label: "Attendance", href: "/dashboard/attendance", icon: ClipboardCheck, roles: ["TEACHER"] as DashboardRole[] },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, roles: ["TEACHER"] as DashboardRole[] },
    { label: "Reports", href: "/dashboard/reports", icon: PieChart, roles: ["TEACHER"] as DashboardRole[] },

    // Student: View-only Access
    { label: "My Classes", href: "/dashboard/my-classes", icon: BookOpenCheck, roles: ["STUDENT"] as DashboardRole[] },
    { label: "My Grades", href: "/dashboard/my-grades", icon: Award, roles: ["STUDENT"] as DashboardRole[] },
    { label: "My Enrollment", href: "/dashboard/my-enrollment", icon: UserPlus, roles: ["STUDENT"] as DashboardRole[] },
    { label: "My Assignments", href: "/dashboard/my-assignments", icon: FileText, roles: ["STUDENT"] as DashboardRole[] },
    { label: "My Exams", href: "/dashboard/my-exams", icon: GraduationCap, roles: ["STUDENT"] as DashboardRole[] },
    { label: "My Attendance", href: "/dashboard/my-attendance", icon: ClipboardCheck, roles: ["STUDENT"] as DashboardRole[] },

    // Common
    { label: "Schedule", href: "/dashboard/schedule", icon: Calendar, roles: ["ADMIN", "TEACHER", "STUDENT"] as DashboardRole[] },
    { label: "Messages", href: "/dashboard/messages", icon: MessageSquare, roles: ["ADMIN", "TEACHER", "STUDENT"] as DashboardRole[] },
];

const secondaryNav = [
    { label: "School News", href: "/dashboard/news", icon: Newspaper, roles: ["ADMIN", "TEACHER", "STUDENT"] as DashboardRole[] },
    { label: "School Activities", href: "/dashboard/activities", icon: Activity, roles: ["ADMIN", "TEACHER", "STUDENT"] as DashboardRole[] },
    { label: "Whats New", href: "/dashboard/whats-new", icon: Zap, roles: ["ADMIN", "TEACHER", "STUDENT"] as DashboardRole[] },
];

interface SidebarProps {
    user?: {
        name: string;
        role: string;
        avatar?: string;
    };
}

export function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const dashboardRole = resolveDashboardRole(user?.role);

    const visibleMainNav = mainNav.filter((item) => item.roles.includes(dashboardRole));
    const visibleSecondaryNav = secondaryNav.filter((item) => item.roles.includes(dashboardRole));

    return (
        <aside
            className={cn(
                "relative flex h-screen flex-col border-r border-zinc-100 bg-white transition-all duration-300",
                collapsed ? "w-16" : "w-56"
            )}
        >
            {/* Logo */}
            <div className="flex h-14 items-center gap-3 border-b border-zinc-100 px-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900">
                    <span className="text-sm font-bold text-white">L</span>
                </div>
                {!collapsed && (
                    <span className="text-base font-semibold text-zinc-900">Lumio</span>
                )}
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-13 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm hover:text-zinc-900 transition-colors"
            >
                {collapsed ? (
                    <ChevronRight className="h-3 w-3" />
                ) : (
                    <ChevronLeft className="h-3 w-3" />
                )}
            </button>

            {/* Main Nav */}
            <div className="flex-1 overflow-y-auto py-4">
                {!collapsed && (
                    <p className="mb-1 px-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        Main menu
                    </p>
                )}
                <nav className="flex flex-col gap-0.5 px-2">
                    {visibleMainNav.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                            item.href === "/dashboard"
                                ? pathname === "/dashboard"
                                : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-zinc-100 text-zinc-900"
                                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                                )}
                                title={collapsed ? item.label : undefined}
                            >
                                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-zinc-900" : "text-zinc-400")} />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Secondary Nav */}
                <div className="mt-6">
                    {!collapsed && (
                        <p className="mb-1 px-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                            Settings and news
                        </p>
                    )}
                    <nav className="flex flex-col gap-0.5 px-2">
                        {visibleSecondaryNav.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-zinc-100 text-zinc-900"
                                            : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                                    )}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-zinc-900" : "text-zinc-400")} />
                                    {!collapsed && <span>{item.label}</span>}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Bottom section */}
            <div className="border-t border-zinc-100 p-3">
                <Link
                    href="/dashboard/settings"
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors",
                        pathname.startsWith("/dashboard/settings") && "bg-zinc-100 text-zinc-900"
                    )}
                    title={collapsed ? "Settings" : undefined}
                >
                    <Settings className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Settings</span>}
                </Link>

                {/* User */}
                <div className="mt-2 flex items-center gap-2 rounded-lg px-2.5 py-2">
                    <Avatar className="h-7 w-7 shrink-0">
                        {user?.avatar && <AvatarImage src={user.avatar} />}
                        <AvatarFallback className="text-[10px]">
                            {getInitials(user?.name ?? "U")}
                        </AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-zinc-900">
                                {user?.name ?? "User"}
                            </p>
                            <p className="truncate text-[10px] text-zinc-400 capitalize">
                                {user?.role?.toLowerCase().replace("_", " ") ?? ""}
                            </p>
                        </div>
                    )}
                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        title="Sign out"
                        className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-zinc-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
