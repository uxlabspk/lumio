export type DashboardRole = "ADMIN" | "TEACHER" | "STUDENT";

const teacherRoles = new Set(["TEACHER"]);
const studentRoles = new Set(["STUDENT"]);

export function resolveDashboardRole(role?: string | null): DashboardRole {
  const normalizedRole = role?.toUpperCase();

  if (normalizedRole && teacherRoles.has(normalizedRole)) {
    return "TEACHER";
  }

  if (normalizedRole && studentRoles.has(normalizedRole)) {
    return "STUDENT";
  }

  return "ADMIN";
}

const rolePathAccess: Record<DashboardRole, string[]> = {
  ADMIN: ["/dashboard"],
  TEACHER: [
    "/dashboard",
    "/dashboard/students",
    "/dashboard/grades",
    "/dashboard/class-prep",
    "/dashboard/assignments",
    "/dashboard/exams",
    "/dashboard/attendance",
    "/dashboard/analytics",
    "/dashboard/reports",
    "/dashboard/schedule",
    "/dashboard/messages",
    "/dashboard/news",
    "/dashboard/activities",
    "/dashboard/whats-new",
    "/dashboard/settings",
  ],
  STUDENT: [
    "/dashboard",
    "/dashboard/my-classes",
    "/dashboard/my-grades",
    "/dashboard/my-enrollment",
    "/dashboard/my-assignments",
    "/dashboard/my-exams",
    "/dashboard/my-attendance",
    "/dashboard/schedule",
    "/dashboard/messages",
    "/dashboard/news",
    "/dashboard/activities",
    "/dashboard/whats-new",
    "/dashboard/settings",
  ],
};

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export function canAccessDashboardPath(role: string | undefined | null, pathname: string) {
  const dashboardRole = resolveDashboardRole(role);
  const normalizedPath = normalizePath(pathname);

  if (dashboardRole === "ADMIN") {
    return normalizedPath.startsWith("/dashboard");
  }

  const allowedPaths = rolePathAccess[dashboardRole];

  return allowedPaths.some((allowedPath) => {
    if (allowedPath === "/dashboard") {
      return normalizedPath === "/dashboard";
    }

    return normalizedPath === allowedPath || normalizedPath.startsWith(`${allowedPath}/`);
  });
}