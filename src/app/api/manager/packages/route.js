import { NextResponse } from "next/server";
import db from "@/lib/db/client";

// GET all packages
export async function GET(req) {
  try {
    const role = req.headers.get("x-role");
    if (!['admin', 'manager'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { rows } = await db.query("SELECT * FROM packages ORDER BY created_at DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST create package
export async function POST(req) {
  try {
    const role = req.headers.get("x-role");
    if (!['admin', 'manager'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { name, slug, description, price, setup_fee, duration_days, is_lifetime, category } = await req.json();

    const { rows } = await db.query(
      `INSERT INTO packages (name, slug, description, price, setup_fee, duration_days, is_lifetime, category)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [name, slug, description, price, setup_fee || 0, duration_days, is_lifetime || false, category]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating package:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
