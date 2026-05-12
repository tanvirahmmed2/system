import { generateWebsite } from "@/lib/tenant/generateWebsite";

if (event.type === "checkout.session.completed") {
  const session = event.data.object;

  const tenantId = session.metadata.tenantId;
  const packageSlug = session.metadata.packageSlug;

  await generateWebsite(tenantId, packageSlug);
}