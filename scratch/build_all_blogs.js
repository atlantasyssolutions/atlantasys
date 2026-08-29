const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, '..', 'content', 'blogs');
if (!fs.existsSync(blogsDir)) {
  fs.mkdirSync(blogsDir, { recursive: true });
}

console.log('Writing individual blog markdown files into content/blogs...');
