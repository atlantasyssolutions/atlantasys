import { getAllBlogs } from '@/lib/blog';
import { getAllLocations } from '@/lib/locations';
import { productsData } from '@/data/products';

export default async function sitemap() {
  const baseUrl = 'https://www.atlantasys.com';
  const now = new Date();

  // 1. Static Core Routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/reseller',
    '/all-product',
    '/asset-management',
    '/locations',
    '/partner-with-us',
    '/pricing',
    '/services',
    '/support',
    '/career',
    '/privacy-policy',
    '/terms-and-condition',
    '/warranty-and-repairs',
    '/cookie-policy',
    '/blog',
    '/trackers',
    '/adas',
    '/vehicle-telematics',
    '/indoor-telematics',
    '/healthcare',
    '/parking-solution',
    '/school-solution',
    '/smart-city-solution',
    '/gps-tracking-company',
    '/web-fota',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Product Routes
  const productRoutes = (productsData || []).map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. Location Hub Routes
  const locations = getAllLocations() || [];
  const locationRoutes = locations.map((loc) => ({
    url: `${baseUrl}/${loc.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // 4. Blog Knowledge Hub Routes
  const blogs = getAllBlogs(false) || [];
  const blogRoutes = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.publishedAt ? new Date(b.publishedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...locationRoutes, ...blogRoutes];
}
