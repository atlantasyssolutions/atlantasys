const fs = require('fs');
const path = require('path');

const wellKnown = path.join('d:', 'WizzIot', 'atlantasys-website', 'well-known');
const publicDir = path.join('d:', 'WizzIot', 'atlantasys-website', 'public');

const assetFolders = [
  'img',
  'product_img',
  'product_category',
  'product_feature',
  'use_cases',
  'pro',
  'brochure',
  'manual',
  'driver',
  'wiring',
  'wiki',
  'fonts',
  'css'
];

console.log('Starting assets sync...');

assetFolders.forEach(folder => {
  const src = path.join(wellKnown, 'assets', folder);
  const dest = path.join(publicDir, 'assets', folder);
  if (fs.existsSync(src)) {
    console.log(`Copying assets/${folder} -> public/assets/${folder}`);
    fs.cpSync(src, dest, { recursive: true });
  } else {
    console.log(`Skipping assets/${folder} (does not exist in source)`);
  }
});

// Copy uploads
const srcUploads = path.join(wellKnown, 'uploads');
const destUploads = path.join(publicDir, 'uploads');
if (fs.existsSync(srcUploads)) {
  console.log(`Copying uploads -> public/uploads`);
  fs.cpSync(srcUploads, destUploads, { recursive: true });
}

console.log('Asset sync completed successfully!');
