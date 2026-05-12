import db from "@/lib/db";

export async function POST(req) {
  const body = await req.json();

  const tenantId = req.headers.get("x-tenant-id");

  await db.query(
    `INSERT INTO analytics_events (
      tenant_id,
      website_id,
      page_id,
      event_type,
      session_id,
      user_agent,
      ip_address,
      referrer,
      path
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [
      tenantId,
      body.website_id || null,
      body.page_id || null,
      "page_view",
      body.session_id || null,
      body.user_agent || null,
      body.ip || null,
      body.referrer,
      body.path,
    ]
  );

  return Response.json({ success: true });
}