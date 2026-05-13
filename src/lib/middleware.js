import { NextResponse } from "next/server";
import { verifyToken } from "./auth/jwt";

export function middleware(req) {
  const token = req.cookies.get("auth_token")?.value;
  const user = token ? verifyToken(token) : null;
  const { pathname } = req.nextUrl;

  // 1. Role-to-Route Mapping
  const roleRoutes = {
    super_admin: "/admin",
    platform_admin: "/admin",
    manager: "/manager",
    developer: "/developer",
    support: "/support",
    tenant_user: "/dashboard/user",
    user: "/dashboard/user", // Fallback for legacy 'user' role
  };

  // 2. Protect Admin/Manager/etc Routes
  if (pathname.startsWith("/admin") && !["super_admin", "platform_admin"].includes(user?.role)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (pathname.startsWith("/manager") && user?.role !== "manager") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (pathname.startsWith("/developer") && user?.role !== "developer") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (pathname.startsWith("/support") && user?.role !== "support") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (pathname.startsWith("/dashboard/user") && !["tenant_user", "user"].includes(user?.role)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3. Auto-Redirect from root /dashboard
  if (pathname === "/dashboard") {
    const target = roleRoutes[user?.role] || "/login";
    return NextResponse.redirect(new URL(target, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/manager/:path*", "/developer/:path*", "/support/:path*", "/dashboard/:path*"],
};