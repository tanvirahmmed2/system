import { NextResponse } from "next/server";
import db from "@/lib/db/client";

// GET all blogs
export async function GET(req) {
  try {
    const role = req.headers.get("x-role");
    if (!['admin', 'manager'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { rows } = await db.query("SELECT * FROM blogs ORDER BY created_at DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST create blog
export async function POST(req) {
  try {
    const role = req.headers.get("x-role");
    if (!['admin', 'manager'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = req.headers.get("x-user-id");
    const { title, slug, content, excerpt, image, image_id, category, status } = await req.json();

    const { rows } = await db.query(
      `INSERT INTO blogs (title, slug, content, excerpt, image, image_id, author_id, category, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [title, slug, content, excerpt, image, image_id, userId, category, status || 'published']
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
