"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, BookOpen, ClipboardList, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Teacher {
    id: string;
    employeeId: string;
    department: string | null;
    qualification: string | null;
    specialization: string | null;
    joinDate: string | null;
    user: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        avatar: string | null;
        isActive: boolean;
    };
    classTeacher: Array<{
        id: string;
        name: string;
        section: string | null;
        grade: {
            name: string;
            level: number;
        };
    }>;
    schedules: Array<{
        id: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        roomNumber: string | null;
        subject: {
            name: string;
            code: string | null;
        };
        class: {
            name: string;
            section: string | null;
        };
    }>;
    assignments: Array<{
        id: string;
        title: string;
        dueDate: string;
        status: string;
        subject: {
            name: string;
        };
    }>;
    exams: Array<{
        id: string;
        title: string;
        examDate: string;
        status: string;
        type: string;
        subject: {
            name: string;
        };
        class: {
            name: string;
            section: string | null;
        };
    }>;
}

type Tab = "profile" | "schedule" | "assignments" | "exams";

export default function TeacherDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>("profile");
    const [teacher, setTeacher] = useState<Teacher | null>(null);

    useEffect(() => {
        if (params.id) {
            loadTeacher();
        }
    }, [params.id]);

    async function loadTeacher() {
        try {
            setLoading(true);
            const res = await fetch(`/api/dashboard/teachers/${params.id}`);
            const data = await res.json();

            if (res.ok) {
                setTeacher(data.teacher);
            } else {
                alert(data.error || "Failed to load teacher");
                router.push("/dashboard/teachers");
            }
        } catch (error) {
            console.error("Failed to load teacher:", error);
            alert("Failed to load teacher");
            router.push("/dashboard/teachers");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
        );
    }

    if (!teacher) {
        return null;
    }

    const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
        {
            id: "profile",
            label: "Profile",
            icon: <User className="h-4 w-4" />,
        },
        {
            id: "schedule",
            label: "Schedule",
            icon: <ClipboardList className="h-4 w-4" />,
            count: teacher.schedules.length,
        },
        {
            id: "assignments",
            label: "Assignments",
            icon: <BookOpen className="h-4 w-4" />,
            count: teacher.assignments.length,
        },
        {
            id: "exams",
            label: "Exams",
            icon: <ClipboardList className="h-4 w-4" />,
            count: teacher.exams.length,
        },
    ];

    const getDayName = (day: number) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[day];
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="gap-1.5 text-xs"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back
                </Button>
            </div>

            {/* Header */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={teacher.user.avatar || undefined} />
                                <AvatarFallback>
                                    {teacher.user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-2xl font-semibold text-zinc-900">
                                    {teacher.user.name}
                                </h1>
                                <p className="text-sm text-zinc-500">{teacher.user.email}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge>{teacher.employeeId}</Badge>
                                    {teacher.department && (
                                        <Badge variant="outline">{teacher.department}</Badge>
                                    )}
                                    {!teacher.user.isActive && (
                                        <Badge variant="outline" className="bg-red-100 text-red-700">
                                            Inactive
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs */}
            <div className="border-b border-zinc-200">
                <nav className="-mb-px flex gap-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1.5 pb-3 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === tab.id
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300"
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                            {tab.count !== undefined && (
                                <span className="ml-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs">
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === "profile" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-zinc-500">Full Name</p>
                            <p className="mt-1 text-sm font-medium text-zinc-900">{teacher.user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500">Email Address</p>
                            <p className="mt-1 text-sm font-medium text-zinc-900">{teacher.user.email}</p>
                        </div>
                        {teacher.user.phone && (
                            <div>
                                <p className="text-sm text-zinc-500">Phone Number</p>
                                <p className="mt-1 text-sm font-medium text-zinc-900">{teacher.user.phone}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-sm text-zinc-500">Employee ID</p>
                            <p className="mt-1 text-sm font-medium text-zinc-900">{teacher.employeeId}</p>
                        </div>
                        {teacher.department && (
                            <div>
                                <p className="text-sm text-zinc-500">Department</p>
                                <p className="mt-1 text-sm font-medium text-zinc-900">{teacher.department}</p>
                            </div>
                        )}
                        {teacher.qualification && (
                            <div>
                                <p className="text-sm text-zinc-500">Qualification</p>
                                <p className="mt-1 text-sm font-medium text-zinc-900">{teacher.qualification}</p>
                            </div>
                        )}
                        {teacher.specialization && (
                            <div>
                                <p className="text-sm text-zinc-500">Specialization</p>
                                <p className="mt-1 text-sm font-medium text-zinc-900">{teacher.specialization}</p>
                            </div>
                        )}
                        {teacher.joinDate && (
                            <div>
                                <p className="text-sm text-zinc-500">Join Date</p>
                                <p className="mt-1 text-sm font-medium text-zinc-900">
                                    {new Date(teacher.joinDate).toLocaleDateString()}
                                </p>
                            </div>
                        )}
                        {teacher.classTeacher.length > 0 && (
                            <div className="md:col-span-2">
                                <p className="text-sm text-zinc-500 mb-2">Assigned Classes (Class Teacher)</p>
                                <div className="flex flex-wrap gap-2">
                                    {teacher.classTeacher.map((cls) => (
                                        <Badge key={cls.id} variant="outline">
                                            {cls.grade.name} - {cls.name} {cls.section || ""}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {activeTab === "schedule" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {teacher.schedules.length > 0 ? (
                            <div className="space-y-3">
                                {teacher.schedules.map((schedule) => (
                                    <div
                                        key={schedule.id}
                                        className="flex items-center justify-between p-4 rounded-lg border border-zinc-100"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-zinc-900">
                                                {schedule.subject.name}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {schedule.class.name} {schedule.class.section || ""}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-zinc-900">
                                                {getDayName(schedule.dayOfWeek)}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {schedule.startTime} - {schedule.endTime}
                                            </p>
                                            {schedule.roomNumber && (
                                                <p className="text-xs text-zinc-400">
                                                    Room: {schedule.roomNumber}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-zinc-500 py-6">No schedule assigned</p>
                        )}
                    </CardContent>
                </Card>
            )}

            {activeTab === "assignments" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Assignments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {teacher.assignments.length > 0 ? (
                            <div className="space-y-3">
                                {teacher.assignments.map((assignment) => (
                                    <div
                                        key={assignment.id}
                                        className="flex items-center justify-between p-4 rounded-lg border border-zinc-100"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-zinc-900">
                                                {assignment.title}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {assignment.subject.name}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <Badge
                                                variant={
                                                    assignment.status === "ACTIVE"
                                                        ? "default"
                                                        : "outline"
                                                }
                                            >
                                                {assignment.status}
                                            </Badge>
                                            <p className="text-xs text-zinc-500 mt-1">
                                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-zinc-500 py-6">No assignments created</p>
                        )}
                    </CardContent>
                </Card>
            )}

            {activeTab === "exams" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Exams</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {teacher.exams.length > 0 ? (
                            <div className="space-y-3">
                                {teacher.exams.map((exam) => (
                                    <div
                                        key={exam.id}
                                        className="flex items-center justify-between p-4 rounded-lg border border-zinc-100"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-zinc-900">
                                                {exam.title}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {exam.subject.name} • {exam.class.name} {exam.class.section || ""}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <Badge
                                                variant={
                                                    exam.status === "COMPLETED"
                                                        ? "outline"
                                                        : "default"
                                                }
                                            >
                                                {exam.type}
                                            </Badge>
                                            <p className="text-xs text-zinc-500 mt-1">
                                                Date: {new Date(exam.examDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-zinc-500 py-6">No exams scheduled</p>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
