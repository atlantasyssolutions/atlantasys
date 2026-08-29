import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'Video Telematics, ADAS & AI Dash Cams | Atlanta Systems',
  description: 'AI-powered Dash Cams with ADAS (Advanced Driver Assistance System) and DMS (Driver Monitoring System) for real-time risk alerts and incident evidence.',
};

export default function VideoTelematicsPage() {
  return (
    <>
      <Header />
      <ProductCatalog initialCategory="video-telematics" />
      <Footer />
    </>
  );
}
