import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'OBD Telematics & Diagnostics | Atlanta Systems',
  description: 'Plug-and-play OBD-II telematics devices for vehicle diagnostics, driver monitoring, and ELD compliance.',
  alternates: {
    canonical: 'https://www.atlantasys.com/trackers/obd-telematics',
  },
  openGraph: {
    title: 'OBD Telematics & Diagnostics | Atlanta Systems',
    description: 'Plug-and-play OBD-II telematics devices for vehicle diagnostics, driver monitoring, and ELD compliance.',
    url: 'https://www.atlantasys.com/trackers/obd-telematics',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'OBD Telematics & Diagnostics',
  description: 'Plug-and-play OBD-II dongles, DTC diagnostics, and CAN-bus readers.',
  url: 'https://www.atlantasys.com/trackers/obd-telematics',
};

export default function ObdTelematicsPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <ProductCatalog initialCategory="obd-telematics" />
      <Footer />
    </>
  );
}
