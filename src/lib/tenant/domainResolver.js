import db from "@/lib/db";

export async function resolveTenant(domain) {
  // 1. Custom domain check
  let result = await db.query(
    `SELECT * FROM tenants WHERE domain = $1 LIMIT 1`,
    [domain]
  );

  if (result.rows.length) return result.rows[0];

  // 2. Website domain check
  result = await db.query(
    `SELECT t.* FROM websites w
     JOIN tenants t ON t.tenant_id = w.tenant_id
     WHERE w.domain = $1 LIMIT 1`,
    [domain]
  );

  if (result.rows.length) return result.rows[0];

  // 3. Subdomain fallback
  const sub = domain.split(".")[0];

  result = await db.query(
    `SELECT * FROM tenants WHERE subdomain = $1 LIMIT 1`,
    [sub]
  );

  return result.rows[0] || null;
}