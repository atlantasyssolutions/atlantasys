const fs = require('fs');
const path = require('path');

const contentBlogsDir = path.join(__dirname, '..', 'content', 'blogs');
const files = fs.readdirSync(contentBlogsDir).filter(f => f.endsWith('.md'));

console.log('Total Markdown Blog Files:', files.length);

const sampleFile = path.join(contentBlogsDir, files[0]);
const sampleContent = fs.readFileSync(sampleFile, 'utf8');

console.log('Sample File Basename:', files[0]);
console.log('Sample File Frontmatter Snippet:');
console.log(sampleContent.substring(0, 350));
console.log('\nSample File Tail Internal Links Snippet:');
console.log(sampleContent.substring(sampleContent.length - 600));
