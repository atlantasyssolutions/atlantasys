import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogs, generateArticleSchema, generateFaqSchema, generateBreadcrumbSchema } from '@/lib/blog';
import { Calendar, Clock, Globe, ArrowLeft, Tag, MapPin, ShieldCheck, Layers, ChevronRight, CheckCircle2, List, HelpCircle } from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';
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

function renderFormattedText(text) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    let url = match[2];

    if (url.startsWith('https://www.atlantasys.com') || url.startsWith('https://atlantasys.com')) {
      url = url.replace(/https:\/\/(www\.)?atlantasys\.com/, '');
      if (!url.startsWith('/')) url = '/' + url;
    }

    if (url.startsWith('/')) {
      parts.push(
        <Link key={match.index} href={url} style={{ color: '#ff6000', fontWeight: '700', textDecoration: 'underline' }}>
          {label}
        </Link>
      );
    } else {
      parts.push(
        <a key={match.index} href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#ff6000', fontWeight: '700', textDecoration: 'underline' }}>
          {label}
        </a>
      );
    }
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams?.city);
  if (!blog) notFound();

  const allBlogs = getAllBlogs();
  const currentIndex = allBlogs.findIndex((b) => b.slug.toLowerCase() === blog.slug.toLowerCase());
  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  const relatedBlogs = allBlogs
    .filter((b) => b.slug !== blog.slug)
    .filter((b) => b.category === blog.category || b.geoRegion === blog.geoRegion)
    .slice(0, 4);

  if (relatedBlogs.length < 4) {
    const filler = allBlogs.filter((b) => b.slug !== blog.slug && !relatedBlogs.includes(b)).slice(0, 4 - relatedBlogs.length);
    relatedBlogs.push(...filler);
  }

  const articleSchema = generateArticleSchema(blog);
  const faqSchema = generateFaqSchema(blog);
  const breadcrumbSchema = generateBreadcrumbSchema(blog);

  const headings = [];
  const rawParagraphs = (blog.content || '').split('\n\n');
  rawParagraphs.forEach((p) => {
    const trimmed = p.trim();
    if (trimmed.startsWith('## ') && !trimmed.includes('Frequently Asked Questions')) {
      const text = trimmed.replace('## ', '').trim();
      headings.push({ text, slug: slugify(text) });
    }
  });

  return (
    <>
      <Header />
      <article className="pt-50 pb-70" style={{ background: '#fff' }}>
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

        <div className="container" style={{ maxWidth: '900px' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '25px', fontSize: '14px', color: '#666' }}>
            <Link href="/blog" style={{ color: '#ff6000', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowLeft size={14} /> Knowledge Hub
            </Link>
            <ChevronRight size={14} />
            <span>{blog.category}</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ background: '#ff6000', color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '20px' }}>
              {blog.category}
            </span>
            <span style={{ fontSize: '13px', color: '#555', fontWeight: '600', background: '#fafafa', padding: '4px 12px', borderRadius: '20px', border: '1px solid #eee' }}>
              <Globe size={14} className="me-1" style={{ color: '#ff6000' }} /> Region: {blog.geoRegion || 'Global'}
            </span>
            <span style={{ fontSize: '13px', color: '#28a745', fontWeight: '600', background: '#eafaf1', padding: '4px 12px', borderRadius: '20px', border: '1px solid #c3e6cb' }}>
              <ShieldCheck size={14} className="me-1" /> Peer-Reviewed & Verified
            </span>
          </div>

          <h1 style={{ fontSize: '32px', lineHeight: '1.3', marginBottom: '20px', color: '#1d2250', fontWeight: '800' }}>
            {blog.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: '#fafafa', borderRadius: '10px', border: '1px solid #eee', marginBottom: '30px', flexWrap: 'wrap' }}>
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#1d2250', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
              {blog.author?.name ? blog.author.name.charAt(0) : 'A'}
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ color: '#252525', fontSize: '15px' }}>{blog.author?.name || 'Atlanta Systems Engineering'}</strong>
              <div style={{ fontSize: '13px', color: '#666' }}>{blog.author?.role || 'Senior Telematics Architect'} • Atlanta Systems Labs</div>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#666', borderLeft: '1px solid #ddd', paddingLeft: '16px' }}>
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

          <div style={{ padding: '24px', background: '#fff5f0', borderRadius: '10px', borderLeft: '4px solid #ff6000', marginBottom: '35px', fontSize: '16px', lineHeight: '1.6', color: '#333' }}>
            <strong style={{ display: 'block', marginBottom: '6px', color: '#ff6000', fontSize: '13px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Executive Summary &amp; Operational Context</strong>
            {blog.excerpt}
          </div>

          {headings.length > 0 && (
            <div style={{ padding: '20px 25px', background: '#fafafa', borderRadius: '10px', border: '1px solid #eee', marginBottom: '35px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#1d2250', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <List size={18} style={{ color: '#ff6000' }} /> Table of Contents
              </h3>
              <ol style={{ paddingLeft: '20px', margin: 0, fontSize: '14px', lineHeight: '1.8' }}>
                {headings.map((h, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>
                    <a href={`#${h.slug}`} style={{ color: '#ff6000', textDecoration: 'none', fontWeight: '600' }}>
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
            {rawParagraphs.map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith('# ')) return null;

              if (trimmed.startsWith('## ')) {
                const headingText = trimmed.replace('## ', '');
                const headingSlug = slugify(headingText);

                if (headingText.includes('Frequently Asked Questions')) {
                  return (
                    <h2 key={index} id="faqs" style={{ fontSize: '24px', marginTop: '40px', marginBottom: '20px', color: '#1d2250', fontWeight: 'bold', borderBottom: '2px solid #ff6000', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <HelpCircle size={22} style={{ color: '#ff6000' }} /> Frequently Asked Questions (FAQs)
                    </h2>
                  );
                }

                return (
                  <h2 key={index} id={headingSlug} style={{ fontSize: '24px', marginTop: '40px', marginBottom: '15px', color: '#1d2250', fontWeight: 'bold', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                    {headingText}
                  </h2>
                );
              }

              if (trimmed.startsWith('### ')) {
                const subText = trimmed.replace('### ', '');
                const subSlug = slugify(subText);

                return (
                  <h3 key={index} id={subSlug} style={{ fontSize: '18px', marginTop: '25px', marginBottom: '12px', color: '#ff6000', fontWeight: 'bold' }}>
                    {subText}
                  </h3>
                );
              }

              if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                const items = trimmed.split('\n').map(item => item.replace(/^[*-]\s+/, ''));
                return (
                  <ul key={index} style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                    {items.map((item, i) => (
                      <li key={i} style={{ marginBottom: '6px' }}>{renderFormattedText(item)}</li>
                    ))}
                  </ul>
                );
              }

              return <p key={index} style={{ marginBottom: '20px' }}>{renderFormattedText(trimmed)}</p>;
            })}
          </div>

          {/* Contact Box */}
          <div style={{ padding: '30px', marginTop: '40px', background: '#1d2250', borderRadius: '10px', color: '#fff', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#fff', fontWeight: 'bold' }}>Protect Your Commercial Fleet Today</h3>
            <p style={{ color: '#ddd', marginBottom: '20px', maxWidth: '600px', margin: '0 auto 20px' }}>
              Schedule a live telematics hardware demonstration with Atlanta Systems engineers.
            </p>
            <Link href="/contact" className="default-btn btn-bg-two" style={{ background: '#ff6000', color: '#fff', padding: '12px 30px', borderRadius: '50px', border: 'none', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}>
              Schedule Technical Demo <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
