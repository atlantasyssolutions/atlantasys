const fs = require('fs');
const path = require('path');

const dir = 'd:/WizzIot/atlantasys-website/content/blogs';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

console.log(`Processing ${files.length} Atlanta Systems blog files...`);

function cleanField(val) {
  if (!val) return '';
  return val.replace(/^[`"'\s]+|[`"'\s]+$/g, '').trim();
}

function buildGoogleFlowPrompt(blog) {
  const { title, category, city, country, hardware, num } = blog;
  const tLow = title.toLowerCase();

  let scene = '';
  let focalPoint = '';
  let lightingAndVibe = '';

  // Tailored visual scenes based on category and title keywords
  if (category.includes('Video') || tLow.includes('dash') || tLow.includes('dms') || tLow.includes('mdvr') || tLow.includes('adas') || tLow.includes('camera') || tLow.includes('collision')) {
    scene = `A modern heavy-duty commercial freight truck driving along a logistics corridor near ${city || 'a major global freight artery'}`;
    focalPoint = `Interior perspective over the driver's shoulder focusing sharply on an Atlanta Systems ${hardware || 'AI Dual-Vision Telematics Camera'} mounted behind the rearview mirror, with subtle status indicators monitoring road safety and driver alertness`;
    lightingAndVibe = `Crisp natural sunlight reflecting on the windshield, clear highway panorama ahead, cinematic automotive interior photography, Hasselblad H6D-100c, 35mm f/2.0, razor-sharp hardware detailing`;
  } else if (category.includes('Cold Chain') || tLow.includes('temperature') || tLow.includes('cold chain') || tLow.includes('pharma') || tLow.includes('vaccine') || tLow.includes('ble')) {
    scene = `A high-security refrigerated logistics trailer and cold storage docking facility in ${city || 'a metropolitan logistics hub'}`;
    focalPoint = `A technician in clean industrial workwear inspecting an Atlanta Systems ${hardware || 'SenseEV Wireless BLE 5.0 Temperature Sensor'} beacon magnetically mounted inside the climate-controlled cargo container next to pharmaceutical pallets`;
    lightingAndVibe = `Cool ambient cyan clean-room illumination, crisp vapor mist from refrigeration, macro detail on the sealed waterproof sensor housing, 50mm f/1.8, editorial logistics science photography`;
  } else if (category.includes('Fuel') || tLow.includes('fuel') || tLow.includes('theft') || tLow.includes('siphon') || tLow.includes('tanker')) {
    scene = `A commercial fleet fueling depot and intermodal truck terminal at dusk in ${city || 'an industrial freight hub'}`;
    focalPoint = `Close-up macro of an Atlanta Systems precision capacitive fuel level sensor probe and anti-tamper magnetic fuel cap assembly installed on the cylindrical aluminum diesel tank of a long-haul semi-truck`;
    lightingAndVibe = `Dusk twilight lighting with warm sodium floodlights reflecting off polished metal surfaces, deep navy blue shadows, 85mm f/2.0 macro lens, authentic industrial engineering realism`;
  } else if (category.includes('Compliance') || tLow.includes('ais 140') || tLow.includes('vlt') || tLow.includes('eld') || tLow.includes('ifta') || tLow.includes('fmcsa')) {
    scene = `A regional transport authority terminal and commercial vehicle inspection bay in ${city}, ${country}`;
    focalPoint = `An official inspection of the Atlanta Systems ${hardware || 'ATL-140 / VLT-100 AIS-140'} certified telematics unit mounted securely under the vehicle dashboard, showing connected dual-frequency GNSS antenna lead and illuminated red emergency SOS panic button`;
    lightingAndVibe = `Natural morning inspection light, shallow depth of field, focused on certified regulatory hardware construction, 50mm f/1.8 lens, professional transport engineering photography`;
  } else if (category.includes('Heavy Assets') || tLow.includes('can-bus') || tLow.includes('j1939') || tLow.includes('obd') || tLow.includes('mining') || tLow.includes('excavator') || tLow.includes('equipment')) {
    scene = `Heavy industrial machinery and earthmoving equipment operating on a large infrastructure worksite near ${city || 'an industrial corridor'}`;
    focalPoint = `A heavy-duty IP69K Atlanta Systems ${hardware || 'Rugged Telematics Gateway'} bolted to the steel engine chassis, connected via armored Deutsch wiring harness to the vehicle CAN-bus diagnostic port`;
    lightingAndVibe = `Dramatic golden hour sunlight breaking through industrial atmosphere, heavy steel textures, high dynamic range, 35mm f/2.8, powerful industrial equipment photography`;
  } else if (category.includes('Cross-Border') || tLow.includes('esim') || tLow.includes('dual-sim') || tLow.includes('gateway') || tLow.includes('4g') || tLow.includes('5g')) {
    scene = `An international customs border control checkpoint and automated intermodal toll corridor in ${city}, ${country}`;
    focalPoint = `A commercial freight carrier passing beneath an automated electronic toll gantries, with an overlay perspective highlighting the Atlanta Systems ${hardware || 'Dual-SIM 4G LTE-M Telematics Gateway'} maintaining uninterrupted multi-operator cloud transmission`;
    lightingAndVibe = `Blue hour twilight with illuminated highway LED overhead lighting, sharp vehicle motion blur in background, 28mm wide angle, premium transportation infrastructure photography`;
  } else {
    scene = `A modern commercial logistics depot with an active delivery fleet operating across ${city}, ${country}`;
    focalPoint = `Close-up on an Atlanta Systems ${hardware || 'Telematics Gateway'} hardware installation showing precision PCB craftsmanship, status LEDs, and ruggedized housing`;
    lightingAndVibe = `Clean daylight lighting, natural contrast, 50mm f/1.8 lens, high-end corporate B2B telematics photography`;
  }

  return `${scene}. ${focalPoint}. ${lightingAndVibe}. Formatted for Google Flow / ImageFX / Imagen 3, photorealistic, 8k resolution, cinematic lighting, shallow depth of field, shot on Hasselblad H6D-100c, 50mm lens, zero cartoon artifacts, hyper-detailed industrial realism.`;
}

// Parse all files
const blogs = files.map(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const lines = content.split('\n');
  const title = lines[0].replace(/^#\s*/, '').trim();
  const slugMatch = content.match(/\*\s*\*\*Slug\*\*:\s*`?([^`\n]+)`?/i);
  const catMatch = content.match(/\*\s*\*\*Category\*\*:\s*([^\n]+)/i);
  const cityMatch = content.match(/\*\s*\*\*City\*\*:\s*([^\n]+)/i);
  const countryMatch = content.match(/\*\s*\*\*Country\*\*:\s*([^\n]+)/i);
  const geoMatch = content.match(/\*\s*\*\*Geo Region\*\*:\s*([^\n]+)/i);
  const hwMatch = content.match(/\*\s*\*\*Hardware Model\*\*:\s*([^\n]+)/i);
  const numMatch = file.match(/^(\d+)-/);

  return {
    file,
    num: numMatch ? parseInt(numMatch[1], 10) : 0,
    title,
    slug: cleanField(slugMatch ? slugMatch[1] : file.replace('.md', '')),
    category: cleanField(catMatch ? catMatch[1] : 'Vehicle Telematics'),
    city: cleanField(cityMatch ? cityMatch[1] : ''),
    country: cleanField(countryMatch ? countryMatch[1] : ''),
    geoRegion: cleanField(geoMatch ? geoMatch[1] : 'Global'),
    hardware: cleanField(hwMatch ? hwMatch[1] : 'Atlanta Systems Telematics')
  };
}).sort((a, b) => a.num - b.num);

console.log(`Parsed all ${blogs.length} Atlanta Systems articles.`);

// Generate master Markdown
let md = `# Atlanta Systems — Master Google Flow Image Prompt Library (All 300 Website Articles)

This document contains dedicated, hyper-specific **Google Flow / Google ImageFX / Imagen 3 prompts** for all **300 articles** on the **Atlanta Systems** website (\`d:\\WizzIot\\atlantasys-website\\content\\blogs\`).

---

### Generation Directives for Google Flow / ImageFX:
- **Aspect Ratio:** Set to **16:9** (Featured Blog Banner) or **1200x630** (Open Graph / LinkedIn).
- **Style Settings:** \`Photorealistic\`, \`Editorial Commercial Photography\`, \`Industrial Engineering\`.
- **Negative Prompts:** \`cartoon, 3d render, vector illustration, oversaturated, blurry, bad anatomy, deformed hands, messy wires, stock clipart, toy cars\`.
- **Color Palette & Accents:** Slate Navy Blue (\`#070B3B\`), Telematics Amber/Orange (\`#FF5E14\`), High-Tech Cyan (\`#0169A9\`), clean brushed aluminum and die-cast electronics.

---

## Complete 300 Articles Prompt Catalog

`;

blogs.forEach((b) => {
  const prompt = buildGoogleFlowPrompt(b);
  const targetImage = `/blog/${b.slug}.webp`;

  md += `### ${b.num}. ${b.title}\n`;
  md += `- **File:** \`${b.file}\`\n`;
  md += `- **Category:** ${b.category} | **Region:** ${b.geoRegion} (${b.city}, ${b.country})\n`;
  md += `- **Hardware Model:** ${b.hardware}\n`;
  md += `- **Target Image Path:** \`${targetImage}\`\n`;
  md += `- **Google Flow / ImageFX Master Prompt:**\n`;
  md += `  > \`${prompt}\`\n\n`;
  md += `---\n\n`;
});

const outPath1 = 'd:/WizzIot/atlantasys-website/ATLANTA_300_BLOG_GOOGLE_FLOW_IMAGE_PROMPTS.md';
const outPath2 = 'd:/WizzIot/ATLANTA_300_BLOG_GOOGLE_FLOW_IMAGE_PROMPTS.md';

fs.writeFileSync(outPath1, md, 'utf8');
console.log(`Saved to ${outPath1} (${(fs.statSync(outPath1).size / 1024).toFixed(1)} KB)`);

fs.writeFileSync(outPath2, md, 'utf8');
console.log(`Saved to ${outPath2}`);
