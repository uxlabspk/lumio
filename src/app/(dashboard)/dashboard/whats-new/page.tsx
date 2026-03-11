import { Zap, Star, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const updates = [
    {
        version: "2.1.0",
        date: "Feb 10, 2025",
        tag: "Latest",
        features: [
            "New Analytics dashboard with chart visualizations",
            "Improved attendance tracking with sparkline charts",
            "Assignment management with progress tracking",
            "Real-time messaging between staff, students, and parents",
            "Enhanced exam calendar with subject color coding",
        ],
        improvements: [
            "Faster page load times",
            "Better mobile responsiveness",
            "Improved search functionality",
        ],
    },
    {
        version: "2.0.5",
        date: "Jan 20, 2025",
        tag: "Previous",
        features: [
            "Added student performance detail page",
            "Report export to PDF and Excel",
            "School news and announcements section",
        ],
        improvements: [
            "Fixed attendance date filter bug",
            "Improved sidebar navigation",
        ],
    },
];

export default function WhatsNewPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="rounded-lg bg-zinc-900 p-2.5">
                    <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">What&apos;s New</h1>
                    <p className="text-sm text-zinc-500">Latest updates and improvements to Lumio.</p>
                </div>
            </div>

            <div className="space-y-6">
                {updates.map((update) => (
                    <Card key={update.version}>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <CardTitle className="text-base">Version {update.version}</CardTitle>
                                <Badge variant={update.tag === "Latest" ? "default" : "outline"} className="text-[10px]">
                                    {update.tag}
                                </Badge>
                                <span className="text-xs text-zinc-400 ml-auto">{update.date}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <Star className="h-3.5 w-3.5 text-yellow-500" />
                                    <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">New Features</h4>
                                </div>
                                <ul className="space-y-1.5">
                                    {update.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-700">
                                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <Zap className="h-3.5 w-3.5 text-blue-500" />
                                    <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Improvements</h4>
                                </div>
                                <ul className="space-y-1.5">
                                    {update.improvements.map((imp, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-700">
                                            <CheckCircle className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />
                                            {imp}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
