"use client";

import { useState } from "react";
import { UserPlus, CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyEnrollmentPage() {
    // Mock data - replace with actual API call
    const enrollmentStatus = {
        studentId: "STU001",
        name: "Alice Johnson",
        email: "alice.johnson@school.edu",
        status: "ACTIVE",
        enrolledDate: "2026-01-15",
        semester: "Spring 2026",
        program: "Computer Science",
        academicYear: "2025-2026",
    };

    const enrollmentHistory = [
        {
            id: "1",
            class: "Mathematics 101",
            section: "A",
            enrolledDate: "2026-01-15",
            status: "Active",
            credits: 3,
        },
        {
            id: "2",
            class: "Physics 201",
            section: "B",
            enrolledDate: "2026-01-16",
            status: "Active",
            credits: 4,
        },
        {
            id: "3",
            class: "Chemistry 101",
            section: "A",
            enrolledDate: "2026-01-17",
            status: "Active",
            credits: 3,
        },
        {
            id: "4",
            class: "English 102",
            section: "C",
            enrolledDate: "2025-09-01",
            status: "Completed",
            credits: 3,
        },
    ];

    const activeEnrollments = enrollmentHistory.filter((e) => e.status === "Active");
    const completedEnrollments = enrollmentHistory.filter((e) => e.status === "Completed");

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">My Enrollment</h1>
                    <p className="text-sm text-zinc-500">View your enrollment status and history.</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Refresh
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        Enrollment Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <p className="text-xs text-zinc-500">Student ID</p>
                            <p className="mt-1 text-sm font-semibold text-zinc-900">{enrollmentStatus.studentId}</p>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500">Full Name</p>
                            <p className="mt-1 text-sm font-semibold text-zinc-900">{enrollmentStatus.name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500">Email</p>
                            <p className="mt-1 text-sm font-semibold text-zinc-900">{enrollmentStatus.email}</p>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500">Status</p>
                            <Badge variant="success" className="mt-1">
                                {enrollmentStatus.status}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500">Current Semester</p>
                            <p className="mt-1 text-sm font-semibold text-zinc-900">{enrollmentStatus.semester}</p>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500">Program</p>
                            <p className="mt-1 text-sm font-semibold text-zinc-900">{enrollmentStatus.program}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-600" />
                            <p className="text-xs text-zinc-500">Active Enrollments</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-emerald-600">{activeEnrollments.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <p className="text-xs text-zinc-500">Total Credits</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-blue-600">
                            {activeEnrollments.reduce((acc, e) => acc + e.credits, 0)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-zinc-400" />
                            <p className="text-xs text-zinc-500">Completed</p>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">{completedEnrollments.length}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Current Enrollments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {activeEnrollments.map((enrollment) => (
                            <div
                                key={enrollment.id}
                                className="flex items-center justify-between rounded-lg border border-zinc-100 p-3"
                            >
                                <div>
                                    <p className="text-sm font-medium text-zinc-900">{enrollment.class}</p>
                                    <p className="text-xs text-zinc-500">
                                        Section {enrollment.section} • {enrollment.credits} Credits
                                    </p>
                                </div>
                                <div className="text-right">
                                    <Badge variant="success">{enrollment.status}</Badge>
                                    <p className="mt-1 text-xs text-zinc-500">{enrollment.enrolledDate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Enrollment History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {completedEnrollments.map((enrollment) => (
                            <div
                                key={enrollment.id}
                                className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 bg-zinc-50"
                            >
                                <div>
                                    <p className="text-sm font-medium text-zinc-700">{enrollment.class}</p>
                                    <p className="text-xs text-zinc-500">
                                        Section {enrollment.section} • {enrollment.credits} Credits
                                    </p>
                                </div>
                                <div className="text-right">
                                    <Badge variant="outline">{enrollment.status}</Badge>
                                    <p className="mt-1 text-xs text-zinc-500">{enrollment.enrolledDate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
