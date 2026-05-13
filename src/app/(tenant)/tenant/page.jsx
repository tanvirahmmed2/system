import db from "@/lib/db/client";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { TenantProvider } from "@/lib/tenant/TenantContext";

// A basic renderer component that can be expanded later
const WebsiteRenderer = ({ templateSections, userContent }) => {
  return (
    <div className="site-wrapper">
      {Object.keys(templateSections).map((sectionKey, index) => {
        // Here you would render specific components based on the section key
        // For now, we'll just output the data
        return (
          <section key={index} className="py-12 px-4 border-b border-gray-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 capitalize">{sectionKey.replace('_', ' ')}</h2>
              <pre className="bg-gray-50 p-4 rounded-xl overflow-x-auto text-xs text-gray-600">
                {JSON.stringify(userContent[sectionKey] || {}, null, 2)}
              </pre>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default async function PublicWebsitePage() {
  const headerList = await headers();
  const host = headerList.get("host") || "";
  
  // Clean host (remove port)
  const cleanHost = host.split(":")[0];
  const subdomain = cleanHost.split(".")[0];

  // 1. Resolve Website Instance
  const websiteRes = await db.query(
    `SELECT w.*, s.content_data, t.sections as template_sections 
     FROM websites w
     JOIN website_settings s ON w.website_id = s.website_id
     JOIN site_templates t ON w.template_id = t.template_id
     WHERE w.domain = $1 OR w.domain = $2
     LIMIT 1`,
    [cleanHost, subdomain]
  );

  const website = websiteRes.rows[0];

  if (!website) {
    return notFound();
  }

  // 2. Parse JSON data
  let templateSections = {};
  let userContent = {};

  try {
    templateSections = typeof website.template_sections === 'string' 
        ? JSON.parse(website.template_sections) 
        : website.template_sections || {};
    
    userContent = typeof website.content_data === 'string'
        ? JSON.parse(website.content_data)
        : website.content_data || {};
  } catch (e) {
    console.error("Data parsing error:", e);
  }

  // 3. Render Merged View using Context
  return (
    <TenantProvider website={website} templateSections={templateSections} userContent={userContent}>
      <div className="min-h-screen bg-white">
        {/* Optional: Global branding from settings */}
        {website.logo_url && (
            <div className="p-6">
                <img src={website.logo_url} alt={website.business_name || 'Logo'} className="h-10" />
            </div>
        )}
        
        <WebsiteRenderer templateSections={templateSections} userContent={userContent} />

        {/* Global Footer */}
        <footer className="py-10 border-t border-gray-100 text-center text-gray-400 text-xs font-medium">
            Built with Disibin • © {new Date().getFullYear()} {website.business_name}
        </footer>
      </div>
    </TenantProvider>
  );
}