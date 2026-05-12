import db from "../db/client";

export async function resolveTenant(host) {
  const parts = host.split(".");

  let domain = host;
  let subdomain = null;

  if (parts.length === 3) {
    subdomain = parts[0];
  }

  const result = await db.query(
    `
    SELECT * FROM tenants
    WHERE domain = $1 OR subdomain = $2
    LIMIT 1
    `,
    [domain, subdomain]
  );

  return result.rows[0] || null;
}