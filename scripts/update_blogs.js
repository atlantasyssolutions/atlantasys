const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, '..', 'content', 'blogs');
const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));
files.sort((a, b) => parseInt(a.split('-')[0], 10) - parseInt(b.split('-')[0], 10));

const STATE_COUNTRY_MAP = {
  'New Delhi': 'Delhi NCR, India',
  'Mumbai': 'Maharashtra, India',
  'Dubai': 'Dubai, UAE',
  'Abu Dhabi': 'Abu Dhabi, UAE',
  'Houston': 'Texas, USA',
  'Dallas': 'Texas, USA',
  'Los Angeles': 'California, USA',
  'Chicago': 'Illinois, USA',
  'Memphis': 'Tennessee, USA',
  'New York': 'New York, USA',
  'Seattle': 'Washington, USA',
  'Phoenix': 'Arizona, USA',
  'Miami': 'Florida, USA',
  'Riyadh': 'Riyadh Province, Saudi Arabia',
  'Dammam': 'Eastern Province, Saudi Arabia',
  'Jeddah': 'Makkah Province, Saudi Arabia',
  'Warsaw': 'Poland',
  'Rotterdam': 'the Netherlands',
  'Hamburg': 'Germany',
  'Frankfurt': 'Germany',
  'Santiago': 'Chile',
  'Milan': 'Lombardy, Italy',
  'London': 'the United Kingdom',
  'Paris': 'France',
  'Madrid': 'Spain',
  'Mexico City': 'Mexico',
  'São Paulo': 'São Paulo, Brazil',
  'Bogotá': 'Colombia',
  'Cairo': 'Egypt',
  'Doha': 'Qatar',
  'Antwerp': 'Belgium',
  'Lima': 'Peru',
  'Casablanca': 'Morocco',
  'Bucharest': 'Romania',
  'Kuwait City': 'Kuwait',
  'Muscat': 'Oman'
};

