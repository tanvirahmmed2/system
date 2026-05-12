import db from "@/lib/db";
import { templates } from "@/lib/templates/registry";

export async function generateWebsite(tenantId, packageSlug) {
  const template = templates[packageSlug];

  if (!template) throw new Error("Template not found");

  // assign theme to website
  await db.query(
    `UPDATE websites SET theme = $1 WHERE tenant_id = $2`,
    [template.theme, tenantId]
  );

  // create pages
  for (const page of template.pages) {
    await db.query(
      `INSERT INTO pages (
        tenant_id,
        name,
        slug,
        sections,
        is_homepage,
        is_published
      )
      VALUES ($1,$2,$3,$4,$5,true)`,
      [
        tenantId,
        page.name,
        page.slug,
        JSON.stringify(page.sections),
        page.is_homepage || false,
      ]
    );
  }
}