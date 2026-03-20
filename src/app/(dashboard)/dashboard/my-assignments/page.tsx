"use client";

import { useState } from "react";
import { FileText, Calendar, Upload, CheckCircle, Clock, AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyAssignmentsPage() {
    const [selectedFilter, setSelectedFilter] = useState("all");

    // Mock data - replace with actual API call
    const assignments = [
        {
            id: "1",
            title: "Calculus Problem Set #5",
            class: "Mathematics 101",
            dueDate: "2026-03-25",
            status: "Pending",
            points: 50,
            description: "Complete exercises 1-20 from Chapter 5",
        },
        {
            id: "2",
            title: "Physics Lab Report",
            class: "Physics 201",
            dueDate: "2026-03-22",
            status: "Overdue",
            points: 100,
            description: "Submit detailed report on the projectile motion experiment",
        },
        {
            id: "3",
            title: "Chemistry Quiz #3",
            class: "Chemistry 101",
            dueDate: "2026-03-28",
            status: "Pending",
            points: 30,
            description: "Online quiz covering chapters 6-8",
        },
        {
            id: "4",
            title: "Mathematics Midterm Review",
            class: "Mathematics 101",
            dueDate: "2026-03-15",
            status: "Submitted",
            points: 40,
            score: 38,
            description: "Review assignment for midterm preparation",
        },
    ];

    const filteredAssignments =
        selectedFilter === "all"
            ? assignments
            : assignments.filter((a) => a.status.toLowerCase() === selectedFilter);

    const pendingCount = assignments.filter((a) => a.status === "Pending").length;
    const overdueCount = assignments.filter((a) => a.status === "Overdue").length;
    const submittedCount = assignments.filter((a) => a.status === "Submitted").length;

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">My Assignments</h1>
                    <p className="text-sm text-zinc-500">View and submit your assignments.</p>
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
                            <FileText className="h-4 w-4 text-zinc-400" />
                            <p className="text-xs text-zinc-500">Total</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">{assignments.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <p className="text-xs text-zinc-500">Pending</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-blue-600">{pendingCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <p className="text-xs text-zinc-500">Overdue</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-red-600">{overdueCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                            <p className="text-xs text-zinc-500">Submitted</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-emerald-600">{submittedCount}</p>
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
                    variant={selectedFilter === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("pending")}
                    className="text-xs"
                >
                    Pending
                </Button>
                <Button
                    variant={selectedFilter === "overdue" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("overdue")}
                    className="text-xs"
                >
                    Overdue
                </Button>
                <Button
                    variant={selectedFilter === "submitted" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("submitted")}
                    className="text-xs"
                >
                    Submitted
                </Button>
            </div>

            <div className="space-y-3">
                {filteredAssignments.map((assignment) => (
                    <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-start gap-3">
                                        <FileText className="h-5 w-5 text-zinc-400 mt-0.5" />
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-zinc-900">{assignment.title}</h3>
                                            <p className="mt-1 text-xs text-zinc-500">{assignment.class}</p>
                                            <p className="mt-2 text-xs text-zinc-600">{assignment.description}</p>
                                            <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    Due: {assignment.dueDate}
                                                </div>
                                                <div>Points: {assignment.points}</div>
                                                {assignment.score !== undefined && (
                                                    <div className="font-medium text-emerald-600">
                                                        Score: {assignment.score}/{assignment.points}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <Badge
                                        variant={
                                            assignment.status === "Submitted"
                                                ? "success"
                                                : assignment.status === "Overdue"
                                                    ? "destructive"
                                                    : "default"
                                        }
                                    >
                                        {assignment.status}
                                    </Badge>
                                    {assignment.status !== "Submitted" && (
                                        <Button size="sm" className="gap-1 text-xs">
                                            <Upload className="h-3 w-3" />
                                            Submit
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {filteredAssignments.length === 0 && (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <FileText className="mx-auto h-12 w-12 text-zinc-300" />
                            <p className="mt-4 text-sm font-medium text-zinc-900">No assignments found</p>
                            <p className="mt-1 text-xs text-zinc-500">No assignments match the selected filter.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
