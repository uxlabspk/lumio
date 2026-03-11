"use client";

import { useState } from "react";
import { Search, Filter, ChevronRight, TrendingUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/lib/utils";

const students = [
    { id: "1", name: "Amir Bagjian", class: "Class 302", grade: "10", status: "ACTIVE", gpa: 3.8, attendance: 96 },
    { id: "2", name: "James Wilson", class: "Class 302", grade: "10", status: "ACTIVE", gpa: 3.5, attendance: 91 },
    { id: "3", name: "Hannah Turner", class: "Class 302", grade: "10", status: "ACTIVE", gpa: 3.2, attendance: 82 },
    { id: "4", name: "Emily Carter", class: "Class 303", grade: "11", status: "ACTIVE", gpa: 3.9, attendance: 98 },
    { id: "5", name: "Nicholas White", class: "Class 303", grade: "11", status: "ACTIVE", gpa: 2.9, attendance: 75 },
    { id: "6", name: "Sarah Anderson", class: "Class 303", grade: "11", status: "ACTIVE", gpa: 3.7, attendance: 95 },
    { id: "7", name: "Daniel Roberts", class: "Class 304", grade: "12", status: "ACTIVE", gpa: 3.4, attendance: 88 },
    { id: "8", name: "Olivia Brown", class: "Class 304", grade: "12", status: "ACTIVE", gpa: 3.6, attendance: 93 },
];

const recentAssignments = [
    { name: "Locations & Expressions - Page 32", time: "12 hours ago", status: "NOT_CHECKED" },
    { name: "Algebra Practice - Page 43", time: "23 hours ago", status: "COMPLETE" },
    { name: "Geometry Fractions - Page 21", time: "2 days ago", status: "COMPLETE" },
    { name: "Fractions & Decimals - Page 40", time: "3 days ago", status: "COMPLETE" },
    { name: "Problem Solving - Page 62", time: "5 days ago", status: "NOT_COMPLETE" },
    { name: "Math Drills - Page 27", time: "5 days ago", status: "NOT_CHECKED" },
];

const examHistory = [
    { date: "June 9, 2024", title: "Final Math Exam", score: 19.75, rank: 87, growth: -13 },
];

const assignmentStats = [
    { label: "Not-checked", count: "23/32", color: "border-zinc-300", variant: "outline" as const },
    { label: "Not-reviewed", count: "23/32", color: "border-orange-300", variant: "warning" as const },
    { label: "Not-complete", count: "23/32", color: "border-red-300", variant: "destructive" as const },
    { label: "Completed", count: "23/32", color: "border-emerald-300", variant: "success" as const },
];

const statusSubmission: Record<string, { label: string; variant: "success" | "warning" | "destructive" | "default" | "outline" }> = {
    COMPLETE: { label: "Complete", variant: "success" },
    NOT_COMPLETE: { label: "Not Completed", variant: "destructive" },
    NOT_CHECKED: { label: "Not-checked", variant: "outline" },
};

export default function StudentsPage() {
    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(students[0]);

    const filtered = students.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Students overview</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <Filter className="h-3 w-3" />
                        Filter
                        <Badge variant="info" className="h-4 w-4 p-0 flex items-center justify-center text-[10px]">1</Badge>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                {/* Student list */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                                <Input
                                    placeholder="Search students..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-8 h-8 text-xs"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-1 p-2">
                            {filtered.map((student) => (
                                <button
                                    key={student.id}
                                    onClick={() => setSelectedStudent(student)}
                                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${selectedStudent.id === student.id
                                            ? "bg-zinc-100"
                                            : "hover:bg-zinc-50"
                                        }`}
                                >
                                    <Avatar className="h-8 w-8 shrink-0">
                                        <AvatarFallback className="text-xs">{getInitials(student.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-zinc-900 truncate">{student.name}</p>
                                        <p className="text-xs text-zinc-400">{student.class}</p>
                                    </div>
                                    <ChevronRight className="h-3.5 w-3.5 text-zinc-300 shrink-0" />
                                </button>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Student detail */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Header */}
                    <Card>
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback>{getInitials(selectedStudent.name)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <h2 className="text-base font-semibold text-zinc-900">{selectedStudent.name}</h2>
                                            <span className="text-zinc-400">▾</span>
                                        </div>
                                        <p className="text-xs text-zinc-500">
                                            Amir, here&apos;s take a look at your performance and analytics.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="rounded-lg border border-zinc-100 p-3">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <TrendingUp className="h-3.5 w-3.5 text-purple-500" />
                                        <span className="text-xs text-zinc-500">Growth</span>
                                    </div>
                                    <p className="text-xl font-bold text-zinc-900">+10%</p>
                                    <p className="text-[10px] text-zinc-400">Students in total</p>
                                    <div className="mt-2 h-8 flex items-end gap-0.5">
                                        {[2, 3, 4, 3, 5, 4, 6, 5, 7, 6, 5, 7].map((v, i) => (
                                            <div key={i} className="flex-1 bg-purple-200 rounded-sm" style={{ height: `${v * 4}px` }} />
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-lg border border-zinc-100 p-3">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <span className="text-xs text-zinc-500">📋 Exams</span>
                                        <a href="#" className="ml-auto text-[10px] text-blue-500">Check Exams</a>
                                    </div>
                                    <p className="text-xl font-bold text-zinc-900">19.32</p>
                                    <p className="text-[10px] text-zinc-400">Average score</p>
                                    <div className="mt-2 h-8 flex items-end gap-0.5">
                                        {[3, 5, 4, 6, 5, 7, 6, 4, 5, 6, 7, 5].map((v, i) => (
                                            <div key={i} className="flex-1 bg-blue-200 rounded-sm" style={{ height: `${v * 3}px` }} />
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-lg border border-zinc-100 p-3">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <span className="text-xs text-zinc-500">Activity</span>
                                        <a href="#" className="ml-auto text-[10px] text-blue-500">Check Status</a>
                                    </div>
                                    <div className="flex gap-4">
                                        <div>
                                            <p className="text-xl font-bold text-zinc-900">8</p>
                                            <div className="flex items-center gap-0.5">
                                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                                <p className="text-[10px] text-zinc-500">Present</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold text-zinc-900">3</p>
                                            <div className="flex items-center gap-0.5">
                                                <div className="h-2 w-2 rounded-full bg-red-500" />
                                                <p className="text-[10px] text-zinc-500">Absent</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold text-zinc-900">12</p>
                                            <div className="flex items-center gap-0.5">
                                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                                <p className="text-[10px] text-zinc-500">Events</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Assignments */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <CardTitle className="text-sm">Assignments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {assignmentStats.map((stat) => (
                                    <div key={stat.label} className={`rounded-lg border p-2.5 flex items-center justify-between`}>
                                        <div>
                                            <p className="text-sm font-semibold text-zinc-900">{stat.count}</p>
                                            <p className="text-[10px] text-zinc-400">{stat.label}</p>
                                        </div>
                                        <ChevronRight className="h-3.5 w-3.5 text-zinc-300" />
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-medium text-zinc-700">Last assignments</h4>
                                <Button variant="outline" size="sm" className="text-xs gap-1">
                                    <Filter className="h-3 w-3" /> Filter
                                    <Badge variant="info" className="h-4 w-4 p-0 flex items-center justify-center text-[10px]">1</Badge>
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {recentAssignments.map((a, i) => {
                                    const s = statusSubmission[a.status] ?? { label: a.status, variant: "default" as const };
                                    return (
                                        <div key={i} className="flex items-center justify-between py-1.5 border-b border-zinc-50 last:border-0">
                                            <div>
                                                <p className="text-xs font-medium text-zinc-800">{a.name}</p>
                                                <p className="text-[10px] text-zinc-400">{a.time}</p>
                                            </div>
                                            <Badge variant={s.variant} className="text-[10px]">{s.label}</Badge>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Exam results */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <CardTitle className="text-sm">Student exams</CardTitle>
                            <Button variant="outline" size="sm" className="text-xs gap-1">
                                <Filter className="h-3 w-3" /> Filter
                                <Badge variant="info" className="h-4 w-4 p-0 flex items-center justify-center text-[10px]">1</Badge>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-4 gap-2 text-[10px] font-medium text-zinc-400 mb-2 px-1">
                                <span>Date</span>
                                <span>Exam title</span>
                                <span>Score</span>
                                <span>Rank to exam</span>
                            </div>
                            {examHistory.map((exam, i) => (
                                <div key={i} className="grid grid-cols-4 gap-2 items-center rounded-lg px-1 py-2 hover:bg-zinc-50">
                                    <span className="text-xs text-zinc-500">{exam.date}</span>
                                    <span className="text-xs font-medium text-blue-600">{exam.title}</span>
                                    <span className="text-xs text-zinc-800">{exam.score}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-zinc-700">{exam.rank}</span>
                                        <div className="flex items-center gap-0.5 text-red-500">
                                            <ArrowDown className="h-3 w-3" />
                                            <span className="text-[10px]">{Math.abs(exam.growth)}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
