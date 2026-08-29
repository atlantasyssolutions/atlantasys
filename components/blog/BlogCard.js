'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Globe, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function BlogCard({ blog, cityContext }) {
  const primaryImageSrc = `/blog/${blog.slug}.webp`;
  const fallbackImageSrc = '/blog-cross-border-telematics.webp';

  const [imgSrc, setImgSrc] = useState(primaryImageSrc);

  const targetUrl = cityContext ? `/blog/${cityContext}/${blog.slug}` : `/blog/${blog.slug}`;

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', padding: 0 }}>
      {/* Post Thumbnail Image */}
      <div style={{ position: 'relative', width: '100%', height: '190px', background: '#0F172A', overflow: 'hidden' }}>
        <Image 
           src={imgSrc} 
          alt={blog.title}
          onError={() => setImgSrc(fallbackImageSrc)} fill
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '99px',
              background: 'rgba(15, 23, 42, 0.85)',
              color: '#38BDF8',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              backdropFilter: 'blur(4px)'
            }}
          >
            {blog.category}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#FFFFFF', padding: '4px 10px', borderRadius: '99px', background: 'rgba(15, 23, 42, 0.85)', fontWeight: '600', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={13} style={{ color: '#10B981' }} /> {cityContext ? cityContext.toUpperCase() : blog.geoRegion || 'Global'}
          </span>
        </div>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Post Title */}
        <h3 style={{ fontSize: '1.2rem', lineHeight: '1.4', marginBottom: '12px', color: 'var(--text-main)', fontWeight: '700' }}>
          <Link href={targetUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
            {blog.title} {cityContext && `in ${cityContext.charAt(0).toUpperCase() + cityContext.slice(1)}`}
          </Link>
        </h3>

        {/* Excerpt */}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
          {blog.excerpt}
        </p>

        {/* Meta Footer */}
        <div style={{ paddingTop: '14px', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {blog.publishedAt && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={13} /> {blog.publishedAt}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={13} /> {blog.readTime || '12 min read'}
            </span>
          </div>

          <Link href={targetUrl} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary-blue)', fontWeight: '700' }}>
            Read <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
