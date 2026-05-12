import { NextResponse } from "next/server";

const tenantCache = new Map();

async function getTenant(domain) {
  // simple in-memory cache (later upgrade to Redis)
  if (tenantCache.has(domain)) {
    return tenantCache.get(domain);
  }

  const res = await fetch(`${process.env.API_URL}/api/tenant?domain=${domain}`);
  const data = await res.json();

  if (data?.tenant) {
    tenantCache.set(domain, data.tenant);
  }

  return data.tenant;
}

export async function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host");

  // ignore internal routes
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const tenant = await getTenant(hostname);

  // if tenant not found → fallback landing page
  if (!tenant) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-tenant-id", tenant.tenant_id);
  requestHeaders.set("x-tenant-name", tenant.name);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};