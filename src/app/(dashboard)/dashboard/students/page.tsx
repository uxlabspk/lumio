"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCw, UserPlus, Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface StudentUser {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
}

interface StudentClass {
    id: string;
    name: string;
    section: string | null;
}

interface StudentData {
    id: string;
    studentId: string;
    status: string;
    enrollmentDate?: string | null;
    user: StudentUser;
    class: StudentClass | null;
}

export default function StudentsPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [data, setData] = useState<{ students: StudentData[]; classes: StudentClass[]; canManage: boolean } | null>(null);
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [selectedClassId, setSelectedClassId] = useState("");

    async function loadStudents() {
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/dashboard/students", { cache: "no-store" });
            const payload = await res.json();

            if (!res.ok) {
                throw new Error(payload.error || "Failed to load students.");
            }

            setData(payload);

            if (!selectedStudentId && payload.students.length > 0) {
                setSelectedStudentId(payload.students[0].id);
            }

            if (!selectedClassId && payload.classes.length > 0) {
                setSelectedClassId(payload.classes[0].id);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load students.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadStudents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredStudents = useMemo(() => {
        if (!data) return [];
        const q = search.toLowerCase().trim();
        if (!q) return data.students;

        return data.students.filter((student) => {
            return (
                student.user.name.toLowerCase().includes(q) ||
                student.user.email.toLowerCase().includes(q) ||
                student.studentId.toLowerCase().includes(q) ||
                (student.class?.name.toLowerCase().includes(q) ?? false)
            );
        });
    }, [data, search]);

    async function enrollStudent(studentId: string, classId: string) {
        setSaving(true);
        setError("");
        setMessage("");

        try {
            const res = await fetch("/api/dashboard/students/enroll", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId, classId }),
            });

            const payload = await res.json();

            if (!res.ok) {
                throw new Error(payload.error || "Failed to enroll student.");
            }

            setMessage(payload.message || "Student enrolled.");
            await loadStudents();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to enroll student.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Students</h1>
                    <p className="text-sm text-zinc-500">
                        Manage student records, enrollment, and profiles.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={loadStudents}>
                        <RefreshCw className="h-3.5 w-3.5" />
                        Refresh
                    </Button>
                    {data?.canManage && (
                        <Button variant="default" size="sm" className="gap-1.5 text-xs" onClick={() => router.push("/dashboard/students/add")}>
                            <UserPlus className="h-3.5 w-3.5" />
                            Add Student
                        </Button>
                    )}
                </div>
            </div>

            {message ? (
                <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                    {message}
                </div>
            ) : null}

            {error ? (
                <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                </div>
            ) : null}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Total Students</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">{data?.students.length ?? 0}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Total Classes</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">{data?.classes.length ?? 0}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Access Mode</p>
                        <p className="mt-1 text-lg font-semibold text-zinc-900">
                            {data?.canManage ? "Full Management" : "View Only"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {data?.canManage ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            Quick Enrollment
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3 md:grid-cols-3">
                        <select
                            value={selectedStudentId}
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                            className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900"
                        >
                            {data.students.map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.user.name} ({student.studentId})
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedClassId}
                            onChange={(e) => setSelectedClassId(e.target.value)}
                            className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900"
                        >
                            {data.classes.map((classroom) => (
                                <option key={classroom.id} value={classroom.id}>
                                    {classroom.name}
                                    {classroom.section ? ` ${classroom.section}` : ""}
                                </option>
                            ))}
                        </select>

                        <Button
                            disabled={!selectedStudentId || !selectedClassId || saving}
                            onClick={() => enrollStudent(selectedStudentId, selectedClassId)}
                            className="gap-1.5"
                        >
                            <UserPlus className="h-4 w-4" />
                            {saving ? "Enrolling..." : "Enroll"}
                        </Button>
                    </CardContent>
                </Card>
            ) : null}

            <Card>
                <CardHeader className="pb-2">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                        <Input
                            placeholder="Search students..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-8 pl-8 text-xs"
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p className="py-6 text-sm text-zinc-500">Loading students...</p>
                    ) : (
                        <div className="space-y-2">
                            {filteredStudents.map((student) => (
                                <div key={student.id} className="grid grid-cols-1 gap-3 rounded-lg border border-zinc-100 p-3 md:grid-cols-5 md:items-center">
                                    <div className="md:col-span-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700">
                                                {student.user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-zinc-900">{student.user.name}</p>
                                                <p className="text-xs text-zinc-500">{student.user.email}</p>
                                            </div>
                                        </div>
                                        <p className="mt-1 text-[10px] text-zinc-400">ID: {student.studentId}</p>
                                    </div>

                                    <div className="text-xs text-zinc-600">
                                        {student.class
                                            ? `${student.class.name}${student.class.section ? ` ${student.class.section}` : ""}`
                                            : "Unassigned"}
                                    </div>

                                    <div>
                                        <Badge variant={student.status === "ACTIVE" ? "success" : "outline"}>
                                            {student.status}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 px-2"
                                            onClick={() => router.push(`/dashboard/students/${student.id}`)}
                                        >
                                            <Eye className="h-3.5 w-3.5" />
                                        </Button>
                                        {data?.canManage && (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 px-2"
                                                    onClick={() => router.push(`/dashboard/students/${student.id}/edit`)}
                                                >
                                                    <Edit className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 px-2 text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {filteredStudents.length === 0 ? (
                                <p className="py-6 text-sm text-zinc-500">No students found.</p>
                            ) : null}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
