"use client";

import { useState, useEffect } from "react";
import { School, Plus, Users, BookOpen, RefreshCw, Loader2, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ClassItem {
    id: string;
    name: string;
    section: string | null;
    roomNumber: string | null;
    capacity: number | null;
    grade: {
        name: string;
        level: number;
    };
    teacher: {
        user: {
            name: string;
            email: string;
        }
    } | null;
    students: Array<{ id: string }>;
}

interface GradeItem {
    id: string;
    name: string;
    level: number;
}

interface TeacherItem {
    id: string;
    user: {
        name: string;
        email: string;
    };
}

export default function ClassesPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [grades, setGrades] = useState<GradeItem[]>([]);
    const [teachers, setTeachers] = useState<TeacherItem[]>([]);
    const [canManage, setCanManage] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        section: "",
        gradeId: "",
        teacherId: "",
        roomNumber: "",
        capacity: "",
    });

    useEffect(() => {
        loadClasses();
    }, []);

    async function loadClasses() {
        try {
            setLoading(true);
            const res = await fetch("/api/dashboard/classes");
            const data = await res.json();

            if (res.ok) {
                setClasses(data.classes);
                setGrades(data.grades);
                setTeachers(data.teachers);
                setCanManage(data.canManage);

                // Set first grade as default for new class form
                if (data.grades.length > 0 && !formData.gradeId) {
                    setFormData(prev => ({ ...prev, gradeId: data.grades[0].id }));
                }
            }
        } catch (error) {
            console.error("Failed to load classes:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateClass() {
        if (!formData.name || !formData.gradeId) {
            alert("Class name and grade are required");
            return;
        }

        try {
            setSaving(true);
            const res = await fetch("/api/dashboard/classes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                setShowCreateForm(false);
                setFormData({
                    name: "",
                    section: "",
                    gradeId: grades[0]?.id || "",
                    teacherId: "",
                    roomNumber: "",
                    capacity: "",
                });
                loadClasses();
            } else {
                alert(data.error || "Failed to create class");
            }
        } catch (error) {
            console.error("Failed to create class:", error);
            alert("Failed to create class");
        } finally {
            setSaving(false);
        }
    }

    async function handleDeleteClass(id: string) {
        if (!confirm("Are you sure you want to delete this class? This action cannot be undone.")) {
            return;
        }

        try {
            setDeletingId(id);
            const res = await fetch(`/api/dashboard/classes/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                loadClasses();
            } else {
                alert(data.error || "Failed to delete class");
            }
        } catch (error) {
            console.error("Failed to delete class:", error);
            alert("Failed to delete class");
        } finally {
            setDeletingId(null);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Classes Management</h1>
                    <p className="text-sm text-zinc-500">Create and manage classes for your institution.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={loadClasses}>
                        <RefreshCw className="h-3.5 w-3.5" />
                        Refresh
                    </Button>
                    {canManage && (
                        <Button
                            size="sm"
                            className="gap-1.5 text-xs"
                            onClick={() => setShowCreateForm(!showCreateForm)}
                        >
                            <Plus className="h-3.5 w-3.5" />
                            New Class
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Total Classes</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">{classes.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Total Capacity</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">
                            {classes.reduce((acc, c) => acc + (c.capacity || 0), 0)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Total Enrolled</p>
                        <p className="mt-1 text-2xl font-semibold text-emerald-600">
                            {classes.reduce((acc, c) => acc + c.students.length, 0)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Available Seats</p>
                        <p className="mt-1 text-2xl font-semibold text-blue-600">
                            {classes.reduce((acc, c) => acc + ((c.capacity || 0) - c.students.length), 0)}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {showCreateForm && canManage && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Create New Class
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-zinc-700">Class Name *</label>
                                <Input
                                    placeholder="e.g., Mathematics 101"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="h-9 text-sm"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-zinc-700">Section</label>
                                <Input
                                    placeholder="e.g., A, B, C"
                                    name="section"
                                    value={formData.section}
                                    onChange={handleChange}
                                    className="h-9 text-sm"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-zinc-700">Grade *</label>
                                <select
                                    name="gradeId"
                                    value={formData.gradeId}
                                    onChange={handleChange}
                                    className="h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900"
                                >
                                    <option value="">Select grade...</option>
                                    {grades.map((grade) => (
                                        <option key={grade.id} value={grade.id}>
                                            {grade.name} (Level {grade.level})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-zinc-700">Class Teacher</label>
                                <select
                                    name="teacherId"
                                    value={formData.teacherId}
                                    onChange={handleChange}
                                    className="h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900"
                                >
                                    <option value="">No teacher...</option>
                                    {teachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.id}>
                                            {teacher.user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-zinc-700">Room Number</label>
                                <Input
                                    placeholder="e.g., Room 101"
                                    name="roomNumber"
                                    value={formData.roomNumber}
                                    onChange={handleChange}
                                    className="h-9 text-sm"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-zinc-700">Capacity</label>
                                <Input
                                    type="number"
                                    placeholder="e.g., 30"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    className="h-9 text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleCreateClass}
                                disabled={saving || !formData.name || !formData.gradeId}
                                className="gap-1.5"
                            >
                                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                                <Plus className="h-4 w-4" />
                                {saving ? "Creating..." : "Create Class"}
                            </Button>
                            <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <School className="h-4 w-4" />
                        All Classes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="py-6 text-center">
                            <Loader2 className="h-6 w-6 animate-spin mx-auto text-zinc-400" />
                            <p className="mt-2 text-sm text-zinc-500">Loading classes...</p>
                        </div>
                    ) : classes.length > 0 ? (
                        <div className="space-y-3">
                            {classes.map((classItem) => (
                                <div
                                    key={classItem.id}
                                    className="grid grid-cols-1 gap-3 rounded-lg border border-zinc-100 p-4 md:grid-cols-6 md:items-center"
                                >
                                    <div className="md:col-span-2">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4 text-zinc-400" />
                                            <p className="text-sm font-medium text-zinc-900">{classItem.name}</p>
                                        </div>
                                        <p className="mt-1 text-xs text-zinc-500">
                                            Grade {classItem.grade.name} (Level {classItem.grade.level})
                                        </p>
                                    </div>

                                    <div>
                                        <Badge variant="outline">
                                            {classItem.section ? `Section ${classItem.section}` : "No Section"}
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                                        <Users className="h-3.5 w-3.5" />
                                        {classItem.students.length}/{classItem.capacity || "∞"}
                                    </div>

                                    <div className="text-xs text-zinc-600 truncate max-w-[150px]">
                                        {classItem.teacher ? (
                                            <div>
                                                <p className="font-medium">{classItem.teacher.user.name}</p>
                                                <p className="text-[10px] text-zinc-400">{classItem.teacher.user.email}</p>
                                            </div>
                                        ) : (
                                            <span className="text-zinc-400">No teacher assigned</span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        {canManage && (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-xs"
                                                    onClick={() => alert("Edit functionality can be added here")}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-xs text-red-600 hover:text-red-700"
                                                    onClick={() => handleDeleteClass(classItem.id)}
                                                    disabled={deletingId === classItem.id}
                                                >
                                                    {deletingId === classItem.id ? (
                                                        <Loader2 className="h-3 w-3 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-3 w-3" />
                                                    )}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="py-6 text-center text-sm text-zinc-500">No classes found.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
