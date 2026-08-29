const fs = require('fs');
const path = require('path');

const targetDir = 'd:/WizzIot/atlantasys-website/content/blogs';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Target directory ready:', targetDir);
