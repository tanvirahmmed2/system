import { NextResponse } from "next/server";
import db from "@/lib/db/client";

// GET all templates
export async function GET(req) {
  try {
    const role = req.headers.get("x-role");
    if (!['admin', 'manager'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { rows } = await db.query("SELECT * FROM site_templates ORDER BY created_at DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST create template
export async function POST(req) {
  try {
    const role = req.headers.get("x-role");
    if (!['admin', 'manager'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { name, slug, type, description, preview_images, sections, is_premium } = await req.json();

    const { rows } = await db.query(
      `INSERT INTO site_templates (name, slug, type, description, preview_images, sections, is_premium)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, slug, type, description, JSON.stringify(preview_images || []), JSON.stringify(sections || {}), is_premium || false]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating template:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
