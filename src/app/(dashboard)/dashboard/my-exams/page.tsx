"use client";

import { useState } from "react";
import { GraduationCap, Calendar, Clock, MapPin, CheckCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyExamsPage() {
    const [selectedFilter, setSelectedFilter] = useState("all");

    // Mock data - replace with actual API call
    const exams = [
        {
            id: "1",
            title: "Mathematics Midterm",
            class: "Mathematics 101",
            date: "2026-03-30",
            time: "9:00 AM - 11:00 AM",
            location: "Room 201",
            duration: "2 hours",
            status: "Upcoming",
            totalMarks: 100,
            syllabus: "Chapters 1-5",
        },
        {
            id: "2",
            title: "Physics Final Exam",
            class: "Physics 201",
            date: "2026-04-15",
            time: "2:00 PM - 4:30 PM",
            location: "Lab 105",
            duration: "2.5 hours",
            status: "Upcoming",
            totalMarks: 150,
            syllabus: "All chapters",
        },
        {
            id: "3",
            title: "Chemistry Quiz",
            class: "Chemistry 101",
            date: "2026-03-28",
            time: "10:00 AM - 10:30 AM",
            location: "Lab 102",
            duration: "30 minutes",
            status: "Upcoming",
            totalMarks: 30,
            syllabus: "Chapters 6-8",
        },
        {
            id: "4",
            title: "Mathematics Quiz #2",
            class: "Mathematics 101",
            date: "2026-03-10",
            time: "11:00 AM - 11:45 AM",
            location: "Room 201",
            duration: "45 minutes",
            status: "Completed",
            totalMarks: 40,
            score: 35,
            syllabus: "Chapters 3-4",
        },
    ];

    const filteredExams =
        selectedFilter === "all"
            ? exams
            : exams.filter((e) => e.status.toLowerCase() === selectedFilter);

    const upcomingCount = exams.filter((e) => e.status === "Upcoming").length;
    const completedCount = exams.filter((e) => e.status === "Completed").length;
    const averageScore =
        exams.filter((e) => e.score !== undefined).length > 0
            ? (
                exams
                    .filter((e) => e.score !== undefined)
                    .reduce((acc, e) => acc + ((e.score! / e.totalMarks) * 100), 0) /
                exams.filter((e) => e.score !== undefined).length
            ).toFixed(1)
            : 0;

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">My Exams</h1>
                    <p className="text-sm text-zinc-500">View your exam schedule and results.</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Refresh
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-zinc-400" />
                            <p className="text-xs text-zinc-500">Total Exams</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">{exams.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <p className="text-xs text-zinc-500">Upcoming</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-blue-600">{upcomingCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                            <p className="text-xs text-zinc-500">Completed</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-emerald-600">{completedCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-purple-600" />
                            <p className="text-xs text-zinc-500">Avg Score</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-purple-600">{averageScore}%</p>
                    </CardContent>
                </Card>
            </div>

            <div className="flex gap-2">
                <Button
                    variant={selectedFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("all")}
                    className="text-xs"
                >
                    All
                </Button>
                <Button
                    variant={selectedFilter === "upcoming" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("upcoming")}
                    className="text-xs"
                >
                    Upcoming
                </Button>
                <Button
                    variant={selectedFilter === "completed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("completed")}
                    className="text-xs"
                >
                    Completed
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {filteredExams.map((exam) => (
                    <Card key={exam.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <GraduationCap className="h-5 w-5 text-zinc-400 mt-0.5" />
                                    <div>
                                        <CardTitle className="text-base">{exam.title}</CardTitle>
                                        <p className="mt-1 text-xs text-zinc-500">{exam.class}</p>
                                    </div>
                                </div>
                                <Badge
                                    variant={exam.status === "Completed" ? "success" : "default"}
                                >
                                    {exam.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-zinc-600">
                                    <Calendar className="h-4 w-4 text-zinc-400" />
                                    <span>{exam.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-zinc-600">
                                    <Clock className="h-4 w-4 text-zinc-400" />
                                    <span>{exam.time} ({exam.duration})</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-zinc-600">
                                    <MapPin className="h-4 w-4 text-zinc-400" />
                                    <span>{exam.location}</span>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-zinc-100 space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-500">Syllabus</span>
                                    <span className="font-medium text-zinc-900">{exam.syllabus}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-500">Total Marks</span>
                                    <span className="font-medium text-zinc-900">{exam.totalMarks}</span>
                                </div>
                                {exam.score !== undefined && (
                                    <div className="flex justify-between text-xs">
                                        <span className="text-zinc-500">Your Score</span>
                                        <span className="font-semibold text-emerald-600">
                                            {exam.score}/{exam.totalMarks} ({((exam.score / exam.totalMarks) * 100).toFixed(1)}%)
                                        </span>
                                    </div>
                                )}
                            </div>

                            <Button variant="outline" className="w-full text-xs">
                                {exam.status === "Completed" ? "View Results" : "View Details"}
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                {filteredExams.length === 0 && (
                    <Card className="lg:col-span-2">
                        <CardContent className="py-12 text-center">
                            <GraduationCap className="mx-auto h-12 w-12 text-zinc-300" />
                            <p className="mt-4 text-sm font-medium text-zinc-900">No exams found</p>
                            <p className="mt-1 text-xs text-zinc-500">No exams match the selected filter.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
