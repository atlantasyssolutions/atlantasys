const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

const blogsDir = 'd:/WizzIot/atlantasys-website/content/blogs';
const sourceImagesDir = 'D:/WizzIot/atlantasys-website/blog images';
const publicBlogDir = 'd:/WizzIot/atlantasys-website/public/blog';
const organizedDir = 'D:/WizzIot/atlantasys-website/blog images/cleaned_arranged';

// 1. Ensure output directories exist
if (!fs.existsSync(publicBlogDir)) {
  fs.mkdirSync(publicBlogDir, { recursive: true });
}
if (!fs.existsSync(organizedDir)) {
  fs.mkdirSync(organizedDir, { recursive: true });
}

const CATEGORY_FOLDERS = {
  'Regional Compliance': '01_Regional_Compliance',
  'Cross-Border Telematics': '02_Cross_Border_Telematics',
  'Heavy Assets & Diagnostics': '03_Heavy_Assets_and_Diagnostics',
  'Vehicle Telematics': '04_Vehicle_Telematics',
  'AI Video Telematics': '05_AI_Video_Telematics',
  'Cold Chain': '06_Cold_Chain',
  'Fuel Fraud': '07_Fuel_Fraud',
  'Surplus': '08_Surplus_Variations'
};

Object.values(CATEGORY_FOLDERS).forEach(f => {
  const p = path.join(organizedDir, f);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// 2. Load all 300 blogs
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

  let city = 'Global';
  const cityMatch = content.match(/\*\*City\*\*:\s*`?([^`\n]+)`?/i);
  if (cityMatch) city = cityMatch[1].trim();

  let country = 'Global';
  const countryMatch = content.match(/\*\*Country\*\*:\s*`?([^`\n]+)`?/i);
  if (countryMatch) country = countryMatch[1].trim();

  let geoRegion = 'Global';
  const geoMatch = content.match(/\*\*Geo Region\*\*:\s*`?([^`\n]+)`?/i);
  if (geoMatch) geoRegion = geoMatch[1].trim();

  let keywords = [];
  const kwMatch = content.match(/\*\*SEO & Geo Keywords\*\*:\s*`?([^`\n]+)`?/i);
  if (kwMatch) keywords = kwMatch[1].split(',').map(s => s.trim());

  let excerpt = '';
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

  return { num, file, slug, title, category, city, country, geoRegion, keywords, excerpt };
});

console.log(`[1] Loaded ${blogs.length} blogs.`);

// 3. Classify and score image file
function categorizeImage(filename) {
  const s = filename.toLowerCase();
  if (s.includes('beacon') || s.includes('cold') || s.includes('technician_inspecting')) return 'Cold Chain';
  if (s.includes('fuel') || s.includes('diesel') || (s.includes('tank') && s.includes('sensor'))) return 'Fuel Fraud';
  if (s.includes('toll') || s.includes('gantry') || s.includes('border') || s.includes('cross') || s.includes('freight_carrier') || s.includes('freight_truck')) return 'Cross-Border Telematics';
  if (s.includes('diagnostic') || s.includes('machinery') || s.includes('j1939') || s.includes('obd') || s.includes('engine') || s.includes('industrial_machinery')) return 'Heavy Assets & Diagnostics';
  if (s.includes('camera') || s.includes('dvr') || s.includes('radar') || s.includes('dms') || s.includes('adas') || s.includes('driver_monitoring') || s.includes('alertnes')) return 'AI Video Telematics';
  if (s.includes('vlt-100') || s.includes('ais') || s.includes('inspection') || s.includes('inspecting_') || s.includes('official_inspecting') || s.includes('inspect_telematics')) return 'Regional Compliance';
  return 'Vehicle Telematics';
}

// 4. Read source images and remove exact byte duplicates
const rawFiles = fs.readdirSync(sourceImagesDir).filter(f => {
  const ext = path.extname(f).toLowerCase();
  return ext === '.jpeg' || ext === '.jpg' || ext === '.png';
});

