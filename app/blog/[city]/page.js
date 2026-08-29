import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogs, generateArticleSchema, generateFaqSchema, generateBreadcrumbSchema } from '@/lib/blog';
import { Calendar, Clock, Globe, ArrowLeft, ShieldCheck, ChevronRight, CheckCircle2, List, HelpCircle, Building2, MapPin } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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

// Parses bold, italic, and links inside text strings cleanly
function parseInlineMarkdown(text) {
  if (!text) return '';
  const parts = [];
  let currentIndex = 0;

  // Regex matches [label](url) and **bold**
  const combinedRegex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)/g;
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    if (match.index > currentIndex) {
      parts.push(text.substring(currentIndex, match.index));
    }

    if (match[1]) {
      // Link Match
      const label = match[2];
      let url = match[3];
      if (url.startsWith('https://www.atlantasys.com') || url.startsWith('https://atlantasys.com')) {
        url = url.replace(/https:\/\/(www\.)?atlantasys\.com/, '');
        if (!url.startsWith('/')) url = '/' + url;
      }

      if (url.startsWith('/')) {
        parts.push(
          <Link key={match.index} href={url} style={{ color: '#0169A9', fontWeight: '700', textDecoration: 'underline' }}>
            {label}
          </Link>
        );
      } else {
        parts.push(
          <a key={match.index} href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#0169A9', fontWeight: '700', textDecoration: 'underline' }}>
            {label}
          </a>
        );
      }
    } else if (match[4]) {
      // Bold Match
      parts.push(
        <strong key={match.index} style={{ color: '#0F2D4E', fontWeight: '700' }}>
          {match[5]}
        </strong>
      );
    }

    currentIndex = combinedRegex.lastIndex;
  }

  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : text;
}

