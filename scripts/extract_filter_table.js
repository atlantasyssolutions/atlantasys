const fs = require('fs');
const sql = fs.readFileSync('d:/WizzIot/atlantasys-website/well-known/atlantas_atl.sql', 'utf8');
const lines = sql.split('\n');
let inInsert = false;
let printed = 0;
for (const line of lines) {
  if (line.includes('INSERT INTO `filter_table`')) inInsert = true;
  if (inInsert && printed < 20) {
    console.log(line);
    printed++;
  }
  if (inInsert && line.trim().endsWith(';')) inInsert = false;
}
