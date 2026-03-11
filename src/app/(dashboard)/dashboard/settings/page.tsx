"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Save, School, Bell, Shield, User, Palette } from "lucide-react";
import { getInitials } from "@/lib/utils";

const TABS = [
    { id: "profile", label: "Profile", icon: User },
    { id: "school", label: "School", icon: School },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-semibold text-zinc-900">Settings</h1>
                <p className="text-sm text-zinc-500">Manage your account and school preferences.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardContent className="p-2">
                            <nav className="flex flex-col gap-0.5">
                                {TABS.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-left transition-colors ${activeTab === tab.id
                                                    ? "bg-zinc-100 text-zinc-900"
                                                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                                                }`}
                                        >
                                            <Icon className="h-4 w-4 shrink-0" />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </CardContent>
                    </Card>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 space-y-4">
                    {activeTab === "profile" && (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarFallback className="text-lg">AB</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <Button variant="outline" size="sm">Change Photo</Button>
                                            <p className="text-xs text-zinc-400 mt-1">JPG, PNG up to 5MB</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-medium text-zinc-700 block mb-1.5">First Name</label>
                                            <Input defaultValue="Amir" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-zinc-700 block mb-1.5">Last Name</label>
                                            <Input defaultValue="Bagjian" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-zinc-700 block mb-1.5">Email</label>
                                        <Input defaultValue="amir.bagjian@school.edu" type="email" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-zinc-700 block mb-1.5">Phone</label>
                                        <Input defaultValue="+1 (555) 123-4567" type="tel" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-zinc-700 block mb-1.5">Role</label>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="info">Teacher</Badge>
                                            <span className="text-xs text-zinc-400">Role is managed by administrators</span>
                                        </div>
                                    </div>
                                    <Button className="gap-1.5">
                                        <Save className="h-4 w-4" />
                                        Save Changes
                                    </Button>
                                </CardContent>
                            </Card>
                        </>
                    )}

                    {activeTab === "school" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>School Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-zinc-700 block mb-1.5">School Name</label>
                                    <Input defaultValue="Lumio Academy" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-zinc-700 block mb-1.5">Phone</label>
                                        <Input defaultValue="+1 (555) 000-1234" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-zinc-700 block mb-1.5">Email</label>
                                        <Input defaultValue="admin@lumio.edu" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-zinc-700 block mb-1.5">Address</label>
                                    <Input defaultValue="123 Education Street, Learning City, LC 10001" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-zinc-700 block mb-1.5">Timezone</label>
                                        <Input defaultValue="UTC-5 (Eastern Time)" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-zinc-700 block mb-1.5">Currency</label>
                                        <Input defaultValue="USD" />
                                    </div>
                                </div>
                                <Button className="gap-1.5">
                                    <Save className="h-4 w-4" />
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "notifications" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { label: "Attendance Alerts", desc: "Notify when a student is absent or late", enabled: true },
                                    { label: "Assignment Submissions", desc: "Notify when students submit assignments", enabled: true },
                                    { label: "Exam Reminders", desc: "Reminders 24 hours before scheduled exams", enabled: true },
                                    { label: "Fee Due Alerts", desc: "Alert when fee payments are overdue", enabled: false },
                                    { label: "New Messages", desc: "Notify when you receive new messages", enabled: true },
                                    { label: "School Announcements", desc: "Receive all school-wide announcements", enabled: true },
                                    { label: "Grade Published", desc: "Notify when grades are published", enabled: false },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0">
                                        <div>
                                            <p className="text-sm font-medium text-zinc-900">{item.label}</p>
                                            <p className="text-xs text-zinc-400">{item.desc}</p>
                                        </div>
                                        <div
                                            className={`relative h-5 w-9 cursor-pointer rounded-full transition-colors ${item.enabled ? "bg-zinc-900" : "bg-zinc-200"}`}
                                        >
                                            <div
                                                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${item.enabled ? "translate-x-4" : "translate-x-0.5"}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "security" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-zinc-700 block mb-1.5">Current Password</label>
                                    <Input type="password" placeholder="Enter current password" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-zinc-700 block mb-1.5">New Password</label>
                                    <Input type="password" placeholder="Enter new password" />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-zinc-700 block mb-1.5">Confirm Password</label>
                                    <Input type="password" placeholder="Confirm new password" />
                                </div>
                                <Button className="gap-1.5">
                                    <Shield className="h-4 w-4" />
                                    Update Password
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "appearance" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-zinc-900 mb-3">Theme</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["Light", "Dark", "System"].map((theme) => (
                                            <button
                                                key={theme}
                                                className={`rounded-lg border-2 p-4 text-sm font-medium transition-colors ${theme === "Light" ? "border-zinc-900 text-zinc-900" : "border-zinc-200 text-zinc-500 hover:border-zinc-300"
                                                    }`}
                                            >
                                                {theme}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <Button className="gap-1.5">
                                    <Save className="h-4 w-4" />
                                    Save Preferences
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
