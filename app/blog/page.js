import { getAllBlogSummaries } from '@/lib/blog';
import BlogClientIndex from '@/components/blog/BlogClientIndex';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Atlanta Systems B2B Telematics Knowledge Hub | Fleet Engineering & Compliance Guides',
  description: 'Explore enterprise telematics guides from Atlanta Systems covering AIS 140 compliance, fuel theft prevention, signal jammer detection, WHO GDP cold chain, EU GSR 2024 compliance, and AI video fleet safety.',
};

export default function BlogIndexPage() {
  const blogs = getAllBlogSummaries();
  return (
    <>
      <Header />
      <BlogClientIndex blogs={blogs} />
      <Footer />
    </>
  );
}
