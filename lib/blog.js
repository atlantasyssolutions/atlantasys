import fs from 'fs';
import path from 'path';
import { BLOGS_DATA } from '@/data/blogs';

const contentBlogsDir = path.join(process.cwd(), 'content', 'blogs');
const legacyBlogsDir = path.join(process.cwd(), 'BLOGS');
const blogsDirectory = fs.existsSync(contentBlogsDir) ? contentBlogsDir : legacyBlogsDir;

function parseFrontmatter(fileContents) {
  const attributes = {};
  let body = fileContents;

  // 1. Try YAML frontmatter (--- ... ---)
  const match = fileContents.match(/^---([\s\S]*?)---/);
  if (match) {
    const yamlBlock = match[1];
    body = fileContents.replace(/^---[\s\S]*?---/, '').trim();

    const lines = yamlBlock.split('\n');
    let currentKey = null;

    for (const line of lines) {
      if (!line.trim() || line.trim().startsWith('#')) continue;

      const keyValMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)/);
      if (keyValMatch) {
        const key = keyValMatch[1].trim();
        const val = keyValMatch[2].trim().replace(/^["']|["']$/g, '');
        currentKey = key;
        attributes[key] = val;
      }
    }
  }

  // 2. Try bullet-style metadata (* **Key**: Value)
  const bulletLines = fileContents.split('\n');
  for (const line of bulletLines) {
    const bulletMatch = line.match(/^\*\s*\*\*([^*]+)\*\*:\s*`?([^`\n]+)`?/);
    if (bulletMatch) {
      const key = bulletMatch[1].trim().toLowerCase();
      const val = bulletMatch[2].trim();

      if (key === 'slug') attributes.slug = val;
      if (key === 'category') attributes.category = val;
      if (key === 'geo region' || key === 'region') attributes.geoRegion = val;
      if (key === 'city') attributes.city = val;
      if (key === 'city slug') attributes.citySlug = val;
      if (key === 'country') attributes.country = val;
      if (key === 'author') attributes.authorName = val;
      if (key === 'published date') attributes.publishedAt = val;
      if (key === 'seo & geo keywords' || key === 'seo keywords') {
        attributes.seoKeywords = val.split(',').map(s => s.trim());
      }
    }
  }

  // 3. Clean body of H1 titles and metadata bullet lines
  const cleanBodyLines = body.split('\n').filter(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) return false; // H1 handled separately
    if (/^\*\s*\*\*([^*]+)\*\*:\s*/.test(trimmed)) return false; // Bullet metadata
    if (/^(Slug|Category|City|City Slug|Country|Geo Region|Author|Published Date|SEO & GEO Keywords|Estimated Read Time):\s*/i.test(trimmed)) return false;
    return true;
  });
  body = cleanBodyLines.join('\n').trim();

  return { attributes, body };
}

export function getAllBlogs(includeContent = true) {
  let mdBlogs = [];

  try {
    if (fs.existsSync(blogsDirectory)) {
      const files = fs.readdirSync(blogsDirectory).filter((file) => file.endsWith('.md'));
      mdBlogs = files.map((file) => {
        try {
          const slugFromFile = file.replace(/\.md$/, '');
          const fullPath = path.join(blogsDirectory, file);
          const fileContents = fs.readFileSync(fullPath, 'utf8');

          const { attributes, body } = parseFrontmatter(fileContents);

          const slug = attributes.slug || slugFromFile;
          const title = attributes.title || slugFromFile;
          const category = attributes.category || 'Vehicle Telematics';
          const geoRegion = attributes.geoRegion || 'Global';
          const city = attributes.city || 'Global Hub';
          const citySlug = attributes.citySlug || (city ? city.toLowerCase().replace(/\s+/g, '-') : 'global');
          const country = attributes.country || 'Global';
          const excerpt = attributes.excerpt || (body ? body.substring(0, 200).replace(/[#*`_]/g, '') + '...' : '');
          const publishedAt = attributes.publishedAt || '2026-08-29';
          const indexable = true;
          const readTime = attributes.readTime || '13 min read';
          
          const author = {
            name: attributes.authorName || 'Atlanta Engineering Team',
            role: 'Principal Telematics Systems Engineer'
          };

          const seoKeywords = Array.isArray(attributes.seoKeywords) ? attributes.seoKeywords : [];

          const item = {
            id: slug,
            slug,
            title,
            category,
            geoRegion,
            city,
            citySlug,
            country,
            excerpt,
            author,
            publishedAt,
            readTime,
            indexable,
            seoKeywords,
          };

          if (includeContent) {
            item.content = body;
          }

          return item;
        } catch (err) {
          console.error(`Error parsing blog file ${file}:`, err);
          return null;
        }
      }).filter(Boolean);
    }
  } catch (err) {
    console.error('Error reading blogs directory:', err);
  }

  const mdSlugs = new Set(mdBlogs.map((b) => b.slug));
  const uniqueDataBlogs = BLOGS_DATA.filter((b) => !mdSlugs.has(b.slug)).map(b => {
    if (!includeContent) {
      const { content, ...rest } = b;
      return rest;
    }
    return b;
  });

  return [...mdBlogs, ...uniqueDataBlogs];
}

export function getAllBlogSummaries() {
  return getAllBlogs(false);
}

export function getBlogBySlug(slug) {
  if (!slug) return null;
  const all = getAllBlogs();
  return all.find((b) => b.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export function getBlogsByGeoRegion(region) {
  const all = getAllBlogs();
  if (!region || region === 'All') return all;
  return all.filter((b) => b.geoRegion === region || b.geoRegion === 'Global');
}

export function generateArticleSchema(blog) {
  if (!blog) return {};
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.wiziot.com/blog/${blog.slug}`,
    },
    headline: blog.title,
    description: blog.excerpt,
    image: `https://www.wiziot.com/blog/${blog.slug}.webp`,
    ...(blog.publishedAt && {
      datePublished: blog.publishedAt,
      dateModified: blog.publishedAt,
    }),
    author: {
      '@type': 'Person',
      name: blog.author?.name || 'WizIOT Security Engineering',
      jobTitle: blog.author?.role || 'Senior Telematics Architect',
      worksFor: {
        '@type': 'Organization',
        name: 'WizIOT Telematics',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'WizIOT Telematics',
      url: 'https://www.wiziot.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.wiziot.com/logo.png',
      },
    },
  };
}

export function generateFaqSchema(blog) {
  if (!blog || !blog.content) return null;

  const faqMatch = blog.content.match(/##\s*Frequently Asked Questions[\s\S]*/i);
  if (!faqMatch) return null;

  const faqText = faqMatch[0];
  const qBlocks = faqText.split(/###\s*/).slice(1);

  const mainEntity = [];

  for (const block of qBlocks) {
    const lines = block.trim().split('\n');
    const questionLine = lines[0];
    const answerText = lines.slice(1).join(' ').trim();

    if (questionLine && answerText) {
      const cleanQuestion = questionLine.replace(/^Q\d*:\s*/i, '').trim();
      mainEntity.push({
        '@type': 'Question',
        name: cleanQuestion,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answerText,
        },
      });
    }
  }

  if (mainEntity.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

export function generateBreadcrumbSchema(blog) {
  if (!blog) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.wiziot.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Knowledge Hub',
        item: 'https://www.wiziot.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.category || 'Telematics',
        item: `https://www.wiziot.com/blog?category=${encodeURIComponent(blog.category || 'Telematics')}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: blog.title,
        item: `https://www.wiziot.com/blog/${blog.slug}`,
      },
    ],
  };
}

