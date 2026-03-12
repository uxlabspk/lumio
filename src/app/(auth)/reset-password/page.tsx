"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, KeyRound, LoaderCircle } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ResetPasswordResponse = {
    valid?: boolean;
    message?: string;
    error?: string;
};

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = useMemo(() => searchParams.get("token")?.trim() || "", [searchParams]);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [checkingToken, setCheckingToken] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        let ignore = false;

        async function validateToken() {
            if (!token) {
                setError("This reset link is invalid or incomplete.");
                setCheckingToken(false);
                return;
            }

            try {
                const response = await fetch(
                    `/api/auth/reset-password?token=${encodeURIComponent(token)}`
                );
                const data = (await response.json()) as ResetPasswordResponse;

                if (ignore) {
                    return;
                }

                if (!response.ok || !data.valid) {
                    setError(data.error || "This reset link is invalid or has expired.");
                    setTokenValid(false);
                } else {
                    setTokenValid(true);
                    setError("");
                }
            } catch {
                if (!ignore) {
                    setError("Unable to verify this reset link right now.");
                }
            } finally {
                if (!ignore) {
                    setCheckingToken(false);
                }
            }
        }

        void validateToken();

        return () => {
            ignore = true;
        };
    }, [token]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitting(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password, confirmPassword }),
            });

            const data = (await response.json()) as ResetPasswordResponse;

            if (!response.ok) {
                setError(data.error || "Unable to reset your password.");
                return;
            }

            setMessage(data.message || "Your password has been reset successfully.");
            setPassword("");
            setConfirmPassword("");
            setTokenValid(false);

            window.setTimeout(() => {
                router.push("/login");
            }, 1800);
        } catch {
            setError("Unable to reset your password.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <AuthShell>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-zinc-900">Set a new password</h2>
                <p className="mt-1 text-sm text-zinc-500">
                    Choose a strong password to secure your Lumio account.
                </p>
            </div>

            {checkingToken ? (
                <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Verifying your reset link...
                </div>
            ) : null}

            {!checkingToken && error && !message ? (
                <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-600">
                    <p>{error}</p>
                    <Link href="/forgot-password" className="inline-flex items-center gap-2 font-medium underline underline-offset-4">
                        Request a new reset link
                    </Link>
                </div>
            ) : null}

            {message ? (
                <div className="space-y-3 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
                    <div className="flex items-center gap-2 font-medium">
                        <CheckCircle2 className="h-4 w-4" />
                        Password updated
                    </div>
                    <p>{message}</p>
                    <p>You&apos;ll be redirected to sign in shortly.</p>
                </div>
            ) : null}

            {!checkingToken && tokenValid ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-zinc-700">
                            New password
                        </label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="new-password"
                                placeholder="Create a strong password"
                                className="pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((current) => !current)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        <p className="mt-1 text-xs text-zinc-500">
                            Use at least 8 characters, including upper and lower case letters and a number.
                        </p>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-zinc-700">
                            Confirm password
                        </label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            autoComplete="new-password"
                            placeholder="Repeat your new password"
                            required
                        />
                    </div>

                    {error ? (
                        <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                            {error}
                        </div>
                    ) : null}

                    <Button type="submit" className="w-full gap-2" disabled={submitting}>
                        {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                        {submitting ? "Saving password..." : "Reset password"}
                    </Button>
                </form>
            ) : null}

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