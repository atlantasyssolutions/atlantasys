const fs = require('fs');
const path = require('path');

const blogsDir = 'd:/WizzIot/atlantasys-website/content/blogs';
const imagesDir = 'D:/WizzIot/atlantasys-website/blog images';

const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md')).sort((a,b) => {
  const numA = parseInt(a.match(/^(\d+)/)?.[1] || 0);
  const numB = parseInt(b.match(/^(\d+)/)?.[1] || 0);
  return numA - numB;
});

const blogs = blogFiles.map(file => {
  const content = fs.readFileSync(path.join(blogsDir, file), 'utf8');
  const numMatch = file.match(/^(\d+)/);
  const num = numMatch ? parseInt(numMatch[1]) : 0;
  
  let title = '';
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) title = titleMatch[1].trim();

  let slug = '';
  const slugMatch = content.match(/\*\*Slug\*\*:\s*`?([^`\n]+)`?/i);
  if (slugMatch) slug = slugMatch[1].trim();
  if (!slug) slug = file.replace(/\.md$/, '');

  let category = 'Vehicle Telematics';
  const catMatch = content.match(/\*\*Category\*\*:\s*`?([^`\n]+)`?/i);
  if (catMatch) category = catMatch[1].trim();

  let city = '';
  const cityMatch = content.match(/\*\*City\*\*:\s*`?([^`\n]+)`?/i);
  if (cityMatch) city = cityMatch[1].trim();

  let geoRegion = '';
  const geoMatch = content.match(/\*\*Geo Region\*\*:\s*`?([^`\n]+)`?/i);
  if (geoMatch) geoRegion = geoMatch[1].trim();

  let keywords = [];
  const kwMatch = content.match(/\*\*SEO & Geo Keywords\*\*:\s*`?([^`\n]+)`?/i);
  if (kwMatch) keywords = kwMatch[1].split(',').map(s => s.trim());

  let excerpt = '';
  // match first paragraph after metadata
  const lines = content.split('\n');
  let inContent = false;
  for (const line of lines) {
    if (line.trim().startsWith('## ')) { inContent = true; continue; }
    if (inContent && line.trim() && !line.trim().startsWith('#') && !line.trim().startsWith('*') && !line.trim().startsWith('|')) {
      excerpt = line.trim();
      break;
    }
  }
  if (!excerpt) excerpt = `${title} — Telematics engineering and compliance guide by Atlanta Systems.`;

  return { num, file, slug, title, category, city, geoRegion, keywords, excerpt };
});

console.log(`Loaded ${blogs.length} blogs.`);
console.log('Category breakdown:');
const catMap = {};
blogs.forEach(b => catMap[b.category] = (catMap[b.category] || 0) + 1);
console.log(catMap);
