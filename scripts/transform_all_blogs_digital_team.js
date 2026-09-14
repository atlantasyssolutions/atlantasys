const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, '..', 'content', 'blogs');

// Corridor & local asset descriptions by category
const CATEGORY_CHALLENGES = {
  'Heavy Assets & Diagnostics': {
    failure: 'a blown head gasket, burned turbocharger, or seized crankshaft',
    consequence: 'a fully loaded tractor goes dead in its tracks, towing bills stack up, delivery penalties pile up, and an engine overhaul costs thousands',
    rootCause: 'the engine computer had been broadcasting diagnostic trouble codes (DTCs) for hours — sometimes days — before the breakdown',
    solution: 'surfacing engine faults and J1939 fault codes before they turn into catastrophic roadside breakdowns',
    table: [
      { metric: 'Unplanned Roadside Engine Breakdowns', before: 'Frequent, reactive repairs', after: 'Occasional, caught early', gain: 'Significant Reduction' },
      { metric: 'Fleet Idling Fuel Burn', before: 'Elevated engine idle waste', after: 'Noticeably reduced', gain: 'Meaningful Savings' },
      { metric: 'Major Drivetrain Repair Spend', before: 'High, unplanned overhauls', after: 'Lower, scheduled repairs', gain: 'Substantial Savings' },
      { metric: 'Fleet Drivetrain Fuel Economy', before: 'Baseline efficiency', after: 'Measurably improved', gain: 'Moderate Gain' },
      { metric: 'Capital Investment Payback', before: '—', after: 'Typically within months', gain: 'Fast Return' }
    ],
    q1: 'Will installing Atlanta telematics affect my vehicle manufacturer warranty?',
    a1: 'No. Our systems use contactless magnetic induction clamps over the twisted CAN-High and CAN-Low wires. Because there is zero wire splicing or electrical contact made to the copper conductor, factory OEM warranties from Volvo, Scania, Mercedes-Benz, Freightliner, and Caterpillar remain fully valid.',
    q2: 'Can the device cause interference or inject packets on the vehicle CAN network?',
    a2: 'No. The reader functions purely as a passive listener with zero transmitting circuitry connected to the vehicle bus. It is physically impossible for the hardware to inject rogue packets or interfere with electronic braking, steering, or transmission controls.',
    q3: 'Does it support mixed fleets with light-duty vehicles?',
    a3: 'Yes. The system automatically auto-detects baud rates and decodes commercial SAE J1939 and J1708 protocols as well as passenger and light-duty commercial OBD-II (ISO 15765-4 CAN) protocols.'
  },
  'Regional Compliance': {
    failure: 'an expired compliance certificate, unassigned driving miles, or a disconnected emergency panic loop',
    consequence: 'transport enforcement officers impound the vehicle on the spot, cargo sits stranded, and statutory fines eat up operating margins',
    rootCause: 'the vehicle telematics gateway lost government server synchronization or failed local tamper-loop checks mid-transit',
    solution: 'ensuring 100% statutory certification, continuous government server sync, and tamper-proof panic loop compliance',
    table: [
      { metric: 'Statutory Fitness First-Pass Rate', before: 'Frequent rejections & re-tests', after: '100% First-pass compliance', gain: 'Zero Impoundments' },
      { metric: 'Government Server Telemetry Sync', before: 'Frequent dropouts & audit flags', after: '99.9% Continuous live sync', gain: 'Unbroken Audit Trail' },
      { metric: 'Emergency Panic SOS Response Time', before: 'Delayed or unverified alerts', after: 'Instant cloud dispatch (<30s)', gain: 'Immediate Safety Gain' },
      { metric: 'Annual Statutory Penalty Spend', before: 'Heavy non-compliance fines', after: 'Zero regulatory penalties', gain: '100% Fine Elimination' },
      { metric: 'Payback Period', before: '—', after: 'Typically within 90 days', gain: 'Rapid Return' }
    ],
    q1: 'Is Atlanta hardware officially certified for regional government mandates?',
    a1: 'Yes. Atlanta Systems telematics gateways hold formal Type Approval Certificates and Conformity of Production from accredited government testing agencies (MoRTH AIS-140 in India, FMCSA ELD Part 395 in the US, European Smart Tachograph, and Saudi TGA WASAL).',
    q2: 'What happens if cellular connectivity drops in remote corridors?',
    a2: 'Our devices feature high-capacity on-board non-volatile memory that stores up to 60,000 encrypted telemetry packets during coverage blackouts and automatically syncs all historical records the moment connection is restored.',
    q3: 'Can local regional distributors integrate our compliance devices into third-party software?',
    a3: 'Yes. All telemetry records can be routed simultaneously to government command backends and to your private dispatch servers via standard REST APIs, MQTT, or HTTPS webhooks.'
  },
  'Fuel Fraud': {
    failure: 'unexplained fuel tank drainage, unauthorized siphoning, or fuel-card discrepancies',
    consequence: 'fuel shrinkage quietly drains between 8% and 15% of net operating profit margins every single month without detection',
    rootCause: 'factory dashboard float gauges have 10-15% mechanical blind spots at the top and bottom of the fuel tank',
    solution: 'capturing true millimeter-level fuel volume, live drop alerts, and precise refuel accounting across every trip',
    table: [
      { metric: 'Unaccounted Fuel Shrinkage / Theft', before: '8% – 15% monthly fuel loss', after: 'Under 1% total shrinkage', gain: '90%+ Theft Elimination' },
      { metric: 'Refueling Volume Reconciliation', before: 'Unverified paper fuel receipts', after: 'Millimeter digital match', gain: '100% Audit Integrity' },
      { metric: 'Unauthorized Siphoning Alerts', before: 'Undetected overnight drainage', after: 'Instant SMS / Cloud alert', gain: 'Immediate Protection' },
      { metric: 'Fleet Fuel Cost Savings', before: 'Baseline high fuel bills', after: 'Noticeably reduced fuel spend', gain: 'Substantial Savings' },
      { metric: 'Hardware Payback Period', before: '—', after: 'Typically within 60 to 90 days', gain: 'Immediate ROI' }
    ],
    q1: 'Will road corrugations and fuel sloshing trigger false theft alarms?',
    a1: 'No. Atlanta Systems capacitive probes and ultrasonic sensors utilize mathematical damping algorithms and built-in accelerometer feedback to filter out dynamic fuel sloshing during cornering and highway bumps.',
    q2: 'Is drilling required for installation?',
    a2: 'We offer both high-precision immersion capacitive probes (which mount securely into standard tank sender flanges) and non-invasive external ultrasonic sensors that attach directly to the tank underside with zero drilling.',
    q3: 'Can the fuel telemetry connect to reefer auxiliary tanks and stationary generators?',
    a3: 'Yes. The sensor output interfaces seamlessly with secondary fuel tanks, generator sets, and multi-compartment fuel tankers via RS232, RS485, or BLE 5.0 wireless links.'
  },
  'Cold Chain': {
    failure: 'a cooling compressor trip, undetected temperature excursion, or delayed door openings',
    consequence: 'hundreds of thousands of dollars in perishable pharmaceuticals or food cargo get rejected at the receiving dock, wiping out quarterly profits',
    rootCause: 'manual temperature data loggers only reveal thermal spikes hours after the cargo has already spoiled',
    solution: 'delivering real-time multi-point wireless temperature telemetry with instant excursion alerts before spoilage occurs',
    table: [
      { metric: 'Cargo Thermal Spoilage Rejections', before: 'Occasional catastrophic rejections', after: 'Zero temperature rejections', gain: '100% Spoilage Defense' },
      { metric: 'Temperature Audit Compliance', before: 'Manual paper logbook gaps', after: 'Automated NIST-traceable logs', gain: 'Full Pharma Compliance' },
      { metric: 'Reefer Auxiliary Fuel Consumption', before: 'Unmonitored reefer run-hours', after: 'Optimized duty cycles', gain: 'Meaningful Fuel Savings' },
      { metric: 'Insurance Cargo Claims', before: 'High risk of dispute', after: 'Unbroken digital evidence', gain: 'Fast Claim Defense' },
      { metric: 'Payback Period', before: '—', after: 'Typically after a single saved load', gain: 'Immediate ROI' }
    ],
    q1: 'How do the temperature sensors communicate through insulated refrigerated trailers?',
    a1: 'Atlanta Systems wireless SenseEV temperature probes use high-gain BLE 5.0 signals engineered to penetrate heavy polyurethane insulation and metallic reefer walls without running wires through trailer doors.',
    q2: 'What is the sensor accuracy and calibration standard?',
    a2: 'Each probe is factory calibrated to ±0.2°C accuracy across an industrial operating range of -40°C to +85°C and complies with international GDP (Good Distribution Practice) and FDA 21 CFR Part 11 standards.',
    q3: 'Can multiple temperature zones and humidity levels be monitored in a single trailer?',
    a3: 'Yes. A single Atlanta telematics gateway supports up to 16 concurrent wireless BLE sensors monitoring frozen, chilled, ambient, and humidity zones simultaneously.'
  },
  'AI Video Telematics': {
    failure: 'a severe blind-spot collision, distracted driving incident, or false liability crash claim',
    consequence: 'massive insurance litigation payouts, carrier safety score downgrades, vehicle downtime, and devastating accident claims',
    rootCause: 'mirrors leave massive 3-meter blind zones and traditional forward dashcams cannot monitor driver fatigue or inattention',
    solution: 'combining forward ADAS machine vision, DMS driver-eye tracking, and millimeter-wave radar for proactive collision prevention',
    table: [
      { metric: 'Preventable Fleet Collisions', before: 'Frequent minor & severe crashes', after: 'Over 70% crash reduction', gain: 'Significant Safety Gain' },
      { metric: 'False Liability Insurance Claims', before: 'Costly 50/50 dispute payouts', after: '100% Exonerated with HD video', gain: 'Zero False Payouts' },
      { metric: 'Driver Inattention & Fatigue Events', before: 'Undetected until near-misses', after: 'Real-time in-cab audio alerts', gain: '85%+ Fatigue Reduction' },
      { metric: 'Fleet Insurance Premiums', before: 'High, rising commercial rates', after: 'Substantial carrier rebates', gain: 'Direct Cost Savings' },
      { metric: 'Payback Period', before: '—', after: 'Typically within 3 to 6 months', gain: 'Rapid Return' }
    ],
    q1: 'Does the in-cab DMS camera record passenger audio or compromise driver privacy?',
    a1: 'Our AI video processors process driver eye-tracking, yawning, and phone use strictly on-edge. Video uploads are event-triggered (e.g. harsh braking, forward collision warning, or severe fatigue), protecting driver privacy during standard driving.',
    q2: 'How does the blind spot detection radar perform in heavy rain and fog?',
    a2: 'Unlike optical cameras that get blinded by mud, spray, or darkness, our 77GHz millimeter-wave radar penetrates heavy fog, downpours, and pitch-black nights with 99.8% detection reliability.',
    q3: 'Can fleet managers live-stream video from the vehicles?',
    a3: 'Yes. Fleet safety dispatchers can initiate dual-channel HD live streaming over 4G Cat-4 / Cat-6 LTE whenever an urgent SOS panic alert or collision event is triggered.'
  },
  'Vehicle Telematics': {
    failure: 'unauthorized driver detours, harsh aggressive driving, and unmonitored maintenance schedules',
    consequence: 'accelerated vehicle wear, excessive fuel burn, missed customer SLAs, and unexplained vehicle downtime',
    rootCause: 'managing operations through verbal driver check-ins and delayed manual spreadsheets instead of hardware-grade telemetry',
    solution: 'providing second-by-second vehicle tracking, automated geofencing, driver scorecards, and predictive maintenance dispatch',
    table: [
      { metric: 'On-Time Customer Delivery Rate', before: 'Unpredictable delays & SLA misses', after: '98%+ On-time dispatch', gain: 'High Customer Retention' },
      { metric: 'Unauthorized Route Detours', before: 'Frequent personal use & detours', after: 'Virtually eliminated', gain: 'Full Route Compliance' },
      { metric: 'Fleet Idling & Aggressive Driving', before: 'High fuel waste & brake wear', after: '30%+ Reduction in idle hours', gain: 'Measurable Savings' },
      { metric: 'Vehicle Maintenance Predictability', before: 'Costly emergency repairs', after: 'Scheduled by actual odometer', gain: 'Longer Asset Lifespan' },
      { metric: 'Payback Period', before: '—', after: 'Typically within 60 days', gain: 'Fast Return' }
    ],
    q1: 'What is the GPS positioning accuracy and update rate?',
    a1: 'Our hardware features multi-constellation GNSS (GPS, GLONASS, Galileo, BeiDou) tracking sub-2.5m CEP accuracy with configurable update rates from 1 second up to 60 seconds.',
    q2: 'Can the tracker detect vehicle towing or battery disconnection?',
    a2: 'Yes. Every unit includes an internal high-capacity backup Li-ion battery and internal 3-axis accelerometer that triggers instant cloud alerts if power cables are cut or the vehicle is towed.',
    q3: 'Can we configure remote immobilizer output for vehicle theft recovery?',
    a3: 'Yes. The digital output interfaces with standard automotive relays allowing dispatchers to remotely disable engine restart safely once vehicle speed drops below 5 km/h.'
  },
  'Cross-Border Telematics': {
    failure: 'cellular roaming blackouts, dropped data packets at international borders, and astronomical roaming fees',
    consequence: 'trailers lose tracking for days across foreign borders, customs clearances stall, and cargo location remains completely dark',
    rootCause: 'consumer-grade single-operator SIM cards that fail to negotiate roaming agreements at international border crossings',
    solution: 'providing industrial multi-IMSI eSIM connectivity that auto-switches to the strongest Tier-1 carrier across 140+ countries',
    table: [
      { metric: 'Border Crossing Connection Uptime', before: 'Extended dead-zones (days dark)', after: '99.9% Continuous border tracking', gain: 'Zero Data Loss' },
      { metric: 'International Roaming Overhead', before: 'Astronomical carrier roaming bills', after: 'Predictable flat global rate', gain: 'Substantial Cost Control' },
      { metric: 'Customs & Port Drayage Delays', before: 'Frequent manual inspection delays', after: 'Automated geofenced clearance', gain: 'Faster Turnaround' },
      { metric: 'High-Value Cargo Security', before: 'Blind spots during cross-border transit', after: '24/7 Monitored freight', gain: 'Total Peace of Mind' },
      { metric: 'Payback Period', before: '—', after: 'Typically within 60 to 90 days', gain: 'Immediate ROI' }
    ],
    q1: 'How does the multi-IMSI eSIM switch networks across borders?',
    a1: 'The embedded eSIM stores multiple international carrier profiles on silicon. When crossing into another country, the modem detects carrier handoff and switches to the local Tier-1 partner in less than 45 seconds without physical SIM swapping.',
    q2: 'Does the hardware comply with international customs and port security requirements?',
    a2: 'Yes. Atlanta Systems gateways are engineered to meet global port drayage, bonded transit, and intermodal customs standards with encrypted cryptographic data transport.',
    q3: 'Can third-party software platforms ingest cross-border telemetry?',
    a3: 'Yes. Our universal gateway protocol bridges directly into SAP, Oracle Transportation Management, or your custom telematics backend via secure REST webhooks and MQTT streams.'
  }
};

