"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ParentOption {
    id: string;
    name: string;
    email: string;
}

export default function AddStudentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [parents, setParents] = useState<ParentOption[]>([]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        studentId: "",
        dateOfBirth: "",
        gender: "MALE",
        address: "",
        bloodType: "",
        medicalNotes: "",
        parentId: "",
        enrollmentDate: new Date().toISOString().split("T")[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/dashboard/students", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const payload = await res.json();

            if (!res.ok) {
                throw new Error(payload.error || "Failed to create student");
            }

            router.push("/dashboard/students");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create student");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Add New Student</h1>
                    <p className="text-sm text-zinc-500">Register a new student in the system</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                </Button>
            </div>

            {error && (
                <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-zinc-900">Email *</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="student@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-zinc-900">Password *</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Min 8 characters"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-900">Confirm Password *</label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-enter password"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-zinc-900">Full Name *</label>
                            <Input
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Student's full name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="studentId" className="text-sm font-medium text-zinc-900">Student ID *</label>
                            <Input
                                id="studentId"
                                name="studentId"
                                required
                                value={formData.studentId}
                                onChange={handleChange}
                                placeholder="STU0001"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="dateOfBirth" className="text-sm font-medium text-zinc-900">Date of Birth</label>
                            <Input
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="gender" className="text-sm font-medium text-zinc-900">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                            >
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="address" className="text-sm font-medium text-zinc-900">Address</label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Street address"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="bloodType" className="text-sm font-medium text-zinc-900">Blood Type</label>
                            <select
                                id="bloodType"
                                name="bloodType"
                                value={formData.bloodType}
                                onChange={handleChange}
                                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                            >
                                <option value="">Unknown</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="enrollmentDate" className="text-sm font-medium text-zinc-900">Enrollment Date</label>
                            <Input
                                id="enrollmentDate"
                                name="enrollmentDate"
                                type="date"
                                value={formData.enrollmentDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="medicalNotes" className="text-sm font-medium text-zinc-900">Medical Notes</label>
                            <textarea
                                id="medicalNotes"
                                name="medicalNotes"
                                value={formData.medicalNotes}
                                onChange={handleChange}
                                placeholder="Allergies, medications, or special medical needs"
                                rows={3}
                                className="flex w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Parent/Guardian Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="parentId" className="text-sm font-medium text-zinc-900">Link to Parent/Guardian (Optional)</label>
                            <select
                                id="parentId"
                                name="parentId"
                                value={formData.parentId}
                                onChange={handleChange}
                                className="flex h-9 w-full rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                            >
                                <option value="">No parent linked</option>
                                {parents.map((parent) => (
                                    <option key={parent.id} value={parent.id}>
                                        {parent.name} - {parent.email}
                                    </option>
                                ))}
                            </select>
                            <p className="text-xs text-zinc-500">
                                Link this student to an existing parent account for family management
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex items-center justify-end gap-2 mt-4">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} className="gap-1.5">
                        <UserPlus className="h-4 w-4" />
                        {loading ? "Creating..." : "Create Student"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
