import { NextResponse } from "next/server";
import db from "@/lib/db/client";

// GET all payments
export async function GET(req) {
  try {
    const role = req.headers.get("x-role");
    if (!['admin', 'manager'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { rows } = await db.query(`
      SELECT p.*, u.name as user_name, t.name as tenant_name
      FROM payments p
      JOIN users u ON p.user_id = u.user_id
      LEFT JOIN tenants t ON p.tenant_id = t.tenant_id
      ORDER BY p.created_at DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