function stripSpecificLocation(str) {
  let s = str.replace(/[\u2018\u2019]/g, "'").replace(/[\u2013\u2014]/g, "-").trim();
  
  // Repeatedly strip any trailing 'Across ...' that was previously appended
  while (/\s+Across\s+[A-Za-z\s,()]+$/i.test(s)) {
    s = s.replace(/\s+Across\s+[A-Za-z\s,()]+$/i, '').trim();
  }
  
  const cities = "Chicago|Warsaw|Dallas|London|Houston|New\\s+York|Bucharest|Santiago|Phoenix|Mexico(?:\\s+City)?|Miami|Doha|Kuwait(?:\\s+City)?|Milan|Madrid|Rotterdam|Seattle|Hamburg|Paris|Antwerp|Lima|Casablanca|Muscat|Dammam|Jeddah|Riyadh|Abu\\s+Dhabi|Dubai|New\\s+Delhi|Mumbai|S[ãa]o\\s+Paulo|Los\\s+Angeles|LA\\/Long\\s+Beach|Long\\s+Beach|Memphis|Frankfurt|Jebel\\s+Ali|Khalifa|Santos|India|Poland|Germany|Spain|Italy|France|Belgium|Chile|Peru|Colombia|Egypt|Qatar|Oman|Brazil";
  
  const corridorTerms = "Port|Autostrada|Autov\u00eda|Highway|Expressway|Interstate|I-\\d+|A-\\d+|A\\d+|E\\d+|NH\\d+|M\\d+|Ruta|Route|Routes|Artery|Arteries|Corridor|Motorway|Hinterland|Drayage|Terminals|Terminal|Andes|Ring|Bypass|Mining|Intermodal|Transit|Rail-Yard";

  const locRegex = new RegExp(`\\s+(?:on|across|in|at|near|between|from|to|operating\\s+on|deployed\\s+on|serving|for|through)\\s+(?:the\\s+)?(?:${cities}|${corridorTerms}).*$`, 'i');
  
  const m = s.match(locRegex);
  if (m && m.index >= 20) {
    s = s.slice(0, m.index);
  }
  
  s = s.trim().replace(/[:,'’\-\s]+$/, '');
  s = s.replace(/\s+(?:for|in|on|at|across|from|to|near|by|with|through)$/i, '').trim();
  return s;
}

function getNewTitle(oldTitle, city, country) {
  const loc = STATE_COUNTRY_MAP[city] || country || 'Global';
  const cleanBase = stripSpecificLocation(oldTitle);
  return `${cleanBase} Across ${loc}`;
}

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(blogsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract metadata
  const tm = content.match(/^# (.*)$/m);
  const cm = content.match(/^\* \*\*City\*\*: (.*)$/m);
  const ctm = content.match(/^\* \*\*Country\*\*: (.*)$/m);
  const city = cm ? cm[1].trim() : '';
  const country = ctm ? ctm[1].trim() : '';
  const oldTitle = tm ? tm[1].trim() : '';

  const newTitle = getNewTitle(oldTitle, city, country);

  // 1. Update Title in H1
  content = content.replace(/^# .*$/m, `# ${newTitle}`);

  // 2. Remove Core Processing, Power Conditioning, and Enclosure Rating from hardware architecture table
  content = content.replace(/\|\s*\[Core Processing\]\s*->[^\n]*\n/g, '');
  content = content.replace(/\|\s*\[Power Conditioning\]\s*->[^\n]*\n/g, '');
  content = content.replace(/\|\s*\[Enclosure Rating\]\s*->[^\n]*\n/g, '');

  // 3. Replace Author with Marketing Team
  content = content.replace(/\* \*\*Author\*\*:.*$/m, '* **Author**: Atlanta Systems Marketing Team');

  // 4. Replace Founder and Co-founder names in text with Marketing Team / Team
  content = content.replace(
    /In our 32 years designing and manufacturing industrial electronics at Atlanta Systems, my co-founder Sandeep Narula and I have seen/g,
    'In over three decades designing and manufacturing industrial electronics at Atlanta Systems, our marketing and solutions engineering team has seen'
  );
  content = content.replace(
    /one reality that co-founders Sujeet Narula and Sandeep Narula have observed over three decades of hardware engineering becomes immediately obvious/g,
    'one reality that the Atlanta Systems marketing and engineering team has observed over three decades of hardware engineering becomes immediately obvious'
  );
  content = content.replace(
    /Over three decades on the production floor since co-founders Sujeet Narula and Sandeep Narula established Atlanta Systems in 1994, we have seen/g,
    'Over three decades since Atlanta Systems was established in 1994, our engineering and marketing teams have seen'
  );
  content = content.replace(
    /a reality our co-founders Sujeet Narula and Sandeep Narula have engineered our systems to solve/g,
    'a reality our product engineering and marketing team has engineered our systems to solve'
  );
  content = content.replace(
    /a foundational principle built into Atlanta Systems by founders Sujeet and Sandeep Narula since 1994/g,
    'a foundational principle built into Atlanta Systems by our leadership and engineering teams since 1994'
  );
  content = content.replace(
    /Our co-founders, Sujeet Narula and Sandeep Narula, alongside our dedicated engineering team, have spent more than three decades building rugged, industrial-grade electronics/g,
    'The Atlanta Systems Marketing Team, alongside our dedicated engineering team, has spent more than three decades building rugged, industrial-grade electronics'
  );
  content = content.replace(
    /Over our 32 years of electronic hardware manufacturing, my co-founder Sandeep Narula and I have seen/g,
    'Over our three decades of electronic hardware manufacturing, our marketing and engineering team has seen'
  );
  content = content.replace(
    /Across our 32 years designing and manufacturing industrial electronics, my co-founder Sandeep Narula and I have walked through/g,
    'Across our three decades designing and manufacturing industrial electronics, our solutions engineering and marketing team has walked through'
  );
  content = content.replace(/co-founder Sandeep Narula and I/gi, 'our marketing and engineering team');
  content = content.replace(/my co-founder Sandeep Narula and I/gi, 'our marketing and engineering team');
  content = content.replace(/Sujeet Narula, Founder/gi, 'Atlanta Systems Marketing Team');
  content = content.replace(/Sandeep Narula, Co-Founder/gi, 'Atlanta Systems Marketing Team');
  content = content.replace(/Sujeet Narula/gi, 'Atlanta Systems');
  content = content.replace(/Sandeep Narula/gi, 'Atlanta Systems');
  content = content.replace(/co-founders/gi, 'marketing and engineering teams');
  content = content.replace(/co-founder/gi, 'marketing team');
  content = content.replace(/founders/gi, 'leadership and engineering team');
  content = content.replace(/founder/gi, 'marketing team');

  // 5. Update embedded title reference in opening paragraph if it was embedding cleanTitle
  if (oldTitle) {
    const escapedOld = oldTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    content = content.replace(new RegExp(escapedOld, 'g'), newTitle);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  modifiedCount++;
}

console.log(`Successfully updated ${modifiedCount} blog files!`);
