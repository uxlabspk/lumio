"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Loader2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddTeacherPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        employeeId: "",
        department: "",
        qualification: "",
        specialization: "",
        joinDate: "",
        phone: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    function validateForm() {
        const newErrors: Record<string, string> = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.employeeId.trim()) {
            newErrors.employeeId = "Employee ID is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const res = await fetch("/api/dashboard/teachers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                router.push("/dashboard/teachers");
            } else {
                setErrors({ submit: data.error || "Failed to create teacher" });
            }
        } catch (error) {
            console.error("Failed to create teacher:", error);
            setErrors({ submit: "Failed to create teacher" });
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }

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

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Add New Teacher</h1>
                    <p className="text-sm text-zinc-500">Register a new teacher to the school.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        Teacher Information
                    </CardTitle>
                    <CardDescription>
                        Fill in the details below to create a teacher account. All fields marked with * are required.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {errors.submit && (
                            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                                {errors.submit}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Full Name *
                                </label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., John Smith"
                                    className={errors.name ? "border-red-500" : ""}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Email Address *
                                </label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="teacher@school.edu"
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Password *
                                </label>
                                <Input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Min. 8 characters"
                                    className={errors.password ? "border-red-500" : ""}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Employee ID */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Employee ID *
                                </label>
                                <Input
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    placeholder="e.g., TCH001"
                                    className={errors.employeeId ? "border-red-500" : ""}
                                />
                                {errors.employeeId && (
                                    <p className="mt-1 text-xs text-red-600">{errors.employeeId}</p>
                                )}
                            </div>

                            {/* Department */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Department
                                </label>
                                <Input
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    placeholder="e.g., Mathematics"
                                />
                            </div>

                            {/* Qualification */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Qualification
                                </label>
                                <Input
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    placeholder="e.g., M.Sc Mathematics"
                                />
                            </div>

                            {/* Specialization */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Specialization
                                </label>
                                <Input
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    placeholder="e.g., Algebra & Calculus"
                                />
                            </div>

                            {/* Join Date */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Join Date
                                </label>
                                <Input
                                    name="joinDate"
                                    type="date"
                                    value={formData.joinDate}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-1">
                                    Phone Number
                                </label>
                                <Input
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="gap-1.5" disabled={loading}>
                                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                                <UserPlus className="h-4 w-4" />
                                {loading ? "Creating..." : "Create Teacher"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
