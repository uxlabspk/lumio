"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Plus, ChevronRight, Upload, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn, getSubjectBgColor } from "@/lib/utils";

type DashboardRole = "ADMIN" | "TEACHER" | "STUDENT";

interface AssignmentItem {
    id: string;
    title: string;
    description?: string | null;
    subjectName: string;
    dueDate: string;
    status: "ACTIVE" | "CLOSED" | "DRAFT";
    teacherName: string;
    classNames: string[];
    totalStudents: number;
    submittedCount: number;
    mySubmission?: {
        id: string;
        status: "NOT_SUBMITTED" | "NOT_CHECKED" | "SUBMITTED" | "GRADED" | "RETURNED";
        submittedAt?: string | null;
        fileUrl?: string | null;
        note?: string | null;
    } | null;
}

interface SubjectOption {
    id: string;
    name: string;
}

interface ClassOption {
    id: string;
    name: string;
    section: string | null;
}

interface AssignmentsResponse {
    role: DashboardRole;
    canCreate: boolean;
    assignments: AssignmentItem[];
    subjects: SubjectOption[];
    classes: ClassOption[];
}

const statusConfig = {
    ACTIVE: { label: "Active", variant: "success" as const },
    CLOSED: { label: "Closed", variant: "default" as const },
    DRAFT: { label: "Draft", variant: "outline" as const },
};

