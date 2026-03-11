"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password. Please try again.");
            setLoading(false);
        } else {
            router.push("/dashboard");
        }
    }

    // Quick login helpers for demo
    const demoAccounts = [
        { label: "Admin", email: "admin@lumio.edu", password: "Admin1234!" },
        { label: "Teacher", email: "teacher@lumio.edu", password: "Teacher123!" },
        { label: "Student", email: "student@lumio.edu", password: "Student123!" },
    ];

    return (
        <div className="flex min-h-screen bg-zinc-50">
            {/* Left panel */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-zinc-900 p-12 text-white">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                        <span className="text-sm font-bold text-zinc-900">L</span>
                    </div>
                    <span className="text-lg font-semibold">Lumio</span>
                </div>
                <div>
                    <h1 className="text-4xl font-bold leading-tight mb-4">
                        Modern School Management for the Digital Age
                    </h1>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        Manage students, attendance, exams, assignments, and communication
                        from one unified platform.
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                        { value: "1,284", label: "Students" },
                        { value: "86", label: "Teachers" },
                        { value: "20+", label: "Classes" },
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-xl border border-zinc-800 p-4">
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-sm text-zinc-400 mt-0.5">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right panel */}
            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-8">
                <div className="w-full max-w-sm">
                    {/* Mobile logo */}
                    <div className="flex items-center gap-2 mb-8 lg:hidden">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
                            <span className="text-sm font-bold text-white">L</span>
                        </div>
                        <span className="text-base font-semibold text-zinc-900">Lumio</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-zinc-900">Welcome back</h2>
                        <p className="text-sm text-zinc-500 mt-1">Sign in to your account to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs font-medium text-zinc-700 block mb-1.5">Email</label>
                            <Input
                                type="email"
                                placeholder="your@school.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-medium text-zinc-700">Password</label>
                                <Link href="/forgot-password" className="text-xs text-zinc-500 hover:text-zinc-900">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-lg bg-red-50 border border-red-100 px-3 py-2.5 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full gap-2" disabled={loading}>
                            <LogIn className="h-4 w-4" />
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>

                    {/* Demo accounts */}
                    <div className="mt-6">
                        <p className="text-xs text-zinc-400 text-center mb-3">Quick login for demo</p>
                        <div className="grid grid-cols-3 gap-2">
                            {demoAccounts.map((acc) => (
                                <button
                                    key={acc.label}
                                    onClick={() => {
                                        setEmail(acc.email);
                                        setPassword(acc.password);
                                    }}
                                    className="rounded-lg border border-zinc-200 px-2 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
                                >
                                    {acc.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <p className="mt-6 text-center text-xs text-zinc-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="font-medium text-zinc-900 hover:underline">
                            Contact your administrator
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
