const fs = require('fs');
const path = require('path');

const blogsDir = 'd:/WizzIot/probiota-website/BLOGS';
const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

console.log(`Found ${files.length} blog markdown files.`);

function parseFrontmatter(content) {
  const match = content.match(/^---([\s\S]*?)---/);
  const data = {};
  if (match) {
    const lines = match[1].split('\n');
    for (const line of lines) {
      const idx = line.indexOf(':');
      if (idx !== -1) {
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();
        val = val.replace(/^["'>\s-]+|["'\s-]+$/g, '');
        data[key] = val;
      }
    }
  }
  return data;
}

// Generate contextual, hyper-specific Google Flow prompt
function generatePrompt(title, category, excerpt, keywords, num) {
  const tLower = title.toLowerCase();
  const eLower = (excerpt || '').toLowerCase();
  const kLower = (keywords || '').toLowerCase();

  let subject = '';
  let setting = '';
  let details = '';

  if (tLower.includes('pectin') && tLower.includes('gelatin')) {
    subject = 'Side-by-side comparison of translucent plant-based pectin gummies and traditional animal gelatin gummies on a clean marble laboratory testing bench';
    setting = 'A modern nutraceutical analytical testing lab with natural daylight pouring through clean windows';
    details = 'One gummy is sliced cleanly in half under a magnifying lamp showing a delicate vegan pectin gel network with zero weeping, while the other shows elastic stretch. Glass beakers and pH meters softly blurred in the background. Shot on 85mm f/2.0 macro lens, crisp studio lighting, editorial science photography.';
  } else if (tLower.includes('bacillus') || tLower.includes('spore') || tLower.includes('heat-stable') || tLower.includes('heat stable')) {
    subject = 'Microscopic visualization transitioning into cleanroom production of heat-resistant Bacillus coagulans probiotic spores being micro-dosed into a cooling gummy syrup';
    setting = 'A high-grade cGMP certified nutraceutical cleanroom facility';
    details = 'Stainless steel temperature-controlled mixing hopper with precise digital temperature readout showing 42°C. A scientist in sterile cleanroom bunny suit inspecting the homogeneous suspension. Soft cool blue LED accents, Hasselblad color science, 50mm f/1.8, razor-sharp detail.';
  } else if (tLower.includes('mogul') || tLower.includes('continuous cooking') || tLower.includes('manufacturing') || tLower.includes('depositor')) {
    subject = 'High-speed automated starchless gummy depositor line in a pharmaceutical-grade cleanroom facility';
    setting = 'Sterile cGMP Class 100,000 manufacturing floor with gleaming polished 316L stainless steel machinery';
    details = 'Precision servo nozzles depositing vibrant amber and ruby probiotic pectin gummy slurry into food-grade non-stick silicone molds. Motion-free sharp freeze-frame, hygienic environment, bright diffused lighting, 35mm f/2.8 architectural industrial photography.';
  } else if (tLower.includes('water activity') || tLower.includes('syneresis') || tLower.includes('weeping') || tLower.includes('aw')) {
    subject = 'Precision digital chilled-mirror water activity (Aw) meter in a nutraceutical quality assurance laboratory';
    setting = 'R&D analytical laboratory bench with stainless steel calipers and calibrated moisture balance';
    details = 'A technician’s nitrile-gloved hand placing a freshly cured gummy into the testing chamber with an illuminated digital readout displaying 0.58 Aw. Macro 100mm f/2.8 lens, shallow depth of field, authentic pharmaceutical analytical testing.';
  } else if (tLower.includes('tapioca') || tLower.includes('corn syrup') || tLower.includes('sugar-free') || tLower.includes('clean label') || tLower.includes('sweetener')) {
    subject = 'Raw ingredient sourcing showcase: golden organic non-GMO tapioca syrup flowing slowly from a glass beaker alongside raw cassava roots and organic pectin powder';
    setting = 'Minimalist culinary science studio with soft natural afternoon sunlight';
    details = 'A pristine wooden spoon lifting the clear viscous tapioca fiber with radiant amber translucence. Premium clean-label wellness aesthetic, warm natural earth tones, Leica 50mm f/1.4, high dynamic range editorial food science.';
  } else if (tLower.includes('induction') || tLower.includes('bottle') || tLower.includes('seal') || tLower.includes('packaging') || tLower.includes('pet vs hdpe') || tLower.includes('desiccant')) {
    subject = 'Automated bottling and electromagnetic induction cap sealing line for premium probiotic gummy supplements';
    setting = 'Clean pharmaceutical packaging hall with automated conveyor belts';
    details = 'Amber UV-protective pharmaceutical bottles passing under an induction sealer head. One bottle in foreground opened to reveal a hermetically sealed foil barrier liner and molecular sieve desiccant pouch inside. 50mm f/2.0, crisp industrial product photography.';
  } else if (tLower.includes('fda') || tLower.includes('21 cfr 111') || tLower.includes('nsf') || tLower.includes('audit') || tLower.includes('compliance') || tLower.includes('cgmp')) {
    subject = 'Lead quality assurance auditor and senior pharmaceutical chemist reviewing batch production records (BPR) and Certificate of Analysis (CoA)';
    setting = 'A glass-partitioned quality assurance office overlooking a bustling cGMP cleanroom gummy line';
    details = 'Detailed analytical chromatography printouts and digital tablet on a clean desk. Professional lab coats, sterile hairnets, crisp neutral daylight, authentic pharmaceutical compliance documentation, 35mm f/2.4.';
  } else if (tLower.includes('ammonia') || tLower.includes('sewage') || tLower.includes('biofresh') || tLower.includes('lift station') || tLower.includes('wastewater')) {
    subject = 'Environmental biotechnology technician monitoring an automated Biofresh microbial dosing station at a municipal wastewater facility';
    setting = 'Industrial municipal wastewater treatment infrastructure under clear morning skies';
    details = 'A weather-sealed automated peristaltic dosing skid injecting active nitrifying bacterial consortium into a lift station sump. Clear digital flow meter and gas analyzer wand showing zero ammonia ppm reading. Industrial environmental engineering photography, 28mm wide angle.';
  } else if (tLower.includes('selenium') || tLower.includes('zinc') || tLower.includes('vitamin d3') || tLower.includes('active') || tLower.includes('curcumin') || tLower.includes('ashwagandha') || tLower.includes('elderberry')) {
    subject = 'High-potency botanical and mineral active gummy formulation development: vibrant botanical extracts and bioactive powders beside finished pectin gummies';
    setting = 'Nutraceutical formulation R&D cleanroom lab';
    details = 'A laboratory watch glass holding standardized herbal extract powder beside three jewel-toned, translucent functional gummies on an illuminated glass platform. Selective focus, 90mm macro lens, cinematic warm backlight.';
  } else if (tLower.includes('synbiotic') || tLower.includes('postbiotic') || tLower.includes('microbiome') || tLower.includes('gut health')) {
    subject = 'Advanced synbiotic formulation concept: prebiotic dietary fiber chains seamlessly binding with beneficial probiotic cultures inside a crystalline gummy matrix';
    setting = 'High-end biotechnology visualization laboratory';
    details = 'A pristine glass Petri dish with cultured probiotic colonies on agar beside finished chewable prebiotic gummies. Elegant modern laboratory background with soft turquoise and gold scientific illumination, 50mm f/1.8.';
  } else if (tLower.includes('export') || tLower.includes('global') || tLower.includes('overseas') || tLower.includes('us uk') || tLower.includes('contract manufacturer') || tLower.includes('private label')) {
    subject = 'Global export-ready pallets of pharmaceutical supplement bottles neatly shrink-wrapped and staged at a temperature-controlled international air cargo facility';
    setting = 'High-standard logistics clean bay with automated barcode scanners';
    details = 'A quality inspector holding a digital handheld scanner verifying export shipping manifests to the US and Europe. Clean industrial lighting, 35mm lens, authentic international trade logistics.';
  } else {
    subject = `Advanced nutraceutical gummy development and precision analytical science for "${title}"`;
    setting = 'State-of-the-art cGMP certified gummy manufacturing and R&D laboratory';
    details = 'Pharmaceutical technicians in white coats conducting quality verification on freshly deposited functional pectin gummies. Polished 316L stainless steel equipment, clean bright environment, 50mm f/1.8 lens, high-end commercial science photography.';
  }

  return `${subject}. Located in ${setting}. ${details} Styled for Google Flow / ImageFX, photorealistic, 8k resolution, cinematic natural lighting, shallow depth of field, shot on Hasselblad H6D-100c, 50mm lens, zero cartoon artifacts, hyper-detailed industrial realism.`;
}

// Parse and sort all files
const allBlogs = files.map(file => {
  const fullPath = path.join(blogsDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const fm = parseFrontmatter(content);
  const numMatch = file.match(/blog-(\d+)-/);
  const num = numMatch ? parseInt(numMatch[1], 10) : 999;

  return {
    file,
    num,
    title: fm.title || file.replace(/^blog-\d+-|\.md$/g, '').replace(/-/g, ' '),
    category: fm.category || 'Nutraceutical Science',
    excerpt: fm.excerpt || '',
    featuredImage: fm.featuredImage || `/blog-images/${file.replace('.md', '.webp')}`,
    imageKeywords: fm.imageKeywords || '',
  };
}).sort((a, b) => a.num - b.num);

console.log(`Successfully parsed ${allBlogs.length} blogs.`);

// Build the master Markdown
let md = `# Probiota Innovations — Master Google Flow Image Prompt Library (All 318 Blog Articles)

This document contains tailored **Google Flow / Google ImageFX / Imagen 3 prompts** for all **318 articles** in the Probiota B2B knowledge library.

---

### Generation Directives for Google Flow / ImageFX:
- **Aspect Ratio:** Set to **16:9** (Featured Hero Banner) or **1:1 / 4:3** (In-body diagrams).
- **Style Setting:** \`Photorealistic\`, \`Editorial Science Photography\`, \`Industrial Cleanroom\`.
- **Negative Prompts to apply:** \`cartoon, 3d render, vector illustration, oversaturated, blurry, bad anatomy, deformed hands, messy wires, candy clipart, childish candy store\`.
- **Lighting & Color:** Polished 316L stainless steel, hygienic cleanroom neutral white, translucent gummy jewel tones (amber, ruby, citrus gold), soft cyan and amber LED diagnostics.

---

## Complete 318 Articles Prompt Catalog

`;

allBlogs.forEach((b, idx) => {
  const prompt = generatePrompt(b.title, b.category, b.excerpt, b.imageKeywords, b.num);

  md += `### ${idx + 1}. [Blog #${b.num}] ${b.title}\n`;
  md += `- **File:** \`${b.file}\`\n`;
  md += `- **Category:** ${b.category}\n`;
  md += `- **Target Image Output:** \`${b.featuredImage}\`\n`;
  md += `- **Google Flow / ImageFX Master Prompt:**\n`;
  md += `  > \`${prompt}\`\n\n`;
  md += `---\n\n`;
});

const outPath1 = 'd:/WizzIot/probiota-website/PROBIOTA_318_BLOG_GOOGLE_FLOW_IMAGE_PROMPTS.md';
const outPath2 = 'd:/WizzIot/PROBIOTA_318_BLOG_GOOGLE_FLOW_IMAGE_PROMPTS.md';
const outPath3 = 'd:/moksh/New Volume/probiota-website/PROBIOTA_318_BLOG_GOOGLE_FLOW_IMAGE_PROMPTS.md';

fs.writeFileSync(outPath1, md, 'utf8');
console.log(`Saved to ${outPath1} (${(fs.statSync(outPath1).size / 1024).toFixed(1)} KB)`);

fs.writeFileSync(outPath2, md, 'utf8');
console.log(`Saved to ${outPath2}`);

try {
  fs.writeFileSync(outPath3, md, 'utf8');
  console.log(`Saved to ${outPath3}`);
} catch (e) {
  console.log(`Notice: Could not write to ${outPath3}: ${e.message}`);
}
