const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const blogsDir = 'd:/WizzIot/atlantasys-website/content/blogs';
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

async function run() {
  const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));
  console.log(`Enriching metadata for ${blogFiles.length} blogs...`);

  let updatedCount = 0;
  const startTime = Date.now();

  for (const file of blogFiles) {
    const content = fs.readFileSync(path.join(blogsDir, file), 'utf8');
    
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

    let hardware = '';
    const hwMatch = content.match(/\*\*Hardware Model\*\*:\s*`?([^`\n]+)`?/i);
    if (hwMatch) hardware = hwMatch[1].trim();

    let keywords = [];
    const kwMatch = content.match(/\*\*SEO (?:& Geo )?Keywords\*\*:\s*`?([^`\n]+)`?/i);
    if (kwMatch) keywords = kwMatch[1].split(',').map(s => s.trim()).filter(Boolean);

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
    if (!excerpt) {
      excerpt = `${title} — Telematics engineering, hardware architecture, and fleet compliance guide by Atlanta Systems.`;
    }

    const xmp = generateFullXmp({
      title,
      description: excerpt,
      keywords,
      city,
      country,
      category,
      hardware,
      slug
    });

    const exif = {
      IFD0: {
        ImageDescription: `${title} - Atlanta Systems Telematics`,
        Artist: 'Atlanta Systems Pvt. Ltd.',
        Copyright: '© 2026 Atlanta Systems Pvt. Ltd. All rights reserved.',
        Software: 'Atlanta Systems Telematics Engine v2.4'
      }
    };

    // Update WebP in public/blog
    const webpPath = path.join(publicBlogDir, `${slug}.webp`);
    if (fs.existsSync(webpPath)) {
      const buf = fs.readFileSync(webpPath);
      const tmpWebp = webpPath + '.tmp';
      await sharp(buf)
        .withXmp(xmp)
        .withMetadata({ exif })
        .webp({ quality: 85 })
        .toFile(tmpWebp);
      fs.renameSync(tmpWebp, webpPath);
      updatedCount++;
    }

    if (updatedCount % 50 === 0) {
      console.log(`Updated metadata on ${updatedCount} WebP images...`);
    }
  }

  console.log(`Enrichment complete! ${updatedCount} WebP images updated with full descriptions, keywords, and EXIF in ${((Date.now() - startTime)/1000).toFixed(1)}s.`);
}

run().catch(console.error);
