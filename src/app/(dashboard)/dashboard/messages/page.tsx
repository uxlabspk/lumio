"use client";

import { useState } from "react";
import { Search, Plus, Send } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { getInitials, timeAgo } from "@/lib/utils";
import { cn } from "@/lib/utils";

const conversations = [
    { id: "1", name: "Principal Johnson", role: "Principal", lastMessage: "Could you send the attendance report for this week?", time: new Date(Date.now() - 1000 * 60 * 15), unread: 2 },
    { id: "2", name: "Sarah Anderson", role: "Parent", lastMessage: "Thank you for updating me about Emily's progress.", time: new Date(Date.now() - 1000 * 60 * 60 * 2), unread: 0 },
    { id: "3", name: "Dr. Richards", role: "Teacher", lastMessage: "Can we schedule a meeting to discuss the curriculum?", time: new Date(Date.now() - 1000 * 60 * 60 * 5), unread: 1 },
    { id: "4", name: "Hannah Turner", role: "Student", lastMessage: "I submitted my assignment a bit late, is that okay?", time: new Date(Date.now() - 1000 * 60 * 60 * 24), unread: 0 },
    { id: "5", name: "James Wilson", role: "Student", lastMessage: "When is the next math test?", time: new Date(Date.now() - 1000 * 60 * 60 * 48), unread: 0 },
];

const messages = [
    { id: "1", senderId: "other", content: "Good morning! Could you send the attendance report for this week?", time: new Date(Date.now() - 1000 * 60 * 30) },
    { id: "2", senderId: "me", content: "Good morning! Of course, I'll send it right away. Give me a few minutes.", time: new Date(Date.now() - 1000 * 60 * 28) },
    { id: "3", senderId: "other", content: "Thank you! Also, we have a board meeting next Monday. Can you prepare a summary of class performance?", time: new Date(Date.now() - 1000 * 60 * 25) },
    { id: "4", senderId: "me", content: "Sure! I'll prepare the attendance report and the class performance summary by end of today.", time: new Date(Date.now() - 1000 * 60 * 20) },
    { id: "5", senderId: "other", content: "Could you send the attendance report for this week?", time: new Date(Date.now() - 1000 * 60 * 15) },
];

const roleColors: Record<string, string> = {
    Principal: "bg-purple-100 text-purple-700",
    Parent: "bg-blue-100 text-blue-700",
    Teacher: "bg-emerald-100 text-emerald-700",
    Student: "bg-orange-100 text-orange-700",
};

export default function MessagesPage() {
    const [search, setSearch] = useState("");
    const [selectedConvo, setSelectedConvo] = useState(conversations[0]);
    const [newMessage, setNewMessage] = useState("");

    const filtered = conversations.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900">Messages</h1>
                    <p className="text-sm text-zinc-500">Communicate with students, parents, and staff.</p>
                </div>
                <Button className="gap-1.5">
                    <Plus className="h-4 w-4" />
                    New Message
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-0 lg:grid-cols-3 rounded-xl overflow-hidden border border-zinc-100 bg-white shadow-sm h-[calc(100vh-220px)]">
                {/* Conversation list */}
                <div className="border-r border-zinc-100 flex flex-col">
                    <div className="p-3 border-b border-zinc-100">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                            <Input
                                placeholder="Search conversations..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-8 h-8 text-xs"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {filtered.map((convo) => (
                            <button
                                key={convo.id}
                                onClick={() => setSelectedConvo(convo)}
                                className={cn(
                                    "w-full flex items-start gap-3 px-4 py-3 border-b border-zinc-50 text-left transition-colors",
                                    selectedConvo.id === convo.id ? "bg-zinc-50" : "hover:bg-zinc-50/50"
                                )}
                            >
                                <Avatar className="h-9 w-9 shrink-0 mt-0.5">
                                    <AvatarFallback className="text-xs">{getInitials(convo.name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-sm font-medium text-zinc-900 truncate">{convo.name}</span>
                                        <span className="text-[10px] text-zinc-400 shrink-0 ml-1">{timeAgo(convo.time)}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className={cn("text-[9px] font-medium rounded px-1 py-0.5", roleColors[convo.role] ?? "bg-gray-100 text-gray-600")}>
                                            {convo.role}
                                        </span>
                                        <p className="text-xs text-zinc-400 truncate">{convo.lastMessage}</p>
                                    </div>
                                </div>
                                {convo.unread > 0 && (
                                    <div className="h-4 w-4 rounded-full bg-zinc-900 text-white text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                        {convo.unread}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Message thread */}
                <div className="lg:col-span-2 flex flex-col">
                    {/* Thread header */}
                    <div className="flex items-center gap-3 border-b border-zinc-100 p-4">
                        <Avatar className="h-9 w-9">
                            <AvatarFallback>{getInitials(selectedConvo.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-semibold text-zinc-900">{selectedConvo.name}</p>
                            <div className="flex items-center gap-1.5">
                                <Badge
                                    className={cn("text-[9px] px-1.5 py-0", roleColors[selectedConvo.role] ?? "")}
                                >
                                    {selectedConvo.role}
                                </Badge>
                                <span className="text-xs text-zinc-400">Online</span>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn("flex", msg.senderId === "me" ? "justify-end" : "justify-start")}
                            >
                                {msg.senderId !== "me" && (
                                    <Avatar className="h-7 w-7 mr-2 mt-1 shrink-0">
                                        <AvatarFallback className="text-[10px]">{getInitials(selectedConvo.name)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn("max-w-[70%]")}>
                                    <div
                                        className={cn(
                                            "rounded-2xl px-4 py-2.5 text-sm",
                                            msg.senderId === "me"
                                                ? "bg-zinc-900 text-white rounded-tr-sm"
                                                : "bg-zinc-100 text-zinc-800 rounded-tl-sm"
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                    <p className={cn("text-[10px] text-zinc-400 mt-1", msg.senderId === "me" ? "text-right" : "text-left")}>
                                        {timeAgo(msg.time)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="border-t border-zinc-100 p-4">
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && newMessage.trim()) setNewMessage("");
                                }}
                            />
                            <Button
                                size="icon"
                                onClick={() => setNewMessage("")}
                                disabled={!newMessage.trim()}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
