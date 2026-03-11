"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const WEEKS = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
];

const classes = ["Class 302", "Class 363", "Class 304"];

const attendanceData = {
    present: [
        { name: "James Wilson", initials: "JW" },
        { name: "Emily Carter", initials: "EC" },
        { name: "Sarah Anderson", initials: "SA" },
        { name: "Daniel Roberts", initials: "DR" },
        { name: "Olivia Brown", initials: "OB" },
        { name: "Matthew Johnson", initials: "MJ" },
        { name: "Laura Miller", initials: "LM" },
        { name: "Andrew Taylor", initials: "AT" },
        { name: "Sophie Harris", initials: "SH" },
        { name: "Jessica Moore", initials: "JM" },
        { name: "Ryan Clark", initials: "RC" },
        { name: "Emma Lewis", initials: "EL" },
    ],
    absent: [
        { name: "Hannah Turner", initials: "HT" },
        { name: "Nicholas White", initials: "NW" },
        { name: "Victoria Hall", initials: "VH" },
        { name: "Kevin Adams", initials: "KA" },
    ],
    late: [
        { name: "Laura Miller", initials: "LM" },
        { name: "Emma Lewis", initials: "EL" },
    ],
};

const sparklineData = [3, 7, 5, 8, 6, 9, 7, 8, 6, 5, 7, 8];

function Sparkline({ data, color }: { data: number[]; color: string }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 80;
    const height = 24;
    const points = data.map((v, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((v - min) / range) * height;
        return `${x},${y}`;
    });
    return (
        <svg width={width} height={height} className="overflow-visible">
            <polyline
                points={points.join(" ")}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function AttendancePage() {
    const [selectedDay, setSelectedDay] = useState(9);
    const [selectedClass, setSelectedClass] = useState("Class 302");

    const total = attendanceData.present.length + attendanceData.absent.length + attendanceData.late.length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-zinc-900">Attendance</h1>
                <p className="text-sm text-zinc-500">
                    On the attendance page, you can easily track student attendance and monitor absences.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
                {/* Left: Calendar + Stats */}
                <div className="flex flex-col gap-4 lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon-sm">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="text-sm font-semibold text-zinc-900">February</span>
                                <Button variant="ghost" size="icon-sm">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                                    <Filter className="h-3 w-3" />
                                    Filter
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                            {/* Calendar */}
                            <div className="grid grid-cols-7 text-center">
                                {DAYS.map((d) => (
                                    <div key={d} className="py-1 text-[10px] font-medium text-zinc-400">
                                        {d}
                                    </div>
                                ))}
                                {WEEKS.map((week, wi) =>
                                    week.map((day, di) => (
                                        <button
                                            key={`${wi}-${di}`}
                                            onClick={() => setSelectedDay(day)}
                                            className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${day === selectedDay
                                                    ? "bg-zinc-900 text-white font-medium"
                                                    : "text-zinc-600 hover:bg-zinc-100"
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    ))
                                )}
                            </div>

                            {/* Summary stats */}
                            <div className="mt-4 space-y-2.5">
                                {[
                                    {
                                        label: "Attendance",
                                        count: attendanceData.present.length,
                                        total,
                                        color: "#10b981",
                                        icon: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />,
                                    },
                                    {
                                        label: "Absences",
                                        count: attendanceData.absent.length,
                                        total,
                                        color: "#f97316",
                                        icon: <XCircle className="h-3.5 w-3.5 text-orange-500" />,
                                    },
                                    {
                                        label: "Delayed",
                                        count: attendanceData.late.length,
                                        total,
                                        color: "#8b5cf6",
                                        icon: <Clock className="h-3.5 w-3.5 text-purple-500" />,
                                    },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5 w-24">
                                            {item.icon}
                                            <span className="text-xs text-zinc-600">
                                                {item.count}/{total}
                                            </span>
                                            <span className="text-xs text-zinc-400">{item.label}</span>
                                        </div>
                                        <Sparkline
                                            data={sparklineData}
                                            color={item.color}
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Student lists */}
                <div className="lg:col-span-3">
                    {/* Class tabs */}
                    <div className="mb-4 flex gap-2">
                        {classes.map((cls) => (
                            <button
                                key={cls}
                                onClick={() => setSelectedClass(cls)}
                                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${selectedClass === cls
                                        ? "bg-zinc-900 text-white"
                                        : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                                    }`}
                            >
                                {cls}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {/* Present */}
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    <CardTitle className="text-sm">Attendance</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {attendanceData.present.map((s, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-[9px]">{getInitials(s.name)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs text-zinc-700 truncate">{s.name}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Absent */}
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-1.5">
                                    <XCircle className="h-4 w-4 text-orange-500" />
                                    <CardTitle className="text-sm">Absences</CardTitle>
                                    <Badge variant="warning" className="text-[10px] px-1.5 py-0">{attendanceData.absent.length}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {attendanceData.absent.map((s, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-[9px]">{getInitials(s.name)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs text-zinc-700 truncate">{s.name}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Late */}
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4 text-purple-500" />
                                    <CardTitle className="text-sm">Delayed</CardTitle>
                                    <Badge variant="purple" className="text-[10px] px-1.5 py-0">{attendanceData.late.length}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {attendanceData.late.map((s, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-[9px]">{getInitials(s.name)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs text-zinc-700 truncate">{s.name}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
