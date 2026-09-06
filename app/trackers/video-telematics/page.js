import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'Video Telematics, ADAS & AI Dash Cams | Atlanta Systems',
  description: 'AI-powered Dash Cams with ADAS (Advanced Driver Assistance System) and DMS (Driver Monitoring System) for real-time risk alerts and incident evidence.',
  alternates: {
    canonical: 'https://www.atlantasys.com/trackers/video-telematics',
  },
  openGraph: {
    title: 'Video Telematics, ADAS & AI Dash Cams | Atlanta Systems',
    description: 'AI-powered Dash Cams with ADAS and DMS for real-time risk alerts and incident evidence.',
    url: 'https://www.atlantasys.com/trackers/video-telematics',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Video Telematics, ADAS & AI Dash Cams',
  description: 'Multi-channel MDVRs, dual-lens AI dash cams, and fatigue monitoring cameras.',
  url: 'https://www.atlantasys.com/trackers/video-telematics',
};

export default function VideoTelematicsPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <ProductCatalog initialCategory="video-telematics" />
      <Footer />
    </>
  );
}
