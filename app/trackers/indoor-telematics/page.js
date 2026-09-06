import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'Indoor Telematics & Asset Tracking | Atlanta Systems',
  description: 'BLE beacons, RFID tag readers, and indoor positioning devices for warehouse, hospital, and retail asset management.',
  alternates: {
    canonical: 'https://www.atlantasys.com/trackers/indoor-telematics',
  },
  openGraph: {
    title: 'Indoor Telematics & Asset Tracking | Atlanta Systems',
    description: 'BLE beacons, RFID tag readers, and indoor positioning devices for warehouse and hospital asset management.',
    url: 'https://www.atlantasys.com/trackers/indoor-telematics',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Indoor Telematics & Positioning Beacons',
  description: 'Industrial BLE 5.0 beacons, gateway loggers, and RFID readers.',
  url: 'https://www.atlantasys.com/trackers/indoor-telematics',
};

export default function IndoorTelematicsPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <ProductCatalog initialCategory="indoor-telematics" />
      <Footer />
    </>
  );
}
