const sharp = require('sharp');
const fs = require('fs');

const testFiles = [
  'D:/WizzIot/atlantasys-website/blog images/Freight_carrier_passing_toll_gantry_202609081512.jpeg',
  'D:/WizzIot/atlantasys-website/blog images/Fuel_sensor_probe_on_truck_202609081514.jpeg',
  'D:/WizzIot/atlantasys-website/blog images/Technician_inspecting_beacon_in_…_202609081514.jpeg'
];

async function test() {
  for (let i = 0; i < testFiles.length; i++) {
    const src = testFiles[i];
    const meta = await sharp(src).metadata();
    const cropH = Math.round(meta.height * 0.84);
    const cropW = Math.round(cropH * (16 / 9));
    const left = Math.round((meta.width - cropW) / 2);
    const top = 0;

    const out = `d:/WizzIot/atlantasys-website/scripts/clean_test_${i}.jpg`;
    await sharp(src)
      .extract({ left, top, width: cropW, height: cropH })
      .resize(800, 450)
      .jpeg({ quality: 85 })
      .toFile(out);

    console.log(`Clean test ${i} saved:`, out);
  }
}

test().catch(console.error);
