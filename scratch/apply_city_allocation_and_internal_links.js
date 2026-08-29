const fs = require('fs');
const path = require('path');

const blogsDir = 'd:/WizzIot/atlantasys-website/content/blogs';

// 50 Global Cities Master Data Map
const CITIES = [
  { name: 'Dubai', slug: 'dubai', country: 'United Arab Emirates', region: 'MENA', keywords: ['dubai', 'e11', 'sheikh zayed', 'jebel ali', 'jafza'] },
  { name: 'Abu Dhabi', slug: 'abu-dhabi', country: 'United Arab Emirates', region: 'MENA', keywords: ['abu dhabi', 'khalifa port', 'e20', 'mussafah', 'al ain'] },
  { name: 'Riyadh', slug: 'riyadh', country: 'Saudi Arabia', region: 'MENA', keywords: ['riyadh', 'ring road', 'highway 65', 'second industrial'] },
  { name: 'Jeddah', slug: 'jeddah', country: 'Saudi Arabia', region: 'MENA', keywords: ['jeddah', 'makkah', 'jeddah port', 'expressway'] },
  { name: 'Dammam', slug: 'dammam', region: 'MENA', country: 'Saudi Arabia', keywords: ['dammam', 'jubail', 'petrochemical', 'highway 40'] },
  { name: 'Kuwait City', slug: 'kuwait-city', country: 'Kuwait', region: 'MENA', keywords: ['kuwait', 'sixth ring'] },
  { name: 'Doha', slug: 'doha', country: 'Qatar', region: 'MENA', keywords: ['doha', 'al khor'] },
  { name: 'Muscat', slug: 'muscat', country: 'Oman', region: 'MENA', keywords: ['muscat', 'sohar', 'nizwa'] },
  { name: 'Cairo', slug: 'cairo', country: 'Egypt', region: 'MENA', keywords: ['cairo', 'alexandria', 'desert road'] },
  { name: 'Casablanca', slug: 'casablanca', country: 'Morocco', region: 'MENA', keywords: ['casablanca'] },

  { name: 'Warsaw', slug: 'warsaw', country: 'Poland', region: 'Europe', keywords: ['warsaw', 'a2 corridor', 'ztm', 'poland'] },
  { name: 'Hamburg', slug: 'hamburg', country: 'Germany', region: 'Europe', keywords: ['hamburg', 'a1', 'a7', 'germany'] },
  { name: 'Rotterdam', slug: 'rotterdam', country: 'Netherlands', region: 'Europe', keywords: ['rotterdam', 'a15', 'port of rotterdam'] },
  { name: 'Madrid', slug: 'madrid', country: 'Spain', region: 'Europe', keywords: ['madrid', 'barcelona', 'a-2', 'a-3', 'autovía'] },
  { name: 'Paris', slug: 'paris', country: 'France', region: 'Europe', keywords: ['paris', 'cdg', 'autoroute', 'ile-de-france'] },
  { name: 'Milan', slug: 'milan', country: 'Italy', region: 'Europe', keywords: ['milan', 'alpine', 'turin', 'venice'] },
  { name: 'Frankfurt', slug: 'frankfurt', country: 'Germany', region: 'Europe', keywords: ['frankfurt', 'rhine-main', 'a3', 'a5'] },
  { name: 'London', slug: 'london', country: 'United Kingdom', region: 'Europe', keywords: ['london', 'dover', 'cross-channel'] },
  { name: 'Bucharest', slug: 'bucharest', country: 'Romania', region: 'Europe', keywords: ['bucharest', 'stb'] },
  { name: 'Antwerp', slug: 'antwerp', country: 'Belgium', region: 'Europe', keywords: ['antwerp', 'port of antwerp'] },

  { name: 'Houston', slug: 'houston', country: 'United States', region: 'United States', keywords: ['houston', 'ship channel', 'i-10', 'energy corridor'] },
  { name: 'Chicago', slug: 'chicago', country: 'United States', region: 'United States', keywords: ['chicago', 'intermodal', 'i-55', 'tri-state', 'i-294'] },
  { name: 'Los Angeles', slug: 'los-angeles', country: 'United States', region: 'United States', keywords: ['los angeles', 'i-710', 'drayage', 'long beach'] },
  { name: 'Dallas', slug: 'dallas', country: 'United States', region: 'United States', keywords: ['dallas', 'i-20', 'i-35', 'fort worth'] },
  { name: 'Memphis', slug: 'memphis', country: 'United States', region: 'United States', keywords: ['memphis', 'parcel hub'] },
  { name: 'Miami', slug: 'miami', country: 'United States', region: 'United States', keywords: ['miami', 'i-95', 'produce'] },
  { name: 'Phoenix', slug: 'phoenix', country: 'United States', region: 'United States', keywords: ['phoenix', 'arizona'] },
  { name: 'New York', slug: 'new-york', country: 'United States', region: 'United States', keywords: ['new york', 'nyc'] },
  { name: 'Atlanta', slug: 'atlanta', country: 'United States', region: 'United States', keywords: ['atlanta metro'] },
  { name: 'Seattle', slug: 'seattle', country: 'United States', region: 'United States', keywords: ['seattle', 'i-5'] },

  { name: 'Mexico City', slug: 'mexico-city', country: 'Mexico', region: 'Latin America', keywords: ['mexico city', 'periférico', 'querétaro', 'cdmx'] },
  { name: 'São Paulo', slug: 'sao-paulo', country: 'Brazil', region: 'Latin America', keywords: ['são paulo', 'sao paulo', 'anchieta', 'imigrantes', 'pinheiros'] },
  { name: 'Lima', slug: 'lima', country: 'Peru', region: 'Latin America', keywords: ['lima', 'andean', 'central highway'] },
  { name: 'Bogotá', slug: 'bogota', country: 'Colombia', region: 'Latin America', keywords: ['bogotá', 'bogota', 'buenaventura', 'medellín'] },
  { name: 'Santiago', slug: 'santiago', country: 'Chile', region: 'Latin America', keywords: ['santiago', 'valparaíso', 'valparaiso', 'ruta 68'] },
  { name: 'Buenaventura', slug: 'buenaventura', country: 'Colombia', region: 'Latin America', keywords: ['buenaventura port'] },
  { name: 'Manzanillo', slug: 'manzanillo', country: 'Mexico', region: 'Latin America', keywords: ['manzanillo port'] },
  { name: 'Santos', slug: 'santos', country: 'Brazil', region: 'Latin America', keywords: ['port of santos', 'santos container'] },
  { name: 'Querétaro', slug: 'queretaro', country: 'Mexico', region: 'Latin America', keywords: ['querétaro highway'] },
  { name: 'Guadalajara', slug: 'guadalajara', country: 'Mexico', region: 'Latin America', keywords: ['guadalajara'] },

  { name: 'Mumbai', slug: 'mumbai', country: 'India', region: 'India', keywords: ['mumbai', 'maharashtra', 'nh-44', 'vahan', 'morth'] },
  { name: 'Delhi', slug: 'delhi', country: 'India', region: 'India', keywords: ['delhi', 'ncr', 'gurugram'] },
  { name: 'Bengaluru', slug: 'bengaluru', country: 'India', region: 'India', keywords: ['bengaluru', 'bangalore'] },
  { name: 'Chennai', slug: 'chennai', country: 'India', region: 'India', keywords: ['chennai'] },
  { name: 'Kolkata', slug: 'kolkata', country: 'India', region: 'India', keywords: ['kolkata'] },
  { name: 'Hyderabad', slug: 'hyderabad', country: 'India', region: 'India', keywords: ['hyderabad'] },
  { name: 'Pune', slug: 'pune', country: 'India', region: 'India', keywords: ['pune'] },
  { name: 'Ahmedabad', slug: 'ahmedabad', country: 'India', region: 'India', keywords: ['ahmedabad'] },
  { name: 'Jaipur', slug: 'jaipur', country: 'India', region: 'India', keywords: ['jaipur'] },
  { name: 'Surat', slug: 'surat', country: 'India', region: 'India', keywords: ['surat'] }
];

