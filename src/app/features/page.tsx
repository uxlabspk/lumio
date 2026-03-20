import Link from "next/link";
import { Users, CalendarCheck, ClipboardList, CalendarDays, BookOpen, MessageSquare, BarChart3, Shield } from "lucide-react";

const features = [
    { icon: Users, title: "Student Management", description: "Maintain complete student profiles, enrollment records, and academic history in one place." },
    { icon: CalendarCheck, title: "Attendance Tracking", description: "Mark and monitor daily attendance across classes with insightful trend charts." },
    { icon: ClipboardList, title: "Assignments", description: "Create, assign, and track homework and project submissions with progress tracking." },
    { icon: CalendarDays, title: "Exam Scheduling", description: "Plan examinations, publish results, and analyse performance by subject and class." },
    { icon: BookOpen, title: "Class Preparation", description: "Organise lesson plans, teaching materials, and curriculum outlines effortlessly." },
    { icon: MessageSquare, title: "Messaging", description: "Built-in direct messaging between teachers, students, and parents." },
    { icon: BarChart3, title: "Analytics & Reports", description: "Visual dashboards and exportable reports for data-driven school leadership." },
    { icon: Shield, title: "Role-based Access", description: "Granular permissions for admins, principals, teachers, students, and parents." },
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

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-28">
                <section className="py-24 px-6">
                    <div className="mx-auto max-w-5xl">
                        <div className="text-center mb-14">
                            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">Features</h1>
                            <p className="text-zinc-500 max-w-xl mx-auto">All the tools your school needs to run smoothly — organised and easy to use.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {features.map((f) => {
                                const Icon = f.icon;
                                return (
                                    <div key={f.title} className="rounded-2xl border border-zinc-100 bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                                        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100">
                                            <Icon className="h-4.5 w-4.5 text-zinc-700" size={18} />
                                        </div>
                                        <h3 className="text-sm font-semibold text-zinc-900 mb-1.5">{f.title}</h3>
                                        <p className="text-xs text-zinc-500 leading-relaxed">{f.description}</p>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
