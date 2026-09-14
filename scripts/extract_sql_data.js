const fs = require('fs');
const readline = require('readline');
const path = require('path');

// Simple SQL tuple parser that respects escaped quotes and commas inside strings
function parseSqlTuples(sqlValuesString) {
  const rows = [];
  let inString = false;
  let quoteChar = '';
  let isEscaped = false;
  let currentVal = '';
  let currentRow = [];
  let inRow = false;

  for (let i = 0; i < sqlValuesString.length; i++) {
    const char = sqlValuesString[i];

    if (inString) {
      if (isEscaped) {
        currentVal += char;
        isEscaped = false;
      } else if (char === '\\') {
        isEscaped = true;
      } else if (char === quoteChar) {
        // Check for double quote escape '' or \"
        if (sqlValuesString[i + 1] === quoteChar) {
          currentVal += quoteChar;
          i++; // skip next quote
        } else {
          inString = false;
        }
      } else {
        currentVal += char;
      }
    } else {
      if (char === '(' && !inRow) {
        inRow = true;
        currentRow = [];
        currentVal = '';
      } else if (char === ')' && inRow) {
        currentRow.push(currentVal.trim() === 'NULL' ? null : currentVal);
        rows.push(currentRow);
        currentRow = [];
        currentVal = '';
        inRow = false;
      } else if (char === ',' && inRow) {
        currentRow.push(currentVal.trim() === 'NULL' ? null : currentVal);
        currentVal = '';
      } else if ((char === "'" || char === '"') && inRow) {
        inString = true;
        quoteChar = char;
      } else if (inRow) {
        currentVal += char;
      }
    }
  }

  return rows;
}

// Helper to extract table columns and values from the SQL file
async function extractTable(sqlPath, tableName) {
  const stream = fs.createReadStream(sqlPath);
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  let inCreate = false;
  const columns = [];
  let valuesSql = '';
  let inInsert = false;

  for await (const line of rl) {
    if (line.startsWith(`CREATE TABLE \`${tableName}\``)) {
      inCreate = true;
      continue;
    }
    if (inCreate && line.startsWith(') ENGINE=')) {
      inCreate = false;
      continue;
    }
    if (inCreate) {
      const colMatch = line.match(/^\s*`([a-zA-Z0-9_-]+)`/);
      if (colMatch) {
        columns.push(colMatch[1]);
      }
    }

    if (line.startsWith(`INSERT INTO \`${tableName}\``)) {
      inInsert = true;
      const valIdx = line.indexOf('VALUES');
      if (valIdx !== -1) {
        valuesSql += line.substring(valIdx + 6) + '\n';
      }
      continue;
    }
    if (inInsert) {
      valuesSql += line + '\n';
      if (line.trim().endsWith(';')) {
        inInsert = false;
      }
    }
  }

  const rawRows = parseSqlTuples(valuesSql);
  const objects = rawRows.map(row => {
    const obj = {};
    columns.forEach((col, idx) => {
      let val = row[idx];
      if (typeof val === 'string') {
        // unescape common mysql escapes and trim
        val = val.replace(/\\r/g, '\r').replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\'/g, "'").replace(/\\"/g, '"').trim();
      }
      obj[col] = val;
    });
    return obj;
  });

  return { columns, rows: objects };
}

async function run() {
  const sqlFile = path.join('d:', 'WizzIot', 'atlantasys-website', 'well-known', 'atlantas_atl.sql');
  const dataDir = path.join('d:', 'WizzIot', 'atlantasys-website', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const tablesToExtract = [
    { table: 'product_categories', file: 'categories.json' },
    { table: 'products', file: 'products.json' },
    { table: 'product_feature', file: 'features.json' },
    { table: 'product_specification', file: 'specifications.json' },
    { table: 'specification_category', file: 'spec_categories.json' },
    { table: 'pro_image', file: 'pro_images.json' },
    { table: 'blog', file: 'blogs.json' },
    { table: 'career', file: 'careers.json' },
    { table: 'faq', file: 'faqs.json' },
    { table: 'wiki_content', file: 'wiki_contents.json' },
    { table: 'wiki_category', file: 'wiki_categories.json' }
  ];

  for (const item of tablesToExtract) {
    console.log(`Extracting ${item.table}...`);
    const result = await extractTable(sqlFile, item.table);
    console.log(`-> Found ${result.rows.length} records for ${item.table}`);
    
    // Add slug helper
    result.rows.forEach(r => {
      if (r.name && !r.slug) {
        r.slug = r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      if (r.pro_name && !r.slug) {
        r.slug = r.pro_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      if (r.heading && !r.slug) {
        r.slug = r.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
    });

    const target = path.join(dataDir, item.file);
    fs.writeFileSync(target, JSON.stringify(result.rows, null, 2), 'utf8');
    console.log(`-> Saved to ${target}`);
  }

  console.log('All tables successfully extracted to JSON!');
}

run().catch(console.error);
