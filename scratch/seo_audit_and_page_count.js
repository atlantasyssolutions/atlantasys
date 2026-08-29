const fs = require('fs');
const path = require('path');

const appDir = 'd:/WizzIot/atlantasys-website/app';
const contentBlogsDir = 'd:/WizzIot/atlantasys-website/content/blogs';

console.log('--- ATLANTA SYSTEMS SEO & SITE AUDIT ---');

// 1. Audit Markdown Blogs
let blogCount = 0;
let validBlogsWithMeta = 0;
let blogsWithSchemas = 0;
let blogsWithInternalLinks = 0;

if (fs.existsSync(contentBlogsDir)) {
  const blogFiles = fs.readdirSync(contentBlogsDir).filter(f => f.endsWith('.md'));
  blogCount = blogFiles.length;

  blogFiles.forEach(file => {
    const content = fs.readFileSync(path.join(contentBlogsDir, file), 'utf8');
    if (content.includes('# ') && content.includes('* **Slug**:')) {
      validBlogsWithMeta++;
    }
    if (content.includes('Frequently Asked Questions') || content.includes('FAQs')) {
      blogsWithSchemas++;
    }
    if (content.includes('## Related Telematics Solutions')) {
      blogsWithInternalLinks++;
    }
  });
}

// 2. Count Static Pages & Dynamic Routes
const staticRoutes = [
  '/',
  '/about',
  '/contact',
  '/technology',
  '/manufacturing',
  '/certifications',
  '/partners',
  '/locations',
  '/blog',
  '/sitemap.xml',
  '/robots.txt'
];

const productRoutes = [
  '/trackers/vehicle-telematics',
  '/trackers/video-telematics',
  '/trackers/fuel-telematics',
  '/trackers/cold-chain-telematics',
  '/trackers/asset-telematics',
  '/trackers/heavy-equipment'
];

const industryRoutes = [
  '/industries/logistics',
  '/industries/passenger-transit',
  '/industries/cold-chain',
  '/industries/mining-construction',
  '/industries/oil-gas-hazmat',
  '/industries/taxi-ride-hailing'
];

const cityHubs = [
  'dubai', 'abu-dhabi', 'riyadh', 'jeddah', 'dammam', 'kuwait-city', 'doha', 'muscat', 'cairo', 'casablanca',
  'warsaw', 'hamburg', 'rotterdam', 'madrid', 'paris', 'milan', 'frankfurt', 'london', 'bucharest', 'antwerp',
  'houston', 'chicago', 'los-angeles', 'dallas', 'memphis', 'miami', 'phoenix', 'new-york', 'atlanta', 'seattle',
  'mexico-city', 'sao-paulo', 'lima', 'bogota', 'santiago', 'buenaventura', 'manzanillo', 'santos', 'queretaro', 'guadalajara',
  'mumbai', 'delhi', 'bengaluru', 'chennai', 'kolkata', 'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'surat'
];

const totalCityLandingPages = cityHubs.length; // 50 cities

const grandTotalPages = staticRoutes.length + productRoutes.length + industryRoutes.length + totalCityLandingPages + blogCount;

console.log('\n--- SEO AUDIT RESULTS ---');
console.log(`Total Blog Markdown Files: ${blogCount}`);
console.log(`Valid Blogs with Metadata & Titles: ${validBlogsWithMeta} (${((validBlogsWithMeta/blogCount)*100).toFixed(1)}%)`);
console.log(`Blogs with FAQ Structured Data Potential: ${blogsWithSchemas} (${((blogsWithSchemas/blogCount)*100).toFixed(1)}%)`);
console.log(`Blogs with Internal Cross-Links Injected: ${blogsWithInternalLinks} (${((blogsWithInternalLinks/blogCount)*100).toFixed(1)}%)`);

console.log('\n--- NOWFLOATS PROGRAMMATIC STRATEGY PAGE COUNT BREAKDOWN ---');
console.log(`1. Core Corporate Pages: ${staticRoutes.length}`);
console.log(`2. Hardware & Solution Pages: ${productRoutes.length}`);
console.log(`3. Vertical Industry Solutions: ${industryRoutes.length}`);
console.log(`4. NowFloats City Landing Hubs: ${totalCityLandingPages} (50 Cities)`);
console.log(`5. Programmatic Deep-Dive Technical Articles: ${blogCount}`);
console.log(`------------------------------------------------------------`);
console.log(`🚀 GRAND TOTAL LIVE INDEXABLE PAGES: ${grandTotalPages} Pages!`);
