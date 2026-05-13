import { NextResponse } from "next/server";
import db from "@/lib/db/client";

// GET all tenants
export async function GET(req) {
  try {
    const role = req.headers.get("x-role");
    if (!['admin', 'manager'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { rows } = await db.query(`
      SELECT t.*, u.name as owner_name, u.email as owner_email
      FROM tenants t
      LEFT JOIN users u ON t.owner_id = u.user_id
      ORDER BY t.created_at DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
