const http = require('http');

function testUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', chunk => { if (body.length < 50000) body += chunk; });
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          hasHeroImage: body.includes('Atlanta Systems Enterprise Telematics • SMT Certified Hardware') || body.includes('.webp'),
          hasSchema: body.includes('ImageObject')
        });
      });
    }).on('error', err => resolve({ url, status: 'ERR', error: err.message }));
  });
}

async function run() {
  const urls = [
    'http://localhost:3000/blog/how-atlanta-systems-ais-140-vlt-100-gps-trackers-solve-real-time-compliance-on-indias-national-highways',
    'http://localhost:3000/blog/end-to-end-4g-lte-m-gateways-from-atlanta-systems-for-continuous-coverage-across-dubais-e11-sheikh-zayed-road',
    'http://localhost:3000/blog/can-bus-j1939-readers-by-atlanta-systems-unlocking-engine-data-on-houstons-i-10-energy-corridor',
    'http://localhost:3000/blog/ai-dual-lens-dash-cams-from-atlanta-systems-reducing-accidents-on-los-angeles-i-710-port-drayage-routes',
    'http://localhost:3000/blog/4-channel-mobile-dvrs-by-atlanta-systems-for-complete-cabin-and-road-coverage-in-warsaw-a2-corridor-fleets',
    'http://localhost:3000/blog/smart-iot-gateways-from-atlanta-systems-aggregating-cold-chain-data-across-santiago-valpara-so-routes',
    'http://localhost:3000/blog/fmcsa-eld-full-solution-by-atlanta-systems-prepared-for-houston-port-compliance-audits',
    'http://localhost:3000/blog/adas-systems-by-atlanta-systems-achieving-full-gsr-2024-compliance-on-frankfurt-hub-routes'
  ];

  console.log('Testing blog pages for status, hero image, and ImageObject schema:');
  for (const u of urls) {
    const r = await testUrl(u);
    console.log(`[${r.status}] ${u.split('/').pop()}`);
    console.log(`     Hero Image Rendered: ${r.hasHeroImage} | ImageObject Schema: ${r.hasSchema}`);
  }
}

run();
