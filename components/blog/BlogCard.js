'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function BlogCard({ blog }) {
  const primaryImageSrc = `/blog/${blog.slug}.webp`;
  const fallbackImageSrc = '/blog-cross-border-telematics.webp';

  const [imgSrc, setImgSrc] = useState(primaryImageSrc);

  return (
    <Link href={`/blog/${blog.slug}`} className="blog-card" style={{ cursor: 'pointer' }}>
      <div className="blog-card-image">
        <Image
          src={imgSrc}
          alt={blog.title}
          onError={() => setImgSrc(fallbackImageSrc)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="blog-card-content">
        <span className="blog-card-category">{blog.category}</span>
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-excerpt">{blog.excerpt}</p>
        <div className="blog-card-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: '#64748B' }}>
            {blog.publishedAt && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={13} /> {blog.publishedAt}
              </span>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={13} /> {blog.readTime || '12 min read'}
            </span>
          </div>
          <span className="read-more">
            Read Article
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
