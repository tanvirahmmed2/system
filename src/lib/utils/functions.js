export async function savePage() {
  await fetch("/api/pages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pageSlug: "home",
      sections
    })
  });
}