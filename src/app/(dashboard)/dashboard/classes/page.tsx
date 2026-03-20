"use client";

import { useState } from "react";
import { School, Plus, Users, BookOpen, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ClassesPage() {
    const [loading, setLoading] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [className, setClassName] = useState("");
    const [section, setSection] = useState("");
    const [grade, setGrade] = useState("");
    const [capacity, setCapacity] = useState("");

    // Mock data - replace with actual API call
    const classes = [
        { id: "1", name: "Mathematics 101", section: "A", grade: "10", capacity: 30, enrolled: 25, teacher: "Dr. Smith" },
        { id: "2", name: "Physics 201", section: "B", grade: "11", capacity: 28, enrolled: 28, teacher: "Prof. Johnson" },
        { id: "3", name: "Chemistry 101", section: "A", grade: "10", capacity: 25, enrolled: 20, teacher: "Dr. Williams" },
        { id: "4", name: "English Literature", section: "C", grade: "12", capacity: 35, enrolled: 32, teacher: "Ms. Brown" },
    ];

    const handleCreateClass = async () => {
        setLoading(true);
        // Implement API call to create class
        setTimeout(() => {
            setLoading(false);
            setShowCreateForm(false);
            setClassName("");
            setSection("");
            setGrade("");
            setCapacity("");
        }, 1000);
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Classes Management</h1>
                    <p className="text-sm text-zinc-500">Create and manage classes for your institution.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <RefreshCw className="h-3.5 w-3.5" />
                        Refresh
                    </Button>
                    <Button
                        size="sm"
                        className="gap-1.5 text-xs"
                        onClick={() => setShowCreateForm(!showCreateForm)}
                    >
                        <Plus className="h-3.5 w-3.5" />
                        New Class
                    </Button>
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
                            {classes.reduce((acc, c) => acc + c.capacity, 0)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Total Enrolled</p>
                        <p className="mt-1 text-2xl font-semibold text-emerald-600">
                            {classes.reduce((acc, c) => acc + c.enrolled, 0)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Available Seats</p>
                        <p className="mt-1 text-2xl font-semibold text-blue-600">
                            {classes.reduce((acc, c) => acc + (c.capacity - c.enrolled), 0)}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {showCreateForm && (
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
                                <label className="mb-1.5 block text-xs font-medium text-zinc-700">Class Name</label>
                                <Input
                                    placeholder="e.g., Mathematics 101"
                                    value={className}
                                    onChange={(e) => setClassName(e.target.value)}
                                    className="h-9 text-sm"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-zinc-700">Section</label>
                                <Input
                                    placeholder="e.g., A, B, C"
                                    value={section}
                                    onChange={(e) => setSection(e.target.value)}
                                    className="h-9 text-sm"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-zinc-700">Grade Level</label>
                                <Input
                                    placeholder="e.g., 10, 11, 12"
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                    className="h-9 text-sm"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-zinc-700">Capacity</label>
                                <Input
                                    type="number"
                                    placeholder="e.g., 30"
                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
                                    className="h-9 text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleCreateClass}
                                disabled={loading || !className || !grade || !capacity}
                                className="gap-1.5"
                            >
                                <Plus className="h-4 w-4" />
                                {loading ? "Creating..." : "Create Class"}
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
                                    <p className="mt-1 text-xs text-zinc-500">Grade {classItem.grade}</p>
                                </div>

                                <div>
                                    <Badge variant="outline">Section {classItem.section}</Badge>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs text-zinc-600">
                                    <Users className="h-3.5 w-3.5" />
                                    {classItem.enrolled}/{classItem.capacity}
                                </div>

                                <div className="text-xs text-zinc-600">{classItem.teacher}</div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="text-xs">
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-xs text-red-600 hover:text-red-700">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
