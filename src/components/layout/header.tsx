"use client";

import { Bell, MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
    breadcrumbs?: { label: string; href?: string }[];
    title?: string;
}

export function Header({ breadcrumbs, title }: HeaderProps) {
    return (
        <header className="flex h-14 items-center justify-between border-b border-zinc-100 bg-white px-6">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-sm">
                {breadcrumbs?.map((crumb, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                        {i > 0 && <span className="text-zinc-300">/</span>}
                        {crumb.href ? (
                            <a href={crumb.href} className="text-zinc-400 hover:text-zinc-700 transition-colors">
                                {crumb.label}
                            </a>
                        ) : (
                            <span className="font-medium text-zinc-900">{crumb.label}</span>
                        )}
                    </span>
                ))}
                {title && !breadcrumbs && (
                    <span className="font-medium text-zinc-900">{title}</span>
                )}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" className="text-zinc-400">
                    <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" className="text-zinc-400">
                    <MessageCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" className="text-zinc-400">
                    <Search className="h-4 w-4" />
                </Button>
            </div>
        </header>
    );
}
