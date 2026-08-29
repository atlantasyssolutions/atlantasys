const fs = require('fs');
const path = require('path');

const contentBlogsDir = path.join(__dirname, '..', 'content', 'blogs');
const blogFiles = fs.readdirSync(contentBlogsDir).filter(f => f.endsWith('.md'));

const totalArticles = blogFiles.length; // 1,300
const totalCities = 50;
const totalTrackers = 6;
const totalIndustries = 6;
const totalKeywords = 1000;

// NowFloats Programmatic Matrix Calculation:
const corePages = 18;
const cityHubPages = totalCities; // 50
const cityProductPages = totalCities * totalTrackers; // 300
const cityIndustryPages = totalCities * totalIndustries; // 300
const masterBlogArticles = totalArticles; // 1,300
const programmaticCityArticleMatrix = totalArticles * totalCities; // 65,000

const totalBasicStaticAndBlogs = corePages + cityHubPages + masterBlogArticles; // 1,368
const totalFullNowFloatsMatrix = corePages + cityHubPages + cityProductPages + cityIndustryPages + masterBlogArticles + programmaticCityArticleMatrix;

console.log('=== NOWFLOATS PROGRAMMATIC MATRIX STRATEGY AUDIT ===\n');
console.log(`Master Unique Technical Articles Generated: ${totalArticles}`);
console.log(`Primary Commercial Fleet Hub Cities: ${totalCities}`);
console.log(`Hardware Product Lines: ${totalTrackers}`);
console.log(`Industry Vertical Solutions: ${totalIndustries}`);
console.log('\n--- PAGE COUNT MATRIX BREAKDOWN ---');
console.log(`1. Static Core Corporate Pages: ${corePages}`);
console.log(`2. Primary City Landing Hubs: ${cityHubPages}`);
console.log(`3. Localized City x Product Landing Pages (50 x 6): ${cityProductPages}`);
console.log(`4. Localized City x Industry Solution Pages (50 x 6): ${cityIndustryPages}`);
console.log(`5. Primary Technical Deep-Dive Articles: ${masterBlogArticles}`);
console.log(`6. Programmatic City x Article Localized Landing Pages (50 x 1,300): ${programmaticCityArticleMatrix}`);
console.log(`--------------------------------------------------------------------`);
console.log(`🚀 CURRENT BASELINE PAGES (Static + Blogs): ${totalBasicStaticAndBlogs} Pages`);
console.log(`🔥 FULL NOWFLOATS MATRIX CAPACITY: ${totalFullNowFloatsMatrix} PAGES!`);
