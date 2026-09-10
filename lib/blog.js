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
  const yamlMatch = fileContents.match(/^---([\s\S]*?)---/);
  if (yamlMatch) {
    const yamlBlock = yamlMatch[1];
    body = fileContents.replace(/^---[\s\S]*?---/, '').trim();

    const lines = yamlBlock.split('\n');
    for (const line of lines) {
      if (!line.trim() || line.trim().startsWith('#')) continue;

      const keyValMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)/);
      if (keyValMatch) {
        const key = keyValMatch[1].trim();
        const val = keyValMatch[2].trim().replace(/^["']|["']$/g, '');
        attributes[key] = val;
      }
    }
  }

  // 2. Parse top metadata header only (before first '## ' heading)
  const lines = body.split('\n');
  const bodyLines = [];
  let inTopHeader = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (inTopHeader) {
      if (trimmed.startsWith('## ')) {
        inTopHeader = false;
        bodyLines.push(line);
        continue;
      }
      // Check for bullet-style metadata in the top header
      const bulletMatch = trimmed.match(/^\*\s*\*\*([^*]+)\*\*:\s*`?([^`\n]+)`?/);
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
        if (key === 'estimated read time') attributes.readTime = val;
        if (key === 'seo & geo keywords' || key === 'seo keywords') {
          attributes.seoKeywords = val.split(',').map(s => s.trim());
        }
        continue;
      }
      if (trimmed.startsWith('# ') && !attributes.title) {
        attributes.title = trimmed.replace(/^#\s+/, '').trim();
        continue;
      }
      if (trimmed.startsWith('# ') || trimmed === '---') {
        continue; // Skip top H1 title and divider before content
      }
      if (!trimmed) continue;
    }

    bodyLines.push(line);
  }

  body = bodyLines.join('\n').trim();

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

          const slug = attributes.slug || slugFromFile.replace(/^\d+[-_]/, '');
          
          let cleanTitle = attributes.title;
          if (!cleanTitle) {
            const topH1 = fileContents.match(/^#\s+(.+)$/m);
            if (topH1) {
              cleanTitle = topH1[1].trim();
            } else {
              cleanTitle = (attributes.slug || slugFromFile)
                .replace(/^\d+[-_]/, '')
                .replace(/[-_]+/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase());
            }
          }
          const title = cleanTitle;

          const category = attributes.category || 'Vehicle Telematics';
          const geoRegion = attributes.geoRegion || 'Global';
          const city = attributes.city || 'Global Hub';
          const citySlug = attributes.citySlug || (city ? city.toLowerCase().replace(/\s+/g, '-') : 'global');
          const country = attributes.country || 'Global';
          
          let excerpt = attributes.excerpt || '';
          if (!excerpt && body) {
            const paragraphs = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
            for (const p of paragraphs) {
              if (p.startsWith('#') || p.startsWith('+--') || p.startsWith('|') || p.startsWith('---')) continue;
              const cleanP = p
                .replace(/\[\*\*([^*]+)\*\*\]\([^)]+\)/g, '$1')
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                .replace(/[*`_]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
              if (cleanP.length > 40) {
                excerpt = cleanP.length > 190 ? cleanP.substring(0, 187).trim() + '...' : cleanP;
                break;
              }
            }
          }
          if (!excerpt && body) {
            excerpt = body.substring(0, 180).replace(/[#*`_]/g, '').trim() + '...';
          }

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
      '@id': `https://www.atlantasys.com/blog/${blog.slug}`,
    },
    headline: blog.title,
    description: blog.excerpt,
    image: {
      '@type': 'ImageObject',
      url: `https://www.atlantasys.com/blog/${blog.slug}.webp`,
      caption: `${blog.title} — Atlanta Systems Telematics`,
      description: blog.excerpt,
      width: 1600,
      height: 900,
      creditText: 'Atlanta Systems Enterprise Telematics',
      copyrightNotice: '© 2026 Atlanta Systems Pvt. Ltd.',
      license: 'https://www.atlantasys.com/terms-and-condition',
      acquireLicensePage: 'https://www.atlantasys.com/contact',
    },
    ...(blog.publishedAt && {
      datePublished: blog.publishedAt,
      dateModified: blog.publishedAt,
    }),
    author: {
      '@type': 'Person',
      name: blog.author?.name || 'Atlanta Systems Hardware Engineering',
      jobTitle: blog.author?.role || 'Senior Telematics Architect',
      worksFor: {
        '@type': 'Organization',
        name: 'Atlanta Systems Pvt. Ltd.',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Atlanta Systems Pvt. Ltd.',
      url: 'https://www.atlantasys.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.atlantasys.com/assets/img/logo.svg',
      },
    },
  };
}

export function generateFaqSchema(blog) {
  if (!blog || !blog.content) return null;

  const faqMatch = blog.content.match(/##\s*Frequently Asked Questions([\s\S]*?)(?=\n##\s+|$)/i);
  if (!faqMatch) return null;

  const faqText = faqMatch[1];
  const qBlocks = faqText.split(/###\s*/).slice(1);

  const mainEntity = [];

  for (const block of qBlocks) {
    const lines = block.trim().split('\n');
    const questionLine = lines[0];
    const answerText = lines.slice(1).join(' ').trim().replace(/[*`_]/g, '');

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
        item: 'https://www.atlantasys.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Knowledge Hub',
        item: 'https://www.atlantasys.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.category || 'Vehicle Telematics',
        item: `https://www.atlantasys.com/blog?category=${encodeURIComponent(blog.category || 'Vehicle Telematics')}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: blog.title,
        item: `https://www.atlantasys.com/blog/${blog.slug}`,
      },
    ],
  };
}

