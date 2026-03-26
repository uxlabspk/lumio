"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserCheck, Search, RefreshCw, UserPlus, BookOpen, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Teacher {
    id: string;
    employeeId: string;
    department: string | null;
    qualification: string | null;
    specialization: string | null;
    user: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
    };
    classTeacher: Array<{
        id: string;
        name: string;
        section: string | null;
    }>;
}

interface ClassItem {
    id: string;
    name: string;
    section: string | null;
    grade: {
        name: string;
        level: number;
    };
}

export default function TeachersPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [canManage, setCanManage] = useState(false);
    const [assigning, setAssigning] = useState(false);
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [selectedClassId, setSelectedClassId] = useState("");

    useEffect(() => {
        loadTeachers();
    }, []);

    async function loadTeachers() {
        try {
            setLoading(true);
            const res = await fetch("/api/dashboard/teachers");
            const data = await res.json();

            if (res.ok) {
                setTeachers(data.teachers);
                setClasses(data.classes);
                setCanManage(data.canManage);
            }
        } catch (error) {
            console.error("Failed to load teachers:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleAssignTeacher() {
        if (!selectedTeacherId || !selectedClassId) {
            alert("Please select both teacher and class");
            return;
        }

        try {
            setAssigning(true);
            const res = await fetch("/api/dashboard/teachers/assign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    teacherId: selectedTeacherId,
                    classId: selectedClassId,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                setSelectedTeacherId("");
                setSelectedClassId("");
                loadTeachers(); // Reload to get updated data
            } else {
                alert(data.error || "Failed to assign teacher");
            }
        } catch (error) {
            console.error("Failed to assign teacher:", error);
            alert("Failed to assign teacher");
        } finally {
            setAssigning(false);
        }
    }

    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.user.name.toLowerCase().includes(search.toLowerCase()) ||
            teacher.user.email.toLowerCase().includes(search.toLowerCase()) ||
            (teacher.department && teacher.department.toLowerCase().includes(search.toLowerCase())) ||
            (teacher.specialization && teacher.specialization.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Teachers Management</h1>
                    <p className="text-sm text-zinc-500">Manage teachers and assign them to classes.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={loadTeachers}>
                        <RefreshCw className="h-3.5 w-3.5" />
                        Refresh
                    </Button>
                    {canManage && (
                        <Button
                            size="sm"
                            className="gap-1.5 text-xs"
                            onClick={() => router.push("/dashboard/teachers/add")}
                        >
                            <UserPlus className="h-3.5 w-3.5" />
                            Add Teacher
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Total Teachers</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">{teachers.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Total Classes Assigned</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">
                            {teachers.reduce((acc, t) => acc + t.classTeacher.length, 0)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Departments</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">
                            {new Set(teachers.map(t => t.department).filter(Boolean)).size}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Avg Classes/Teacher</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">
                            {teachers.length > 0 ? Math.round(teachers.reduce((acc, t) => acc + t.classTeacher.length, 0) / teachers.length) : 0}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        Assign Teacher to Class
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-3">
                    <select
                        className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900"
                        value={selectedTeacherId}
                        onChange={(e) => setSelectedTeacherId(e.target.value)}
                    >
                        <option value="">Select teacher...</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.user.name} - {teacher.department || "No Department"}
                            </option>
                        ))}
                    </select>

                    <select
                        className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900"
                        value={selectedClassId}
                        onChange={(e) => setSelectedClassId(e.target.value)}
                    >
                        <option value="">Select class...</option>
                        {classes.map((classItem) => (
                            <option key={classItem.id} value={classItem.id}>
                                {classItem.grade.name} - {classItem.name} {classItem.section || ""}
                            </option>
                        ))}
                    </select>

                    <Button className="gap-1.5" onClick={handleAssignTeacher} disabled={assigning}>
                        {assigning && <Loader2 className="h-4 w-4 animate-spin" />}
                        <UserCheck className="h-4 w-4" />
                        {assigning ? "Assigning..." : "Assign"}
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                        <Input
                            placeholder="Search teachers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-8 pl-8 text-xs"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {loading ? (
                            <div className="py-6 text-center">
                                <Loader2 className="h-6 w-6 animate-spin mx-auto text-zinc-400" />
                                <p className="mt-2 text-sm text-zinc-500">Loading teachers...</p>
                            </div>
                        ) : filteredTeachers.length > 0 ? (
                            filteredTeachers.map((teacher) => (
                                <div
                                    key={teacher.id}
                                    className="grid grid-cols-1 gap-3 rounded-lg border border-zinc-100 p-4 md:grid-cols-5 md:items-center"
                                >
                                    <div className="md:col-span-2">
                                        <p className="text-sm font-medium text-zinc-900">{teacher.user.name}</p>
                                        <p className="text-xs text-zinc-500">{teacher.user.email}</p>
                                        {teacher.employeeId && (
                                            <p className="text-xs text-zinc-400">ID: {teacher.employeeId}</p>
                                        )}
                                    </div>

                                    <div>
                                        {teacher.department ? (
                                            <Badge variant="outline">{teacher.department}</Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-zinc-100">No Dept</Badge>
                                        )}
                                    </div>

                                    <div>
                                        <p className="text-xs text-zinc-500">Classes: {teacher.classTeacher.length}</p>
                                        {teacher.specialization && (
                                            <p className="text-xs text-zinc-400 truncate max-w-[150px]">
                                                {teacher.specialization}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-1 text-xs"
                                            onClick={() => router.push(`/dashboard/teachers/${teacher.id}`)}
                                        >
                                            <BookOpen className="h-3 w-3" />
                                            View Profile
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="py-6 text-center text-sm text-zinc-500">No teachers found.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
