"use client";

import { useState } from "react";
import { Award, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyGradesPage() {
    const [selectedSemester, setSelectedSemester] = useState("current");

    // Mock data - replace with actual API call
    const grades = [
        {
            id: "1",
            subject: "Mathematics 101",
            section: "A",
            teacher: "Dr. John Smith",
            midterm: 85,
            final: 88,
            assignments: 90,
            attendance: 95,
            overall: 87.7,
            grade: "B+",
            credits: 3,
        },
        {
            id: "2",
            subject: "Physics 201",
            section: "B",
            teacher: "Prof. Sarah Johnson",
            midterm: 92,
            final: 95,
            assignments: 88,
            attendance: 98,
            overall: 91.7,
            grade: "A",
            credits: 4,
        },
        {
            id: "3",
            subject: "Chemistry 101",
            section: "A",
            teacher: "Dr. Michael Williams",
            midterm: 78,
            final: 82,
            assignments: 85,
            attendance: 92,
            overall: 81.7,
            grade: "B",
            credits: 3,
        },
    ];

    const gpa = (
        grades.reduce((acc, g) => {
            const points = g.grade.startsWith("A")
                ? 4.0
                : g.grade.startsWith("B+")
                    ? 3.5
                    : g.grade.startsWith("B")
                        ? 3.0
                        : g.grade.startsWith("C")
                            ? 2.0
                            : 1.0;
            return acc + points * g.credits;
        }, 0) / grades.reduce((acc, g) => acc + g.credits, 0)
    ).toFixed(2);

    const averageGrade = (grades.reduce((acc, g) => acc + g.overall, 0) / grades.length).toFixed(1);

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">My Grades</h1>
                    <p className="text-sm text-zinc-500">View your academic performance and results.</p>
                </div>
                <div className="flex gap-2">
                    <select
                        value={selectedSemester}
                        onChange={(e) => setSelectedSemester(e.target.value)}
                        className="h-8 rounded-lg border border-zinc-200 bg-white px-3 text-xs text-zinc-900"
                    >
                        <option value="current">Current Semester</option>
                        <option value="fall2025">Fall 2025</option>
                        <option value="spring2025">Spring 2025</option>
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
                        <p className="text-xs text-zinc-500">Current GPA</p>
                        <div className="mt-1 flex items-center gap-2">
                            <p className="text-2xl font-semibold text-zinc-900">{gpa}</p>
                            <TrendingUp className="h-4 w-4 text-emerald-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Average Score</p>
                        <p className="mt-1 text-2xl font-semibold text-blue-600">{averageGrade}%</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Total Credits</p>
                        <p className="mt-1 text-2xl font-semibold text-purple-600">
                            {grades.reduce((acc, g) => acc + g.credits, 0)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Enrolled Courses</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">{grades.length}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Course Grades
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {grades.map((grade) => (
                            <div
                                key={grade.id}
                                className="rounded-lg border border-zinc-100 p-4 hover:shadow-sm transition-shadow"
                            >
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-start">
                                    <div className="md:col-span-4">
                                        <p className="text-sm font-semibold text-zinc-900">{grade.subject}</p>
                                        <p className="mt-0.5 text-xs text-zinc-500">{grade.teacher}</p>
                                        <p className="mt-0.5 text-xs text-zinc-400">
                                            Section {grade.section} • {grade.credits} Credits
                                        </p>
                                    </div>

                                    <div className="md:col-span-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                                        <div>
                                            <p className="text-[10px] font-medium text-zinc-500 uppercase">Midterm</p>
                                            <p className="mt-1 text-sm font-semibold text-zinc-900">{grade.midterm}%</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-medium text-zinc-500 uppercase">Final</p>
                                            <p className="mt-1 text-sm font-semibold text-zinc-900">{grade.final}%</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-medium text-zinc-500 uppercase">
                                                Assignments
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-zinc-900">
                                                {grade.assignments}%
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-medium text-zinc-500 uppercase">
                                                Attendance
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-zinc-900">
                                                {grade.attendance}%
                                            </p>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 flex items-center justify-between md:flex-col md:items-end md:justify-start gap-2">
                                        <div className="text-right">
                                            <p className="text-[10px] font-medium text-zinc-500 uppercase">Overall</p>
                                            <p className="mt-1 text-lg font-bold text-zinc-900">
                                                {grade.overall.toFixed(1)}%
                                            </p>
                                        </div>
                                        <Badge
                                            variant={
                                                grade.grade.startsWith("A")
                                                    ? "success"
                                                    : grade.grade.startsWith("B")
                                                        ? "default"
                                                        : "outline"
                                            }
                                            className="text-sm px-3 py-1"
                                        >
                                            {grade.grade}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Grade Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-600">A Grades</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-32 rounded-full bg-zinc-100">
                                    <div
                                        className="h-2 rounded-full bg-emerald-500"
                                        style={{
                                            width: `${(grades.filter((g) => g.grade.startsWith("A")).length / grades.length) * 100}%`,
                                        }}
                                    />
                                </div>
                                <span className="w-8 font-medium text-zinc-900">
                                    {grades.filter((g) => g.grade.startsWith("A")).length}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-600">B Grades</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-32 rounded-full bg-zinc-100">
                                    <div
                                        className="h-2 rounded-full bg-blue-500"
                                        style={{
                                            width: `${(grades.filter((g) => g.grade.startsWith("B")).length / grades.length) * 100}%`,
                                        }}
                                    />
                                </div>
                                <span className="w-8 font-medium text-zinc-900">
                                    {grades.filter((g) => g.grade.startsWith("B")).length}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-600">C Grades</span>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-32 rounded-full bg-zinc-100">
                                    <div
                                        className="h-2 rounded-full bg-orange-500"
                                        style={{
                                            width: `${(grades.filter((g) => g.grade.startsWith("C")).length / grades.length) * 100}%`,
                                        }}
                                    />
                                </div>
                                <span className="w-8 font-medium text-zinc-900">
                                    {grades.filter((g) => g.grade.startsWith("C")).length}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
