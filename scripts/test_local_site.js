const http = require('http');

function testUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => {
        if (data.length < 500) data += chunk;
      });
      res.on('end', () => {
        resolve({
          url,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          contentLength: res.headers['content-length'],
          snippet: data.substring(0, 200)
        });
      });
    }).on('error', err => {
      resolve({ url, error: err.message });
    });
  });
}

async function run() {
  const tests = [
    'http://localhost:3000/blog',
    'http://localhost:3000/blog/how-atlanta-systems-ais-140-vlt-100-gps-trackers-solve-real-time-compliance-on-indias-national-highways',
    'http://localhost:3000/blog/how-atlanta-systems-ais-140-vlt-100-gps-trackers-solve-real-time-compliance-on-indias-national-highways.webp',
    'http://localhost:3000/blog-cross-border-telematics.webp',
    'http://localhost:3000/blog/smart-iot-gateways-from-atlanta-systems-aggregating-cold-chain-data-across-santiago-valpara-so-routes.webp'
  ];

  console.log('Testing local Next.js server endpoints:');
  for (const url of tests) {
    const result = await testUrl(url);
    console.log(`[${result.statusCode || 'ERR'}] ${url} -> ${result.contentType || result.error} (${result.contentLength || 0} bytes)`);
  }
}

run();
