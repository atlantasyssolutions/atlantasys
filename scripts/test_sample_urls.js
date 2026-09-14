const fs = require('fs');
const path = require('path');
const http = require('http');

const dir = path.join(__dirname, '..', 'content', 'blogs');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
files.sort((a, b) => parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]));

const samples = [files[0], files[99], files[199], files[299]];

function testUrl(slug) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000/blog/' + slug, res => {
      resolve({ slug, status: res.statusCode });
    }).on('error', err => resolve({ slug, error: err.message }));
  });
}

(async () => {
  console.log('Testing sample routes across all batches:');
  for (const f of samples) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const slugMatch = content.match(/\* \*\*Slug\*\*:\s*`?([^`\n\r]+)`?/);
    const slug = slugMatch ? slugMatch[1].replace(/[`'"]/g, '').trim() : '';
    const res = await testUrl(slug);
    console.log(`[Batch Sample] File: ${f.substring(0, 30)} | Slug: ${slug.substring(0, 40)} | Status: ${res.status}`);
  }
})();
