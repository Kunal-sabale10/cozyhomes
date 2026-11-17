export function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /booking/

Sitemap: https://cozymoments.in/sitemap.xml`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
