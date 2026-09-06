import { getAllBlogSummaries } from '@/lib/blog';
import BlogClientIndex from '@/components/blog/BlogClientIndex';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Atlanta Systems B2B Telematics Knowledge Hub | Fleet Engineering & Compliance Guides',
  description: 'Explore enterprise telematics guides from Atlanta Systems covering AIS 140 compliance, fuel theft prevention, signal jammer detection, WHO GDP cold chain, EU GSR 2024 compliance, and AI video fleet safety.',
  alternates: {
    canonical: 'https://www.atlantasys.com/blog',
  },
  openGraph: {
    title: 'Atlanta Systems B2B Telematics Knowledge Hub | Fleet Engineering Guides',
    description: 'Explore 300 deep-dive enterprise telematics engineering guides covering AIS-140, fuel theft prevention, cold chain, and AI video fleet safety.',
    url: 'https://www.atlantasys.com/blog',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

const blogBreadcrumbSchema = {
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
      name: 'B2B Telematics Knowledge Hub',
      item: 'https://www.atlantasys.com/blog',
    },
  ],
};

export default function BlogIndexPage() {
  const blogs = getAllBlogSummaries();
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogBreadcrumbSchema) }}
      />
      <BlogClientIndex blogs={blogs} />
      <Footer />
    </>
  );
}
