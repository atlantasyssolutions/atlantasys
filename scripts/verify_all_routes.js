const http = require('http');

const urls = [
  '/',
  '/all-product',
  '/trackers/vehicle-telematics',
  '/trackers/indoor-telematics',
  '/trackers/video-telematics',
  '/trackers/assets-personal-telematics',
  '/trackers/assets-&-personal-telematics',
  '/trackers/obd-telematics',
  '/trackers/iot-sensors',
  '/trackers/taxi-gps-meter',
  '/trackers/universal-find-devices',
  '/category/vehicle-telematics',
  '/product/atl-140',
  '/product/atl-440',
  '/product/e-101',
  '/product/lc-100',
  '/vehicle-telematics',
  '/asset-management',
  '/healthcare',
  '/smart-city-solution',
  '/parking-solution',
  '/school-solution',
  '/indoor-telematics',
  '/adas',
  '/web-fota',
  '/partner-with-us',
  '/about',
  '/gps-tracking-company',
  '/career',
  '/career/1',
  '/contact',
  '/support',
  '/privacy-policy',
  '/terms-and-condition',
  '/warranty-and-repairs',
  '/cookie-policy',
  '/blog',
];

function checkUrl(path) {
  return new Promise((resolve) => {
    const encoded = encodeURI(path);
    const req = http.get(`http://localhost:3000${encoded}`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          path,
          statusCode: res.statusCode,
          size: data.length,
          location: res.headers.location || null,
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        path,
        statusCode: 0,
        error: err.message,
      });
    });
    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ path, statusCode: 408, error: 'Timeout' });
    });
  });
}

async function run() {
  console.log('Testing ' + urls.length + ' application routes...');
  let passCount = 0;
  let failCount = 0;

  for (const url of urls) {
    const res = await checkUrl(url);
    const isOk = res.statusCode === 200 || res.statusCode === 307 || res.statusCode === 308;
    if (isOk) {
      passCount++;
      console.log(`[PASS] ${res.statusCode} - ${res.path} (${res.size} bytes)${res.location ? ' -> ' + res.location : ''}`);
    } else {
      failCount++;
      console.error(`[FAIL] ${res.statusCode} - ${res.path}: ${res.error || 'Unexpected status'}`);
    }
  }

  console.log(`\nResults: ${passCount} PASSED, ${failCount} FAILED out of ${urls.length} tested.`);
  if (failCount > 0) {
    process.exit(1);
  }
}

run();
