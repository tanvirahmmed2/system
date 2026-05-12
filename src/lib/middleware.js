import { NextResponse } from "next/server";
import { resolveTenant } from "@/lib/tenant/domainResolver";

export async function middleware(req) {
  const hostname = req.headers.get("host");

  const tenant = await resolveTenant(hostname);

  if (!tenant) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }

  const headers = new Headers(req.headers);
  headers.set("x-tenant-id", tenant.tenant_id);

  return NextResponse.next({
    request: { headers },
  });
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};