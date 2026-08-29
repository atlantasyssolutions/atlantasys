import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'ADAS & DMS Video Telematics AI Dash Cams | Atlanta Systems',
  description: 'Dual-lens AI video telematics with Advanced Driver Assistance Systems (ADAS), Driver Monitoring Systems (DMS), and 77GHz side warning radar fusion.',
  alternates: {
    canonical: 'https://www.atlantasys.com/adas',
  },
  openGraph: {
    title: 'ADAS & DMS Video Telematics AI Dash Cams | Atlanta Systems',
    description: 'Dual-lens AI video telematics with ADAS and DMS driver microsleep detection.',
    url: 'https://www.atlantasys.com/adas',
  },
};

export default function AdasPage() {
  return (
    <>
      <Header />
      <main className="section-padding" style={{ paddingTop: '120px', background: '#FFFFFF' }}>
        <ProductCatalog initialCategory="video-telematics" />
      </main>
      <Footer />
    </>
  );
}
