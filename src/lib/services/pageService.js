import db from "@/lib/db/client";

export async function getPage(tenant_id, slug) {
  const res = await db.query(
    `SELECT * FROM pages WHERE tenant_id = $1 AND slug = $2`,
    [tenant_id, slug]
  );

  return res.rows[0];
}

export async function savePage(tenant_id, slug, sections) {
  await db.query(
    `
    UPDATE pages
    SET sections = $1
    WHERE tenant_id = $2 AND slug = $3
    `,
    [JSON.stringify(sections), tenant_id, slug]
  );
}