import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, fmt = "MMM d, yyyy") {
  return format(new Date(date), fmt);
}

export function timeAgo(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export const SUBJECT_COLORS: Record<string, string> = {
  Math: "bg-blue-100 text-blue-700 border-blue-200",
  Mathematics: "bg-blue-100 text-blue-700 border-blue-200",
  Art: "bg-pink-100 text-pink-700 border-pink-200",
  Physics: "bg-purple-100 text-purple-700 border-purple-200",
  Sport: "bg-green-100 text-green-700 border-green-200",
  Science: "bg-teal-100 text-teal-700 border-teal-200",
  English: "bg-yellow-100 text-yellow-700 border-yellow-200",
  History: "bg-orange-100 text-orange-700 border-orange-200",
  Chemistry: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Biology: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Computer: "bg-cyan-100 text-cyan-700 border-cyan-200",
  default: "bg-gray-100 text-gray-700 border-gray-200",
};

export function getSubjectColor(subject: string) {
  for (const [key, value] of Object.entries(SUBJECT_COLORS)) {
    if (subject.toLowerCase().includes(key.toLowerCase())) return value;
  }
  return SUBJECT_COLORS.default;
}

export const SUBJECT_BG_COLORS: Record<string, string> = {
  Math: "bg-blue-50 border-blue-100",
  Mathematics: "bg-blue-50 border-blue-100",
  Art: "bg-pink-50 border-pink-100",
  Physics: "bg-purple-50 border-purple-100",
  Sport: "bg-green-50 border-green-100",
  Science: "bg-teal-50 border-teal-100",
  English: "bg-yellow-50 border-yellow-100",
  History: "bg-orange-50 border-orange-100",
  Chemistry: "bg-indigo-50 border-indigo-100",
  Biology: "bg-emerald-50 border-emerald-100",
  Computer: "bg-cyan-50 border-cyan-100",
  default: "bg-gray-50 border-gray-100",
};

export function getSubjectBgColor(subject: string) {
  for (const [key, value] of Object.entries(SUBJECT_BG_COLORS)) {
    if (subject.toLowerCase().includes(key.toLowerCase())) return value;
  }
  return SUBJECT_BG_COLORS.default;
}
