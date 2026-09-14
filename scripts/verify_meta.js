const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const samples = [
  'public/blog/how-atlanta-systems-ais-140-vlt-100-gps-trackers-solve-real-time-compliance-on-indias-national-highways.webp',
  'public/blog/smart-iot-gateways-from-atlanta-systems-aggregating-cold-chain-data-across-santiago-valpara-so-routes.webp',
  'public/blog/fmcsa-eld-full-solution-by-atlanta-systems-prepared-for-houston-port-compliance-audits.webp'
];

async function check() {
  for (const s of samples) {
    const full = path.join('d:/WizzIot/atlantasys-website', s);
    if (!fs.existsSync(full)) {
      console.log('File not found:', full);
      continue;
    }
    const stat = fs.statSync(full);
    const meta = await sharp(full).metadata();
    console.log('\n==========================================');
    console.log('File:', s, '[' + (stat.size/1024).toFixed(1) + ' KB]');
    console.log('Format:', meta.format, 'Dimensions:', meta.width, 'x', meta.height);
    console.log('Has Exif:', !!meta.exif, 'Has Xmp:', !!meta.xmp);
    if (meta.xmp) {
      console.log('--- XMP Preview ---');
      console.log(meta.xmp.toString());
    }
  }
}

check().catch(console.error);
