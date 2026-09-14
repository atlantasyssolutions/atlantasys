const fs = require('fs');
const path = require('path');

const dataDir = path.join('d:', 'WizzIot', 'atlantasys-website', 'data');
const rawProducts = JSON.parse(fs.readFileSync(path.join(dataDir, 'products.json'), 'utf8'));
const rawCategories = JSON.parse(fs.readFileSync(path.join(dataDir, 'categories.json'), 'utf8'));
const rawFeatures = JSON.parse(fs.readFileSync(path.join(dataDir, 'features.json'), 'utf8'));
const rawSpecs = JSON.parse(fs.readFileSync(path.join(dataDir, 'specifications.json'), 'utf8'));
const rawSpecCats = JSON.parse(fs.readFileSync(path.join(dataDir, 'spec_categories.json'), 'utf8'));

// Build lookup maps
const categoryMap = {};
rawCategories.forEach(c => {
  categoryMap[c.id] = c;
});

const specCatMap = {};
rawSpecCats.forEach(sc => {
  specCatMap[sc.id] = sc.name;
});

// Category list for navigation and tabs
const categories = rawCategories.map(c => ({
  id: c.slug,
  slug: c.slug,
  name: c.name,
  title: c.title,
  catId: parseInt(c.id, 10),
  shortDescription: c.short_description,
  featuresImg: c.features_img ? `/assets/product_category/${c.features_img}` : null
}));

// Compile all 66 products
const productsData = rawProducts.map(p => {
  const cat = categoryMap[p.pro_cat] || { slug: 'vehicle-telematics', name: 'Vehicle Telematics' };
  
  // Find features for this product
  const features = rawFeatures
    .filter(f => f.pro_id === p.id)
    .map(f => ({
      name: f.feature_name,
      description: f.feature_description,
      image: f.image ? `/assets/product_feature/${f.image}` : null
    }));

  // Find specs for this product
  const productSpecs = rawSpecs.filter(s => s.product_id === p.id);
  const specsFlat = {};
  const specsGroupedMap = {};

  productSpecs.forEach(s => {
    const groupName = specCatMap[s.spec_id] || 'General';
    if (!specsGroupedMap[groupName]) {
      specsGroupedMap[groupName] = [];
    }
    specsGroupedMap[groupName].push({
      name: s.name,
      value: s.value
    });

    // Map common filter keys
    const lowerName = s.name.toLowerCase();
    if (lowerName.includes('connectivity') || lowerName.includes('technology') || lowerName.includes('band')) {
      specsFlat.connectivity = s.value;
    }
    if (lowerName.includes('power') || lowerName.includes('supply') || lowerName.includes('voltage')) {
      specsFlat.powersupply = s.value;
    }
    if (lowerName.includes('bluetooth') || lowerName.includes('ble')) {
      specsFlat.bluetooth = s.value;
    }
    if (lowerName.includes('sim') || lowerName.includes('cellular')) {
      specsFlat.sim = s.value;
    }
    if (lowerName.includes('ip rating') || lowerName.includes('casing') || lowerName.includes('ingress')) {
      specsFlat.ingressprotection = s.value;
    }
    if (lowerName.includes('battery')) {
      specsFlat.battery = s.value;
    }
    if (lowerName.includes('antenna')) {
      specsFlat.antennas = s.value;
    }
    if (lowerName.includes('interface') || lowerName.includes('input') || lowerName.includes('output') || lowerName.includes('can') || lowerName.includes('rs485')) {
      specsFlat.hardwareconnectors = s.value;
    }
  });

  const specsGrouped = Object.keys(specsGroupedMap).map(catName => ({
    category: catName,
    items: specsGroupedMap[catName]
  }));

  // Fallback defaults for flat specs if not found
  if (!specsFlat.connectivity) specsFlat.connectivity = p.pro_tech || '2G / 4G Band';
  if (!specsFlat.powersupply) specsFlat.powersupply = '9-90V DC';
  if (!specsFlat.ingressprotection) specsFlat.ingressprotection = 'IP65';

  return {
    id: p.slug || p.pro_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    productId: p.id,
    name: p.pro_name,
    title: p.title || p.pro_name,
    slug: p.slug || p.pro_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    category: cat.slug,
    categoryName: cat.name,
    catId: parseInt(p.pro_cat, 10),
    image: p.image && p.image !== 'default.png' ? `/assets/product_img/${p.image}` : '/assets/img/product.png',
    tag: cat.name,
    description: p.description,
    brochure: p.brochure && p.brochure !== 'Null' ? `/assets/brochure/${p.brochure}` : null,
    userManual: p.user_manual && p.user_manual !== 'Null' ? `/assets/manual/${p.user_manual}` : null,
    wiringScheme: p.wiring_scheme && p.wiring_scheme !== 'Null' ? `/assets/wiring/${p.wiring_scheme}` : null,
    driver: p.driver && p.driver !== 'Null' ? `/assets/driver/${p.driver}` : null,
    videoUrl: p.video_url && p.video_url !== 'Null' ? p.video_url : null,
    features,
    specs: specsFlat,
    specsGrouped
  };
});

const fileContent = `// Auto-generated from authentic database atlantas_atl.sql
// Total products: ${productsData.length}
// Total categories: ${categories.length}

export const categories = ${JSON.stringify(categories, null, 2)};

export const productsData = ${JSON.stringify(productsData, null, 2)};

export function getProductBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  return productsData.find(p => p.slug === cleanSlug || p.id === cleanSlug || p.name.toLowerCase() === cleanSlug.replace(/-/g, ' '));
}

export function getProductsByCategory(catSlug) {
  if (!catSlug || catSlug === 'all') return productsData;
  const clean = catSlug.toLowerCase().trim();
  return productsData.filter(p => p.category === clean || p.category.replace(/-/g, '') === clean.replace(/-/g, ''));
}
`;

fs.writeFileSync(path.join(dataDir, 'products.js'), fileContent, 'utf8');
console.log(`Successfully compiled data/products.js with ${productsData.length} products and ${categories.length} categories!`);
