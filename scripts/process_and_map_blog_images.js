const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

const blogsDir = 'd:/WizzIot/atlantasys-website/content/blogs';
const sourceImagesDir = 'D:/WizzIot/atlantasys-website/blog images';
const publicBlogDir = 'd:/WizzIot/atlantasys-website/public/blog';
const organizedDir = 'D:/WizzIot/atlantasys-website/blog images/cleaned_arranged';

// Helper to escape XML special characters
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// Generate rich, clean enterprise XMP metadata packet
function generateXmpMetadata({ title, description, keywords, city, country, category, slug }) {
  const safeTitle = escapeXml(title);
  const safeDesc = escapeXml(description);
  const safeCity = escapeXml(city || 'Global');
  const safeCountry = escapeXml(country || 'Global');
  const safeCategory = escapeXml(category || 'Fleet Telematics');
  const safeUrl = escapeXml(`https://www.atlantasys.com/blog/${slug}`);

  // Build subject keyword tags
  const allKeywords = Array.from(new Set([
    ...keywords,
    category,
    city,
    country,
    'Atlanta Systems',
    'Fleet Telematics',
    'Commercial Vehicle Hardware',
    'IoT Telematics Gateway',
    'Enterprise Telematics'
  ].filter(Boolean)));

  const keywordTags = allKeywords
    .map(kw => `      <rdf:li>${escapeXml(kw.trim())}</rdf:li>`)
    .join('\n');

  return `<x:xmpmeta xmlns:x="adobe:ns:meta/">
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" 
         xmlns:dc="http://purl.org/dc/elements/1.1/" 
         xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
         xmlns:xmp="http://ns.adobe.com/xap/1.0/"
         xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/">
  <rdf:Description rdf:about="">
    <dc:title>
      <rdf:Alt>
        <rdf:li xml:lang="x-default">${safeTitle}</rdf:li>
      </rdf:Alt>
    </dc:title>
    <dc:description>
      <rdf:Alt>
        <rdf:li xml:lang="x-default">${safeDesc}</rdf:li>
      </rdf:Alt>
    </dc:description>
    <dc:creator>
      <rdf:Seq>
        <rdf:li>Atlanta Systems Pvt. Ltd.</rdf:li>
      </rdf:Seq>
    </dc:creator>
    <dc:subject>
      <rdf:Bag>
${keywordTags}
      </rdf:Bag>
    </dc:subject>
    <dc:rights>
      <rdf:Alt>
        <rdf:li xml:lang="x-default">© 2026 Atlanta Systems Pvt. Ltd. All rights reserved.</rdf:li>
      </rdf:Alt>
    </dc:rights>
    <photoshop:Headline>${safeTitle}</photoshop:Headline>
    <photoshop:Credit>Atlanta Systems Enterprise Telematics</photoshop:Credit>
    <photoshop:Source>${safeUrl}</photoshop:Source>
    <photoshop:Category>${safeCategory}</photoshop:Category>
    <photoshop:City>${safeCity}</photoshop:City>
    <photoshop:Country>${safeCountry}</photoshop:Country>
    <xmp:Rating>5</xmp:Rating>
    <xmp:CreatorTool>Atlanta Systems Telematics Studio</xmp:CreatorTool>
    <xmpRights:Marked>True</xmpRights:Marked>
    <xmpRights:WebStatement>https://www.atlantasys.com</xmpRights:WebStatement>
  </rdf:Description>
</rdf:RDF>
</x:xmpmeta>`;
}

// 1. Ensure target folders exist
if (!fs.existsSync(publicBlogDir)) fs.mkdirSync(publicBlogDir, { recursive: true });
if (!fs.existsSync(organizedDir)) fs.mkdirSync(organizedDir, { recursive: true });

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

// 2. Load 300 Blogs
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

console.log(`[Step 1] Loaded ${blogs.length} articles.`);

// 3. Classify Image Category
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

// 4. Ingest and Deduplicate Images
const rawFiles = fs.readdirSync(sourceImagesDir).filter(f => {
  const ext = path.extname(f).toLowerCase();
  return ext === '.jpeg' || ext === '.jpg' || ext === '.png';
});

console.log(`[Step 2] Ingesting ${rawFiles.length} source images from '${sourceImagesDir}'...`);

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

console.log(`[Step 3] Deduplication complete: ${uniqueImages.length} unique images, ${duplicateFiles.length} duplicates skipped.`);

// Sort images: 2K high-res first, then largest file size first
uniqueImages.sort((a, b) => {
  if (a.is2K && !b.is2K) return -1;
  if (!a.is2K && b.is2K) return 1;
  return b.size - a.size;
});

// 5. Map blogs to best matching unique images
const imagesByCategory = {};
Object.keys(CATEGORY_FOLDERS).forEach(cat => {
  imagesByCategory[cat] = uniqueImages.filter(img => img.category === cat);
});

