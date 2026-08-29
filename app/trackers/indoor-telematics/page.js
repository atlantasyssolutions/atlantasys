import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'Indoor Telematics & Asset Tracking | Atlanta Systems',
  description: 'BLE beacons, RFID tag readers, and indoor positioning devices for warehouse, hospital, and retail asset management.',
};

export default function IndoorTelematicsPage() {
  return (
    <>
      <Header />
      <ProductCatalog initialCategory="indoor-telematics" />
      <Footer />
    </>
  );
}
