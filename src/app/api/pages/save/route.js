import { NextResponse } from "next/server";
import db from "@/lib/db"; // your raw query helper

export async function POST(req) {
  const body = await req.json();

  const { pageSlug, sections } = body;

  await db.query(
    `
    INSERT INTO pages (slug, sections)
    VALUES ($1, $2)
    ON CONFLICT (slug)
    DO UPDATE SET sections = $2, updated_at = NOW()
    `,
    [pageSlug, JSON.stringify(sections)]
  );

  return NextResponse.json({ success: true });
}


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const result = await db.query(
    "SELECT * FROM pages WHERE slug = $1",
    [slug]
  );

  return NextResponse.json(result.rows[0]);
}