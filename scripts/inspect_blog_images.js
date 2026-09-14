const fs = require('fs');
const path = require('path');

const dir = 'D:/WizzIot/atlantasys-website/blog images';
if (!fs.existsSync(dir)) {
  console.log('Directory not found:', dir);
  process.exit(1);
}

const files = fs.readdirSync(dir);
console.log(`Total files in '${dir}': ${files.length}`);

const extMap = {};
let totalSize = 0;

files.forEach((f, i) => {
  const full = path.join(dir, f);
  const stat = fs.statSync(full);
  totalSize += stat.size;
  const ext = path.extname(f).toLowerCase();
  extMap[ext] = (extMap[ext] || 0) + 1;
  console.log(`${i + 1}. [${ext}] ${f} (${(stat.size / 1024).toFixed(1)} KB)`);
});

console.log('\nExtensions summary:', extMap);
console.log(`Total size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
