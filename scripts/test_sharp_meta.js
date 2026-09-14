const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sampleIn = 'D:/WizzIot/atlantasys-website/blog images/Atlanta_Systems_VLT-100_hardware…_202609081513 (1).jpeg';
const testOut = 'd:/WizzIot/atlantasys-website/scripts/test_meta.webp';

const xmpXml = `<x:xmpmeta xmlns:x="adobe:ns:meta/">
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/">
  <rdf:Description rdf:about="">
    <dc:title><rdf:Alt><rdf:li xml:lang="x-default">Atlanta Systems AIS 140 VLT-100 GPS Tracker</rdf:li></rdf:Alt></dc:title>
    <dc:description><rdf:Alt><rdf:li xml:lang="x-default">Enterprise fleet telematics hardware inspection</rdf:li></rdf:Alt></dc:description>
    <dc:creator><rdf:Seq><rdf:li>Atlanta Systems Pvt. Ltd.</rdf:li></rdf:Seq></dc:creator>
    <dc:subject><rdf:Bag><rdf:li>AIS 140</rdf:li><rdf:li>VLT-100</rdf:li><rdf:li>Telematics</rdf:li></rdf:Bag></dc:subject>
    <photoshop:Credit>Atlanta Systems Enterprise Telematics</photoshop:Credit>
  </rdf:Description>
</rdf:RDF>
</x:xmpmeta>`;

async function run() {
  const info = await sharp(sampleIn)
    .withXmp(xmpXml)
    .withMetadata({
      exif: {
        IFD0: {
          ImageDescription: 'Atlanta Systems AIS 140 VLT-100 GPS Tracker',
          Artist: 'Atlanta Systems Pvt. Ltd.',
          Copyright: '© 2026 Atlanta Systems Pvt. Ltd. All rights reserved.',
          Software: 'Atlanta Systems Telematics Engine'
        }
      }
    })
    .webp({ quality: 85 })
    .toFile(testOut);

  console.log('Saved test webp info:', info);
  const meta = await sharp(testOut).metadata();
  console.log('Read back metadata:');
  console.log('Has Xmp:', !!meta.xmp);
  console.log('Has Exif:', !!meta.exif);
  if (meta.xmp) console.log('XMP:\n', meta.xmp.toString('utf8'));
  if (meta.exif) console.log('Exif buffer length:', meta.exif.length);
  fs.unlinkSync(testOut);
}

run().catch(console.error);
