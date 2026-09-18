const fs = require('fs');
const path = require('path');

// Let's inspect CSS files in public/assets/css
const cssFiles = ['style.css', 'responsive.css', 'meanmenu.css'];
cssFiles.forEach(cf => {
  const p = path.join('d:/WizzIot/atlantasys-website/public/assets/css', cf);
  const c = fs.readFileSync(p, 'utf8');
  console.log(`Checking ${cf}: size ${c.length} bytes`);
});
