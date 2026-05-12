import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = req.nextUrl.pathname.startsWith("/dashboard");

  if (protectedRoutes) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const user = verifyToken(token);

    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const headers = new Headers(req.headers);
    headers.set("x-user-id", user.user_id);
    headers.set("x-tenant-id", user.tenant_id);
    headers.set("x-role", user.role);

    return NextResponse.next({
      request: { headers },
    });
  }

  return NextResponse.next();
}