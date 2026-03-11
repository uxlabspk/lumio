"use client";

import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const attendanceTrend = [
    { month: "Sep", present: 92, absent: 8 },
    { month: "Oct", present: 88, absent: 12 },
    { month: "Nov", present: 94, absent: 6 },
    { month: "Dec", present: 85, absent: 15 },
    { month: "Jan", present: 91, absent: 9 },
    { month: "Feb", present: 94, absent: 6 },
];

const performanceData = [
    { subject: "Math", avg: 76, highest: 98, lowest: 45 },
    { subject: "English", avg: 82, highest: 96, lowest: 55 },
    { subject: "Physics", avg: 70, highest: 95, lowest: 40 },
    { subject: "Art", avg: 88, highest: 100, lowest: 60 },
    { subject: "Sport", avg: 91, highest: 100, lowest: 65 },
    { subject: "Science", avg: 74, highest: 97, lowest: 42 },
];

const gradeDistribution = [
    { name: "A (90-100)", value: 18, color: "#10b981" },
    { name: "B (80-89)", value: 28, color: "#3b82f6" },
    { name: "C (70-79)", value: 32, color: "#f59e0b" },
    { name: "D (60-69)", value: 15, color: "#f97316" },
    { name: "F (<60)", value: 7, color: "#ef4444" },
];

const enrollmentTrend = [
    { year: "2021", students: 980 },
    { year: "2022", students: 1050 },
    { year: "2023", students: 1140 },
    { year: "2024", students: 1220 },
    { year: "2025", students: 1284 },
];

const topStudents = [
    { name: "Emily Carter", class: "Class 303", gpa: 3.96, score: 97.5 },
    { name: "Olivia Brown", class: "Class 304", gpa: 3.92, score: 95.8 },
    { name: "Sarah Anderson", class: "Class 303", gpa: 3.88, score: 94.2 },
    { name: "Amir Bagjian", class: "Class 302", gpa: 3.85, score: 93.7 },
    { name: "James Wilson", class: "Class 302", gpa: 3.72, score: 91.4 },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-zinc-900">Analytics</h1>
                <p className="text-sm text-zinc-500">School performance insights and trends.</p>
            </div>

            {/* Summary row */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                    { label: "Avg Attendance", value: "91.2%", trend: "+2.1%", up: true },
                    { label: "Avg Grade Score", value: "78.5", trend: "+4.3%", up: true },
                    { label: "Assignments Submitted", value: "87.4%", trend: "-1.2%", up: false },
                    { label: "Exam Pass Rate", value: "83.6%", trend: "+6.8%", up: true },
                ].map((item) => (
                    <Card key={item.label}>
                        <CardContent className="p-4">
                            <p className="text-xs text-zinc-500">{item.label}</p>
                            <p className="mt-1 text-2xl font-semibold text-zinc-900">{item.value}</p>
                            <p className={`mt-0.5 text-xs ${item.up ? "text-emerald-600" : "text-red-600"}`}>
                                {item.trend} vs last term
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts row 1 */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Attendance trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Attendance Trend</CardTitle>
                        <CardDescription>Monthly attendance rates for the academic year</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={attendanceTrend} barSize={16}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#a1a1aa" }} />
                                <YAxis tick={{ fontSize: 11, fill: "#a1a1aa" }} domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: "8px", border: "1px solid #f4f4f5", fontSize: 12 }}
                                />
                                <Bar dataKey="present" name="Present %" fill="#10b981" radius={[3, 3, 0, 0]} />
                                <Bar dataKey="absent" name="Absent %" fill="#f97316" radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Grade distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Grade Distribution</CardTitle>
                        <CardDescription>Distribution of student grades this term</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <ResponsiveContainer width="50%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={gradeDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {gradeDistribution.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: "8px", border: "1px solid #f4f4f5", fontSize: 12 }}
                                        formatter={(v) => [`${v}%`, ""]}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="space-y-2 flex-1">
                                {gradeDistribution.map((item) => (
                                    <div key={item.name} className="flex items-center gap-2">
                                        <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                        <span className="text-xs text-zinc-600">{item.name}</span>
                                        <span className="ml-auto text-xs font-medium text-zinc-900">{item.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts row 2 */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Subject performance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Subject Performance</CardTitle>
                        <CardDescription>Average scores per subject</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={performanceData} layout="vertical" barSize={12}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" horizontal={false} />
                                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#a1a1aa" }} />
                                <YAxis type="category" dataKey="subject" tick={{ fontSize: 11, fill: "#71717a" }} width={50} />
                                <Tooltip
                                    contentStyle={{ borderRadius: "8px", border: "1px solid #f4f4f5", fontSize: 12 }}
                                />
                                <Bar dataKey="avg" name="Average" fill="#18181b" radius={[0, 3, 3, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Enrollment trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Enrollment Trend</CardTitle>
                        <CardDescription>Student enrollment over the years</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={enrollmentTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#a1a1aa" }} />
                                <YAxis tick={{ fontSize: 11, fill: "#a1a1aa" }} domain={[900, 1400]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: "8px", border: "1px solid #f4f4f5", fontSize: 12 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="students"
                                    stroke="#18181b"
                                    strokeWidth={2}
                                    dot={{ fill: "#18181b", r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Top students table */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Top Performing Students</CardTitle>
                        <CardDescription>Ranked by GPA and average score</CardDescription>
                    </div>
                    <Badge variant="info">This Term</Badge>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-5 gap-3 text-[10px] font-medium text-zinc-400 uppercase tracking-wide mb-3 px-3">
                        <span>Rank</span>
                        <span className="col-span-2">Student</span>
                        <span>GPA</span>
                        <span>Avg Score</span>
                    </div>
                    <div className="space-y-1">
                        {topStudents.map((student, i) => (
                            <div
                                key={student.name}
                                className="grid grid-cols-5 gap-3 items-center rounded-lg px-3 py-2.5 hover:bg-zinc-50 transition-colors"
                            >
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700">
                                    {i + 1}
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm font-medium text-zinc-900">{student.name}</p>
                                    <p className="text-xs text-zinc-400">{student.class}</p>
                                </div>
                                <span className="text-sm font-semibold text-zinc-900">{student.gpa}</span>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-zinc-100 rounded-full max-w-20">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full"
                                            style={{ width: `${student.score}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-zinc-600">{student.score}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
