"use client";

import { useState } from "react";
import { Search, Filter, Plus, MoreHorizontal, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn, getSubjectBgColor } from "@/lib/utils";

const SUBJECTS = ["All", "Math", "Art", "Physics", "English", "Science"];

const assignments = [
    {
        id: "1",
        title: "Locations & Expressions - Page 32",
        subject: "Math",
        dueDate: "Feb 12, 2025",
        class: "Class 302",
        totalStudents: 32,
        submitted: 18,
        graded: 10,
        status: "ACTIVE",
    },
    {
        id: "2",
        title: "Algebra Practice - Page 43",
        subject: "Math",
        dueDate: "Feb 10, 2025",
        class: "Class 303",
        totalStudents: 30,
        submitted: 30,
        graded: 30,
        status: "CLOSED",
    },
    {
        id: "3",
        title: "Still Life Drawing",
        subject: "Art",
        dueDate: "Feb 15, 2025",
        class: "Class 302",
        totalStudents: 32,
        submitted: 5,
        graded: 0,
        status: "ACTIVE",
    },
    {
        id: "4",
        title: "Laws of Motion - Worksheet",
        subject: "Physics",
        dueDate: "Feb 14, 2025",
        class: "Class 304",
        totalStudents: 28,
        submitted: 20,
        graded: 15,
        status: "ACTIVE",
    },
    {
        id: "5",
        title: "Shakespeare Essay",
        subject: "English",
        dueDate: "Feb 20, 2025",
        class: "Class 303",
        totalStudents: 30,
        submitted: 2,
        graded: 0,
        status: "DRAFT",
    },
    {
        id: "6",
        title: "Geometry Fractions - Page 21",
        subject: "Math",
        dueDate: "Feb 8, 2025",
        class: "Class 302",
        totalStudents: 32,
        submitted: 32,
        graded: 32,
        status: "CLOSED",
    },
];

const statusConfig = {
    ACTIVE: { label: "Active", variant: "success" as const },
    CLOSED: { label: "Closed", variant: "default" as const },
    DRAFT: { label: "Draft", variant: "outline" as const },
};

export default function AssignmentsPage() {
    const [search, setSearch] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("All");

    const filtered = assignments.filter((a) => {
        const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
        const matchSubject = selectedSubject === "All" || a.subject === selectedSubject;
        return matchSearch && matchSubject;
    });

    const activeCount = assignments.filter((a) => a.status === "ACTIVE").length;
    const closedCount = assignments.filter((a) => a.status === "CLOSED").length;
    const draftCount = assignments.filter((a) => a.status === "DRAFT").length;

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Assignment Management</h1>
                    <p className="text-sm text-zinc-500">Track and manage all student assignments.</p>
                </div>
                <Button className="gap-1.5">
                    <Plus className="h-4 w-4" />
                    New Assignment
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: "Active", count: activeCount, variant: "success" as const },
                    { label: "Closed", count: closedCount, variant: "default" as const },
                    { label: "Draft", count: draftCount, variant: "outline" as const },
                ].map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="flex items-center justify-between p-4">
                            <div>
                                <p className="text-2xl font-bold text-zinc-900">{stat.count}</p>
                                <p className="text-xs text-zinc-500">{stat.label} assignments</p>
                            </div>
                            <Badge variant={stat.variant}>{stat.label}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                    <Input
                        placeholder="Search assignments..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 h-8 text-xs"
                    />
                </div>
                <div className="flex gap-1">
                    {SUBJECTS.map((s) => (
                        <button
                            key={s}
                            onClick={() => setSelectedSubject(s)}
                            className={cn(
                                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                                selectedSubject === s
                                    ? "bg-zinc-900 text-white"
                                    : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <Button variant="outline" size="sm" className="gap-1 text-xs ml-auto">
                    <Filter className="h-3 w-3" />
                    Filter
                </Button>
            </div>

            {/* Assignment list */}
            <Card>
                <CardHeader className="pb-0">
                    <div className="grid grid-cols-6 gap-3 text-[10px] font-medium text-zinc-400 px-1 uppercase tracking-wide">
                        <span className="col-span-2">Assignment</span>
                        <span>Subject</span>
                        <span>Class</span>
                        <span>Progress</span>
                        <span>Status</span>
                    </div>
                </CardHeader>
                <CardContent className="pt-2">
                    <div className="space-y-1">
                        {filtered.map((assignment) => {
                            const status = statusConfig[assignment.status as keyof typeof statusConfig];
                            const bgColor = getSubjectBgColor(assignment.subject);
                            const progress = Math.round((assignment.submitted / assignment.totalStudents) * 100);

                            return (
                                <div
                                    key={assignment.id}
                                    className="grid grid-cols-6 gap-3 items-center rounded-lg px-3 py-3 hover:bg-zinc-50 transition-colors group"
                                >
                                    {/* Title */}
                                    <div className="col-span-2">
                                        <p className="text-sm font-medium text-zinc-900">{assignment.title}</p>
                                        <p className="text-[10px] text-zinc-400">Due {assignment.dueDate}</p>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border", bgColor)}>
                                            {assignment.subject}
                                        </span>
                                    </div>

                                    {/* Class */}
                                    <span className="text-xs text-zinc-600">{assignment.class}</span>

                                    {/* Progress */}
                                    <div>
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-zinc-900 rounded-full"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] text-zinc-500 shrink-0">
                                                {assignment.submitted}/{assignment.totalStudents}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Status + actions */}
                                    <div className="flex items-center justify-between">
                                        <Badge variant={status.variant} className="text-[10px]">{status.label}</Badge>
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
