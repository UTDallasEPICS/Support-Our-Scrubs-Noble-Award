// server/routes/sitemap.xml.ts

export default defineEventHandler(async (event) => {
  try {
    // Fetch all approved nominees from your database
    // Using a simpler fetch approach to avoid TypeScript complexity
    const baseUrl = process.dev ? 'http://localhost:3000' : event.node.req.headers.host;
    const protocol = process.dev ? 'http' : 'https';
    const fullUrl = `${protocol}://${baseUrl}/api/nominee?stat=APPROVED`;
    
    const response = await fetch(fullUrl, { method: 'GET' });
    const nominees = await response.json() as any[];

    
    // Get current date for lastmod
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Build the sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Add other static pages if you have them -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Dynamic profile pages -->
  ${nominees.map(nominee => `
  <url>
    <loc>${baseUrl}/profile/${nominee.slug}</loc>
    <lastmod>${nominee.updatedAt ? new Date(nominee.updatedAt).toISOString().split('T')[0] : currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
</urlset>`;

    // Set the appropriate headers
    setResponseHeader(event, 'Content-Type', 'application/xml');
    setResponseHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600');
    
    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return a minimal sitemap on error
    const baseUrl = 'http://localhost:3000';
    const currentDate = new Date().toISOString().split('T')[0];
    
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    
    setResponseHeader(event, 'Content-Type', 'application/xml');
    return fallbackSitemap;
  }
});