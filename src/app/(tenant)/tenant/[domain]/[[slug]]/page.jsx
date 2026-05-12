import { notFound } from "next/navigation";

import { getTenantByDomain } from "@/lib/tenant/getTenant";
import { query } from "@/lib/db";

export default async function TenantPage({
  params,
}) {
  const subdomain = params.subdomain;

  const slug =
    params.slug?.length > 0
      ? params.slug.join("/")
      : "home";

  const tenant = await getTenantByDomain(
    subdomain
  );

  if (!tenant) {
    notFound();
  }

  const pageResult = await query(
    `
      SELECT *
      FROM pages
      WHERE tenant_id = $1
      AND slug = $2
      LIMIT 1
    `,
    [tenant.tenant_id, slug]
  );

  const page = pageResult.rows[0];

  if (!page) {
    notFound();
  }

  const sections = page.sections || [];

  return (
    <div>
      {sections.map((block) => (
        <div key={block.id}>
          {block.type}
        </div>
      ))}
    </div>
  );
}