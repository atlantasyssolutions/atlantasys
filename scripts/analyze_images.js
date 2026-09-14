const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dir = 'D:/WizzIot/atlantasys-website/blog images';
const files = fs.readdirSync(dir);
console.log('Total files in source dir:', files.length);

const hashMap = {};
const exactHashDuplicates = [];
const nameGroups = {};
let docFiles = [];
let jpegFiles = [];

files.forEach(f => {
  const full = path.join(dir, f);
  const stat = fs.statSync(full);
  if (stat.isDirectory()) return;
  const ext = path.extname(f).toLowerCase();
  if (ext === '.docx' || ext === '.doc') {
    docFiles.push(f);
    return;
  }
  if (ext !== '.jpeg' && ext !== '.jpg' && ext !== '.png') {
    console.log('Other extension:', f);
    return;
  }
  
  jpegFiles.push({ file: f, size: stat.size, path: full });
  
  // Calculate file hash
  const buf = fs.readFileSync(full);
  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  if (hashMap[hash]) {
    exactHashDuplicates.push({ original: hashMap[hash], duplicate: f });
  } else {
    hashMap[hash] = f;
  }

  // Base prompt name normalization
  // E.g. A_high-tech_freight_carrier_passing_an_electronic_toll_gantry_on_the_Saudi-UAE_border...
  let basePrompt = f.replace(/\.jpeg$/i, '').replace(/\.jpg$/i, '');
  basePrompt = basePrompt.replace(/\s*\(\d+\)$/, ''); // remove (1), (2)
  basePrompt = basePrompt.replace(/_2K_\d+.*$/, '');  // remove _2K_timestamp
  basePrompt = basePrompt.replace(/_\d{8,14}.*$/, ''); // remove timestamp suffix
  basePrompt = basePrompt.replace(/_\d+$/, '');

  if (!nameGroups[basePrompt]) nameGroups[basePrompt] = [];
  nameGroups[basePrompt].push({
    file: f,
    size: stat.size,
    is2K: f.includes('_2K_'),
    hasParens: /\(\d+\)/.test(f)
  });
});

console.log('Doc files:', docFiles);
console.log('JPEG/Image count:', jpegFiles.length);
console.log('Exact SHA256 identical duplicates:', exactHashDuplicates.length);
console.log('Unique prompt base groups:', Object.keys(nameGroups).length);

console.log('\n--- Sample Prompt Groups (first 30) ---');
Object.entries(nameGroups).slice(0, 30).forEach(([prompt, list], idx) => {
  console.log(`\nGroup ${idx + 1}: ${prompt.substring(0, 70)}... (Files: ${list.length})`);
  list.forEach(item => {
    console.log(`   - ${item.file} [${(item.size / 1024).toFixed(1)} KB] ${item.is2K ? '[2K]' : ''} ${item.hasParens ? '[DUP-NUM]' : ''}`);
  });
});
