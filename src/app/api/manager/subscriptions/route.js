import { NextResponse } from "next/server";
import db from "@/lib/db/client";

// GET all subscriptions
export async function GET(req) {
  try {
    const role = req.headers.get("x-role");
    if (!['admin', 'manager'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { rows } = await db.query(`
      SELECT s.*, u.name as user_name, t.name as tenant_name, pkg.name as package_name
      FROM subscriptions s
      JOIN users u ON s.user_id = u.user_id
      JOIN tenants t ON s.tenant_id = t.tenant_id
      JOIN packages pkg ON s.package_id = pkg.package_id
      ORDER BY s.created_at DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
