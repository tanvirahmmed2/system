export async function trackPageView(data) {
  await fetch("/api/analytics/track", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}