function transformBlog(content, fileName) {
  // Extract frontmatter / top metadata
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const metadata = {};
  let title = '';
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ') && !title) {
      title = trimmed.replace(/^#\s+/, '').trim();
      continue;
    }
    const match = trimmed.match(/^\*\s*\*\*([^*]+)\*\*:\s*`?([^`\n]+)`?/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim();
      metadata[key] = val;
    }
    if (trimmed === '---') break;
  }

  // Clean title from duplication
  let cleanTitle = title;
  cleanTitle = cleanTitle.replace(/Across ([^,]+), ([^A-Z]+)\s+Across \1, \2/gi, 'Across $1, $2');
  cleanTitle = cleanTitle.replace(/Across ([^:]+)\s+Across \1/gi, 'Across $1');
  cleanTitle = cleanTitle.replace(/\s+/g, ' ').trim();

  const city = metadata['City'] || 'Global';
  const country = metadata['Country'] || 'Fleet Hub';
  const category = metadata['Category'] || 'Vehicle Telematics';
  let hardwareModel = metadata['Hardware Model'] || 'Atlanta Systems Industrial Telematics';
  if (hardwareModel.includes('EC-400') && (fileName.includes('03-') || fileName.includes('can-bus'))) {
    hardwareModel = 'VTC 110 / VTC 500 CAN-Bus Reader';
  }
  const slug = metadata['Slug'] || fileName.replace(/\.md$/, '');
  const publishedDate = metadata['Published Date'] || '2026-08-29';
  const readTime = metadata['Estimated Read Time'] || '12 min read';
  const seoKeywords = metadata['SEO Keywords'] || `${hardwareModel}, ${city} Telematics, ${category}, Atlanta Systems, Fleet IoT`;
  const citySlug = metadata['City Slug'] || city.toLowerCase().replace(/\s+/g, '-');
  const geoRegion = metadata['Geo Region'] || 'Global';

  // Clean corridor extraction
  let localCorridor = `major transport corridors across ${city}`;
  const corridorMatch = content.match(/(?:along|across|on|outside|serving)\s+((?:(?:Interstate|Highway|State Highway|Autostrada|Autovía|Expressway|Motorway|Ring Road|Corridor|Beltway|Sheikh Zayed Road|E11|NH-?\d+|I-\d+|M\d+|A\d+)[^,\n]+?)(?=\s+(?:outside|in\s+[A-Z]|will|facing|requires|when|\.|\,)))/i);
  if (corridorMatch && corridorMatch[1]) {
    const c = corridorMatch[1].trim();
    if (c.length > 5 && c.length < 80) {
      localCorridor = c;
    }
  }

  const challengeInfo = CATEGORY_CHALLENGES[category] || CATEGORY_CHALLENGES['Vehicle Telematics'];

  // Build the rewritten content in the authentic "By Digital Team" style
  let out = `# ${cleanTitle}\n\n`;
  out += `* **Slug**: \`${slug}\`\n`;
  out += `* **Category**: ${category}\n`;
  out += `* **City**: ${city}\n`;
  out += `* **City Slug**: \`${citySlug}\`\n`;
  out += `* **Country**: ${country}\n`;
  out += `* **Geo Region**: ${geoRegion}\n`;
  out += `* **Hardware Model**: ${hardwareModel}\n`;
  out += `* **Author**: Digital Team\n`;
  out += `* **Published Date**: ${publishedDate}\n`;
  out += `* **Estimated Read Time**: ${readTime}\n`;
  out += `* **SEO Keywords**: ${seoKeywords}\n\n`;
  out += `---\n\n`;

  // Executive Summary
  out += `## Executive Summary\n\n`;
  out += `Commercial fleets operating heavy vehicles along ${localCorridor} face some of the most demanding operational duty cycles in ${country} — continuous hauls, heavy loads, and relentless commercial deadlines. In these demanding environments, consumer-grade tracking electronics quickly fail. This technical report details how Atlanta Systems engineered the **${hardwareModel}** to address ${challengeInfo.solution}, and what commercial fleet operators and regional distributors can realistically expect from deploying our battle-tested hardware.\n\n`;

  // Table of Contents
  out += `## Table of Contents\n\n`;
  out += `1. [The Real-World Operational Challenge in ${city}](#the-real-world-operational-challenge-in-${city.toLowerCase().replace(/[^a-z0-9]/g, '-')})\n`;
  out += `2. [Hardware Engineering & Direct Telemetry Architecture](#hardware-engineering--direct-telemetry-architecture)\n`;
  out += `3. [What Fleets Typically See After Deployment](#what-fleets-typically-see-after-deployment)\n`;
  out += `4. [Technical Questions Answered by Our Engineers](#technical-questions-answered-by-our-engineers)\n`;
  out += `5. [Put Battle-Tested Telematics on Your Fleet Today](#put-battle-tested-telematics-on-your-fleet-today)\n\n`;
  out += `---\n\n`;

  // Section 1: The Problem (Conversational B2B voice from By Digital Team)
  out += `## The Real-World Operational Challenge in ${city}\n\n`;
  out += `Ask any fleet maintenance director or operations manager in ${city} about their worst calls, and you will usually hear some version of the same story: a commercial vehicle stranded along ${localCorridor} due to ${challengeInfo.failure}. A critical delivery stops dead in its tracks, ${challengeInfo.consequence}.\n\n`;
  out += `The frustrating reality is that these operational crises are rarely sudden. In almost every case, ${challengeInfo.rootCause}. Without an industrial-grade telemetry system actively monitoring and broadcasting that data to the dispatch desk in real time, no one catches it until the vehicle is broken down on the highway.\n\n`;
  out += `---\n\n`;

  // Section 2: Hardware Architecture
  out += `## Hardware Engineering & Direct Telemetry Architecture\n\n`;
  out += `Many operators hesitate to adopt advanced telemetry because traditional hardware requires intrusive wire splicing that voids vehicle OEM warranties, introduces fire hazards, or causes communication glitches on the vehicle bus.\n\n`;
  out += `Atlanta Systems engineered the **${hardwareModel}** to solve this exact problem. Designed and manufactured in our ISO 9001 SMT electronics plants, the device delivers deep real-time telematics without compromising vehicle electrical integrity. Integrated sensors capture high-frequency metrics: engine parameters, velocity profiles, location fixes, and alarm loops are processed directly on-edge before secure transmission.\n\n`;
  out += `+-----------------------------------------------------------------------------------+\n`;
  out += `|             ATLANTA SYSTEMS INDUSTRIAL TELEMATICS HARDWARE ARCHITECTURE          |\n`;
  out += `+-----------------------------------------------------------------------------------+\n`;
  out += `|  [Satellite Engine]   -> Quad-Constellation Multi-Frequency GNSS (Sub-2.5m CEP)     |\n`;
  out += `|  [Motion Analytics]   -> Internal 6-Axis MEMS Gyro & High-G Impact Accelerometer  |\n`;
  out += `|  [Power Conditioning] -> 9-36V DC Wide Input with 60V Transient Voltage Suppressor|\n`;
  out += `|  [Cellular Uplink]    -> Industrial 4G Cat-1 / Cat-M1 with Embedded Multi-IMSI eSIM   |\n`;
  out += `|  [Enclosure Rating]   -> IP67 Heavy Industrial Dust & Water Ingress Protection      |\n`;
  out += `+-----------------------------------------------------------------------------------+\n\n`;
  out += `---\n\n`;

  // Section 3: Documented Gains Table
  out += `## What Fleets Typically See After Deployment\n\n`;
  out += `Fleets that move from reactive roadside repairs to proactive telemetry monitoring consistently report measurable gains across core operational benchmarks. The table below represents the performance improvements commercial carriers typically experience after deploying the **${hardwareModel}**:\n\n`;
  out += `| Operational Metric | Typical Before | Typical After | Directional Gain |\n`;
  out += `| :--- | :--- | :--- | :--- |\n`;
  challengeInfo.table.forEach(row => {
    out += `| **${row.metric}** | ${row.before} | ${row.after} | **${row.gain}** |\n`;
  });
  out += `\n---\n\n`;

  // Section 4: Technical Q&A
  out += `## Technical Questions Answered by Our Engineers\n\n`;
  out += `### Q1: ${challengeInfo.q1}\n${challengeInfo.a1}\n\n`;
  out += `### Q2: ${challengeInfo.q2}\n${challengeInfo.a2}\n\n`;
  out += `### Q3: ${challengeInfo.q3}\n${challengeInfo.a3}\n\n`;
  out += `---\n\n`;

  // Section 5: Closing + Dual-Track Lead Generation
  out += `## Put Battle-Tested Telematics on Your Fleet Today\n\n`;
  out += `If you manage commercial transport, logistics, or distribution operations in ${city} or across ${country}, unmonitored fuel loss, preventable breakdowns, and regulatory compliance friction do not have to be accepted as fixed operating costs.\n\n`;
  out += `Atlanta Systems has spent more than 32 years building rugged, industrial-grade electronics that survive demanding commercial duty cycles worldwide. Our telemetry hardware powers over 1,000,000 connected commercial assets across 27+ countries. Our team is ready to help you close operational blind spots, protect your assets, and put verifiable savings back into your business.\n\n`;
  out += `* **Explore Commercial Trackers**: Review our [Atlanta Systems Vehicle Telematics](/trackers/vehicle-telematics) and [Asset & Personal Trackers](/trackers/assets-&-personal-telematics).\n`;
  out += `* **Deploy AI Video Telematics**: Equip your fleet with [AI Video Dashcams and MDVR](/trackers/video-telematics) or [ADAS Collision Warning Systems](/adas).\n`;
  out += `* **Stop Fuel Theft**: Inspect our high-precision [IoT Sensors and Capacitive Fuel Probes](/trackers/iot-sensors) and [CAN-Bus J1939 Decoders](/trackers/obd-telematics).\n`;
  out += `* **Browse Complete Solutions**: View our [Enterprise Asset Management Platforms](/asset-management) and complete [All Atlanta Products Catalog](/all-product).\n`;
  out += `* **Discover Regional Deployments**: See our local fleet case studies across [Atlanta Global Locations](/locations).\n\n`;
  out += `### High-Intent Lead Channels:\n`;
  out += `* **For End-to-End Fleets (Pilot & Trial Units)**: Request sample test units for your vehicles. [Contact Our Engineering Team Directly](/contact) — we will ship test hardware to your workshop, walk your technicians through non-invasive installation, and demonstrate live telemetry on your own dispatch dashboard.\n`;
  out += `* **For Systems Integrators, Distributors & Resellers**: Partner with Atlanta Systems to distribute our hardware in ${city} and regional territories. Benefit from wholesale OEM pricing, certified REST APIs, white-label telematics dashboards, and dedicated Tier-2 technical support. [Explore our Partner & Reseller Program](/reseller).\n`;

  return out;
}

// If run directly: process all 300 blogs
if (require.main === module) {
  const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));
  console.log(`Starting transformation of ${files.length} blogs...`);
  let count = 0;
  for (const f of files) {
    const p = path.join(blogsDir, f);
    const raw = fs.readFileSync(p, 'utf8');
    const updated = transformBlog(raw, f);
    fs.writeFileSync(p, updated, 'utf8');
    count++;
  }
  console.log(`Successfully transformed all ${count} blogs to the By Digital Team engineering style!`);
}

module.exports = { transformBlog, blogsDir };
