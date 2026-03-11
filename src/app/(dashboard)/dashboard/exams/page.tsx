"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter, Plus, MoreHorizontal, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, getSubjectBgColor } from "@/lib/utils";

const MONTHS = ["Jan", "Feb", "March", "April", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MINI_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MINI_WEEKS = [
    [null, null, null, null, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, null, null, null],
];

type ExamStatus = "CONFIRMED" | "SCHEDULED" | "CANCELLED";

interface Exam {
    id: string;
    classCode: string;
    className: string;
    time: string;
    subject: string;
    grade?: string;
    status: ExamStatus;
    students: number;
}

const examsByWeek: Record<number, Exam[][]> = {
    1: [
        [
            {
                id: "1",
                classCode: "302",
                className: "Class 302",
                time: "8:00 am",
                subject: "Math",
                grade: "Grade 10",
                status: "CONFIRMED",
                students: 8,
            },
            {
                id: "2",
                classCode: "303",
                className: "Class 303",
                time: "8:00 am",
                subject: "Chess",
                grade: "Grade 12",
                status: "CONFIRMED",
                students: 18,
            },
        ],
        [],
        [
            {
                id: "3",
                classCode: "304",
                className: "Class 304",
                time: "8:00 am",
                subject: "Art",
                grade: "Grade 11",
                status: "CONFIRMED",
                students: 12,
            },
            {
                id: "4",
                classCode: "302",
                className: "Class 302",
                time: "8:00 am",
                subject: "Multi",
                grade: "Grade 10",
                status: "CONFIRMED",
                students: 16,
            },
            {
                id: "5",
                classCode: "305",
                className: "Class 305",
                time: "10:00 pm",
                subject: "English",
                grade: "Grade 11",
                status: "CONFIRMED",
                students: 18,
            },
        ],
        [],
        [
            {
                id: "6",
                classCode: "363",
                className: "Class 363",
                time: "8:00 am",
                subject: "Physics",
                grade: "Grade 12",
                status: "SCHEDULED",
                students: 0,
            },
        ],
    ],
};

const upcomingExams = [
    { classCode: "302", subject: "Math Exam", date: "10 Feb · 7:30am → 9:30am", daysLeft: "4 Days left", color: "bg-blue-50 border-blue-100" },
    { classCode: "303", subject: "English Exam", date: "11 Feb · 7:30am → 9:30am", daysLeft: "5 Days left", color: "bg-yellow-50 border-yellow-100" },
];

const statusConfig: Record<ExamStatus, { label: string; variant: "success" | "warning" | "destructive" | "default" }> = {
    CONFIRMED: { label: "Confirmed", variant: "success" },
    SCHEDULED: { label: "Scheduled", variant: "warning" },
    CANCELLED: { label: "Cancelled", variant: "destructive" },
};

function ExamCard({ exam }: { exam: Exam }) {
    const status = statusConfig[exam.status];
    const bgColor = getSubjectBgColor(exam.subject);

    return (
        <div className={cn("rounded-lg border p-3 mb-2", bgColor)}>
            <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-zinc-500">{exam.classCode}</span>
                    <span className="text-[10px] text-zinc-400">{exam.time}</span>
                </div>
                <Button variant="ghost" size="icon-sm" className="h-5 w-5 text-zinc-400">
                    <MoreHorizontal className="h-3 w-3" />
                </Button>
            </div>
            <div className="flex items-center gap-1.5 mb-1">
                <div className="h-4 w-4 rounded bg-zinc-200 flex items-center justify-center">
                    <span className="text-[8px] text-zinc-600">{exam.subject[0]}</span>
                </div>
                <span className="text-xs font-semibold text-zinc-800">{exam.subject} Exam</span>
            </div>
            {exam.grade && <p className="text-[10px] text-zinc-500 mb-2">{exam.grade}</p>}
            <div className="flex items-center justify-between">
                {exam.status === "CONFIRMED" ? (
                    <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                        <span className="text-[10px] text-emerald-600 font-medium">Confirmed</span>
                    </div>
                ) : (
                    <Badge variant={status.variant} className="text-[10px]">{status.label}</Badge>
                )}
                {exam.students > 0 && (
                    <span className="text-[10px] text-zinc-400">{exam.students} students</span>
                )}
            </div>
        </div>
    );
}

export default function ExamsPage() {
    const [selectedMonth, setSelectedMonth] = useState(1); // February (0-indexed)
    const [selectedDay, setSelectedDay] = useState(8);

    const weekData = examsByWeek[1] ?? [[], [], [], [], []];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Exams</h1>
                    <p className="text-sm text-zinc-500">
                        On the attendance page, you can easily track student attendance and monitor absences.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon-sm">
                        <Filter className="h-4 w-4" />
                    </Button>
                    <Button className="gap-1.5">
                        <Plus className="h-4 w-4" />
                        Add now exam
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                {/* Main exam calendar */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon-sm">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="flex gap-1">
                                    {MONTHS.map((m, i) => (
                                        <button
                                            key={m}
                                            onClick={() => setSelectedMonth(i)}
                                            className={cn(
                                                "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                                                selectedMonth === i
                                                    ? "bg-zinc-900 text-white"
                                                    : "text-zinc-500 hover:bg-zinc-100"
                                            )}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                                <Button variant="ghost" size="icon-sm">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Week rows */}
                            <div className="grid grid-cols-5 gap-3">
                                {[1, 2, 3, 4, 5].map((week, wi) => (
                                    <div key={wi}>
                                        <div className="mb-2 text-xs font-medium text-zinc-400">{wi + 1}</div>
                                        {(weekData[wi] ?? []).length === 0 ? (
                                            <div className="text-[10px] text-zinc-300 py-2">No exam</div>
                                        ) : (
                                            (weekData[wi] ?? []).map((exam) => (
                                                <ExamCard key={exam.id} exam={exam} />
                                            ))
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right sidebar: mini calendar + upcoming */}
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon-sm">
                                    <ChevronLeft className="h-3 w-3" />
                                </Button>
                                <span className="text-sm font-semibold">February</span>
                                <Button variant="ghost" size="icon-sm">
                                    <ChevronRight className="h-3 w-3" />
                                </Button>
                            </div>
                            <Button variant="outline" size="sm" className="text-xs gap-1">
                                <Filter className="h-3 w-3" />
                                Filter
                            </Button>
                        </CardHeader>
                        <CardContent className="pb-3">
                            <div className="grid grid-cols-7 text-center">
                                {MINI_DAYS.map((d) => (
                                    <div key={d} className="py-1 text-[10px] font-medium text-zinc-400">{d}</div>
                                ))}
                                {MINI_WEEKS.map((week, wi) =>
                                    week.map((day, di) => (
                                        <div key={`${wi}-${di}`} className="flex items-center justify-center">
                                            {day ? (
                                                <button
                                                    onClick={() => setSelectedDay(day)}
                                                    className={cn(
                                                        "flex h-7 w-7 items-center justify-center rounded-full text-xs transition-colors",
                                                        day === selectedDay
                                                            ? "bg-zinc-900 text-white font-medium"
                                                            : "text-zinc-600 hover:bg-zinc-100"
                                                    )}
                                                >
                                                    {day}
                                                </button>
                                            ) : (
                                                <div className="h-7 w-7" />
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                            <button className="mt-2 text-[10px] text-blue-500 hover:underline w-full text-center">
                                + Exams for this month
                            </button>
                        </CardContent>
                    </Card>

                    {/* Upcoming exams */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm">Upcoming exams</CardTitle>
                            <Button variant="outline" size="sm" className="text-xs gap-1">
                                <Filter className="h-3 w-3" />
                                Filter
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {upcomingExams.map((exam, i) => (
                                <div key={i} className={cn("rounded-lg border p-3", exam.color)}>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span className="text-[10px] font-semibold text-zinc-500">{exam.classCode}</span>
                                    </div>
                                    <p className="text-xs font-semibold text-zinc-800">{exam.subject}</p>
                                    <p className="text-[10px] text-zinc-500 mt-0.5">{exam.date}</p>
                                    <div className="mt-2">
                                        <Badge variant="default" className="text-[10px]">{exam.daysLeft}</Badge>
                                    </div>
                                    <Button variant="ghost" size="icon-sm" className="absolute top-2 right-2 h-5 w-5 text-zinc-400">
                                        <MoreHorizontal className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
