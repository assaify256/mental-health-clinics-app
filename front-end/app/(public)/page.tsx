import {
    Activity,
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    ClipboardList,
    HeartPulse,
    LayoutDashboard,
    ShieldCheck,
    Users,
} from "lucide-react";

import logo from "@/public/logo.png";
import Image from "next/image";

type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
};

type StepProps = {
    number: string;
    title: string;
    description: string;
};

type StatCardProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
};

function App() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Navbar */}
            <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                    <a href="#" className="flex items-center gap-2">
                        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-indigo-600 text-white">
                            <Image src={logo} alt="app logo" />
                        </div>
                    </a>

                    <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
                        <a
                            href="#features"
                            className="transition hover:text-indigo-600"
                        >
                            Features
                        </a>
                        <a
                            href="#workflow"
                            className="transition hover:text-indigo-600"
                        >
                            How it works
                        </a>
                        <a
                            href="#technology"
                            className="transition hover:text-indigo-600"
                        >
                            Technology
                        </a>
                    </div>

                    <a
                        href="/sign-up"
                        className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Sign Up
                    </a>
                </nav>
            </header>

            <main>
                {/* Hero */}
                <section className="relative overflow-hidden bg-white">
                    <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-indigo-100 blur-3xl" />
                    <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-violet-100 blur-3xl" />

                    <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700">
                                <Activity size={15} />
                                Mental Health Clinic Management
                            </div>

                            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                A simpler way to manage
                                <span className="text-indigo-600">
                                    {" "}
                                    mental health clinics.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                                TheraDesk is a full-stack web application
                                designed to help mental health clinics organize
                                patients, appointments, clinical records, and
                                everyday administrative workflows in one place.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <a
                                    href="#demo"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                >
                                    Explore the App
                                    <ArrowRight size={18} />
                                </a>

                                <a
                                    href="#features"
                                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    See Features
                                </a>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2
                                        size={16}
                                        className="text-emerald-500"
                                    />
                                    Full-stack project
                                </div>

                                <div className="flex items-center gap-2">
                                    <CheckCircle2
                                        size={16}
                                        className="text-emerald-500"
                                    />
                                    Responsive UI
                                </div>

                                <div className="flex items-center gap-2">
                                    <CheckCircle2
                                        size={16}
                                        className="text-emerald-500"
                                    />
                                    REST API
                                </div>
                            </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div id="demo" className="relative">
                            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/70">
                                <div className="overflow-hidden rounded-xl border border-slate-200">
                                    {/* Fake browser bar */}
                                    <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
                                        <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                                        <div className="ml-4 h-6 flex-1 rounded-md bg-white" />
                                    </div>

                                    <div className="grid min-h-[400px] grid-cols-[170px_1fr]">
                                        {/* Sidebar */}
                                        <aside className="hidden border-r border-slate-200 bg-slate-50 p-4 sm:block">
                                            <div className="mb-8 flex items-center gap-2">
                                                <div className="h-7 w-7 rounded-lg bg-indigo-600" />
                                                <div className="h-3 w-16 rounded bg-slate-300" />
                                            </div>

                                            <div className="space-y-2">
                                                {[
                                                    "Dashboard",
                                                    "Patients",
                                                    "Appointments",
                                                    "Records",
                                                ].map((item, index) => (
                                                    <div
                                                        key={item}
                                                        className={`rounded-lg px-3 py-2 text-xs ${
                                                            index === 0
                                                                ? "bg-indigo-100 font-medium text-indigo-700"
                                                                : "text-slate-500"
                                                        }`}
                                                    >
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </aside>

                                        {/* Dashboard */}
                                        <div className="bg-white p-5">
                                            <div className="mb-5">
                                                <p className="text-xs text-slate-400">
                                                    Wednesday, August 12
                                                </p>
                                                <h3 className="mt-1 text-lg font-bold">
                                                    Good morning
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <StatCard
                                                    icon={<Users size={16} />}
                                                    label="Patients"
                                                    value="248"
                                                />

                                                <StatCard
                                                    icon={
                                                        <CalendarDays
                                                            size={16}
                                                        />
                                                    }
                                                    label="Appointments"
                                                    value="18"
                                                />

                                                <StatCard
                                                    icon={
                                                        <ClipboardList
                                                            size={16}
                                                        />
                                                    }
                                                    label="Records"
                                                    value="326"
                                                />

                                                <StatCard
                                                    icon={
                                                        <Activity size={16} />
                                                    }
                                                    label="Sessions"
                                                    value="42"
                                                />
                                            </div>

                                            <div className="mt-5 rounded-xl border border-slate-200 p-4">
                                                <div className="mb-4 flex items-center justify-between">
                                                    <span className="text-xs font-semibold">
                                                        Today's appointments
                                                    </span>

                                                    <span className="text-xs text-indigo-600">
                                                        View all
                                                    </span>
                                                </div>

                                                <div className="space-y-3">
                                                    {[
                                                        [
                                                            "Sarah M.",
                                                            "09:00",
                                                            "Follow-up",
                                                        ],
                                                        [
                                                            "Daniel R.",
                                                            "10:30",
                                                            "Initial consultation",
                                                        ],
                                                        [
                                                            "Alya P.",
                                                            "13:00",
                                                            "Therapy session",
                                                        ],
                                                    ].map(
                                                        ([
                                                            name,
                                                            time,
                                                            type,
                                                        ]) => (
                                                            <div
                                                                key={name}
                                                                className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                                                            >
                                                                <div>
                                                                    <p className="text-xs font-medium">
                                                                        {name}
                                                                    </p>
                                                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                                                        {type}
                                                                    </p>
                                                                </div>

                                                                <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                                                                    {time}
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating card */}
                            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                        <ShieldCheck size={20} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold">
                                            Organized & secure
                                        </p>
                                        <p className="mt-0.5 text-xs text-slate-400">
                                            Clinic data in one place
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section id="features" className="bg-slate-50 py-20 lg:py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                Core features
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                Everything a small clinic needs
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                The application focuses on practical workflows
                                rather than unnecessary complexity.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            <FeatureCard
                                icon={<Users />}
                                title="Patient Management"
                                description="Maintain patient profiles and quickly access important information from a centralized system."
                            />

                            <FeatureCard
                                icon={<CalendarDays />}
                                title="Appointments"
                                description="Organize upcoming appointments and keep track of a clinic's daily schedule."
                            />

                            <FeatureCard
                                icon={<ClipboardList />}
                                title="Clinical Records"
                                description="Store and manage structured notes and patient-related records."
                            />

                            <FeatureCard
                                icon={<LayoutDashboard />}
                                title="Dashboard"
                                description="Give clinic staff an overview of patients, appointments, and daily activity."
                            />

                            <FeatureCard
                                icon={<ShieldCheck />}
                                title="Authentication"
                                description="Role-based access and authenticated sessions help separate protected clinic functionality."
                            />

                            <FeatureCard
                                icon={<Activity />}
                                title="REST API"
                                description="A dedicated backend API keeps the frontend and application data cleanly separated."
                            />
                        </div>
                    </div>
                </section>

                {/* Workflow */}
                <section id="workflow" className="bg-white py-20 lg:py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="text-center">
                            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                Workflow
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                Designed around the clinic workflow
                            </h2>
                        </div>

                        <div className="mt-14 grid gap-8 md:grid-cols-3">
                            <Step
                                number="01"
                                title="Register patients"
                                description="Create and maintain patient profiles with the information required by the clinic."
                            />

                            <Step
                                number="02"
                                title="Manage appointments"
                                description="Schedule and review appointments so staff can understand the clinic's daily workload."
                            />

                            <Step
                                number="03"
                                title="Record sessions"
                                description="Keep clinical records connected to the appropriate patient for easier follow-up."
                            />
                        </div>
                    </div>
                </section>

                {/* Technology */}
                <section
                    id="technology"
                    className="border-y border-slate-200 bg-slate-950 py-20 text-white"
                >
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
                                    Built as a portfolio project
                                </p>

                                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                    A real-world full-stack application
                                </h2>

                                <p className="mt-5 max-w-xl leading-7 text-slate-400">
                                    This project demonstrates how a modern React
                                    frontend can communicate with a separate
                                    backend API while maintaining a clean
                                    application architecture.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {[
                                    "Next.js",
                                    "Tailwind CSS",
                                    "Express.js",
                                    "Sequelize",
                                    "SQLite",
                                    "REST API",
                                ].map((technology) => (
                                    <div
                                        key={technology}
                                        className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-5 text-center text-sm font-medium text-slate-300"
                                    >
                                        {technology}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-indigo-600 py-20">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Explore the project
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-indigo-100">
                            See how the frontend, backend API, authentication,
                            database, and clinic workflows come together in one
                            full-stack application.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <a
                                href="/sign-up"
                                className="rounded-lg bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
                            >
                                Live Demo
                            </a>

                            <a
                                href="https://github.com/assaify256/mental-health-clinics-app"
                                className="rounded-lg border border-indigo-400 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500"
                            >
                                View GitHub
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-950 py-8 text-slate-400">
                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 text-sm sm:flex-row lg:px-8">
                    <div className="flex items-center gap-2">
                        <span>TheraDesk</span>
                    </div>

                    <p>
                        A portfolio project demonstrating full-stack web
                        development.
                    </p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                {icon}
            </div>

            <h3 className="mt-5 text-lg font-semibold">{title}</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
            </p>
        </div>
    );
}

function Step({ number, title, description }: StepProps) {
    return (
        <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-7">
            <span className="text-sm font-bold text-indigo-600">{number}</span>

            <h3 className="mt-4 text-xl font-semibold">{title}</h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
                {description}
            </p>
        </div>
    );
}

function StatCard({ icon, label, value }: StatCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 p-3">
            <div className="flex items-center justify-between">
                <span className="text-slate-400">{icon}</span>
                <span className="text-lg font-bold">{value}</span>
            </div>

            <p className="mt-2 text-[10px] text-slate-400">{label}</p>
        </div>
    );
}

export default App;