const assignments = [];

blogs.forEach(blog => {
  const cat = blog.category;
  let available = imagesByCategory[cat]?.filter(img => !img.assigned) || [];
  
  // Fallback to surplus pool if category depleted
  if (available.length === 0) {
    available = uniqueImages.filter(img => !img.assigned);
  }

  if (available.length > 0) {
    let bestImg = available[0];
    let bestScore = -1;

    const bTitle = blog.title.toLowerCase();
    const bCity = blog.city.toLowerCase();

    for (const img of available) {
      let score = 0;
      const fLower = img.file.toLowerCase().replace(/_/g, ' ');

      if (img.is2K) score += 10;
      if (bCity && fLower.includes(bCity)) score += 15;
      
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
  }
});

console.log(`[Step 4] Mapped ${assignments.length} blogs to 100% unique dedicated images.`);

// 6. Process and generate WebP + Cleaned JPEG with metadata
async function processAll() {
  console.log('[Step 5] Writing optimized WebP assets to public/blog and cleaned JPEGs to organized folders...');
  let processedCount = 0;
  const startTime = Date.now();

  for (const { blog, image } of assignments) {
    const xmp = generateXmpMetadata(blog);
    const exif = {
      IFD0: {
        ImageDescription: `${blog.title} - Atlanta Systems Telematics`,
        Artist: 'Atlanta Systems Pvt. Ltd.',
        Copyright: '© 2026 Atlanta Systems Pvt. Ltd. All rights reserved.',
        Software: 'Atlanta Systems Telematics Engine v2.4',
      }
    };

    // A. Write optimized WebP to public/blog/${blog.slug}.webp
    const webpPath = path.join(publicBlogDir, `${blog.slug}.webp`);
    await sharp(image.fullPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .withXmp(xmp)
      .withMetadata({ exif })
      .webp({ quality: 85, effort: 4 })
      .toFile(webpPath);

    // B. Write cleaned, organized master JPEG
    const folderName = CATEGORY_FOLDERS[blog.category] || '04_Vehicle_Telematics';
    const numPrefix = String(blog.num).padStart(3, '0');
    const jpegName = `${numPrefix}_${blog.slug.substring(0, 65)}.jpeg`;
    const jpegPath = path.join(organizedDir, folderName, jpegName);

    await sharp(image.fullPath)
      .withXmp(xmp)
      .withMetadata({ exif })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(jpegPath);

    processedCount++;
    if (processedCount % 50 === 0 || processedCount === assignments.length) {
      console.log(`   - Completed ${processedCount} / ${assignments.length} articles (${Math.round((Date.now() - startTime) / 1000)}s)...`);
    }
  }

  // 7. Process surplus variation images into 08_Surplus_Variations
  const surplusImages = uniqueImages.filter(img => !img.assigned);
  console.log(`[Step 6] Processing ${surplusImages.length} surplus variation images...`);
  
  let surplusIndex = 1;
  for (const img of surplusImages) {
    const surplusXmp = generateXmpMetadata({
      title: `Atlanta Systems Industrial Telematics - Hardware Variation ${surplusIndex}`,
      description: `Atlanta Systems commercial fleet telematics engineering and hardware demonstration.`,
      keywords: ['Atlanta Systems', 'Telematics', 'Fleet Hardware', 'IoT Gateway', img.category],
      city: 'Global',
      country: 'Global',
      category: img.category,
      slug: `variation-${surplusIndex}`
    });

    const surplusExif = {
      IFD0: {
        ImageDescription: `Atlanta Systems Industrial Telematics - Hardware Variation ${surplusIndex}`,
        Artist: 'Atlanta Systems Pvt. Ltd.',
        Copyright: '© 2026 Atlanta Systems Pvt. Ltd. All rights reserved.',
        Software: 'Atlanta Systems Telematics Engine v2.4'
      }
    };

    const cleanBaseName = img.file.replace(/\s*\(\d+\)/, '').replace(/_2K_.*$/, '').replace(/_\d{8,14}.*$/, '');
    const surplusName = `var_${String(surplusIndex).padStart(3, '0')}_${cleanBaseName.substring(0, 50)}.jpeg`;
    const surplusPath = path.join(organizedDir, '08_Surplus_Variations', surplusName);

    await sharp(img.fullPath)
      .withXmp(surplusXmp)
      .withMetadata({ exif: surplusExif })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(surplusPath);

    surplusIndex++;
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n=== SUCCESS: All ${processedCount} blog images + ${surplusImages.length} surplus images processed in ${totalTime}s! ===`);
  console.log(`- Public WebP Assets: ${publicBlogDir} (${fs.readdirSync(publicBlogDir).length} files)`);
  console.log(`- Cleaned & Arranged Master Archive: ${organizedDir}`);
}

processAll().catch(err => {
  console.error('Fatal processing error:', err);
  process.exit(1);
});
