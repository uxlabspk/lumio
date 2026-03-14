import {
    Users,
    GraduationCap,
    ClipboardCheck,
    TrendingUp,
    ArrowUp,
    ArrowDown,
    BookOpen,
    Bell,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { resolveDashboardRole, type DashboardRole } from "@/lib/roles";

const stats = [
    {
        label: "Total Students",
        value: "1,284",
        change: "+12%",
        up: true,
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
    {
        label: "Total Teachers",
        value: "86",
        change: "+4%",
        up: true,
        icon: GraduationCap,
        color: "text-purple-500",
        bg: "bg-purple-50",
    },
    {
        label: "Attendance Today",
        value: "94.2%",
        change: "-1.3%",
        up: false,
        icon: ClipboardCheck,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
    },
    {
        label: "Avg Performance",
        value: "78.5",
        change: "+5%",
        up: true,
        icon: TrendingUp,
        color: "text-orange-500",
        bg: "bg-orange-50",
    },
];

const recentStudents = [
    { name: "James Wilson", class: "Class 302", status: "PRESENT" },
    { name: "Hannah Turner", class: "Class 302", status: "ABSENT" },
    { name: "Emily Carter", class: "Class 303", status: "PRESENT" },
    { name: "Nicholas White", class: "Class 303", status: "LATE" },
    { name: "Sarah Anderson", class: "Class 304", status: "PRESENT" },
];

const upcomingExams = [
    { title: "Math Exam", class: "Class 302", date: "Feb 12", days: 4, color: "bg-blue-50 border-blue-100" },
    { title: "English Exam", class: "Class 303", date: "Feb 13", days: 5, color: "bg-yellow-50 border-yellow-100" },
    { title: "Physics Exam", class: "Class 302", date: "Feb 15", days: 7, color: "bg-purple-50 border-purple-100" },
];

const announcements = [
    {
        title: "Mid-term exam schedule released",
        time: "2 hours ago",
        type: "EXAM",
    },
    {
        title: "Parent-teacher meeting on Feb 20",
        time: "1 day ago",
        type: "GENERAL",
    },
    {
        title: "Sports day postponed to Feb 28",
        time: "2 days ago",
        type: "ACTIVITY",
    },
];

const statusConfig = {
    PRESENT: { label: "Present", variant: "success" as const },
    ABSENT: { label: "Absent", variant: "destructive" as const },
    LATE: { label: "Late", variant: "warning" as const },
};

const quickActionsByRole: Record<DashboardRole, Array<{ label: string; href: string; icon: typeof ClipboardCheck; color: string }>> = {
    ADMIN: [
        { label: "Take Attendance", href: "/dashboard/attendance", icon: ClipboardCheck, color: "text-emerald-500 bg-emerald-50" },
        { label: "Add Assignment", href: "/dashboard/assignments", icon: BookOpen, color: "text-blue-500 bg-blue-50" },
        { label: "Schedule Exam", href: "/dashboard/exams", icon: GraduationCap, color: "text-purple-500 bg-purple-50" },
        { label: "Announcement", href: "/dashboard/news", icon: Bell, color: "text-orange-500 bg-orange-50" },
    ],
    TEACHER: [
        { label: "Take Attendance", href: "/dashboard/attendance", icon: ClipboardCheck, color: "text-emerald-500 bg-emerald-50" },
        { label: "Add Assignment", href: "/dashboard/assignments", icon: BookOpen, color: "text-blue-500 bg-blue-50" },
        { label: "Schedule Exam", href: "/dashboard/exams", icon: GraduationCap, color: "text-purple-500 bg-purple-50" },
        { label: "Class Prep", href: "/dashboard/class-prep", icon: BookOpen, color: "text-indigo-500 bg-indigo-50" },
    ],
    STUDENT: [
        { label: "My Assignments", href: "/dashboard/assignments", icon: BookOpen, color: "text-blue-500 bg-blue-50" },
        { label: "Exam Schedule", href: "/dashboard/exams", icon: GraduationCap, color: "text-purple-500 bg-purple-50" },
        { label: "My Attendance", href: "/dashboard/attendance", icon: ClipboardCheck, color: "text-emerald-500 bg-emerald-50" },
        { label: "School News", href: "/dashboard/news", icon: Bell, color: "text-orange-500 bg-orange-50" },
    ],
};

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const dashboardRole = resolveDashboardRole(session?.user?.role);
    const quickActions = quickActionsByRole[dashboardRole];

    return (
        <div className="space-y-6">
            {/* Page title */}
            <div>
                <h1 className="text-xl font-semibold text-zinc-900">Overview</h1>
                <p className="text-sm text-zinc-500">Welcome back! Here&apos;s what&apos;s happening today.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label}>
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-zinc-500">{stat.label}</p>
                                        <p className="mt-1 text-2xl font-semibold text-zinc-900">{stat.value}</p>
                                        <div className="mt-1 flex items-center gap-1 text-xs">
                                            {stat.up ? (
                                                <ArrowUp className="h-3 w-3 text-emerald-500" />
                                            ) : (
                                                <ArrowDown className="h-3 w-3 text-red-500" />
                                            )}
                                            <span className={stat.up ? "text-emerald-600" : "text-red-600"}>
                                                {stat.change}
                                            </span>
                                            <span className="text-zinc-400">vs last month</span>
                                        </div>
                                    </div>
                                    <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                                        <Icon className={`h-5 w-5 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Middle row */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Recent Attendance */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Attendance</CardTitle>
                        <a href="/dashboard/attendance" className="text-xs text-zinc-400 hover:text-zinc-700">
                            View all
                        </a>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentStudents.map((student, i) => {
                                const status = statusConfig[student.status as keyof typeof statusConfig];
                                return (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="text-xs">
                                                    {getInitials(student.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium text-zinc-900">{student.name}</p>
                                                <p className="text-xs text-zinc-400">{student.class}</p>
                                            </div>
                                        </div>
                                        <Badge variant={status.variant}>{status.label}</Badge>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Exams */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Upcoming Exams</CardTitle>
                        <a href="/dashboard/exams" className="text-xs text-zinc-400 hover:text-zinc-700">
                            View all
                        </a>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {upcomingExams.map((exam, i) => (
                                <div key={i} className={`rounded-lg border p-3 ${exam.color}`}>
                                    <p className="text-sm font-medium text-zinc-800">{exam.title}</p>
                                    <p className="mt-0.5 text-xs text-zinc-500">{exam.class}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-xs text-zinc-500">{exam.date}</span>
                                        <Badge variant="default">{exam.days} days left</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Quick actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                            {quickActions.map((action) => {
                                const Icon = action.icon;
                                return (
                                    <a
                                        key={action.label}
                                        href={action.href}
                                        className="flex flex-col items-center gap-2 rounded-lg border border-zinc-100 p-3 hover:bg-zinc-50 transition-colors text-center"
                                    >
                                        <div className={`rounded-lg p-2 ${action.color.split(" ")[1]}`}>
                                            <Icon className={`h-4 w-4 ${action.color.split(" ")[0]}`} />
                                        </div>
                                        <span className="text-xs font-medium text-zinc-700">{action.label}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Announcements */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Announcements</CardTitle>
                        <a href="/dashboard/news" className="text-xs text-zinc-400 hover:text-zinc-700">
                            View all
                        </a>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {announcements.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 rounded-lg border border-zinc-100 p-3">
                                    <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-zinc-900" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-zinc-800">{item.title}</p>
                                        <p className="mt-0.5 text-xs text-zinc-400">{item.time}</p>
                                    </div>
                                    <Badge variant="outline">{item.type}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
