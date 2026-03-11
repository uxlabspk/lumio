import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const activities = [
    {
        id: "1",
        title: "Annual Science Fair",
        description: "Students showcase their science projects and experiments. Open to all grades. Judges from local universities will evaluate projects.",
        date: new Date("2025-02-22"),
        time: "9:00 AM - 4:00 PM",
        location: "School Gymnasium",
        participants: 150,
        category: "Academic",
        status: "UPCOMING",
        color: "bg-blue-50 border-blue-100",
        badgeColor: "info" as const,
    },
    {
        id: "2",
        title: "Sports Day",
        description: "Annual inter-class sports competition including track events, team sports, and individual competitions.",
        date: new Date("2025-02-28"),
        time: "8:00 AM - 5:00 PM",
        location: "School Sports Ground",
        participants: 320,
        category: "Sports",
        status: "UPCOMING",
        color: "bg-emerald-50 border-emerald-100",
        badgeColor: "success" as const,
    },
    {
        id: "3",
        title: "Art Exhibition",
        description: "End-of-term art exhibition showcasing student artwork from all art classes. Parents and community members are welcome.",
        date: new Date("2025-02-18"),
        time: "2:00 PM - 6:00 PM",
        location: "School Library",
        participants: 45,
        category: "Arts",
        status: "UPCOMING",
        color: "bg-pink-50 border-pink-100",
        badgeColor: "purple" as const,
    },
    {
        id: "4",
        title: "Mathematics Olympiad",
        description: "Regional mathematics competition. Top students compete against peers from other schools.",
        date: new Date("2025-02-12"),
        time: "10:00 AM - 1:00 PM",
        location: "Exam Hall",
        participants: 24,
        category: "Academic",
        status: "COMPLETED",
        color: "bg-orange-50 border-orange-100",
        badgeColor: "warning" as const,
    },
];

const categoryColors: Record<string, string> = {
    Academic: "bg-blue-100 text-blue-700",
    Sports: "bg-emerald-100 text-emerald-700",
    Arts: "bg-pink-100 text-pink-700",
    Cultural: "bg-purple-100 text-purple-700",
};

export default function ActivitiesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold text-zinc-900">School Activities</h1>
                <p className="text-sm text-zinc-500">Upcoming and past school events and activities.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                    { label: "Upcoming", value: "6", color: "text-blue-500 bg-blue-50" },
                    { label: "This Month", value: "4", color: "text-emerald-500 bg-emerald-50" },
                    { label: "Completed", value: "18", color: "text-zinc-500 bg-zinc-100" },
                ].map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="p-4">
                            <div className={`inline-flex items-center justify-center rounded-lg px-3 py-1 text-sm font-semibold mb-1 ${stat.color}`}>
                                {stat.value}
                            </div>
                            <p className="text-xs text-zinc-500">{stat.label} activities</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {activities.map((activity) => (
                    <Card key={activity.id} className={cn("border hover:shadow-md transition-shadow", activity.color)}>
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className={cn("text-[10px] font-medium rounded px-2 py-0.5", categoryColors[activity.category] ?? "bg-gray-100 text-gray-600")}>
                                        {activity.category}
                                    </span>
                                    <Badge variant={activity.status === "COMPLETED" ? "default" : activity.badgeColor} className="text-[10px]">
                                        {activity.status === "COMPLETED" ? "Completed" : "Upcoming"}
                                    </Badge>
                                </div>
                            </div>

                            <h3 className="text-base font-semibold text-zinc-900 mb-1.5">{activity.title}</h3>
                            <p className="text-sm text-zinc-600 mb-4 leading-relaxed">{activity.description}</p>

                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                    <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                                    {formatDate(activity.date)}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                    <Clock className="h-3.5 w-3.5 text-zinc-400" />
                                    {activity.time}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                    <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                                    {activity.location}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                    <Users className="h-3.5 w-3.5 text-zinc-400" />
                                    {activity.participants} participants
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
