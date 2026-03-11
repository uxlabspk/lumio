import { Bell, Pin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, formatDate } from "@/lib/utils";

const announcements = [
    {
        id: "1",
        title: "Mid-term Examination Schedule Released",
        content: "The mid-term examination schedule for all classes has been finalized and released. Please check the exam portal for your class schedule and ensure all students are informed.",
        author: "Principal Johnson",
        role: "Principal",
        date: new Date("2025-02-10"),
        isPinned: true,
        targetRole: "ALL",
    },
    {
        id: "2",
        title: "Parent-Teacher Conference - February 20",
        content: "We will be hosting our annual parent-teacher conference on February 20, 2025. All teachers are required to be present. Please prepare your student performance reports beforehand.",
        author: "School Admin",
        role: "Admin",
        date: new Date("2025-02-09"),
        isPinned: true,
        targetRole: "TEACHER",
    },
    {
        id: "3",
        title: "Sports Day Rescheduled to February 28",
        content: "Due to the weather forecast, the annual sports day has been rescheduled from February 21 to February 28. All sports activities and competitions remain the same.",
        author: "Mr. Davidson",
        role: "Teacher",
        date: new Date("2025-02-08"),
        isPinned: false,
        targetRole: "ALL",
    },
    {
        id: "4",
        title: "Library New Book Arrivals",
        content: "The school library has received 200 new books covering science, literature, and history. Students are encouraged to visit and borrow books. Borrowing period is 2 weeks.",
        author: "Librarian",
        role: "Staff",
        date: new Date("2025-02-06"),
        isPinned: false,
        targetRole: "STUDENT",
    },
    {
        id: "5",
        title: "Online Learning Platform Update",
        content: "Our online learning platform has been updated with new features including video lectures, interactive quizzes, and a discussion forum. All students and teachers have been granted access.",
        author: "IT Department",
        role: "Staff",
        date: new Date("2025-02-04"),
        isPinned: false,
        targetRole: "ALL",
    },
];

export default function NewsPage() {
    const pinned = announcements.filter((a) => a.isPinned);
    const regular = announcements.filter((a) => !a.isPinned);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">School News</h1>
                    <p className="text-sm text-zinc-500">Announcements and updates for the school community.</p>
                </div>
            </div>

            {/* Pinned */}
            {pinned.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Pin className="h-3.5 w-3.5 text-zinc-500" />
                        <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Pinned</h2>
                    </div>
                    {pinned.map((item) => (
                        <Card key={item.id} className="border-l-4 border-l-zinc-900">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-semibold text-zinc-900">{item.title}</h3>
                                        <Badge variant="default" className="text-[10px]">{item.targetRole}</Badge>
                                    </div>
                                    <span className="text-xs text-zinc-400 shrink-0 ml-2">{formatDate(item.date)}</span>
                                </div>
                                <p className="text-sm text-zinc-600 leading-relaxed">{item.content}</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback className="text-[9px]">{getInitials(item.author)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-zinc-500">{item.author}</span>
                                    <span className="text-zinc-300">·</span>
                                    <span className="text-xs text-zinc-400">{item.role}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Regular */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Bell className="h-3.5 w-3.5 text-zinc-500" />
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Recent</h2>
                </div>
                {regular.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-semibold text-zinc-900">{item.title}</h3>
                                    <Badge variant="outline" className="text-[10px]">{item.targetRole}</Badge>
                                </div>
                                <span className="text-xs text-zinc-400 shrink-0 ml-2">{formatDate(item.date)}</span>
                            </div>
                            <p className="text-sm text-zinc-600 leading-relaxed">{item.content}</p>
                            <div className="mt-3 flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-[9px]">{getInitials(item.author)}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-zinc-500">{item.author}</span>
                                <span className="text-zinc-300">·</span>
                                <span className="text-xs text-zinc-400">{item.role}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
