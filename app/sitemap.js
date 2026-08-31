import { getAllBlogSummaries } from '@/lib/blog';

const CITIES = [
  'dubai', 'abu-dhabi', 'riyadh', 'jeddah', 'dammam', 'kuwait-city', 'doha', 'muscat', 'cairo', 'casablanca',
  'warsaw', 'hamburg', 'rotterdam', 'madrid', 'paris', 'milan', 'frankfurt', 'london', 'bucharest', 'antwerp',
  'houston', 'chicago', 'los-angeles', 'dallas', 'memphis', 'miami', 'phoenix', 'new-york', 'atlanta', 'seattle',
  'mexico-city', 'sao-paulo', 'lima', 'bogota', 'santiago', 'buenaventura', 'manzanillo', 'santos', 'queretaro', 'guadalajara',
  'mumbai', 'delhi', 'bengaluru', 'chennai', 'kolkata', 'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'surat'
];

const TRACKERS = [
  'vehicle-telematics',
  'video-telematics',
  'fuel-telematics',
  'cold-chain-telematics',
  'asset-telematics',
  'heavy-equipment'
];

export default function sitemap() {
  const baseUrl = 'https://www.atlantasys.com';
  const lastMod = new Date().toISOString();

  // 1. Core Static Routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/technology',
    '/manufacturing',
    '/certifications',
    '/partners',
    '/locations',
    '/blog',
    '/trackers/vehicle-telematics',
    '/trackers/video-telematics',
    '/trackers/fuel-telematics',
    '/trackers/cold-chain-telematics',
    '/trackers/asset-telematics',
    '/trackers/heavy-equipment',
    '/privacy-policy',
    '/terms-and-condition',
    '/warranty-and-repairs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastMod,
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. City Hub Landing Pages (50 Cities)
  const cityRoutes = CITIES.map((city) => ({
    url: `${baseUrl}/${city}`,
    lastModified: lastMod,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. City x Product Matrix Pages (50 Cities x 6 Trackers = 300 Pages)
  const cityProductRoutes = [];
  CITIES.forEach((city) => {
    TRACKERS.forEach((tracker) => {
      cityProductRoutes.push({
        url: `${baseUrl}/locations/${city}/${tracker}`,
        lastModified: lastMod,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  // 4. Primary Blog Article Routes
  const blogs = getAllBlogSummaries();
  const blogRoutes = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: lastMod,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...cityRoutes, ...cityProductRoutes, ...blogRoutes];
}
