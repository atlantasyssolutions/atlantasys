const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory() && f !== 'node_modules' && f !== '.next' && f !== '.git') {
      scanDir(p);
    } else if (f.endsWith('.js') || f.endsWith('.jsx')) {
      const c = fs.readFileSync(p, 'utf8');
      const matches = c.match(/width:\s*['"][0-9]{3,4}px['"]/g);
      const minWMatches = c.match(/minWidth:\s*['"][0-9]{3,4}px['"]/g);
      if (matches || minWMatches) {
        console.log(p.replace('d:\\WizzIot\\atlantasys-website\\', ''));
        if (matches) console.log('  width:', matches);
        if (minWMatches) console.log('  minWidth:', minWMatches);
      }
    }
  });
}

scanDir('d:/WizzIot/atlantasys-website/components');
scanDir('d:/WizzIot/atlantasys-website/app');
