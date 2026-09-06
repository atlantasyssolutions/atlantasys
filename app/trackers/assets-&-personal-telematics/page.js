import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'Assets & Personal Telematics | Atlanta Systems',
  description: 'Magnetic GPS asset trackers, personal safety devices, and container tracking hardware.',
  alternates: {
    canonical: 'https://www.atlantasys.com/trackers/assets-&-personal-telematics',
  },
  openGraph: {
    title: 'Assets & Personal Telematics | Atlanta Systems',
    description: 'Magnetic GPS asset trackers, personal safety devices, and container tracking hardware.',
    url: 'https://www.atlantasys.com/trackers/assets-&-personal-telematics',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Assets & Personal Telematics',
  description: 'Magnetic container trackers, solar-powered asset monitors, and worker safety badges.',
  url: 'https://www.atlantasys.com/trackers/assets-&-personal-telematics',
};

export default function AssetsPersonalTelematicsPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <ProductCatalog initialCategory="assets-&-personal-telematics" />
      <Footer />
    </>
  );
}
