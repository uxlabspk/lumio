import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const plans = [
    {
        name: "Starter",
        price: "$49",
        period: "/month",
        description: "For small schools up to 200 students",
        features: ["Up to 200 students", "5 teacher accounts", "Attendance & exams", "Basic reports", "Email support"],
        cta: "Start free trial",
        highlighted: false,
    },
    {
        name: "School",
        price: "$149",
        period: "/month",
        description: "For growing schools up to 1,000 students",
        features: ["Up to 1,000 students", "Unlimited teachers", "All modules included", "Advanced analytics", "Priority support", "Custom branding"],
        cta: "Start free trial",
        highlighted: true,
    },
    {
        name: "District",
        price: "Custom",
        period: "",
        description: "For school districts and large institutions",
        features: ["Unlimited students", "Multi-school dashboard", "SSO & custom integrations", "Dedicated success manager", "SLA guarantee", "On-premise option"],
        cta: "Contact sales",
        highlighted: false,
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

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-28">
                <section className="py-24 px-6 bg-zinc-50">
                    <div className="mx-auto max-w-5xl">
                        <div className="text-center mb-14">
                            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">Pricing</h1>
                            <p className="text-zinc-500">Simple, transparent pricing — all plans include a 30-day free trial.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            {plans.map((p) => (
                                <div key={p.name} className={`rounded-2xl p-7 border ${p.highlighted ? "bg-zinc-900 border-zinc-900 shadow-xl scale-[1.03]" : "bg-white border-zinc-100 shadow-sm"}`}>
                                    <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${p.highlighted ? "text-zinc-400" : "text-zinc-500"}`}>{p.name}</p>
                                    <div className="flex items-end gap-0.5 mb-1">
                                        <span className={`text-4xl font-bold ${p.highlighted ? "text-white" : "text-zinc-900"}`}>{p.price}</span>
                                        {p.period && <span className={`text-sm mb-1 ${p.highlighted ? "text-zinc-400" : "text-zinc-500"}`}>{p.period}</span>}
                                    </div>
                                    <p className={`text-xs mb-6 ${p.highlighted ? "text-zinc-400" : "text-zinc-500"}`}>{p.description}</p>
                                    <ul className="space-y-2.5 mb-7">
                                        {p.features.map((f) => (
                                            <li key={f} className="flex items-center gap-2">
                                                <CheckCircle2 size={14} className={p.highlighted ? "text-emerald-400 shrink-0" : "text-emerald-500 shrink-0"} />
                                                <span className={`text-xs ${p.highlighted ? "text-zinc-300" : "text-zinc-600"}`}>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/login" className={`block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-colors ${p.highlighted ? "bg-white text-zinc-900 hover:bg-zinc-100" : "bg-zinc-900 text-white hover:bg-zinc-700"}`}>{p.cta}</Link>
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
