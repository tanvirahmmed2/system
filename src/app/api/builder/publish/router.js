import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req) {
  const body = await req.json();

  const { pageId } = body;

  const result = await query(
    `
      SELECT draft_sections
      FROM pages
      WHERE page_id = $1
      LIMIT 1
    `,
    [pageId]
  );

  const draft =
    result.rows[0]?.draft_sections || [];

  await query(
    `
      UPDATE pages
      SET
        published_sections = $1,
        published_at = now(),
        updated_at = now()
      WHERE page_id = $2
    `,
    [
      JSON.stringify(draft),
      pageId,
    ]
  );

  return NextResponse.json({
    success: true,
  });
}