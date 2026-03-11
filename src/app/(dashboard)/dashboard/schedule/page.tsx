"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter, Plus, MoreHorizontal, CheckCircle, Paperclip } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, getSubjectBgColor } from "@/lib/utils";

const DAYS = [
    { short: "1 · Mon", full: "Monday" },
    { short: "2 · Tue", full: "Tuesday" },
    { short: "3 · Wed", full: "Wednesday" },
    { short: "4 · Thu", full: "Thursday" },
    { short: "5 · Fri", full: "Friday" },
    { short: "6 · Sat", full: "Saturday" },
    { short: "7 · Sun", full: "Sunday" },
];

const SUBJECT_FILTERS = ["All", "Math", "Art", "Physics", "Sport"];
const TIME_FILTER = "This week";

interface ScheduleEvent {
    id: string;
    subject: string;
    time: string;
    endTime: string;
    status?: "CONFIRMED" | "SCHEDULED";
    row: number;
}

const schedule: Record<number, ScheduleEvent[]> = {
    1: [], // Monday
    2: [
        { id: "1", subject: "Math", time: "7:00am", endTime: "7:40am", status: "CONFIRMED", row: 1 },
        { id: "2", subject: "Art", time: "7:30am", endTime: "9:00am", row: 2 },
        { id: "3", subject: "Physics", time: "10:40am", endTime: "10:40am", row: 4 },
        { id: "4", subject: "Sport", time: "10:30am", endTime: "12:10pm", status: "CONFIRMED", row: 5 },
    ], // Tuesday
    3: [], // Wednesday
    4: [
        { id: "5", subject: "Math", time: "7:00am", endTime: "7:40am", row: 1 },
        { id: "6", subject: "Computer", time: "7:30am", endTime: "9:00am", status: "CONFIRMED", row: 2 },
    ], // Thursday
    5: [], // Friday
    6: [
        { id: "7", subject: "Physics", time: "1:00am", endTime: "1:40am", row: 1 },
        { id: "8", subject: "Sport", time: "1:50am", endTime: "12:10pm", status: "SCHEDULED", row: 2 },
    ], // Saturday
    7: [], // Sunday
};

const TIMES = ["6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

const attachmentDays = [2, 3, 4, 6]; // days with attachments icons

export default function SchedulePage() {
    const [selectedSubject, setSelectedSubject] = useState("All");

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Schedule</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <Filter className="h-3 w-3" />
                        Filter
                        <Badge variant="info" className="h-4 w-4 p-0 flex items-center justify-center text-[10px]">1</Badge>
                    </Button>
                    <Button className="gap-1.5 text-sm">
                        <Plus className="h-4 w-4" />
                        + Add Event
                    </Button>
                </div>
            </div>

            {/* Date range + subject filters */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon-sm">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-semibold text-zinc-900">01-07 January 2025</span>
                    <Button variant="ghost" size="icon-sm">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-1.5">
                    {SUBJECT_FILTERS.map((s) => (
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
                    <button className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50">
                        {TIME_FILTER} ▾
                    </button>
                    <button className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50">
                        AI ▾
                    </button>
                </div>
            </div>

            {/* Calendar grid */}
            <Card>
                <CardContent className="p-0 overflow-auto">
                    <div className="grid" style={{ gridTemplateColumns: "48px repeat(7, 1fr)" }}>
                        {/* Header row */}
                        <div className="border-b border-r border-zinc-100 p-2" />
                        {DAYS.map((day, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "border-b border-r border-zinc-100 p-3 text-center text-xs font-medium",
                                    i + 1 === 2 ? "bg-zinc-900 text-white rounded-t-none" : "text-zinc-500"
                                )}
                            >
                                {day.short}
                            </div>
                        ))}

                        {/* Time rows */}
                        {TIMES.map((time, ti) => (
                            <>
                                <div
                                    key={`time-${ti}`}
                                    className="border-b border-r border-zinc-100 p-2 text-right text-[10px] text-zinc-400"
                                >
                                    {time}
                                </div>
                                {DAYS.map((_, di) => {
                                    const dayNum = di + 1;
                                    const dayEvents = (schedule[dayNum] ?? []).filter((e) => e.row === ti + 1);
                                    return (
                                        <div
                                            key={`cell-${ti}-${di}`}
                                            className={cn(
                                                "border-b border-r border-zinc-100 min-h-15 p-1.5 relative",
                                                di + 1 === 6 || di + 1 === 7 ? "bg-zinc-50/50" : ""
                                            )}
                                        >
                                            {dayEvents.map((event) => {
                                                const bgClass = getSubjectBgColor(event.subject);
                                                return (
                                                    <div
                                                        key={event.id}
                                                        className={cn("rounded-lg border p-2 mb-1 text-left", bgClass)}
                                                    >
                                                        <p className="text-xs font-semibold text-zinc-800">{event.subject} Exam</p>
                                                        <p className="text-[10px] text-zinc-500">
                                                            {event.time} - {event.endTime}
                                                        </p>
                                                        {event.status === "CONFIRMED" && (
                                                            <div className="mt-1 flex items-center gap-1">
                                                                <CheckCircle className="h-2.5 w-2.5 text-emerald-500" />
                                                                <span className="text-[9px] text-emerald-600">Confirmed</span>
                                                            </div>
                                                        )}
                                                        {event.status === "SCHEDULED" && (
                                                            <div className="mt-1 flex items-center gap-1">
                                                                <span className="text-[9px] text-zinc-500">Scheduled</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </>
                        ))}

                        {/* Attachment row */}
                        <div className="border-r border-zinc-100 p-2" />
                        {DAYS.map((_, di) => (
                            <div key={`att-${di}`} className="border-r border-zinc-100 p-2 flex items-center justify-center gap-1">
                                {attachmentDays.includes(di + 1) && (
                                    <>
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100">
                                            <Paperclip className="h-3 w-3 text-zinc-500" />
                                        </div>
                                        {di + 1 === 3 && (
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                                                <Paperclip className="h-3 w-3 text-blue-500" />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
