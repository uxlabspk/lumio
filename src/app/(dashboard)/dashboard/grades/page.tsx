"use client";

import { useState } from "react";
import { Award, Search, RefreshCw, Save, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function GradesPage() {
    const [search, setSearch] = useState("");
    const [selectedClass, setSelectedClass] = useState("all");

    // Mock data - replace with actual API call
    const students = [
        {
            id: "1",
            name: "Alice Johnson",
            studentId: "STU001",
            class: "Math 101 A",
            midterm: 85,
            final: 88,
            assignments: 90,
            overall: 87.7,
            grade: "B+",
        },
        {
            id: "2",
            name: "Bob Smith",
            studentId: "STU002",
            class: "Math 101 A",
            midterm: 92,
            final: 95,
            assignments: 88,
            overall: 91.7,
            grade: "A",
        },
        {
            id: "3",
            name: "Carol White",
            studentId: "STU003",
            class: "Math 102 B",
            midterm: 78,
            final: 82,
            assignments: 85,
            overall: 81.7,
            grade: "B",
        },
        {
            id: "4",
            name: "David Brown",
            studentId: "STU004",
            class: "Math 101 A",
            midterm: 95,
            final: 97,
            assignments: 94,
            overall: 95.3,
            grade: "A",
        },
    ];

    const classes = ["all", "Math 101 A", "Math 102 B", "Physics 201"];

    const filteredStudents =
        selectedClass === "all"
            ? students.filter(
                (s) =>
                    s.name.toLowerCase().includes(search.toLowerCase()) ||
                    s.studentId.toLowerCase().includes(search.toLowerCase())
            )
            : students.filter(
                (s) =>
                    s.class === selectedClass &&
                    (s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.studentId.toLowerCase().includes(search.toLowerCase()))
            );

    const averageGrade =
        filteredStudents.reduce((acc, s) => acc + s.overall, 0) / (filteredStudents.length || 1);

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Student Grades</h1>
                    <p className="text-sm text-zinc-500">Manage and update student grades across all subjects.</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Refresh
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Total Students</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">{filteredStudents.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Class Average</p>
                        <p className="mt-1 text-2xl font-semibold text-blue-600">{averageGrade.toFixed(1)}%</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Passing Rate</p>
                        <div className="mt-1 flex items-center gap-2">
                            <p className="text-2xl font-semibold text-emerald-600">
                                {((filteredStudents.filter((s) => s.overall >= 60).length / filteredStudents.length) * 100).toFixed(0)}%
                            </p>
                            <TrendingUp className="h-4 w-4 text-emerald-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">A Students</p>
                        <p className="mt-1 text-2xl font-semibold text-purple-600">
                            {filteredStudents.filter((s) => s.grade.startsWith("A")).length}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="relative max-w-sm">
                            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                            <Input
                                placeholder="Search students..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-8 pl-8 text-xs"
                            />
                        </div>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="h-8 rounded-lg border border-zinc-200 bg-white px-3 text-xs text-zinc-900"
                        >
                            {classes.map((cls) => (
                                <option key={cls} value={cls}>
                                    {cls === "all" ? "All Classes" : cls}
                                </option>
                            ))}
                        </select>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-zinc-200">
                                    <th className="pb-3 text-left text-xs font-semibold text-zinc-600">Student</th>
                                    <th className="pb-3 text-left text-xs font-semibold text-zinc-600">Class</th>
                                    <th className="pb-3 text-center text-xs font-semibold text-zinc-600">Midterm</th>
                                    <th className="pb-3 text-center text-xs font-semibold text-zinc-600">Final</th>
                                    <th className="pb-3 text-center text-xs font-semibold text-zinc-600">
                                        Assignments
                                    </th>
                                    <th className="pb-3 text-center text-xs font-semibold text-zinc-600">Overall</th>
                                    <th className="pb-3 text-center text-xs font-semibold text-zinc-600">Grade</th>
                                    <th className="pb-3 text-right text-xs font-semibold text-zinc-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="border-b border-zinc-100">
                                        <td className="py-3">
                                            <p className="text-sm font-medium text-zinc-900">{student.name}</p>
                                            <p className="text-xs text-zinc-500">{student.studentId}</p>
                                        </td>
                                        <td className="py-3 text-xs text-zinc-600">{student.class}</td>
                                        <td className="py-3 text-center">
                                            <input
                                                type="number"
                                                defaultValue={student.midterm}
                                                className="h-7 w-16 rounded border border-zinc-200 px-2 text-center text-xs"
                                                min="0"
                                                max="100"
                                            />
                                        </td>
                                        <td className="py-3 text-center">
                                            <input
                                                type="number"
                                                defaultValue={student.final}
                                                className="h-7 w-16 rounded border border-zinc-200 px-2 text-center text-xs"
                                                min="0"
                                                max="100"
                                            />
                                        </td>
                                        <td className="py-3 text-center">
                                            <input
                                                type="number"
                                                defaultValue={student.assignments}
                                                className="h-7 w-16 rounded border border-zinc-200 px-2 text-center text-xs"
                                                min="0"
                                                max="100"
                                            />
                                        </td>
                                        <td className="py-3 text-center">
                                            <span className="text-sm font-semibold text-zinc-900">
                                                {student.overall.toFixed(1)}%
                                            </span>
                                        </td>
                                        <td className="py-3 text-center">
                                            <Badge
                                                variant={
                                                    student.grade.startsWith("A")
                                                        ? "success"
                                                        : student.grade.startsWith("B")
                                                            ? "default"
                                                            : "outline"
                                                }
                                            >
                                                {student.grade}
                                            </Badge>
                                        </td>
                                        <td className="py-3 text-right">
                                            <Button variant="outline" size="sm" className="gap-1 text-xs">
                                                <Save className="h-3 w-3" />
                                                Save
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredStudents.length === 0 && (
                            <p className="py-6 text-center text-sm text-zinc-500">No students found.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
