import Link from "next/link";

const testimonials = [
    {
        quote: "Lumio cut our admin workload in half. Attendance, grades, and parent communication all in one place.",
        name: "Sarah Ahmed",
        title: "Principal, Greenfield Academy",
        initials: "SA",
        color: "bg-blue-500",
    },
    {
        quote: "The analytics dashboard gives me a real-time view of every class's performance. Game changer.",
        name: "Dr. Michael Torres",
        title: "Head of Academics, Westbrook High",
        initials: "MT",
        color: "bg-emerald-500",
    },
    {
        quote: "Finally a platform that teachers actually want to use. The interface is clean and intuitive.",
        name: "Priya Nair",
        title: "Senior Teacher, Horizon School",
        initials: "PN",
        color: "bg-purple-500",
    },
];

function Navbar() {
    return (
        <header className="fixed top-0 inset-x-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
                        <span className="text-sm font-bold text-white">L</span>
                    </div>
                    <span className="text-base font-semibold text-zinc-900">Lumio</span>
                </Link>

                <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-600">
                    <Link href="/features" className="hover:text-zinc-900 transition-colors">Features</Link>
                    <Link href="/testimonials" className="hover:text-zinc-900 transition-colors">Testimonials</Link>
                    <Link href="/pricing" className="hover:text-zinc-900 transition-colors">Pricing</Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Link href="/login" className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">Sign in</Link>
                    <Link href="/login" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors">Get started</Link>
                </div>
            </div>
        </header>
    );
}

function Footer() {
    return (
        <footer className="border-t border-zinc-100 bg-white py-10 px-6">
            <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900">
                        <span className="text-xs font-bold text-white">L</span>
                    </div>
                    <span className="text-sm font-semibold text-zinc-900">Lumio</span>
                </div>
                <p className="text-xs text-zinc-400">© {new Date().getFullYear()} Lumio. All rights reserved.</p>
                <div className="flex items-center gap-5 text-xs text-zinc-400">
                    <a href="#" className="hover:text-zinc-700 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-zinc-700 transition-colors">Terms</a>
                    <Link href="/login" className="hover:text-zinc-700 transition-colors">Sign in</Link>
                </div>
            </div>
        </footer>
    );
}

export default function TestimonialsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-28">
                <section className="py-24 px-6">
                    <div className="mx-auto max-w-5xl">
                        <div className="text-center mb-14">
                            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">What educators say</h1>
                            <p className="text-zinc-500">Real stories from schools using Lumio to simplify operations and improve outcomes.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {testimonials.map((t) => (
                                <div key={t.name} className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
                                    <div className="flex gap-0.5 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-sm text-zinc-600 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                                    <div className="flex items-center gap-3">
                                        <div className={`${t.color} h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0`}>{t.initials}</div>
                                        <div>
                                            <p className="text-sm font-semibold text-zinc-900">{t.name}</p>
                                            <p className="text-xs text-zinc-400">{t.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
