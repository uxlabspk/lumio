"use client";

import { useState } from "react";
import { UserCheck, Search, RefreshCw, UserPlus, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function TeachersPage() {
    const [search, setSearch] = useState("");

    // Mock data - replace with actual API call
    const teachers = [
        {
            id: "1",
            name: "Dr. John Smith",
            email: "john.smith@school.edu",
            subject: "Mathematics",
            classes: ["Math 101 A", "Math 102 B"],
            students: 55,
        },
        {
            id: "2",
            name: "Prof. Sarah Johnson",
            email: "sarah.j@school.edu",
            subject: "Physics",
            classes: ["Physics 201 B"],
            students: 28,
        },
        {
            id: "3",
            name: "Dr. Michael Williams",
            email: "m.williams@school.edu",
            subject: "Chemistry",
            classes: ["Chem 101 A", "Chem 201 C"],
            students: 45,
        },
        {
            id: "4",
            name: "Ms. Emily Brown",
            email: "emily.b@school.edu",
            subject: "English Literature",
            classes: ["English 301 C"],
            students: 32,
        },
    ];

    const classes = [
        { id: "1", name: "Mathematics 101", section: "A" },
        { id: "2", name: "Physics 201", section: "B" },
        { id: "3", name: "Chemistry 101", section: "A" },
        { id: "4", name: "English Literature", section: "C" },
    ];

    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.name.toLowerCase().includes(search.toLowerCase()) ||
            teacher.email.toLowerCase().includes(search.toLowerCase()) ||
            teacher.subject.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Teachers Management</h1>
                    <p className="text-sm text-zinc-500">Manage teachers and assign them to classes.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <RefreshCw className="h-3.5 w-3.5" />
                        Refresh
                    </Button>
                    <Button size="sm" className="gap-1.5 text-xs">
                        <UserPlus className="h-3.5 w-3.5" />
                        Add Teacher
                    </Button>
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
                        <p className="text-xs text-zinc-500">Total Classes</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">
                            {teachers.reduce((acc, t) => acc + t.classes.length, 0)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Total Students</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">
                            {teachers.reduce((acc, t) => acc + t.students, 0)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Avg Students/Teacher</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">
                            {Math.round(teachers.reduce((acc, t) => acc + t.students, 0) / teachers.length)}
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
                    <select className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900">
                        <option value="">Select teacher...</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name} - {teacher.subject}
                            </option>
                        ))}
                    </select>

                    <select className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900">
                        <option value="">Select class...</option>
                        {classes.map((classItem) => (
                            <option key={classItem.id} value={classItem.id}>
                                {classItem.name} {classItem.section}
                            </option>
                        ))}
                    </select>

                    <Button className="gap-1.5">
                        <UserCheck className="h-4 w-4" />
                        Assign
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
                        {filteredTeachers.map((teacher) => (
                            <div
                                key={teacher.id}
                                className="grid grid-cols-1 gap-3 rounded-lg border border-zinc-100 p-4 md:grid-cols-5 md:items-center"
                            >
                                <div className="md:col-span-2">
                                    <p className="text-sm font-medium text-zinc-900">{teacher.name}</p>
                                    <p className="text-xs text-zinc-500">{teacher.email}</p>
                                </div>

                                <div>
                                    <Badge variant="outline">{teacher.subject}</Badge>
                                </div>

                                <div>
                                    <p className="text-xs text-zinc-500">Classes: {teacher.classes.length}</p>
                                    <p className="text-xs text-zinc-500">Students: {teacher.students}</p>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                                        <BookOpen className="h-3 w-3" />
                                        View Classes
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-xs">
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {filteredTeachers.length === 0 && (
                            <p className="py-6 text-center text-sm text-zinc-500">No teachers found.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
