"use client";

import { useState } from "react";
import { ClipboardCheck, Calendar, TrendingUp, AlertCircle, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyAttendancePage() {
    const [selectedMonth, setSelectedMonth] = useState("march");

    // Mock data - replace with actual API call
    const attendanceByClass = [
        {
            id: "1",
            class: "Mathematics 101",
            section: "A",
            totalClasses: 20,
            attended: 19,
            absent: 1,
            percentage: 95,
        },
        {
            id: "2",
            class: "Physics 201",
            section: "B",
            totalClasses: 18,
            attended: 18,
            absent: 0,
            percentage: 100,
        },
        {
            id: "3",
            class: "Chemistry 101",
            section: "A",
            totalClasses: 22,
            attended: 20,
            absent: 2,
            percentage: 90.9,
        },
    ];

    const recentAttendance = [
        { date: "2026-03-20", class: "Mathematics 101", status: "Present" },
        { date: "2026-03-20", class: "Physics 201", status: "Present" },
        { date: "2026-03-19", class: "Chemistry 101", status: "Present" },
        { date: "2026-03-19", class: "Mathematics 101", status: "Present" },
        { date: "2026-03-18", class: "Physics 201", status: "Present" },
        { date: "2026-03-18", class: "Chemistry 101", status: "Absent" },
        { date: "2026-03-17", class: "Mathematics 101", status: "Present" },
    ];

    const totalClasses = attendanceByClass.reduce((acc, c) => acc + c.totalClasses, 0);
    const totalAttended = attendanceByClass.reduce((acc, c) => acc + c.attended, 0);
    const totalAbsent = attendanceByClass.reduce((acc, c) => acc + c.absent, 0);
    const overallPercentage = ((totalAttended / totalClasses) * 100).toFixed(1);

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">My Attendance</h1>
                    <p className="text-sm text-zinc-500">Track your attendance across all classes.</p>
                </div>
                <div className="flex gap-2">
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="h-8 rounded-lg border border-zinc-200 bg-white px-3 text-xs text-zinc-900"
                    >
                        <option value="march">March 2026</option>
                        <option value="february">February 2026</option>
                        <option value="january">January 2026</option>
                    </select>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <RefreshCw className="h-3.5 w-3.5" />
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <ClipboardCheck className="h-4 w-4 text-zinc-400" />
                            <p className="text-xs text-zinc-500">Total Classes</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">{totalClasses}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                            <p className="text-xs text-zinc-500">Attended</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-emerald-600">{totalAttended}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-600" />
                            <p className="text-xs text-zinc-500">Absent</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-red-600">{totalAbsent}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                            <p className="text-xs text-zinc-500">Overall %</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-blue-600">{overallPercentage}%</p>
                    </CardContent>
                </Card>
            </div>

            {parseFloat(overallPercentage) < 75 && (
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-orange-900">Attendance Warning</p>
                            <p className="mt-1 text-xs text-orange-700">
                                Your attendance is below 75%. You need to maintain at least 75% attendance to be eligible
                                for exams.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Attendance by Class
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {attendanceByClass.map((classData) => (
                            <div key={classData.id} className="rounded-lg border border-zinc-100 p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <p className="text-sm font-semibold text-zinc-900">{classData.class}</p>
                                        <p className="text-xs text-zinc-500">Section {classData.section}</p>
                                    </div>
                                    <Badge
                                        variant={
                                            classData.percentage >= 90
                                                ? "success"
                                                : classData.percentage >= 75
                                                    ? "default"
                                                    : "destructive"
                                        }
                                    >
                                        {classData.percentage.toFixed(1)}%
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-3">
                                    <div>
                                        <p className="text-xs text-zinc-500">Total</p>
                                        <p className="text-sm font-semibold text-zinc-900">{classData.totalClasses}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500">Attended</p>
                                        <p className="text-sm font-semibold text-emerald-600">{classData.attended}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-500">Absent</p>
                                        <p className="text-sm font-semibold text-red-600">{classData.absent}</p>
                                    </div>
                                </div>

                                <div className="h-2 w-full rounded-full bg-zinc-100">
                                    <div
                                        className={`h-2 rounded-full ${classData.percentage >= 90
                                                ? "bg-emerald-500"
                                                : classData.percentage >= 75
                                                    ? "bg-blue-500"
                                                    : "bg-red-500"
                                            }`}
                                        style={{ width: `${classData.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Recent Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {recentAttendance.map((record, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between rounded-lg border border-zinc-100 p-3"
                            >
                                <div className="flex items-center gap-3">
                                    {record.status === "Present" ? (
                                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-600" />
                                    )}
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900">{record.class}</p>
                                        <p className="text-xs text-zinc-500">{record.date}</p>
                                    </div>
                                </div>
                                <Badge variant={record.status === "Present" ? "success" : "destructive"}>
                                    {record.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
