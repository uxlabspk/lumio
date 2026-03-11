import { BookOpen, Clock, Users, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSubjectBgColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

const preparations = [
    {
        subject: "Mathematics",
        topic: "Quadratic Equations",
        class: "Class 302",
        duration: "45 min",
        materials: 4,
        status: "READY",
        date: "Today",
    },
    {
        subject: "Physics",
        topic: "Newton's Laws of Motion",
        class: "Class 304",
        duration: "50 min",
        materials: 3,
        status: "IN_PROGRESS",
        date: "Today",
    },
    {
        subject: "Art",
        topic: "Introduction to Watercolors",
        class: "Class 302",
        duration: "60 min",
        materials: 6,
        status: "READY",
        date: "Tomorrow",
    },
    {
        subject: "English",
        topic: "Shakespeare's Hamlet - Act III",
        class: "Class 303",
        duration: "45 min",
        materials: 2,
        status: "DRAFT",
        date: "Feb 14",
    },
];

const statusConfig = {
    READY: { label: "Ready", variant: "success" as const, icon: CheckCircle },
    IN_PROGRESS: { label: "In Progress", variant: "warning" as const, icon: Clock },
    DRAFT: { label: "Draft", variant: "outline" as const, icon: BookOpen },
};

export default function ClassPrepPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-zinc-900">Class Preparation</h1>
                <p className="text-sm text-zinc-500">Manage your lesson plans and class materials.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                    { label: "Lessons Ready", value: "8", icon: CheckCircle, color: "text-emerald-500 bg-emerald-50" },
                    { label: "In Progress", value: "3", icon: Clock, color: "text-orange-500 bg-orange-50" },
                    { label: "Total Students", value: "96", icon: Users, color: "text-blue-500 bg-blue-50" },
                ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label}>
                            <CardContent className="flex items-center gap-3 p-4">
                                <div className={`rounded-lg p-2.5 ${stat.color.split(" ")[1]}`}>
                                    <Icon className={`h-5 w-5 ${stat.color.split(" ")[0]}`} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
                                    <p className="text-xs text-zinc-500">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="space-y-3">
                {preparations.map((prep, i) => {
                    const status = statusConfig[prep.status as keyof typeof statusConfig];
                    const bgColor = getSubjectBgColor(prep.subject);

                    return (
                        <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                    <div className={cn("rounded-lg p-3 border", bgColor)}>
                                        <BookOpen className="h-5 w-5 text-zinc-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="text-sm font-semibold text-zinc-900">{prep.topic}</h3>
                                            <Badge variant={status.variant} className="text-[10px]">{status.label}</Badge>
                                        </div>
                                        <p className="text-xs text-zinc-500">{prep.subject} · {prep.class}</p>
                                    </div>
                                    <div className="flex items-center gap-6 text-xs text-zinc-500 shrink-0">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5 text-zinc-400" />
                                            {prep.duration}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <BookOpen className="h-3.5 w-3.5 text-zinc-400" />
                                            {prep.materials} materials
                                        </div>
                                        <span className="text-zinc-400">{prep.date}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