console.log(`[2] Found ${rawFiles.length} source images in '${sourceImagesDir}'.`);

const seenHashes = new Set();
const uniqueImages = [];
const duplicateFiles = [];

rawFiles.forEach(f => {
  const fullPath = path.join(sourceImagesDir, f);
  const buf = fs.readFileSync(fullPath);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  if (seenHashes.has(hash)) {
    duplicateFiles.push(f);
  } else {
    seenHashes.add(hash);
    const stat = fs.statSync(fullPath);
    const is2K = f.includes('_2K_');
    const category = categorizeImage(f);
    uniqueImages.push({
      file: f,
      fullPath,
      size: stat.size,
      is2K,
      category,
      assigned: false
    });
  }
});

console.log(`[3] Unique images: ${uniqueImages.length}, Exact duplicates detected: ${duplicateFiles.length}`);
if (duplicateFiles.length > 0) {
  console.log('   Duplicate files to omit:', duplicateFiles);
}

// Sort images: 2K first, then largest file size first
uniqueImages.sort((a, b) => {
  if (a.is2K && !b.is2K) return -1;
  if (!a.is2K && b.is2K) return 1;
  return b.size - a.size;
});

// 5. Group images by category
const imagesByCategory = {};
Object.keys(CATEGORY_FOLDERS).forEach(cat => {
  imagesByCategory[cat] = uniqueImages.filter(img => img.category === cat);
});

console.log('\n[4] Available Unique Images per category:');
Object.entries(imagesByCategory).forEach(([cat, list]) => {
  console.log(`   - ${cat.padEnd(28)}: ${list.length} images (2K: ${list.filter(i => i.is2K).length})`);
});

// 6. Map each blog to the most appropriate image
const assignments = []; // { blog, image }
const unassignedBlogs = [];

blogs.forEach(blog => {
  const cat = blog.category;
  let available = imagesByCategory[cat]?.filter(img => !img.assigned) || [];
  
  // If specific category has no more unassigned images, pull from surplus or vehicle telematics
  if (available.length === 0) {
    available = uniqueImages.filter(img => !img.assigned);
  }

  if (available.length > 0) {
    // Score available images against blog city, title, keywords
    let bestImg = available[0];
    let bestScore = -1;

    const bTitle = blog.title.toLowerCase();
    const bCity = blog.city.toLowerCase();

    for (const img of available) {
      let score = 0;
      const fLower = img.file.toLowerCase().replace(/_/g, ' ');

      if (img.is2K) score += 10;
      if (bCity && fLower.includes(bCity)) score += 15;
      
      // Keyword matching
      if (bTitle.includes('ais') && fLower.includes('vlt')) score += 8;
      if (bTitle.includes('fuel') && fLower.includes('fuel')) score += 8;
      if (bTitle.includes('dms') && fLower.includes('driver')) score += 8;
      if (bTitle.includes('radar') && fLower.includes('radar')) score += 8;
      if (bTitle.includes('camera') && fLower.includes('camera')) score += 8;
      if (bTitle.includes('cold chain') && fLower.includes('beacon')) score += 8;
      if (bTitle.includes('can-bus') && (fLower.includes('diagnostic') || fLower.includes('engine'))) score += 8;
      if (bTitle.includes('toll') && fLower.includes('toll')) score += 8;

      if (score > bestScore) {
        bestScore = score;
        bestImg = img;
      }
    }

    bestImg.assigned = true;
    assignments.push({ blog, image: bestImg });
  } else {
    unassignedBlogs.push(blog);
  }
});

console.log(`\n[5] Blog Image Mapping Complete: ${assignments.length} assigned, ${unassignedBlogs.length} unassigned.`);

// Surplus images that were not assigned to blogs (variations for archive)
const surplusImages = uniqueImages.filter(img => !img.assigned);
console.log(`[6] Surplus variation images for archive: ${surplusImages.length}`);
