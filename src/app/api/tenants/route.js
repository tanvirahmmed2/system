import db from "@/lib/db/client";
import { verifyToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export async function GET(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? verifyToken(token) : null;

  // If user is authenticated, return their tenants
  if (user) {
    const userTenants = await db.query(
      "SELECT * FROM tenants WHERE owner_id = $1 ORDER BY created_at DESC",
      [user.userId]
    );
    return Response.json(userTenants.rows);
  }

  // Fallback to host-based resolution for public requests
  const host = req.headers.get("host") || "";
  const parts = host.split(".");
  let domain = host;
  let subdomain = null;

  if (parts.length === 3) {
    subdomain = parts[0];
  }

  const result = await db.query(
    `SELECT * FROM tenants WHERE domain = $1 OR subdomain = $2 LIMIT 1`,
    [domain, subdomain]
  );

  return Response.json(result.rows[0] || null);
}

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const user = token ? verifyToken(token) : null;

  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, subdomain } = await req.json();

    if (!name || !subdomain) {
      return Response.json({ message: "Missing fields" }, { status: 400 });
    }

    const newTenant = await db.query(
      "INSERT INTO tenants (name, subdomain, owner_id) VALUES ($1, $2, $3) RETURNING *",
      [name, subdomain, user.userId]
    );

    return Response.json(newTenant.rows[0], { status: 201 });
  } catch (error) {
    console.error("Create Tenant Error:", error);
    return Response.json({ message: "Error creating business" }, { status: 500 });
  }
}