export default function AssignmentsPage() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState<AssignmentsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [openSubmitId, setOpenSubmitId] = useState<string | null>(null);
    const [submitFileUrl, setSubmitFileUrl] = useState("");
    const [submitNote, setSubmitNote] = useState("");

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newSubjectId, setNewSubjectId] = useState("");
    const [newClassId, setNewClassId] = useState("");
    const [newDueDate, setNewDueDate] = useState("");

    async function loadAssignments(query = "") {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`/api/dashboard/assignments${query ? `?q=${encodeURIComponent(query)}` : ""}`, {
                cache: "no-store",
            });

            const payload = (await res.json()) as AssignmentsResponse | { error?: string };

            if (!res.ok) {
                throw new Error((payload as { error?: string }).error || "Failed to load assignments.");
            }

            const response = payload as AssignmentsResponse;
            setData(response);

            if (!newSubjectId && response.subjects.length > 0) {
                setNewSubjectId(response.subjects[0].id);
            }

            if (!newClassId && response.classes.length > 0) {
                setNewClassId(response.classes[0].id);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load assignments.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadAssignments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filtered = useMemo(() => {
        if (!data) return [];
        const q = search.toLowerCase().trim();
        if (!q) return data.assignments;

        return data.assignments.filter((assignment) => {
            return (
                assignment.title.toLowerCase().includes(q) ||
                assignment.subjectName.toLowerCase().includes(q) ||
                assignment.classNames.some((className) => className.toLowerCase().includes(q))
            );
        });
    }, [data, search]);

    const activeCount = data?.assignments.filter((a) => a.status === "ACTIVE").length ?? 0;
    const closedCount = data?.assignments.filter((a) => a.status === "CLOSED").length ?? 0;
    const draftCount = data?.assignments.filter((a) => a.status === "DRAFT").length ?? 0;

    async function handleCreateAssignment(e: React.FormEvent) {
        e.preventDefault();
        if (!data?.canCreate) return;

        setSaving(true);
        setError("");
        setMessage("");

        try {
            const res = await fetch("/api/dashboard/assignments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: newTitle,
                    description: newDescription,
                    subjectId: newSubjectId,
                    classId: newClassId,
                    dueDate: newDueDate,
                }),
            });

            const payload = (await res.json()) as { message?: string; error?: string };

            if (!res.ok) {
                throw new Error(payload.error || "Failed to create assignment.");
            }

            setMessage(payload.message || "Assignment created.");
            setNewTitle("");
            setNewDescription("");
            setNewDueDate("");
            await loadAssignments();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create assignment.");
        } finally {
            setSaving(false);
        }
    }

    async function handleSubmitTask(assignmentId: string) {
        setSaving(true);
        setError("");
        setMessage("");

        try {
            const res = await fetch(`/api/dashboard/assignments/${assignmentId}/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileUrl: submitFileUrl, note: submitNote }),
            });

            const payload = (await res.json()) as { message?: string; error?: string };

            if (!res.ok) {
                throw new Error(payload.error || "Failed to submit task.");
            }

            setMessage(payload.message || "Task submitted.");
            setOpenSubmitId(null);
            setSubmitFileUrl("");
            setSubmitNote("");
            await loadAssignments();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to submit task.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Assignments</h1>
                    <p className="text-sm text-zinc-500">
                        {data?.role === "STUDENT"
                            ? "View and submit your tasks."
                            : "Create and manage class assignments."}
                    </p>
                </div>
                <Button variant="outline" className="gap-1.5" onClick={() => loadAssignments(search)}>
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                </Button>
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: "Active", count: activeCount, variant: "success" as const },
                    { label: "Closed", count: closedCount, variant: "default" as const },
                    { label: "Draft", count: draftCount, variant: "outline" as const },
                ].map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="flex items-center justify-between p-4">
                            <div>
                                <p className="text-2xl font-bold text-zinc-900">{stat.count}</p>
                                <p className="text-xs text-zinc-500">{stat.label} assignments</p>
                            </div>
                            <Badge variant={stat.variant}>{stat.label}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {data?.canCreate ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Create Assignment
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="grid gap-3 md:grid-cols-2" onSubmit={handleCreateAssignment}>
                            <Input
                                placeholder="Assignment title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                required
                            />

                            <Input
                                type="datetime-local"
                                value={newDueDate}
                                onChange={(e) => setNewDueDate(e.target.value)}
                                required
                            />

                            <select
                                value={newSubjectId}
                                onChange={(e) => setNewSubjectId(e.target.value)}
                                className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900"
                                required
                            >
                                {data.subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={newClassId}
                                onChange={(e) => setNewClassId(e.target.value)}
                                className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900"
                                required
                            >
                                {data.classes.map((classroom) => (
                                    <option key={classroom.id} value={classroom.id}>
                                        {classroom.name}
                                        {classroom.section ? ` ${classroom.section}` : ""}
                                    </option>
                                ))}
                            </select>

                            <textarea
                                placeholder="Description (optional)"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                className="md:col-span-2 min-h-24 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1"
                            />

                            <div className="md:col-span-2">
                                <Button type="submit" disabled={saving} className="gap-1.5">
                                    <Plus className="h-4 w-4" />
                                    {saving ? "Creating..." : "Create Assignment"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            ) : null}

            {/* Filters */}
            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                    <Input
                        placeholder="Search assignments..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8 h-8 text-xs"
                    />
                </div>
            </div>

            {/* Assignment list */}
            <Card>
                <CardHeader className="pb-0">
                    <div className="grid grid-cols-6 gap-3 text-[10px] font-medium text-zinc-400 px-1 uppercase tracking-wide">
                        <span className="col-span-2">Assignment</span>
                        <span>Subject</span>
                        <span>Class</span>
                        <span>Progress</span>
                        <span>Status</span>
                    </div>
                </CardHeader>
                <CardContent className="pt-2">
                    {loading ? (
                        <p className="px-2 py-4 text-sm text-zinc-500">Loading assignments...</p>
                    ) : (
                        <div className="space-y-1">
                            {filtered.map((assignment) => {
                                const status = statusConfig[assignment.status as keyof typeof statusConfig];
                                const bgColor = getSubjectBgColor(assignment.subjectName);
                                const progress = assignment.totalStudents > 0
                                    ? Math.round((assignment.submittedCount / assignment.totalStudents) * 100)
                                    : 0;

                                return (
                                    <div key={assignment.id} className="rounded-lg border border-zinc-100 px-3 py-3">
                                        <div className="grid grid-cols-6 gap-3 items-center transition-colors group">
                                            {/* Title */}
                                            <div className="col-span-2">
                                                <p className="text-sm font-medium text-zinc-900">{assignment.title}</p>
                                                <p className="text-[10px] text-zinc-400">Due {new Date(assignment.dueDate).toLocaleString()}</p>
                                            </div>

                                            {/* Subject */}
                                            <div>
                                                <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border", bgColor)}>
                                                    {assignment.subjectName}
                                                </span>
                                            </div>

                                            {/* Class */}
                                            <span className="text-xs text-zinc-600">{assignment.classNames.join(", ") || "No class"}</span>

                                            {/* Progress */}
                                            <div>
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-zinc-900 rounded-full"
                                                            style={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] text-zinc-500 shrink-0">
                                                        {assignment.submittedCount}/{assignment.totalStudents}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Status + actions */}
                                            <div className="flex items-center justify-between">
                                                <Badge variant={status.variant} className="text-[10px]">{status.label}</Badge>
                                                <button className="opacity-0 group-hover:opacity-100 transition-opacity" type="button">
                                                    <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                                                </button>
                                            </div>
                                        </div>

                                        {data?.role === "STUDENT" ? (
                                            <div className="mt-3 rounded-md bg-zinc-50 p-3">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <Badge variant="outline" className="text-[10px]">
                                                        {assignment.mySubmission?.status ?? "NOT_SUBMITTED"}
                                                    </Badge>
                                                    {assignment.mySubmission?.submittedAt ? (
                                                        <span className="text-[10px] text-zinc-500">
                                                            Submitted on {new Date(assignment.mySubmission.submittedAt).toLocaleString()}
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] text-zinc-500">Not submitted yet</span>
                                                    )}
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="ml-auto gap-1"
                                                        onClick={() => setOpenSubmitId(openSubmitId === assignment.id ? null : assignment.id)}
                                                    >
                                                        <Upload className="h-3.5 w-3.5" />
                                                        Submit Task
                                                    </Button>
                                                </div>

                                                {openSubmitId === assignment.id ? (
                                                    <div className="mt-3 grid gap-2">
                                                        <Input
                                                            placeholder="File URL (Google Drive, OneDrive, etc.)"
                                                            value={submitFileUrl}
                                                            onChange={(e) => setSubmitFileUrl(e.target.value)}
                                                        />
                                                        <textarea
                                                            placeholder="Short note (optional)"
                                                            value={submitNote}
                                                            onChange={(e) => setSubmitNote(e.target.value)}
                                                            className="min-h-20 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1"
                                                        />
                                                        <div>
                                                            <Button
                                                                type="button"
                                                                onClick={() => handleSubmitTask(assignment.id)}
                                                                disabled={saving}
                                                                className="gap-1.5"
                                                            >
                                                                <Upload className="h-4 w-4" />
                                                                {saving ? "Submitting..." : "Submit"}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
