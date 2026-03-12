"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, LoaderCircle, Mail } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ForgotPasswordResponse = {
    message?: string;
    error?: string;
    debugResetUrl?: string;
};

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [debugResetUrl, setDebugResetUrl] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        setDebugResetUrl("");

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = (await response.json()) as ForgotPasswordResponse;

            if (!response.ok) {
                setError(data.error || "Unable to send reset instructions.");
                return;
            }

            setMessage(
                data.message ||
                "If an account exists for that email, a password reset link has been sent."
            );
            setDebugResetUrl(data.debugResetUrl || "");
            setEmail("");
        } catch {
            setError("Unable to send reset instructions.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthShell>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-zinc-900">Forgot password?</h2>
                <p className="mt-1 text-sm text-zinc-500">
                    Enter your email and we&apos;ll send you a secure reset link.
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
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                {error ? (
                    <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                        {error}
                    </div>
                ) : null}

                {message ? (
                    <div className="space-y-3 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-3 text-sm text-emerald-700">
                        <p>{message}</p>
                        {debugResetUrl ? (
                            <a href={debugResetUrl} className="font-medium underline underline-offset-4">
                                Open reset link
                            </a>
                        ) : null}
                    </div>
                ) : null}

                <Button type="submit" className="w-full gap-2" disabled={loading}>
                    {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                    {loading ? "Sending link..." : "Send reset link"}
                </Button>
            </form>

            <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
            </Link>
        </AuthShell>
    );
}