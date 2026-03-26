"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Calendar, BookOpen, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StudentDetail {
    id: string;
    studentId: string;
    status: string;
    enrollmentDate?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    address?: string | null;
    bloodType?: string | null;
    medicalNotes?: string | null;
    user: {
        id: string;
        name: string;
        email: string;
        avatar?: string | null;
    };
    class: {
        id: string;
        name: string;
        section: string | null;
        grade: {
            name: string;
            level: number;
        };
    } | null;
    parent: {
        user: {
            name: string;
            email: string;
            phone?: string | null;
        };
    } | null;
}

export default function StudentDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState<StudentDetail | null>(null);
    const [activeTab, setActiveTab] = useState<"profile" | "attendance" | "grades">("profile");

    useEffect(() => {
        async function loadStudent() {
            try {
                const res = await fetch(`/api/dashboard/students/${params.id}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Failed to load student");
                }

                setStudent(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (params.id) {
            loadStudent();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-sm text-zinc-500">Loading student details...</p>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="space-y-5">
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
                <Card>
                    <CardContent className="py-12 text-center text-sm text-zinc-500">
                        Student not found
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-xl font-semibold text-zinc-900">{student.user.name}</h1>
                        <p className="text-sm text-zinc-500">{student.studentId} • {student.user.email}</p>
                    </div>
                </div>
                <Badge variant={student.status === "ACTIVE" ? "success" : "outline"}>
                    {student.status}
                </Badge>
            </div>

            <div className="flex gap-2 border-b border-zinc-200">
                <button
                    className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "profile"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-zinc-600 hover:text-zinc-900"
                        }`}
                    onClick={() => setActiveTab("profile")}
                >
                    <User className="inline h-4 w-4 mr-2" />
                    Profile
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "attendance"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-zinc-600 hover:text-zinc-900"
                        }`}
                    onClick={() => setActiveTab("attendance")}
                >
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Attendance
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "grades"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-zinc-600 hover:text-zinc-900"
                        }`}
                    onClick={() => setActiveTab("grades")}
                >
                    <BookOpen className="inline h-4 w-4 mr-2" />
                    Grades
                </button>
            </div>

            {activeTab === "profile" && (
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-xs text-zinc-500">Full Name</p>
                                <p className="text-sm font-medium text-zinc-900">{student.user.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500">Email</p>
                                <p className="text-sm text-zinc-900">{student.user.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500">Student ID</p>
                                <p className="text-sm text-zinc-900">{student.studentId}</p>
                            </div>
                            {student.dateOfBirth && (
                                <div>
                                    <p className="text-xs text-zinc-500">Date of Birth</p>
                                    <p className="text-sm text-zinc-900">
                                        {new Date(student.dateOfBirth).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                            {student.gender && (
                                <div>
                                    <p className="text-xs text-zinc-500">Gender</p>
                                    <p className="text-sm text-zinc-900">{student.gender}</p>
                                </div>
                            )}
                            {student.bloodType && (
                                <div>
                                    <p className="text-xs text-zinc-500">Blood Type</p>
                                    <p className="text-sm text-zinc-900">{student.bloodType}</p>
                                </div>
                            )}
                            {student.address && (
                                <div>
                                    <p className="text-xs text-zinc-500">Address</p>
                                    <p className="text-sm text-zinc-900">{student.address}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Academic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {student.class ? (
                                <>
                                    <div>
                                        <p className="text-xs text-zinc-500">Current Class</p>
                                        <p className="text-sm font-medium text-zinc-900">
                                            {student.class.name}
                                            {student.class.section ? ` - Section ${student.class.section}` : ""}
                                        </p>
                                        <p className="text-xs text-zinc-500">
                                            {student.class.grade.name} (Level {student.class.grade.level})
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <p className="text-xs text-zinc-500">Current Class</p>
                                    <p className="text-sm text-zinc-900">Not assigned</p>
                                </div>
                            )}
                            <div>
                                <p className="text-xs text-zinc-500">Enrollment Date</p>
                                <p className="text-sm text-zinc-900">
                                    {student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-500">Status</p>
                                <Badge variant={student.status === "ACTIVE" ? "success" : "outline"}>
                                    {student.status}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {student.parent && (
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-base">Parent/Guardian Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <p className="text-xs text-zinc-500">Name</p>
                                    <p className="text-sm font-medium text-zinc-900">{student.parent.user.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-zinc-500">Email</p>
                                    <p className="text-sm text-zinc-900">{student.parent.user.email}</p>
                                </div>
                                {student.parent.user.phone && (
                                    <div>
                                        <p className="text-xs text-zinc-500">Phone</p>
                                        <p className="text-sm text-zinc-900">{student.parent.user.phone}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {student.medicalNotes && (
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    Medical Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-zinc-900 whitespace-pre-wrap">{student.medicalNotes}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {activeTab === "attendance" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Attendance Records</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center py-12 text-sm text-zinc-500">
                            Attendance history will be displayed here
                        </div>
                    </CardContent>
                </Card>
            )}

            {activeTab === "grades" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Academic Grades</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center py-12 text-sm text-zinc-500">
                            Grade records will be displayed here
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
