const fs = require('fs');
const sql = fs.readFileSync('d:/WizzIot/atlantasys-website/well-known/atlantas_atl.sql', 'utf8');
const lines = sql.split('\n');
let inInsert = false;
for (const line of lines) {
  if (line.includes('INSERT INTO `filter_table`')) inInsert = true;
  if (inInsert && line.includes('Connectivity')) {
    console.log(line);
  }
  if (inInsert && line.trim().endsWith(';')) inInsert = false;
}
