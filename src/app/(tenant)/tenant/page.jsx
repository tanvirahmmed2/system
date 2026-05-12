import db from "@/lib/db/client";
import { headers } from "next/headers";
import { renderPage } from "@/lib/engine/renderPage";

export default async function Page() {
  const host = headers().get("host");

  const tenantRes = await db.query(
    `SELECT * FROM tenants WHERE domain = $1 OR subdomain = $2 LIMIT 1`,
    [host, host.split(".")[0]]
  );

  const tenant = tenantRes.rows[0];

  const pageRes = await db.query(
    `SELECT * FROM pages WHERE tenant_id = $1 AND slug = 'home'`,
    [tenant.tenant_id]
  );

  const page = pageRes.rows[0];

  const sections = JSON.parse(page.sections);

  return <div>{renderPage(sections)}</div>;
}