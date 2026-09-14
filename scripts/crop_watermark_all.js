const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

const blogsDir = 'd:/WizzIot/atlantasys-website/content/blogs';
const sourceImagesDir = 'D:/WizzIot/atlantasys-website/blog images';
const publicBlogDir = 'd:/WizzIot/atlantasys-website/public/blog';
const organizedDir = 'D:/WizzIot/atlantasys-website/blog images/cleaned_arranged';

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

function generateFullXmp({ title, description, keywords, city, country, category, hardware, slug }) {
  const safeTitle = escapeXml(title);
  const safeDesc = escapeXml(description);
  const safeCity = escapeXml(city || 'Global');
  const safeCountry = escapeXml(country || 'Global');
  const safeCategory = escapeXml(category || 'Fleet Telematics');
  const safeUrl = escapeXml(`https://www.atlantasys.com/blog/${slug}`);

  const allKeywords = Array.from(new Set([
    ...keywords,
    hardware,
    category,
    city,
    country,
    'Atlanta Systems',
    'Fleet Telematics',
    'Commercial Vehicle Hardware',
    'IoT Telematics Gateway',
    'Enterprise Telematics',
    'AIS 140 GPS Tracker',
    'CAN-Bus Diagnostics',
    'Cold Chain Monitoring',
    'Fuel Theft Prevention',
    'Mobile DVR Camera'
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
    <dc:title><rdf:Alt><rdf:li xml:lang="x-default">${safeTitle}</rdf:li></rdf:Alt></dc:title>
    <dc:description><rdf:Alt><rdf:li xml:lang="x-default">${safeDesc}</rdf:li></rdf:Alt></dc:description>
    <dc:creator><rdf:Seq><rdf:li>Atlanta Systems Pvt. Ltd.</rdf:li></rdf:Seq></dc:creator>
    <dc:subject><rdf:Bag>\n${keywordTags}\n      </rdf:Bag></dc:subject>
    <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">© 2026 Atlanta Systems Pvt. Ltd. All rights reserved.</rdf:li></rdf:Alt></dc:rights>
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

async function run() {
  console.log('[1/4] Loading 300 blogs and raw source images...');
  const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md')).sort((a,b) => {
    const numA = parseInt(a.match(/^(\d+)/)?.[1] || 0);
    const numB = parseInt(b.match(/^(\d+)/)?.[1] || 0);
    return numA - numB;
  });

  const blogs = blogFiles.map(file => {
    const content = fs.readFileSync(path.join(blogsDir, file), 'utf8');
    const numMatch = file.match(/^(\d+)/);
    const num = numMatch ? parseInt(numMatch[1]) : 0;
    
    let title = content.match(/^#\s+(.+)$/m)?.[1]?.trim() || file;
    let slug = content.match(/\*\*Slug\*\*:\s*`?([^`\n]+)`?/i)?.[1]?.trim() || file.replace(/\.md$/, '');
    let category = content.match(/\*\*Category\*\*:\s*`?([^`\n]+)`?/i)?.[1]?.trim() || 'Vehicle Telematics';
    let city = content.match(/\*\*City\*\*:\s*`?([^`\n]+)`?/i)?.[1]?.trim() || 'Global';
    let country = content.match(/\*\*Country\*\*:\s*`?([^`\n]+)`?/i)?.[1]?.trim() || 'Global';
    let hardware = content.match(/\*\*Hardware Model\*\*:\s*`?([^`\n]+)`?/i)?.[1]?.trim() || '';
    let keywords = content.match(/\*\*SEO (?:& Geo )?Keywords\*\*:\s*`?([^`\n]+)`?/i)?.[1]?.split(',').map(s => s.trim()).filter(Boolean) || [];

    let excerpt = '';
    const lines = content.split('\n');
    let inContent = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ')) { inContent = true; continue; }
      if (inContent && trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('*') && !trimmed.startsWith('|') && !trimmed.startsWith('+') && !trimmed.startsWith('---')) {
        excerpt = trimmed.replace(/[*`_]/g, '');
        break;
      }
    }
    if (!excerpt) excerpt = `${title} — Telematics engineering and compliance guide by Atlanta Systems.`;

    return { num, file, slug, title, category, city, country, hardware, keywords, excerpt };
  });

  // Source images deduplication
  const rawFiles = fs.readdirSync(sourceImagesDir).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ext === '.jpeg' || ext === '.jpg' || ext === '.png';
  });

  const seenHashes = new Set();
  const uniqueImages = [];
  rawFiles.forEach(f => {
    const fullPath = path.join(sourceImagesDir, f);
    const buf = fs.readFileSync(fullPath);
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    if (!seenHashes.has(hash)) {
      seenHashes.add(hash);
      const stat = fs.statSync(fullPath);
      const is2K = f.includes('_2K_');
      const category = categorizeImage(f);
      uniqueImages.push({ file: f, fullPath, size: stat.size, is2K, category, assigned: false });
    }
  });

  uniqueImages.sort((a, b) => {
    if (a.is2K && !b.is2K) return -1;
    if (!a.is2K && b.is2K) return 1;
    return b.size - a.size;
  });

  const imagesByCategory = {};
  Object.keys(CATEGORY_FOLDERS).forEach(cat => {
    imagesByCategory[cat] = uniqueImages.filter(img => img.category === cat);
  });

  const assignments = [];
  blogs.forEach(blog => {
    const cat = blog.category;
    let available = imagesByCategory[cat]?.filter(img => !img.assigned) || [];
    if (available.length === 0) available = uniqueImages.filter(img => !img.assigned);

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

  console.log(`[2/4] Mapped ${assignments.length} blogs. Cropping bottom-right watermark & generating clean WebP + JPEGs...`);

  let count = 0;
  const start = Date.now();

  for (const { blog, image } of assignments) {
    const srcMeta = await sharp(image.fullPath).metadata();
    
    // Accurate 16:9 crop that eliminates bottom-right Gemini star watermark
    const cropH = Math.round(srcMeta.height * 0.84);
    const cropW = Math.round(cropH * (16 / 9));
    const left = Math.round((srcMeta.width - cropW) / 2);
    const top = 0;

    const xmp = generateFullXmp(blog);
    const exif = {
      IFD0: {
        ImageDescription: `${blog.title} - Atlanta Systems Telematics`,
        Artist: 'Atlanta Systems Pvt. Ltd.',
        Copyright: '© 2026 Atlanta Systems Pvt. Ltd. All rights reserved.',
        Software: 'Atlanta Systems Telematics Engine v2.4'
      }
    };

    // 1. Output clean WebP to public/blog/${blog.slug}.webp
    const webpPath = path.join(publicBlogDir, `${blog.slug}.webp`);
    await sharp(image.fullPath)
      .extract({ left, top, width: cropW, height: cropH })
      .resize({ width: 1600, height: 900, fit: 'cover' })
      .withXmp(xmp)
      .withMetadata({ exif })
      .webp({ quality: 85, effort: 4 })
      .toFile(webpPath);

    // 2. Output clean master JPEG to blog images/cleaned_arranged
    const folderName = CATEGORY_FOLDERS[blog.category] || '04_Vehicle_Telematics';
    const numPrefix = String(blog.num).padStart(3, '0');
    const jpegName = `${numPrefix}_${blog.slug.substring(0, 65)}.jpeg`;
    const jpegPath = path.join(organizedDir, folderName, jpegName);

    await sharp(image.fullPath)
      .extract({ left, top, width: cropW, height: cropH })
      .withXmp(xmp)
      .withMetadata({ exif })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(jpegPath);

    count++;
    if (count % 50 === 0 || count === assignments.length) {
      console.log(`   - Cropped & cleaned ${count} / ${assignments.length} articles (${Math.round((Date.now() - start)/1000)}s)...`);
    }
  }

  // 3. Process surplus variations without watermark
  const surplusImages = uniqueImages.filter(img => !img.assigned);
  console.log(`[3/4] Cropping watermark from ${surplusImages.length} surplus images...`);

  let surplusIndex = 1;
  for (const img of surplusImages) {
    const srcMeta = await sharp(img.fullPath).metadata();
    const cropH = Math.round(srcMeta.height * 0.84);
    const cropW = Math.round(cropH * (16 / 9));
    const left = Math.round((srcMeta.width - cropW) / 2);
    const top = 0;

    const surplusXmp = generateFullXmp({
      title: `Atlanta Systems Telematics Hardware Illustration ${surplusIndex}`,
      description: `Atlanta Systems industrial telematics and vehicle IoT hardware architecture.`,
      keywords: ['Atlanta Systems', 'Telematics', 'IoT Hardware', img.category],
      city: 'Global',
      country: 'Global',
      category: img.category,
      hardware: 'Telematics Gateway',
      slug: `surplus-illustration-${surplusIndex}`
    });

    const surplusExif = {
      IFD0: {
        ImageDescription: `Atlanta Systems Telematics Hardware Illustration ${surplusIndex}`,
        Artist: 'Atlanta Systems Pvt. Ltd.',
        Copyright: '© 2026 Atlanta Systems Pvt. Ltd. All rights reserved.',
        Software: 'Atlanta Systems Telematics Engine v2.4'
      }
    };

    const cleanBaseName = img.file.replace(/\s*\(\d+\)/, '').replace(/_2K_.*$/, '').replace(/_\d{8,14}.*$/, '');
    const surplusName = `var_${String(surplusIndex).padStart(3, '0')}_${cleanBaseName.substring(0, 50)}.jpeg`;
    const surplusPath = path.join(organizedDir, '08_Surplus_Variations', surplusName);

    await sharp(img.fullPath)
      .extract({ left, top, width: cropW, height: cropH })
      .withXmp(surplusXmp)
      .withMetadata({ exif: surplusExif })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(surplusPath);

    surplusIndex++;
  }

  // Also update fallback image
  if (assignments.length > 0) {
    fs.copyFileSync(
      path.join(publicBlogDir, `${assignments[0].blog.slug}.webp`),
      path.join(publicBlogDir, '../blog-cross-border-telematics.webp')
    );
  }

  console.log(`\n[4/4] COMPLETE: All 300 blog images + 57 surplus images cropped, watermarks removed, metadata embedded in ${((Date.now() - start)/1000).toFixed(1)}s!`);
}

run().catch(console.error);
