"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
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

    const demoAccounts = [
        { label: "Admin", email: "admin@lumio.edu", password: "Admin1234!" },
        { label: "Teacher", email: "teacher@lumio.edu", password: "Teacher123!" },
        { label: "Student", email: "student@lumio.edu", password: "Student123!" },
    ];

    return (
        <AuthShell>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-zinc-900">Welcome back</h2>
                <p className="mt-1 text-sm text-zinc-500">
                    Sign in to your account to continue
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-700">
                        Email
                    </label>
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
                    <div className="mb-1.5 flex items-center justify-between">
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
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                {error ? (
                    <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                        {error}
                    </div>
                ) : null}

                <Button type="submit" className="w-full gap-2" disabled={loading}>
                    <LogIn className="h-4 w-4" />
                    {loading ? "Signing in..." : "Sign in"}
                </Button>
            </form>

            <div className="mt-6">
                <p className="mb-3 text-center text-xs text-zinc-400">Quick login for demo</p>
                <div className="grid grid-cols-3 gap-2">
                    {demoAccounts.map((acc) => (
                        <button
                            key={acc.label}
                            onClick={() => {
                                setEmail(acc.email);
                                setPassword(acc.password);
                            }}
                            className="rounded-lg border border-zinc-200 px-2 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
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
        </AuthShell>
    );
}

