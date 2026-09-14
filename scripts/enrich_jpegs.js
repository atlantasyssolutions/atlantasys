const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const blogsDir = 'd:/WizzIot/atlantasys-website/content/blogs';
const organizedDir = 'D:/WizzIot/atlantasys-website/blog images/cleaned_arranged';

const CATEGORY_FOLDERS = {
  'Regional Compliance': '01_Regional_Compliance',
  'Cross-Border Telematics': '02_Cross_Border_Telematics',
  'Heavy Assets & Diagnostics': '03_Heavy_Assets_and_Diagnostics',
  'Vehicle Telematics': '04_Vehicle_Telematics',
  'AI Video Telematics': '05_AI_Video_Telematics',
  'Cold Chain': '06_Cold_Chain',
  'Fuel Fraud': '07_Fuel_Fraud'
};

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

async function run() {
  const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));
  console.log('Enriching organized JPEGs for 300 blogs...');
  let updated = 0;

  for (const file of blogFiles) {
    const content = fs.readFileSync(path.join(blogsDir, file), 'utf8');
    const numMatch = file.match(/^(\d+)/);
    const num = numMatch ? parseInt(numMatch[1]) : 0;
    const numPrefix = String(num).padStart(3, '0');

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
    if (!excerpt) excerpt = `${title} — Telematics engineering guide by Atlanta Systems.`;

    const folderName = CATEGORY_FOLDERS[category] || '04_Vehicle_Telematics';
    const folderPath = path.join(organizedDir, folderName);
    if (!fs.existsSync(folderPath)) continue;

    // Find the file in this folder starting with numPrefix
    const folderFiles = fs.readdirSync(folderPath);
    const targetFile = folderFiles.find(f => f.startsWith(`${numPrefix}_`));
    if (!targetFile) continue;

    const fullPath = path.join(folderPath, targetFile);
    const buf = fs.readFileSync(fullPath);

    const xmp = generateFullXmp({ title, description: excerpt, keywords, city, country, category, hardware, slug });
    const exif = {
      IFD0: {
        ImageDescription: `${title} - Atlanta Systems Telematics`,
        Artist: 'Atlanta Systems Pvt. Ltd.',
        Copyright: '© 2026 Atlanta Systems Pvt. Ltd. All rights reserved.',
        Software: 'Atlanta Systems Telematics Engine v2.4'
      }
    };

    const tmpPath = fullPath + '.tmp.jpeg';
    await sharp(buf)
      .withXmp(xmp)
      .withMetadata({ exif })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(tmpPath);

    fs.renameSync(tmpPath, fullPath);
    updated++;
    if (updated % 50 === 0) console.log(`Enriched ${updated} organized JPEGs...`);
  }

  console.log(`Enriched all ${updated} organized JPEGs in cleaned_arranged!`);
}

run().catch(console.error);