// Product Pages List for Internal Linking
const PRODUCTS = [
  { name: 'Atlanta AIS-140 VLT-100 Vehicle Tracker', url: '/trackers/vehicle-telematics' },
  { name: 'Atlanta VTC-100 & VTC-500 AI Video Dash Cams', url: '/trackers/video-telematics' },
  { name: 'Atlanta FL-400 & FL-700 Fuel Telematics Sensors', url: '/trackers/fuel-telematics' },
  { name: 'Atlanta SenseEV BLE 5.0 Cold Chain Loggers', url: '/trackers/cold-chain-telematics' }
];

const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));
console.log(`Processing ${files.length} markdown files for city allocation & internal links...`);

let processed = 0;

files.forEach((file, index) => {
  const filePath = path.join(blogsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const lowerContent = content.toLowerCase();

  // Match city from keywords or fallback to index round-robin
  let matchedCity = CITIES.find(c => c.keywords.some(kw => lowerContent.includes(kw)));
  if (!matchedCity) {
    matchedCity = CITIES[index % CITIES.length];
  }

  // Ensure Metadata Frontmatter has city and citySlug
  if (!content.includes('* **City**:')) {
    content = content.replace(
      /(\* \*\*Category\*\*: .*?\n)/,
      `$1* **City**: ${matchedCity.name}\n* **City Slug**: \`${matchedCity.slug}\`\n* **Country**: ${matchedCity.country}\n`
    );
  }

  // Inject Contextual Internal Product Links & Regional Guides if not already present
  if (!content.includes('## Related Telematics Solutions & Regional Hardware Guides')) {
    // Pick 3 related blogs from other files for cross-linking
    const rel1 = files[(index + 7) % files.length].replace('.md', '');
    const rel2 = files[(index + 19) % files.length].replace('.md', '');
    const rel3 = files[(index + 33) % files.length].replace('.md', '');

    const internalLinksSection = `
---

## Related Telematics Solutions & Regional Hardware Guides

To learn more about deploying advanced B2B telematics hardware and software across your commercial fleet, explore our dedicated product lines and regional hub guides:

### 🚀 Recommended Hardware & Sensors:
* **[Atlanta AIS-140 VLT-100 Commercial Vehicle Tracker](${PRODUCTS[0].url})**: ARAI & MoRTH certified GPS tracking unit with panic buttons and dual SIM failover.
* **[Atlanta VTC-100 & VTC-500 AI Video Dash Cams](${PRODUCTS[1].url})**: Dual-lens ADAS & DMS video telematics with 77GHz side blind spot radar fusion.
* **[Atlanta FL-400 & FL-700 High-Precision Fuel Sensors](${PRODUCTS[2].url})**: Capacitive & non-invasive ultrasonic fuel probes for real-time anti-siphoning alerts.
* **[Atlanta SenseEV BLE 5.0 Cold Chain Temperature Loggers](${PRODUCTS[3].url})**: WHO GDP certified wireless temperature and relative humidity beacons for reefer fleets.

### 🏙️ Regional Hub & Knowledge Links:
* **[Explore All Commercial Fleet Telematics Solutions for ${matchedCity.name}](${matchedCity.slug === 'dubai' ? '/trackers/vehicle-telematics' : '/locations'})**: Hardware stacks, local compliance guides, and field case studies for fleets operating in ${matchedCity.name}, ${matchedCity.country}.
* **[Related Technical Deep-Dive 1](/blog/${rel1})**: Engineering analysis and hardware setup protocol.
* **[Related Technical Deep-Dive 2](/blog/${rel2})**: Diagnostic algorithm analysis and enterprise portal integration.
* **[Related Technical Deep-Dive 3](/blog/${rel3})**: Regulatory compliance framework and field deployment guidelines.
`;

    content = content.trim() + '\n' + internalLinksSection;
  }

  fs.writeFileSync(filePath, content, 'utf8');
  processed++;
});

console.log(`Successfully processed all ${processed} blog markdown files with City Allocation and Internal Links!`);
