"use client";

import { Download, Filter, FileText, BarChart2, Users, ClipboardCheck, GraduationCap, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reportTypes = [
    {
        title: "Attendance Report",
        description: "Daily, weekly, and monthly attendance summaries",
        icon: ClipboardCheck,
        color: "text-emerald-500 bg-emerald-50",
        lastGenerated: "Today",
        format: ["PDF", "CSV"],
    },
    {
        title: "Academic Performance",
        description: "Student grades, averages, and subject scores",
        icon: GraduationCap,
        color: "text-blue-500 bg-blue-50",
        lastGenerated: "2 days ago",
        format: ["PDF", "Excel"],
    },
    {
        title: "Student Demographics",
        description: "Enrollment, gender, class distribution stats",
        icon: Users,
        color: "text-purple-500 bg-purple-50",
        lastGenerated: "1 week ago",
        format: ["PDF", "CSV"],
    },
    {
        title: "Fee Collection",
        description: "Invoice status, payments, and outstanding balances",
        icon: DollarSign,
        color: "text-orange-500 bg-orange-50",
        lastGenerated: "3 days ago",
        format: ["PDF", "Excel"],
    },
    {
        title: "Admissions Report",
        description: "Applications, enrollment funnel, and conversion rates",
        icon: FileText,
        color: "text-pink-500 bg-pink-50",
        lastGenerated: "5 days ago",
        format: ["PDF"],
    },
    {
        title: "Staff Report",
        description: "Staff attendance, leaves, and performance overview",
        icon: BarChart2,
        color: "text-cyan-500 bg-cyan-50",
        lastGenerated: "1 week ago",
        format: ["PDF", "CSV"],
    },
];

const recentReports = [
    { name: "Attendance Report - February 2025", date: "Feb 9, 2025", format: "PDF", size: "1.2 MB" },
    { name: "Academic Performance - Term 1", date: "Feb 7, 2025", format: "Excel", size: "3.4 MB" },
    { name: "Fee Collection - January 2025", date: "Feb 1, 2025", format: "PDF", size: "850 KB" },
    { name: "Student Demographics Q1 2025", date: "Jan 28, 2025", format: "CSV", size: "420 KB" },
    { name: "Admissions Report 2024-25", date: "Jan 20, 2025", format: "PDF", size: "2.1 MB" },
];

const formatBadge: Record<string, "default" | "info" | "success" | "outline" | "destructive" | "warning" | "purple"> = {
    PDF: "destructive",
    Excel: "success",
    CSV: "info",
};

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Reports</h1>
                    <p className="text-sm text-zinc-500">Generate and download school reports.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                        <Filter className="h-3 w-3" />
                        Filter
                    </Button>
                </div>
            </div>

            {/* Report type cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {reportTypes.map((report) => {
                    const Icon = report.icon;
                    return (
                        <Card key={report.title} className="group hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`rounded-lg p-2.5 ${report.color.split(" ")[1]}`}>
                                        <Icon className={`h-5 w-5 ${report.color.split(" ")[0]}`} />
                                    </div>
                                    <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                                <h3 className="text-sm font-semibold text-zinc-900 mb-1">{report.title}</h3>
                                <p className="text-xs text-zinc-500 mb-3">{report.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1">
                                        {report.format.map((f) => (
                                            <Badge key={f} variant={formatBadge[f] ?? "outline"} className="text-[10px] px-1.5">
                                                {f}
                                            </Badge>
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-zinc-400">Last: {report.lastGenerated}</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Recent reports */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Recent Reports</CardTitle>
                        <CardDescription>Previously generated reports available for download</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-4 gap-3 text-[10px] font-medium text-zinc-400 uppercase tracking-wide mb-3 px-3">
                        <span className="col-span-2">Report Name</span>
                        <span>Date</span>
                        <span>Actions</span>
                    </div>
                    <div className="space-y-1">
                        {recentReports.map((report, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-4 gap-3 items-center rounded-lg px-3 py-3 hover:bg-zinc-50 transition-colors"
                            >
                                <div className="col-span-2 flex items-center gap-2.5">
                                    <div className="h-8 w-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                                        <FileText className="h-4 w-4 text-zinc-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900">{report.name}</p>
                                        <p className="text-[10px] text-zinc-400">{report.size}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-zinc-500">{report.date}</span>
                                <div className="flex items-center gap-2">
                                    <Badge variant={formatBadge[report.format] ?? "outline"} className="text-[10px]">
                                        {report.format}
                                    </Badge>
                                    <Button variant="ghost" size="icon-sm" className="text-zinc-400">
                                        <Download className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