// Full Markdown Block Formatter Engine
function renderRichMarkdown(content) {
  if (!content) return null;
  const blocks = content.split(/\n\n+/);

  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // H1 Heading
    if (trimmed.startsWith('# ')) {
      return null; // Skip H1 as page title handles it
    }

    // H2 Heading
    if (trimmed.startsWith('## ')) {
      const headingText = trimmed.replace(/^##\s+/, '');
      const headingSlug = slugify(headingText);

      if (headingText.toLowerCase().includes('frequently asked questions')) {
        return (
          <h2 key={idx} id="faqs" style={{ fontSize: '1.75rem', marginTop: '48px', marginBottom: '20px', color: '#0F2D4E', fontWeight: '800', borderBottom: '2px solid #0169A9', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HelpCircle size={24} style={{ color: '#0169A9' }} /> Frequently Asked Questions (FAQs)
          </h2>
        );
      }

      return (
        <h2 key={idx} id={headingSlug} style={{ fontSize: '1.75rem', marginTop: '44px', marginBottom: '18px', color: '#0F2D4E', fontWeight: '800', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px' }}>
          {headingText}
        </h2>
      );
    }

    // H3 Heading
    if (trimmed.startsWith('### ')) {
      const subText = trimmed.replace(/^###\s+/, '');
      const subSlug = slugify(subText);
      return (
        <h3 key={idx} id={subSlug} style={{ fontSize: '1.3rem', marginTop: '32px', marginBottom: '14px', color: '#0169A9', fontWeight: '700' }}>
          {subText}
        </h3>
      );
    }

    // Unordered Bullet List
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const listItems = trimmed.split('\n').filter(line => line.trim().startsWith('* ') || line.trim().startsWith('- '));
      return (
        <ul key={idx} style={{ paddingLeft: '24px', marginBottom: '24px', listStyleType: 'disc' }}>
          {listItems.map((item, itemIdx) => {
            const cleanText = item.replace(/^[*-]\s+/, '');
            return (
              <li key={itemIdx} style={{ marginBottom: '10px', lineHeight: '1.7', color: '#334155', fontSize: '1.05rem' }}>
                {parseInlineMarkdown(cleanText)}
              </li>
            );
          })}
        </ul>
      );
    }

    // Numbered List
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems = trimmed.split('\n').filter(line => /^\d+\.\s+/.test(line.trim()));
      return (
        <ol key={idx} style={{ paddingLeft: '24px', marginBottom: '24px' }}>
          {listItems.map((item, itemIdx) => {
            const cleanText = item.replace(/^\d+\.\s+/, '');
            return (
              <li key={itemIdx} style={{ marginBottom: '10px', lineHeight: '1.7', color: '#334155', fontSize: '1.05rem' }}>
                {parseInlineMarkdown(cleanText)}
              </li>
            );
          })}
        </ol>
      );
    }

    // Blockquote Callout
    if (trimmed.startsWith('> ')) {
      const quoteText = trimmed.replace(/^>\s+/, '').replace(/\n>\s+/g, ' ');
      return (
        <blockquote key={idx} style={{ background: '#F8FAFC', borderLeft: '4px solid #0169A9', padding: '20px 24px', borderRadius: '0 12px 12px 0', marginBottom: '24px', fontStyle: 'italic', color: '#0F2D4E' }}>
          {parseInlineMarkdown(quoteText)}
        </blockquote>
      );
    }

    // Standard Paragraph
    return (
      <p key={idx} style={{ marginBottom: '20px', lineHeight: '1.8', color: '#334155', fontSize: '1.05rem' }}>
        {parseInlineMarkdown(trimmed)}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams?.city);
  if (!blog) notFound();

  const allBlogs = getAllBlogs();

  const articleSchema = generateArticleSchema(blog);
  const faqSchema = generateFaqSchema(blog);
  const breadcrumbSchema = generateBreadcrumbSchema(blog);

  const headings = [];
  const rawParagraphs = (blog.content || '').split('\n\n');
  rawParagraphs.forEach((p) => {
    const trimmed = p.trim();
    if (trimmed.startsWith('## ') && !trimmed.toLowerCase().includes('frequently asked questions')) {
      const text = trimmed.replace('## ', '').trim();
      headings.push({ text, slug: slugify(text) });
    }
  });

  return (
    <>
      <Header />
      <article className="pt-50 pb-70" style={{ background: '#FFFFFF', paddingTop: '140px' }}>
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

        <div className="container" style={{ maxWidth: '920px' }}>
          
          {/* Navigation Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '0.875rem', color: '#64748B' }}>
            <Link href="/blog" style={{ color: '#0169A9', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowLeft size={14} /> Knowledge Hub
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: '#0F2D4E', fontWeight: '600' }}>{blog.category}</span>
          </nav>

          {/* Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(1, 105, 169, 0.1)', color: '#0169A9', fontSize: '0.8rem', fontWeight: '700', padding: '6px 14px', borderRadius: '99px', border: '1px solid rgba(1, 105, 169, 0.2)' }}>
              {blog.category}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: '600', background: '#F8FAFC', padding: '6px 14px', borderRadius: '99px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={14} style={{ color: '#0169A9' }} /> Region: {blog.geoRegion || 'Global'}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#065F46', fontWeight: '600', background: '#ECFDF5', padding: '6px 14px', borderRadius: '99px', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} style={{ color: '#10B981' }} /> Peer-Reviewed SMT Engineering
            </span>
          </div>

          {/* Post Title */}
          <h1 style={{ fontSize: '2.5rem', lineHeight: '1.25', marginBottom: '24px', color: '#0F2D4E', fontWeight: '800' }}>
            {blog.title}
          </h1>

          {/* Author & Meta Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '32px', flexWrap: 'wrap' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#0F2D4E', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.1rem' }}>
              {blog.author?.name ? blog.author.name.charAt(0) : 'A'}
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ color: '#0F2D4E', fontSize: '0.95rem' }}>{blog.author?.name || 'Atlanta Systems Hardware Engineering'}</strong>
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>{blog.author?.role || 'Senior Telematics Architect'} • Atlanta Systems Labs</div>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: '#64748B', borderLeft: '1px solid #CBD5E1', paddingLeft: '16px' }}>
              {blog.publishedAt && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={14} /> {blog.publishedAt}
                </span>
              )}
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={14} /> {blog.readTime || '10 min read'}
              </span>
            </div>
          </div>

          {/* Executive Summary Box - Matching Corporate Palette */}
          <div style={{ padding: '24px 28px', background: '#F0F9FF', borderRadius: '12px', borderLeft: '4px solid #0169A9', marginBottom: '40px', fontSize: '1.05rem', lineHeight: '1.7', color: '#0F2D4E', border: '1px solid #BAE6FD', borderLeftWidth: '4px' }}>
            <strong style={{ display: 'block', marginBottom: '8px', color: '#0169A9', fontSize: '0.8rem', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: '800' }}>
              Executive Summary & Operational Context
            </strong>
            {blog.excerpt}
          </div>

          {/* Table of Contents */}
          {headings.length > 0 && (
            <div style={{ padding: '24px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '14px', color: '#0F2D4E', display: 'flex', alignItems: 'center', gap: '8px' }}>
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

          {/* Article Body Content Formatted with Rich Renderer */}
          <div className="prose" style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#334155' }}>
            {renderRichMarkdown(blog.content)}
          </div>

          {/* B2B Procurement CTA Card */}
          <div style={{ padding: '36px', marginTop: '50px', background: 'linear-gradient(135deg, #0F2D4E 0%, #0169A9 100%)', borderRadius: '16px', color: '#FFFFFF', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '12px', color: '#FFFFFF', fontWeight: '800' }}>
              Deploy Atlanta Telematics Hardware for Your Fleet
            </h3>
            <p style={{ color: '#E2E8F0', marginBottom: '24px', maxWidth: '640px', margin: '0 auto 24px', fontSize: '1rem', lineHeight: '1.6' }}>
              Direct SMT factory pricing, white-label distributor margins, private APN compilation, and certified REST API webhooks for system integrators and fleet operators.
            </p>
            <Link href="/contact" className="btn" style={{ background: '#0169A9', color: '#FFFFFF', border: '1px solid #38BDF8', padding: '12px 32px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', display: 'inline-block' }}>
              Request Wholesale Quotation & Technical Demo
            </Link>
          </div>

        </div>
      </article>
      <Footer />
    </>
  );
}
