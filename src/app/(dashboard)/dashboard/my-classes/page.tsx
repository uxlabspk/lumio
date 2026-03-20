"use client";

import { useState } from "react";
import { BookOpenCheck, Users, Clock, Calendar, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyClassesPage() {
    const [loading, setLoading] = useState(false);

    // Mock data - replace with actual API call
    const classes = [
        {
            id: "1",
            name: "Mathematics 101",
            section: "A",
            teacher: "Dr. John Smith",
            schedule: "Mon, Wed, Fri - 9:00 AM",
            room: "Room 201",
            enrolled: 25,
            capacity: 30,
            status: "Active",
        },
        {
            id: "2",
            name: "Physics 201",
            section: "B",
            teacher: "Prof. Sarah Johnson",
            schedule: "Tue, Thu - 10:30 AM",
            room: "Lab 105",
            enrolled: 28,
            capacity: 28,
            status: "Active",
        },
        {
            id: "3",
            name: "Chemistry 101",
            section: "A",
            teacher: "Dr. Michael Williams",
            schedule: "Mon, Wed - 2:00 PM",
            room: "Lab 102",
            enrolled: 20,
            capacity: 25,
            status: "Active",
        },
    ];

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">My Classes</h1>
                    <p className="text-sm text-zinc-500">View all classes you are enrolled in.</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => setLoading(!loading)}>
                    <RefreshCw className="h-3.5 w-3.5" />
                    Refresh
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Enrolled Classes</p>
                        <p className="mt-1 text-2xl font-semibold text-zinc-900">{classes.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">Active Classes</p>
                        <p className="mt-1 text-2xl font-semibold text-emerald-600">
                            {classes.filter((c) => c.status === "Active").length}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-zinc-500">This Semester</p>
                        <p className="mt-1 text-lg font-semibold text-zinc-900">Spring 2026</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {classes.map((classItem) => (
                    <Card key={classItem.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-base">{classItem.name}</CardTitle>
                                    <p className="mt-1 text-xs text-zinc-500">Section {classItem.section}</p>
                                </div>
                                <Badge variant="success">{classItem.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-zinc-600">
                                    <Users className="h-4 w-4 text-zinc-400" />
                                    <span>{classItem.teacher}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-zinc-600">
                                    <Clock className="h-4 w-4 text-zinc-400" />
                                    <span>{classItem.schedule}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-zinc-600">
                                    <Calendar className="h-4 w-4 text-zinc-400" />
                                    <span>{classItem.room}</span>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-zinc-100">
                                <div className="flex justify-between text-xs text-zinc-500">
                                    <span>Class Size</span>
                                    <span className="font-medium text-zinc-900">
                                        {classItem.enrolled}/{classItem.capacity}
                                    </span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full text-xs">
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {classes.length === 0 && (
                <Card>
                    <CardContent className="py-12 text-center">
                        <BookOpenCheck className="mx-auto h-12 w-12 text-zinc-300" />
                        <p className="mt-4 text-sm font-medium text-zinc-900">No classes enrolled</p>
                        <p className="mt-1 text-xs text-zinc-500">
                            You are not enrolled in any classes yet. Contact your administrator for enrollment.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
