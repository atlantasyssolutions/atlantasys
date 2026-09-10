import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogs, generateArticleSchema, generateFaqSchema, generateBreadcrumbSchema } from '@/lib/blog';
import { Calendar, Clock, Globe, ArrowLeft, ShieldCheck, ChevronRight, CheckCircle2, List, HelpCircle, Building2, MapPin } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';

export async function generateStaticParams() {
  const allBlogs = getAllBlogs();
  return allBlogs.map((b) => ({
    city: b.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams?.city);
  if (!blog) return { title: 'Post Not Found | Atlanta Systems' };

  const canonicalUrl = `https://www.atlantasys.com/blog/${blog.slug}`;
  const isIndexable = blog.indexable === true;

  return {
    title: `${blog.title} | Atlanta Systems`,
    description: blog.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: isIndexable,
      follow: true,
      googleBot: {
        index: isIndexable,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: canonicalUrl,
      siteName: 'Atlanta Systems',
      type: 'article',
      publishedTime: blog.publishedAt,
      modifiedTime: blog.publishedAt,
      images: [
        {
          url: `/blog/${blog.slug}.webp`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      authors: [blog.author?.name || 'Atlanta Systems Security Engineering'],
      tags: blog.seoKeywords || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [`/blog/${blog.slug}.webp`],
    },
  };
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

// Parses bold, italic, code, and links inside text strings cleanly
function parseInlineMarkdown(text) {
  if (!text) return '';
  // Priority: 1. **[label](url)**, 2. [**label**](url), 3. [label](url), 4. **bold**, 5. `code`, 6. *italic*
  const tokenRegex = /(\*\*\[([^\]]+)\]\(([^)]+)\)\*\*)|(\[\*\*([^*]+)\*\*\]\(([^)]+)\))|(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(`([^`]+)`)|((?<!\*)\*([^*\n]+)\*(?!\*))/g;
  const parts = [];
  let currentIndex = 0;
  let match;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > currentIndex) {
      parts.push(text.substring(currentIndex, match.index));
    }

    let isBoldLink = false;
    let label = '';
    let url = '';

    if (match[1]) {
      // **[label](url)**
      isBoldLink = true;
      label = match[2];
      url = match[3];
    } else if (match[4]) {
      // [**label**](url)
      isBoldLink = true;
      label = match[5];
      url = match[6];
    } else if (match[7]) {
      // [label](url)
      label = match[8];
      url = match[9];
    }

    if (url) {
      let normalizedUrl = url.trim();
      if (
        normalizedUrl.startsWith('https://www.atlantasys.com') ||
        normalizedUrl.startsWith('https://atlantasys.com') ||
        normalizedUrl.startsWith('https://wiziot.com') ||
        normalizedUrl.startsWith('https://www.wiziot.com')
      ) {
        normalizedUrl = normalizedUrl.replace(/https:\/\/(www\.)?(atlantasys|wiziot)\.com/, '');
        if (!normalizedUrl.startsWith('/')) normalizedUrl = '/' + normalizedUrl;
      }

      const isInternal = normalizedUrl.startsWith('/');
      const linkStyle = {
        color: '#0169A9',
        fontWeight: isBoldLink ? '700' : '600',
        textDecoration: 'underline',
      };

      if (isInternal) {
        parts.push(
          <Link key={match.index} href={normalizedUrl} style={linkStyle}>
            {isBoldLink ? <strong>{label}</strong> : label}
          </Link>
        );
      } else {
        parts.push(
          <a key={match.index} href={normalizedUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            {isBoldLink ? <strong>{label}</strong> : label}
          </a>
        );
      }
    } else if (match[10]) {
      // **bold**
      parts.push(
        <strong key={match.index} style={{ color: '#0F2D4E', fontWeight: '700' }}>
          {match[11]}
        </strong>
      );
    } else if (match[12]) {
      // `code`
      parts.push(
        <code key={match.index} style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.88em', color: '#0169A9', fontFamily: 'monospace' }}>
          {match[13]}
        </code>
      );
    } else if (match[14]) {
      // *italic*
      parts.push(
        <em key={match.index} style={{ fontStyle: 'italic' }}>
          {match[15]}
        </em>
      );
    }

    currentIndex = tokenRegex.lastIndex;
  }

  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : text;
}

function isTableLine(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) return false;
  const pipeCount = (trimmed.match(/\|/g) || []).length;
  return pipeCount >= 2;
}

function parseMarkdownToBlocks(markdown) {
  if (!markdown) return [];
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let currentBlock = [];
  let currentType = null;

  function flush() {
    if (currentBlock.length > 0) {
      blocks.push({
        type: currentType || 'paragraph',
        raw: currentBlock.join('\n').trim(),
        lines: [...currentBlock],
      });
      currentBlock = [];
      currentType = null;
    }
  }

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    const nextTrimmed = (lines[i + 1] || '').trim();

    // 1. ASCII Box: starts with +--- or +===
    if (currentType === 'ascii-box') {
      currentBlock.push(line);
      if (
        (trimmed.startsWith('+---') || trimmed.startsWith('+===')) &&
        (!nextTrimmed || (!nextTrimmed.startsWith('|') && !nextTrimmed.startsWith('+')))
      ) {
        flush();
      }
      i++;
      continue;
    }

    if (trimmed.startsWith('+---') || trimmed.startsWith('+===')) {
      flush();
      currentType = 'ascii-box';
      currentBlock.push(line);
      i++;
      continue;
    }

    // 2. Blank line
    if (!trimmed) {
      flush();
      i++;
      continue;
    }

    // 3. Horizontal Rule
    if (/^[-*_]{3,}$/.test(trimmed)) {
      flush();
      blocks.push({ type: 'hr', raw: trimmed });
      i++;
      continue;
    }

    // 4. Headings (##, ###, ####)
    if (/^#{2,4}\s+/.test(trimmed)) {
      flush();
      const level = trimmed.match(/^(#{2,4})\s+/)[1].length;
      blocks.push({ type: 'heading', level, raw: trimmed });
      i++;
      continue;
    }

    // 5. Flowchart
    if (currentType === 'flowchart') {
      if (/^#{2,4}\s+/.test(trimmed) || /^[-*_]{3,}$/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
        flush();
        continue;
      }
      currentBlock.push(line);
      i++;
      continue;
    }

    if (trimmed.includes('Step 1:') && trimmed.includes('->')) {
      flush();
      currentType = 'flowchart';
      currentBlock.push(line);
      i++;
      continue;
    }

    // 6. Table
    if (isTableLine(trimmed)) {
      if (currentType !== 'table') {
        flush();
        currentType = 'table';
      }
      currentBlock.push(trimmed);
      i++;
      continue;
    }

    // 7. Bullet List
    if (/^[*-]\s+/.test(trimmed)) {
      if (currentType !== 'list') {
        flush();
        currentType = 'list';
      }
      currentBlock.push(trimmed);
      i++;
      continue;
    }

    // 8. Numbered List
    if (/^\d+\.\s+/.test(trimmed)) {
      if (currentType !== 'num-list') {
        flush();
        currentType = 'num-list';
      }
      currentBlock.push(trimmed);
      i++;
      continue;
    }

    // 9. Blockquote
    if (trimmed.startsWith('>')) {
      if (currentType !== 'quote') {
        flush();
        currentType = 'quote';
      }
      currentBlock.push(trimmed);
      i++;
      continue;
    }

    // 10. Paragraph
    if (currentType !== 'paragraph') {
      flush();
      currentType = 'paragraph';
    }
    currentBlock.push(trimmed);
    i++;
  }

  flush();
  return blocks;
}

function parseTableRows(lines) {
  const cleanLines = lines.map((l) => l.trim()).filter(Boolean);
  const rows = cleanLines.map((line) => {
    const parts = line.split('|');
    if (parts.length > 0 && parts[0].trim() === '') parts.shift();
    if (parts.length > 0 && parts[parts.length - 1].trim() === '') parts.pop();
    return parts.map((p) => p.trim());
  });

  const headerRow = rows[0] || [];
  const bodyRows = rows.slice(1).filter((r) => !r.every((cell) => /^:?-+:?$/.test(cell)));
  return { headerRow, bodyRows };
}

// Full Markdown Block Formatter Engine
function renderRichMarkdown(content) {
  if (!content) return null;
  const blocks = parseMarkdownToBlocks(content);

  return blocks.map((block, idx) => {
    switch (block.type) {
      case 'hr':
        return (
          <hr key={idx} style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '36px 0' }} />
        );

      case 'heading': {
        const text = block.raw.replace(/^#{2,4}\s+/, '').trim();
        const headingSlug = slugify(text);

        if (block.level === 2) {
          if (text.toLowerCase().includes('frequently asked questions')) {
            return (
              <h2 key={idx} id="faqs" style={{ fontSize: '1.85rem', marginTop: '48px', marginBottom: '22px', color: '#0F2D4E', fontWeight: '800', borderBottom: '2px solid #0169A9', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <HelpCircle size={26} style={{ color: '#0169A9' }} /> Frequently Asked Questions (FAQs)
              </h2>
            );
          }
          return (
            <h2 key={idx} id={headingSlug} style={{ fontSize: '1.75rem', marginTop: '48px', marginBottom: '18px', color: '#0F2D4E', fontWeight: '800', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
              {text}
            </h2>
          );
        }

        if (block.level === 3) {
          const isFaqQ = /^Q\d*:\s*/i.test(text);
          if (isFaqQ) {
            const cleanQ = text.replace(/^Q\d*:\s*/i, '');
            return (
              <h3 key={idx} id={headingSlug} style={{ fontSize: '1.25rem', marginTop: '30px', marginBottom: '12px', color: '#0F2D4E', fontWeight: '700', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ background: '#0169A9', color: '#FFFFFF', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', marginTop: '3px', fontWeight: '800', flexShrink: 0 }}>Q</span>
                <span>{cleanQ}</span>
              </h3>
            );
          }
          return (
            <h3 key={idx} id={headingSlug} style={{ fontSize: '1.35rem', marginTop: '32px', marginBottom: '14px', color: '#0169A9', fontWeight: '700' }}>
              {text}
            </h3>
          );
        }

        // H4 Heading
        return (
          <h4 key={idx} id={headingSlug} style={{ fontSize: '1.15rem', marginTop: '26px', marginBottom: '12px', color: '#0F2D4E', fontWeight: '700' }}>
            {text}
          </h4>
        );
      }

      case 'table': {
        const { headerRow, bodyRows } = parseTableRows(block.lines);
        return (
          <div key={idx} style={{ overflowX: 'auto', margin: '28px 0', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr>
                  {headerRow.map((cell, cIdx) => (
                    <th key={cIdx} style={{ background: '#0F2D4E', color: '#FFFFFF', padding: '14px 18px', fontWeight: '700', borderBottom: '2px solid #0169A9', whiteSpace: 'nowrap' }}>
                      {parseInlineMarkdown(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: '13px 18px', borderBottom: '1px solid #E2E8F0', color: '#334155' }}>
                        {parseInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      case 'ascii-box':
        return (
          <div key={idx} style={{ margin: '28px 0', background: '#0B132B', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(11, 19, 43, 0.45)' }}>
            <div style={{ background: '#0F2D4E', padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(56, 189, 248, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginLeft: '6px' }}>
                  Hardware Architecture &amp; Data Flow Pipeline
                </span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#38BDF8', fontWeight: '700', fontFamily: 'monospace' }}>
                SYSTEM SCHEMATIC
              </span>
            </div>
            <pre style={{ margin: 0, padding: '20px', color: '#38BDF8', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '0.85rem', lineHeight: '1.45', overflowX: 'auto', whiteSpace: 'pre' }}>
              {block.raw}
            </pre>
          </div>
        );

      case 'flowchart':
        return (
          <div key={idx} style={{ margin: '24px 0', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '12px', padding: '18px 24px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0169A9', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Deployment Flow Protocol
            </div>
            <pre style={{ margin: 0, fontSize: '0.875rem', color: '#0F2D4E', overflowX: 'auto', whiteSpace: 'pre', lineHeight: '1.5' }}>
              {block.raw}
            </pre>
          </div>
        );

      case 'list':
        return (
          <ul key={idx} style={{ paddingLeft: '24px', marginBottom: '24px', listStyleType: 'disc' }}>
            {block.lines.map((item, itemIdx) => {
              const cleanText = item.replace(/^[*-]\s+/, '');
              return (
                <li key={itemIdx} style={{ marginBottom: '10px', lineHeight: '1.75', color: '#334155', fontSize: '1.05rem' }}>
                  {parseInlineMarkdown(cleanText)}
                </li>
              );
            })}
          </ul>
        );

      case 'num-list':
        return (
          <ol key={idx} style={{ paddingLeft: '24px', marginBottom: '24px' }}>
            {block.lines.map((item, itemIdx) => {
              const cleanText = item.replace(/^\d+\.\s+/, '');
              return (
                <li key={itemIdx} style={{ marginBottom: '10px', lineHeight: '1.75', color: '#334155', fontSize: '1.05rem' }}>
                  {parseInlineMarkdown(cleanText)}
                </li>
              );
            })}
          </ol>
        );

      case 'quote':
        return (
          <blockquote key={idx} style={{ background: '#F0F9FF', borderLeft: '4px solid #0169A9', padding: '20px 24px', borderRadius: '0 12px 12px 0', marginBottom: '24px', fontStyle: 'italic', color: '#0F2D4E', fontSize: '1.05rem', lineHeight: '1.7' }}>
            {parseInlineMarkdown(block.raw.replace(/^>\s*/gm, ''))}
          </blockquote>
        );

      case 'paragraph':
      default:
        return (
          <p key={idx} style={{ marginBottom: '20px', lineHeight: '1.8', color: '#334155', fontSize: '1.05rem' }}>
            {parseInlineMarkdown(block.raw)}
          </p>
        );
    }
  });
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams?.city);
  if (!blog) notFound();

  const allBlogs = getAllBlogs();
  const relatedBlogs = allBlogs
    .filter((b) => b.slug !== blog.slug)
    .sort((a, b) => {
      const aSameCat = a.category === blog.category ? 1 : 0;
      const bSameCat = b.category === blog.category ? 1 : 0;
      return bSameCat - aSameCat;
    })
    .slice(0, 3);

  const articleSchema = generateArticleSchema(blog);
  const faqSchema = generateFaqSchema(blog);
  const breadcrumbSchema = generateBreadcrumbSchema(blog);

  const blocks = parseMarkdownToBlocks(blog.content);
  const headings = [];
  blocks.forEach((b) => {
    if (b.type === 'heading' && b.level === 2) {
      const text = b.raw.replace(/^##\s+/, '').trim();
      if (!text.toLowerCase().includes('frequently asked questions')) {
        headings.push({ text, slug: slugify(text) });
      }
    }
  });

  return (
    <>
      <Header />
      <article style={{ background: '#FFFFFF', paddingTop: '130px', paddingBottom: '70px' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}
        {breadcrumbSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          />
        )}

        {/* Main Content Container - 800px Max-Width Centered (Probiota Standard) */}
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Navigation Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '0.875rem', color: '#64748B' }}>
            <Link href="/blog" style={{ color: '#0169A9', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowLeft size={14} /> Knowledge Hub
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: '#0F2D4E', fontWeight: '600' }}>{blog.category}</span>
          </nav>

          {/* Category Badge Pill */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ background: '#F0F9FF', color: '#0169A9', fontSize: '0.8rem', fontWeight: '700', padding: '6px 16px', borderRadius: '99px', border: '1px solid #BAE6FD', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-block' }}>
              {blog.category}
            </span>
          </div>

          {/* Post Title */}
          <h1 style={{ fontSize: '2.6rem', lineHeight: '1.25', marginBottom: '1.25rem', color: '#0F2D4E', fontWeight: '800' }}>
            {blog.title}
          </h1>

          {/* Author & Meta Bar (Clean Probiota Line Alignment) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.9rem', color: '#64748B', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <span>
              By <strong style={{ color: '#0F2D4E' }}>{blog.author?.name || 'Atlanta Systems Hardware Engineering'}</strong>
            </span>
            <span>•</span>
            {blog.publishedAt && (
              <>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={14} /> {blog.publishedAt}
                </span>
                <span>•</span>
              </>
            )}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={14} /> {blog.readTime || '12 min read'}
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Globe size={14} style={{ color: '#0169A9' }} /> {blog.city} ({blog.country})
            </span>
          </div>

          {/* Featured Hero Image (16:9 aspect ratio, 800px max width, Probiota Standard) */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.1)', border: '1px solid #E2E8F0', background: '#0F172A' }}>
            <Image
              src={`/blog/${blog.slug}.webp`}
              alt={blog.title}
              title={`${blog.title} | Atlanta Systems Enterprise Telematics`}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 800px"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Executive Summary Box */}
          <div style={{ padding: '22px 26px', background: '#F8FAFC', borderRadius: '12px', borderLeft: '4px solid #0169A9', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: '1.7', color: '#334155', border: '1px solid #E2E8F0', borderLeftWidth: '4px' }}>
            <strong style={{ display: 'block', marginBottom: '8px', color: '#0169A9', fontSize: '0.8rem', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: '800' }}>
              Executive Summary & Operational Context
            </strong>
            {blog.excerpt}
          </div>

          {/* Table of Contents */}
          {headings.length > 0 && (
            <div style={{ padding: '22px 26px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '12px', color: '#0F2D4E', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <List size={18} style={{ color: '#0169A9' }} /> Table of Contents
              </h3>
              <ol style={{ paddingLeft: '20px', margin: 0, fontSize: '0.95rem', lineHeight: '1.8' }}>
                {headings.map((h, i) => (
                  <li key={i} style={{ marginBottom: '6px' }}>
                    <a href={`#${h.slug}`} style={{ color: '#0169A9', textDecoration: 'none', fontWeight: '600' }}>
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Article Body Content Formatted with Rich Renderer (800px Centered) */}
          <div className="prose" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', lineHeight: '1.8', color: '#334155' }}>
            {renderRichMarkdown(blog.content)}
          </div>

          {/* B2B Procurement CTA Card */}
          <div style={{ textAlign: 'center', margin: '4rem 0 2rem 0', padding: '3.5rem 2rem', background: 'linear-gradient(135deg, #0F2D4E 0%, #0169A9 100%)', borderRadius: '16px', color: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '12px', color: '#FFFFFF', fontWeight: '800' }}>
              Deploy Atlanta Telematics Hardware for Your Fleet
            </h3>
            <p style={{ color: '#E2E8F0', maxWidth: '600px', margin: '0 auto 24px auto', fontSize: '1rem', lineHeight: '1.6' }}>
              Direct SMT factory pricing, white-label distributor margins, private APN compilation, and certified REST API webhooks for system integrators and fleet operators.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn" style={{ background: '#0169A9', color: '#FFFFFF', border: '1px solid #38BDF8', padding: '12px 28px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none' }}>
                Request Wholesale Quotation
              </Link>
              <Link href="/blog" className="btn" style={{ background: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.4)', padding: '12px 28px', borderRadius: '8px', fontWeight: '600', textDecoration: 'none' }}>
                Back to Knowledge Hub
              </Link>
            </div>
          </div>

        </div>
      </article>

      {/* Related Articles Section (exactly like Probiota) */}
      {relatedBlogs.length > 0 && (
        <section style={{ background: '#F8FAFC', padding: '4.5rem 0', borderTop: '1px solid #E2E8F0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2.5rem', color: '#0F2D4E', fontWeight: '800' }}>
              Related Telematics Engineering Guides
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {relatedBlogs.map((relBlog) => (
                <BlogCard key={relBlog.slug} blog={relBlog} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
