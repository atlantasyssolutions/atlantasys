const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '..', 'ATLANTA_300_BLOG_GOOGLE_FLOW_IMAGE_PROMPTS.md');
const blogDir = path.join(__dirname, '..', 'content', 'blogs');

const promptsContent = fs.readFileSync(catalogPath, 'utf8');
const sections = promptsContent.split(/\n###\s+/).slice(1);

const cityCorridors = {
  'New Delhi': 'NH48 Delhi–Jaipur Expressway and the Kundli-Manesar-Palwal (KMP) Expressway',
  'Mumbai': 'Mumbai–Pune Expressway and JNPT Port freight access routes',
  'Bengaluru': 'Electronic City Elevated Expressway and the Hosur Road industrial corridor',
  'Chennai': 'Chennai Port–Maduravoyal corridor and the Sriperumbudur automotive belt',
  'Kolkata': 'NH16 Golden Quadrilateral corridor and Kolkata Port drayage routes',
  'Hyderabad': 'Nehru Outer Ring Road and the Shamshabad logistics corridor',
  'Dubai': "Dubai's E11 Sheikh Zayed Road and the E311/E611 freight bypass corridors",
  'Abu Dhabi': 'E11 Sheikh Khalifa Highway connecting Musaffah Industrial Zone to Khalifa Port',
  'Riyadh': 'Riyadh–Dammam Highway 40 and the Southern Ring Road freight bypass',
  'Jeddah': 'Jeddah Islamic Port drayage arterial and the Highway 15 logistics corridor',
  'Doha': 'Salwa Road cross-border arterial and the Mesaieed industrial logistics spine',
  'Kuwait City': 'Highway 80 (Desert Highway) and Shuwaikh Port commercial access routes',
  'Muscat': 'Batinah Expressway and the Muscat–Sohar industrial coastal freight link',
  'London': 'London M25 orbital motorway and the Dartford Crossing freight corridor',
  'Paris': 'Paris Boulevard Périphérique and the A1 Autoroute du Nord logistics route',
  'Frankfurt': 'Frankfurter Kreuz interchange connecting Autobahn A3 and A5 freight corridors',
  'Hamburg': 'Port of Hamburg Waltershof container terminal and the A1/A7 Autobahn freight routes',
  'Berlin': 'Berliner Ring A10 and the A11/A12 Trans-European corridors',
  'Munich': 'A8 and A9 Autobahn routes connecting Bavaria to alpine transit tunnels',
  'Rotterdam': 'Port of Rotterdam Maasvlakte terminals and the A15 Betuwe freight corridor',
  'Antwerp': 'Port of Antwerp container docks and the E19/E313 multimodal corridor',
  'Warsaw': 'Autostrada A2 Trans-European corridor and the Warsaw Ring S2/S8 expressways',
  'Madrid': 'Madrid M-40/M-50 orbital networks and the A-2 Zaragoza freight corridor',
  'Barcelona': 'AP-7 Mediterranean Highway and Port of Barcelona logistics park (ZAL)',
  'Milan': 'Autostrada A4 Serenissima traversing the industrial Po Valley freight basin',
  'Rome': 'Grande Raccordo Anulare (GRA) and the A1 Autostrada del Sole',
  'Houston': "Houston's I-10 Energy Corridor and Port of Houston Bayport drayage routes",
  'Dallas': 'Interstate 35 and Interstate 20 NAFTA transcontinental freight corridors',
  'Chicago': 'Chicago intermodal rail yards and the I-55/I-80 cross-country freight interchange',
  'Los Angeles': 'I-710 Long Beach Freeway drayage corridor connecting Long Beach and LA ports',
  'New York': 'I-95 Cross Bronx Expressway and Port Newark–Elizabeth marine terminal',
  'Atlanta': 'I-285 perimeter loop and the I-75/I-85 downtown logistics corridors',
  'Miami': 'US-27 agricultural trucking spine and Florida Turnpike cold chain corridor to PortMiami',
  'Seattle': 'I-5 Pacific Northwest freight corridor connecting Seattle/Tacoma ports to Canada',
  'Phoenix': 'Interstate 10 and Loop 202 desert logistics corridor across the Valley',
  'Denver': 'I-70 mountain corridor crossing the Rockies through the Eisenhower Tunnel',
  'Mexico City': 'Circuito Exterior Mexiquense (CEM) and Autopista México–Puebla (Route 150D)',
  'Monterrey': 'Carretera Monterrey–Nuevo Laredo (Federal Highway 85D) trade artery',
  'Guadalajara': 'Guadalajara–Manzanillo freight corridor (Federal Highway 54D)',
  'São Paulo': 'Rodovia dos Imigrantes and Rodovia Presidente Dutra (BR-116) corridor',
  'Rio de Janeiro': 'Rodovia Washington Luís (BR-040) and Rio de Janeiro Port arterial',
  'Buenos Aires': 'Autopista Panamericana (Ruta Nacional 9) to Rosario and Port of Buenos Aires',
  'Santiago': 'Route 68 and Autopista Central connecting Santiago to the Port of Valparaíso',
  'Lima': 'Carretera Central (Route 22) crossing the Andean mountain pass at Ticlio',
  'Bogotá': 'Autopista Sur climbing through Alto de Rosas to the Bogotá–Girardot freight route',
  'Johannesburg': 'N3 freight highway connecting Johannesburg to the Port of Durban',
  'Cape Town': 'N1 National Route entering Cape Town and Port of Cape Town container hub',
  'Nairobi': 'Mombasa–Nairobi A104 Northern Corridor transport route',
  'Casablanca': 'Port of Casablanca freight access routes and the A1 Autoroute to Tangier Med',
  'Cairo': 'Cairo–Alexandria Desert Road and the Eastern Ring Road logistics belt',
  'Memphis': 'I-40 / I-55 Mississippi River crossing and Memphis FedEx/BNSF logistics hub',
  'Bucharest': 'Centura București (Ring Road) and Autostrada A1 to the Pitești automotive cluster',
  'Dammam': 'Dammam–Abu Hadriyah Highway and King Abdulaziz Port drayage routes'
};

function extractCorridor(title, city, country) {
  let t = title.replace(/^\d+\.\s*/, '').trim();
  t = t.replace(/\s+(?:Fleets|Fleet|Operators|Operator|Needs|Solutions|Reliability|Compliance|Hardware|Data|Prepared|Meeting|Supporting|Achieving|Streaming|Capturing|Delivering|Mitigating|Producing|Optimizing|Deployments|Units|Runs|Hauls|Routes|Operations)$/i, '');

  const preps = ['in', 'on', 'across', 'along', 'between', 'through', 'into', 'near', 'connecting', 'to'];
  for (const prep of preps) {
    const regex = new RegExp(`\\b${prep}\\s+([A-Z0-9\\u00C0-\\u024F][\\w\\s\\/\\–\\-\\–\\&\\\'\\’\\.]+?(?:Highway|Motorway|Motorways|Autobahn|Autopista|Autoroute|Autostrada|Expressway|Corridor|Corridors|Routes|Route|Yards|Port|Ports|Bay|Terminal|Terminals|Pass|Hub|Interstate|Ring Road|Bypass|Flyover|Turnpike|Road|Roads|Basin|Drayage|Arteries|Artery|Valley|Alps|Andes|Desert|Border|Free Zone|Belt))`, 'i');
    const m = t.match(regex);
    if (m && m[1]) {
      let loc = m[1].trim();
      loc = loc.replace(/^(the|an|a)\s+/i, '');
      if (loc.length > 5 && !loc.toLowerCase().includes('atlanta systems')) {
        return loc;
      }
    }
  }

  if (cityCorridors[city]) {
    return cityCorridors[city];
  }

  return `${city} regional commercial transport routes and freight corridors`;
}

function extractCoreSubject(title) {
  let t = title.replace(/^\d+\.\s*/, '').trim();
  t = t.replace(/by Atlanta Systems\b/gi, '')
       .replace(/from Atlanta Systems\b/gi, '')
       .replace(/Atlanta Systems’\b/gi, '')
       .replace(/Atlanta Systems'\b/gi, '')
       .replace(/Atlanta Systems\b/gi, '')
       .replace(/\s+/g, ' ').trim();
  return t;
}

function buildStory(blog, index) {
  const { title, fn, category, city, country, hwModel, prompt, corridor } = blog;
  const hw = hwModel || 'industrial telematics hardware';
  const subject = extractCoreSubject(title);

  // 25 distinct literary framing templates for Executive Summary
  const frames = [
    `Along the high-traffic freight arteries of ${corridor}, ${subject.toLowerCase()} has emerged as an indispensable operational priority for commercial carriers operating in ${city}.`,
    `Traversing ${corridor} places commercial vehicles through an unforgiving stress test where ${subject.toLowerCase()} makes the vital difference between on-time delivery and costly roadside downtime.`,
    `For fleet operators navigating the complex logistics corridors of ${corridor}, mastering ${subject.toLowerCase()} is essential to maintaining profitability across ${country}.`,
    `Few commercial transport corridors in ${country} test ${subject.toLowerCase()} as rigorously as ${corridor}.`,
    `On the demanding tarmac of ${corridor}, commercial fleets face an operating environment where ${subject.toLowerCase()} requires uncompromising hardware resilience.`,
    `Behind every seamless freight movement across ${corridor} lies the technical challenge of ${subject.toLowerCase()}, where consumer-grade tracking electronics quickly fail under heavy continuous duty cycles.`,
    `Operating heavy commercial vehicles along ${corridor} demands unyielding data precision, making ${subject.toLowerCase()} a cornerstone of modern fleet management in ${city}.`,
    `Between relentless delivery deadlines and stringent transport enforcement along ${corridor}, commercial operators in ${country} can no longer afford compromises when it comes to ${subject.toLowerCase()}.`,
    `At highway speeds across ${corridor}, the operational stakes of ${subject.toLowerCase()} become immediately apparent to dispatch controllers and fleet maintenance directors alike.`,
    `The logistics pulse of ${city} relies heavily on ${corridor}, where executing ${subject.toLowerCase()} with military-grade reliability separates leading commercial carriers from struggling operators.`,
    `Out on ${corridor}, where heavy chassis vibration and rapid temperature swings take their toll on vehicle electronics, ${subject.toLowerCase()} demands purpose-built industrial engineering.`,
    `Navigating the intense commercial rhythm of ${corridor} leaves zero room for electronic errors, transforming ${subject.toLowerCase()} into a mission-critical safeguard for fleets in ${city}.`,
    `In the fast-paced commercial freight environment of ${country}, long-haul haulers running ${corridor} depend on ${subject.toLowerCase()} to stay connected, compliant, and ahead of schedule.`,
    `As heavy transport rigs rumble past inspection bays and intermodal ramps along ${corridor}, ${subject.toLowerCase()} serves as the primary line of defense against unexpected transit delays.`,
    `Managing commercial duty cycles along ${corridor} is an unforgiving task where ${subject.toLowerCase()} protects high-value assets and cargo from costly operational vulnerabilities.`,
    `From early morning dispatch queues to overnight transcontinental hauls across ${corridor}, ${subject.toLowerCase()} stands as a critical benchmark for transport efficiency in ${city}.`,
    `When heavy commercial transports enter ${corridor}, the convergence of severe road shocks and tight turnaround times makes ${subject.toLowerCase()} an operational imperative.`,
    `Across the vital logistics corridors connecting ${corridor}, fleet supervisors recognize that ${subject.toLowerCase()} cannot be entrusted to fragile, off-the-shelf telematics gear.`,
    `Every commercial hauler deployed along ${corridor} operates under relentless commercial pressure, where executing ${subject.toLowerCase()} without data loss is vital to preserving operating margins.`,
    `On the asphalt lanes of ${corridor}, where commercial traffic moves round the clock across ${country}, ${subject.toLowerCase()} provides the real-time foundation for intelligent fleet operations.`,
    `For dispatch teams in ${city} tracking vehicles across ${corridor}, maintaining total operational control through ${subject.toLowerCase()} is the only way to avoid blind spots and costly penalties.`,
    `The demanding road geometry and heavy cargo volumes characteristic of ${corridor} create an extreme proving ground where ${subject.toLowerCase()} is tested day and night.`,
    `Driving fleet productivity along ${corridor} requires robust technology, making ${subject.toLowerCase()} an essential capability for competitive commercial carriers in ${country}.`,
    `As freight density continues to surge along ${corridor}, commercial transport directors in ${city} are turning their attention to ${subject.toLowerCase()} to safeguard their vehicles.`,
    `Under the grueling duty cycles of ${corridor}, vehicle electronics face non-stop thermal and mechanical stress, underscoring why ${subject.toLowerCase()} requires specialized industrial hardware.`
  ];

  const execOpening = frames[index % frames.length];
  const execSummary = `## Executive Summary\n\n${execOpening} In these demanding environments, off-the-shelf tracking devices frequently succumb to vibration fatigue, cellular dropouts, and thermal failure. This technical report examines how Atlanta Systems engineered the **${hw}** to deliver robust edge telemetry and seamless integration, giving fleet executives in ${city} complete operational visibility and uninterrupted statutory compliance.`;

  // 25 distinct literary framing templates for Challenge, ALSO weaving subject and corridor
  const chalFrames = [
    `Ask any veteran fleet maintenance director or operations superintendent in ${city} about their most challenging moments with ${subject.toLowerCase()}, and the discussion quickly turns to unexpected telematics failures along ${corridor}.`,
    `At 02:45 AM, emergency calls to dispatch offices in ${city} regarding ${subject.toLowerCase()} rarely bring good news, especially when a commercial vehicle goes dark on ${corridor}.`,
    `The operational reality along ${corridor} is uncompromising: when a heavy commercial transport suffers a breakdown while managing ${subject.toLowerCase()}, the financial and regulatory clock starts ticking immediately.`,
    `For logistics supervisors overseeing transit schedules across ${country}, few occurrences cause more immediate disruption than a sudden glitch in ${subject.toLowerCase()} along ${corridor}.`,
    `Every fleet manager operating out of ${city} has faced the costly nightmare of an unexpected roadside stoppage on ${corridor} caused by unreliable systems supporting ${subject.toLowerCase()}.`,
    `Along the high-traffic stretches and inspection zones of ${corridor}, transport authorities hold commercial haulers to exacting statutory standards regarding ${subject.toLowerCase()}.`,
    `When an 80,000-pound commercial tractor pulls onto ${corridor}, the margin between profitable transit and an expensive roadside impoundment during ${subject.toLowerCase()} is razor-thin.`,
    `On the hard shoulders and weigh station inspection bays of ${corridor}, minor electronic faults in systems handling ${subject.toLowerCase()} routinely escalate into five-figure operational losses.`,
    `The true test of fleet management in ${city} occurs not in dispatch planning, but out on ${corridor} when unexpected equipment failures compromise ${subject.toLowerCase()} mid-transit.`,
    `Fleet directors managing logistics through ${city} understand that roadside failures along ${corridor} during ${subject.toLowerCase()} are rarely sudden—they are the predictable result of deploying consumer-grade electronics into heavy industrial environments.`,
    `Navigating the intense commercial tempo of ${corridor} leaves zero time for diagnosing intermittent sensor glitches or unreliable wireless connections while managing ${subject.toLowerCase()}.`,
    `For logistics supervisors responsible for transit commitments along ${corridor}, keeping freight moving means eliminating hardware vulnerabilities in ${subject.toLowerCase()} before vehicles leave the depot.`,
    `In the competitive transport landscape of ${country}, carriers navigating ${corridor} face an aggressive convergence of regulatory enforcement and tight delivery windows tied directly to ${subject.toLowerCase()}.`,
    `A single unexpected stoppage along ${corridor} can cascade across an entire logistics chain, especially when failures in ${subject.toLowerCase()} trigger missed appointments and contractual delay penalties.`,
    `Out on ${corridor}, commercial tractors encounter severe multi-axis shocks, aggressive electrical transients, and weather extremes that systematically degrade generic tracking dongles used for ${subject.toLowerCase()}.`,
    `The dispatch logs in ${city} tell an unmistakable story: commercial haulers that rely on consumer-grade tracking electronics for ${subject.toLowerCase()} experience significantly higher rates of unscheduled roadside downtime on ${corridor}.`,
    `Few scenarios frustrate a logistics manager in ${city} more than discovering that a vehicle on ${corridor} was cited for an infraction related to ${subject.toLowerCase()} that the dashboard console failed to flag.`,
    `On the bustling freight lines of ${corridor}, commercial transports must maintain continuous, unbroken telemetry for ${subject.toLowerCase()} or risk immediate regulatory intervention by regional enforcement authorities.`,
    `When heavy vehicles endure the punishing duty cycles of ${corridor}, the fundamental operational challenge lies in ensuring that systems tracking ${subject.toLowerCase()} distinguish genuine mechanical emergencies from false sensor alarms.`,
    `The daily operational grind along ${corridor} ruthlessly exposes every design compromise in a fleet’s telematics architecture, turning cheap hardware deployed for ${subject.toLowerCase()} into major financial liabilities.`,
    `Dispatch controllers in ${city} know that once a commercial truck pulls past the city limits onto ${corridor}, reliable real-time telemetry for ${subject.toLowerCase()} is the only lifeline connecting the vehicle to headquarters.`,
    `In the heavy freight sectors operating across ${corridor}, vehicle downtime related to ${subject.toLowerCase()} is measured not just in repair bills, but in compromised client contracts and lost market reputation.`,
    `Behind the wheel of a commercial freight carrier navigating ${corridor}, drivers must focus completely on road safety without being distracted by failing telematics or false alarms stemming from ${subject.toLowerCase()}.`,
    `For transport operators running intermodal links and distribution loops around ${city}, maintaining continuous asset accountability during ${subject.toLowerCase()} on ${corridor} is an everyday operational battle.`,
    `The high-speed freight movements and challenging road surfaces of ${corridor} demand telematics hardware that executes ${subject.toLowerCase()} while treating extreme vibration, heat, and electrical noise as standard operating conditions.`
  ];

  const chalHook = chalFrames[(index * 7 + 11) % chalFrames.length];

  // Specific scenario & root cause based on category
  let scenarioText = '';
  let rootCauseText = '';

  if (category === 'AI Video Telematics') {
    scenarioText = `The scenario is all too common: a commercial tractor hauling freight along ${corridor} navigates sudden stop-and-go congestion or a tight blind-spot merge. An undetected cyclist or merging vehicle triggers a near-miss, or a drowsy driver begins drifting from the lane. Without on-edge AI video alerts, the driver has no warning, and dispatch only learns of the hazard after an expensive collision claim or statutory inspection stop.`;
    rootCauseText = `The deeper operational reality is that standard telematics cannot prevent accidents with delayed cloud processing. Processing high-resolution video streams across ${corridor} requires automotive-grade NPUs running local neural network models that detect lane departure, forward collisions, and driver distraction in less than 100 milliseconds, coupled with ruggedized IP67 camera housings that endure continuous thermal stress and windshield vibration.`;
  } else if (category === 'Fuel Fraud') {
    scenarioText = `The scenario is all too common: a commercial tractor makes an overnight layover along ${corridor}. Hours later, the driver starts the engine only to find the fuel tank gauge resting on empty, with hundreds of liters of diesel siphoned under cover of darkness. In the dispatch room, legacy float sensors never registered the drop because the vehicle ignition was off, leaving the fleet with an unrecoverable fuel loss and an urgent delivery delayed.`;
    rootCauseText = `The deeper operational reality is that factory float sensors and consumer fuel gauges were never engineered for fraud detection. Diesel expands and contracts with temperature swings along ${corridor}, while road vibration causes fuel to slosh violently against tank baffles. Preventing theft requires high-precision capacitive probes with 99.5% liquid accuracy, dynamic digital filtering algorithms, and independent internal battery backup that keeps security loops active even when the vehicle is parked with the ignition off.`;
  } else if (category === 'Regional Compliance') {
    scenarioText = `The scenario is all too common: a commercial hauler pulls into an official inspection bay along ${corridor}. When transport enforcement officers query the vehicle's onboard telematics for statutory records or verify emergency panic loops, the device returns an offline error or an unassigned mileage gap. An immediate statutory impound notice is issued, a critical delivery stops dead in its tracks, and heavy regulatory fines destroy the haul's operating margin.`;
    rootCauseText = `The deeper operational reality is that passing regulatory audits in ${country} leaves zero room for intermittent data drops. Government enforcement servers require continuous, timestamped cryptographic telemetry. Without certified hardware featuring multi-IMSI eSIM connectivity, dual-frequency GNSS engines, and tamper-resistant enclosure switches, commercial carriers will continually face roadside citations and vehicle impoundment along ${corridor}.`;
  } else if (category === 'Heavy Assets & Diagnostics') {
    scenarioText = `The scenario is all too common: a heavy transport unit hauling full payload up an incline along ${corridor} suddenly stutters as the engine control module triggers an emergency derate. The vehicle crawls onto the shoulder with its dashboard glowing with check-engine lights. Because the tracking unit was unable to decode proprietary J1939 fault codes, fleet mechanics had zero advance notice of the escalating exhaust temperature or DPF soot accumulation until the truck was completely immobilized.`;
    rootCauseText = `The deeper operational reality is that modern heavy-duty diesel engines communicate over complex J1939 CAN-bus protocols that passenger car dongles cannot comprehend. Without an isolated, high-speed CAN transceiver reading SPN/FMI diagnostic trouble codes directly from the powertrain bus, fleet maintenance teams in ${city} remain blind to early mechanical warnings, turning preventable maintenance items into catastrophic roadside blowouts.`;
  } else if (category === 'Cold Chain') {
    scenarioText = `The scenario is all too common: a refrigerated 53-foot trailer loaded with sensitive produce or pharmaceuticals travels along ${corridor}. Midway through transit, an auxiliary refrigeration unit stalls or an interior partition door unlatches in high ambient heat. By the time the vehicle docks at the destination warehouse, the cargo compartment has suffered an unmonitored 8°C thermal excursion, resulting in immediate cargo rejection and a six-figure insurance claim.`;
    rootCauseText = `The deeper operational reality is that wireless signals struggle to penetrate insulated, steel-lined refrigerated trailers. Flimsy consumer sensors suffer severe RF attenuation, drift out of calibration under freezing temperatures, and fail to provide the NIST-traceable audit trail required by health authorities. True cold chain integrity across ${corridor} demands industrial Bluetooth 5.0 beacons with hermetic sealing, long-life lithium batteries, and multi-zone gateway aggregation.`;
  } else if (category === 'Cross-Border Telematics') {
    scenarioText = `The scenario is all too common: an international freight hauler crosses between regional network zones along ${corridor}. The vehicle's cellular modem deadlocks during the carrier handover, plunging the vehicle into a total communications blackout. At the border customs checkpoint, automated clearance systems cannot authenticate the vehicle's transponder, forcing the driver into hours of manual inspection queues and holding up bonded cargo.`;
    rootCauseText = `The deeper operational reality is that single-operator SIM cards inevitably fail when traversing regional borders along ${corridor}. When commercial vehicles transition between cellular towers, consumer modems frequently lock up in roaming negotiation loops. Eliminating communication dead zones requires intelligent dual-SIM hardware with automated Link Quality Analysis (LQA) that hot-switches between carriers in milliseconds.`;
  } else {
    // Vehicle Telematics
    scenarioText = `The scenario is all too common: a commercial vehicle navigating the high-speed corridors of ${corridor} drops off the dispatch radar during a critical customer delivery window. The vehicle's consumer-grade tracking unit rattled loose from the OBD port or overheated under continuous duty cycles, forcing dispatchers to make blind guesses on delivery status while customer service teams face escalating client complaints.`;
    rootCauseText = `The deeper operational reality is that heavy commercial duty cycles along ${corridor} subject electronic components to severe multi-axis vibration, 60-volt alternator load dumps, and extreme thermal cycling. Hardware engineered for industrial fleets requires automotive-grade microcontrollers, wide 9–36V DC power conditioning, and ruggedized enclosures that keep transmitting reliably year after year.`;
  }

  const chalBody = `## The Real-World Operational Challenge in ${city}\n\n${chalHook} ${scenarioText}\n\n${rootCauseText}`;

  return { execSummary, chalBody };
}

// Execute transformation
let transformedCount = 0;
let errors = [];

sections.slice(1).forEach((sec, idx) => {
  const lines = sec.split('\n');
  const title = lines[0].replace(/^\d+\.\s*/, '').trim();
  
  const fileLine = lines.find(l => l.includes('**File:**'));
  const fn = fileLine ? fileLine.replace(/.*?\*\*File:\*\*\s*[`'"]?([^`'"\s\r\n]+)[`'"]?.*/, '$1').trim() : '';

  const catLine = lines.find(l => l.includes('**Category:**'));
  let category = '', city = '', country = '';
  if (catLine) {
    const catMatch = catLine.match(/\*\*Category:\*\*\s*([^|]+)/);
    if (catMatch) category = catMatch[1].trim();
    const regMatch = catLine.match(/\(([^,)]+),\s*([^)]+)\)/);
    if (regMatch) {
      city = regMatch[1].trim();
      country = regMatch[2].trim();
    }
  }

  const hwLine = lines.find(l => l.includes('**Hardware Model:**'));
  const hwModel = hwLine ? hwLine.replace(/.*?\*\*Hardware Model:\*\*\s*/, '').trim() : '';

  const promptMatch = sec.match(/\*\*Google Flow \/ ImageFX Master Prompt:\*\*[\s\S]*?>\s*`([^`]+)`/);
  const prompt = promptMatch ? promptMatch[1].trim() : '';

  const corridor = extractCorridor(title, city, country);

  const blog = { title, fn, category, city, country, hwModel, prompt, corridor };

  const { execSummary, chalBody } = buildStory(blog, idx);

  const filePath = path.join(blogDir, fn);
  if (!fs.existsSync(filePath)) {
    errors.push(`File not found: ${fn}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Executive Summary
  const execRegex = /## Executive Summary\s+[\s\S]*?(?=## Table of Contents)/;
  if (!execRegex.test(content)) {
    errors.push(`Executive Summary section not matched in: ${fn}`);
    return;
  }
  content = content.replace(execRegex, execSummary + '\n\n');

  // Replace Challenge section
  const chalRegex = /## The Real-World Operational Challenge[^\n]*\s+[\s\S]*?(?=---)/;
  if (!chalRegex.test(content)) {
    errors.push(`Challenge section not matched in: ${fn}`);
    return;
  }
  content = content.replace(chalRegex, chalBody + '\n\n');

  fs.writeFileSync(filePath, content, 'utf8');
  transformedCount++;
});

console.log(`Transformed ${transformedCount} / 300 blog posts successfully!`);
if (errors.length > 0) {
  console.log('Errors:', errors.slice(0, 10));
}
