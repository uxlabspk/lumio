import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { canAccessDashboardPath } from "@/lib/roles";

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = typeof token.role === "string" ? token.role : undefined;

  if (!canAccessDashboardPath(role, request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
