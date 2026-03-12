import Link from "next/link";

export function AuthShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-zinc-50">
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-zinc-900 p-12 text-white">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                        <span className="text-sm font-bold text-zinc-900">L</span>
                    </div>
                    <span className="text-lg font-semibold">Lumio</span>
                </div>

                <div>
                    <h1 className="mb-4 text-4xl font-bold leading-tight">
                        Modern School Management for the Digital Age
                    </h1>
                    <p className="text-lg leading-relaxed text-zinc-400">
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
                            <p className="mt-0.5 text-sm text-zinc-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
                <div className="w-full max-w-sm">
                    <Link href="/login" className="mb-8 inline-flex items-center gap-2 lg:hidden">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
                            <span className="text-sm font-bold text-white">L</span>
                        </div>
                        <span className="text-base font-semibold text-zinc-900">Lumio</span>
                    </Link>

                    {children}
                </div>
            </div>
        </div>
    );
}