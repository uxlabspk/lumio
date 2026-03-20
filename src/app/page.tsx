import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  MessageSquare,
  Shield,
  Users,
  Zap,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: Users,
    title: "Student Management",
    description:
      "Maintain complete student profiles, enrollment records, and academic history in one place.",
  },
  {
    icon: CalendarCheck,
    title: "Attendance Tracking",
    description:
      "Mark and monitor daily attendance across classes with insightful trend charts.",
  },
  {
    icon: ClipboardList,
    title: "Assignments",
    description:
      "Create, assign, and track homework and project submissions with progress tracking.",
  },
  {
    icon: CalendarDays,
    title: "Exam Scheduling",
    description:
      "Plan examinations, publish results, and analyse performance by subject and class.",
  },
  {
    icon: BookOpen,
    title: "Class Preparation",
    description:
      "Organise lesson plans, teaching materials, and curriculum outlines effortlessly.",
  },
  {
    icon: MessageSquare,
    title: "Messaging",
    description:
      "Built-in direct messaging between teachers, students, and parents.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Visual dashboards and exportable reports for data-driven school leadership.",
  },
  {
    icon: Shield,
    title: "Role-based Access",
    description:
      "Granular permissions for admins, principals, teachers, students, and parents.",
  },
];

const stats = [
  { value: "10k+", label: "Students managed" },
  { value: "500+", label: "Schools onboarded" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.9★", label: "Average rating" },
];

const testimonials = [
  {
    quote:
      "Lumio cut our admin workload in half. Attendance, grades, and parent communication all in one place.",
    name: "Sarah Ahmed",
    title: "Principal, Greenfield Academy",
    initials: "SA",
    color: "bg-blue-500",
  },
  {
    quote:
      "The analytics dashboard gives me a real-time view of every class's performance. Game changer.",
    name: "Dr. Michael Torres",
    title: "Head of Academics, Westbrook High",
    initials: "MT",
    color: "bg-emerald-500",
  },
  {
    quote:
      "Finally a platform that teachers actually want to use. The interface is clean and intuitive.",
    name: "Priya Nair",
    title: "Senior Teacher, Horizon School",
    initials: "PN",
    color: "bg-purple-500",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "For small schools up to 200 students",
    features: [
      "Up to 200 students",
      "5 teacher accounts",
      "Attendance & exams",
      "Basic reports",
      "Email support",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "School",
    price: "$149",
    period: "/month",
    description: "For growing schools up to 1,000 students",
    features: [
      "Up to 1,000 students",
      "Unlimited teachers",
      "All modules included",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "District",
    price: "Custom",
    period: "",
    description: "For school districts and large institutions",
    features: [
      "Unlimited students",
      "Multi-school dashboard",
      "SSO & custom integrations",
      "Dedicated success manager",
      "SLA guarantee",
      "On-premise option",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

// ─── Sections ─────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
            <span className="text-sm font-bold text-white">L</span>
          </div>
          <span className="text-base font-semibold text-zinc-900">Lumio</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-600">
          <Link href="/features" className="hover:text-zinc-900 transition-colors">Features</Link>
          <Link href="/testimonials" className="hover:text-zinc-900 transition-colors">Testimonials</Link>
          <Link href="/pricing" className="hover:text-zinc-900 transition-colors">Pricing</Link>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-40 pb-24 px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-xs font-medium text-zinc-600 mb-6">
          <Zap className="h-3 w-3 text-amber-500" />
          Now with AI-powered analytics
        </span>

        <h1 className="text-5xl sm:text-6xl font-bold text-zinc-900 leading-tight tracking-tight mb-6">
          The modern OS for{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10">every school</span>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-1 h-3 bg-amber-200/60 z-0 rounded"
            />
          </span>
        </h1>

        <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-10">
          Lumio unifies student records, attendance, exams, assignments, and
          communication in one beautifully designed platform built for teachers,
          students, and parents.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors shadow-sm"
          >
            Start for free
            <ChevronRight className="h-4 w-4" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            See all features
          </a>
        </div>

        {/* Trust note */}
        <p className="mt-6 text-xs text-zinc-400">
          No credit card required · 30-day free trial · Cancel anytime
        </p>
      </div>

      {/* Dashboard preview */}
      <div className="mx-auto mt-16 max-w-5xl">
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-xl overflow-hidden">
          {/* Fake browser bar */}
          <div className="flex items-center gap-1.5 bg-zinc-100 px-4 py-3 border-b border-zinc-200">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <div className="mx-auto flex items-center gap-2 rounded-md bg-white border border-zinc-200 px-3 py-1 text-xs text-zinc-400 w-56">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              app.lumio.edu/dashboard
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="flex h-80 bg-zinc-50">
            {/* Sidebar mock */}
            <div className="w-14 shrink-0 bg-white border-r border-zinc-100 flex flex-col items-center py-4 gap-3">
              <div className="h-7 w-7 rounded-lg bg-zinc-900 flex items-center justify-center mb-2">
                <span className="text-[10px] font-bold text-white">L</span>
              </div>
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`h-7 w-7 rounded-lg ${i === 0 ? "bg-zinc-100" : "bg-transparent"}`}
                >
                  <div className={`m-auto mt-1.5 h-4 w-4 rounded ${i === 0 ? "bg-zinc-400" : "bg-zinc-200"}`} />
                </div>
              ))}
            </div>

            {/* Content mock */}
            <div className="flex-1 p-5 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="h-4 w-28 rounded bg-zinc-200 mb-1.5" />
                  <div className="h-3 w-20 rounded bg-zinc-100" />
                </div>
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-7 w-7 rounded-lg bg-zinc-100" />
                  ))}
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Students", val: "1,284", color: "bg-blue-500" },
                  { label: "Teachers", val: "68", color: "bg-emerald-500" },
                  { label: "Attendance", val: "94%", color: "bg-amber-500" },
                  { label: "Performance", val: "87%", color: "bg-purple-500" },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl border border-zinc-100 bg-white p-3 shadow-sm">
                    <div className={`h-1.5 w-6 rounded-full ${c.color} mb-2`} />
                    <div className="text-base font-bold text-zinc-900">{c.val}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{c.label}</div>
                  </div>
                ))}
              </div>

              {/* Chart rows */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 rounded-xl border border-zinc-100 bg-white p-3 shadow-sm h-24">
                  <div className="h-2.5 w-20 rounded bg-zinc-100 mb-2" />
                  <div className="flex items-end gap-1 h-14 pt-2">
                    {[60, 80, 55, 90, 70, 85, 75].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{ height: `${h}%`, backgroundColor: i === 3 ? "#18181b" : "#e4e4e7" }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-white p-3 shadow-sm h-24">
                  <div className="h-2.5 w-16 rounded bg-zinc-100 mb-3" />
                  <div className="flex items-center justify-center h-14">
                    <div className="relative h-12 w-12">
                      <svg viewBox="0 0 36 36" className="-rotate-90">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#f4f4f5" strokeWidth="4" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#18181b" strokeWidth="4" strokeDasharray="59 100" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-zinc-900">87%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-16 border-y border-zinc-100 bg-zinc-900">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-sm text-zinc-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
            Everything your school needs
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            From daily attendance to year-end reports, Lumio covers every corner of school operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-zinc-100 bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
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
  );
}

function HowItWorks() {
  const steps = [
    { step: "1", title: "Set up your school", desc: "Add grades, classes, subjects, and your teaching staff in minutes." },
    { step: "2", title: "Invite everyone", desc: "Teachers, students, and parents get role-appropriate access instantly." },
    { step: "3", title: "Run your school", desc: "Mark attendance, schedule exams, assign work, and track progress daily." },
    { step: "4", title: "Act on insights", desc: "Use built-in analytics and reports to continuously improve outcomes." },
  ];

  return (
    <section className="py-24 px-6 bg-zinc-50">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
            Up and running in minutes
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Lumio is designed to be set up fast, with zero technical expertise required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white text-sm font-bold mb-4">
                {s.step}
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-2">{s.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
            Loved by educators worldwide
          </h2>
          <p className="text-zinc-500">
            Join thousands of schools already using Lumio every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-semibold shrink-0`}>
                  {t.initials}
                </div>
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
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-zinc-50">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-zinc-500">All plans include a 30-day free trial. No credit card needed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-7 border ${p.highlighted
                ? "bg-zinc-900 border-zinc-900 shadow-xl scale-[1.03]"
                : "bg-white border-zinc-100 shadow-sm"
                }`}
            >
              <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${p.highlighted ? "text-zinc-400" : "text-zinc-500"}`}>
                {p.name}
              </p>
              <div className="flex items-end gap-0.5 mb-1">
                <span className={`text-4xl font-bold ${p.highlighted ? "text-white" : "text-zinc-900"}`}>
                  {p.price}
                </span>
                {p.period && (
                  <span className={`text-sm mb-1 ${p.highlighted ? "text-zinc-400" : "text-zinc-500"}`}>
                    {p.period}
                  </span>
                )}
              </div>
              <p className={`text-xs mb-6 ${p.highlighted ? "text-zinc-400" : "text-zinc-500"}`}>
                {p.description}
              </p>
              <ul className="space-y-2.5 mb-7">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2
                      size={14}
                      className={p.highlighted ? "text-emerald-400 shrink-0" : "text-emerald-500 shrink-0"}
                    />
                    <span className={`text-xs ${p.highlighted ? "text-zinc-300" : "text-zinc-600"}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className={`block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-colors ${p.highlighted
                  ? "bg-white text-zinc-900 hover:bg-zinc-100"
                  : "bg-zinc-900 text-white hover:bg-zinc-700"
                  }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-6 bg-zinc-900">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
          <GraduationCap className="h-7 w-7 text-zinc-900" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to modernise your school?
        </h2>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          Join 500+ schools using Lumio to save hours of admin work, improve student outcomes, and keep everyone connected.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors shadow-sm"
        >
          Get started for free
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
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
        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} Lumio. All rights reserved.
        </p>
        <div className="flex items-center gap-5 text-xs text-zinc-400">
          <a href="#" className="hover:text-zinc-700 transition-colors">Privacy</a>
          <a href="#" className="hover:text-zinc-700 transition-colors">Terms</a>
          <Link href="/login" className="hover:text-zinc-700 transition-colors">Sign in</Link>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

