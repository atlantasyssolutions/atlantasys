import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'GPS Tracking Devices & Industrial IoT Sensor Directory | Atlanta Systems',
  description: 'Explore the full range of Atlanta Systems GPS tracking devices, OBD dongles, video telematics dash cams, capacitive fuel probes, and BLE temperature beacons.',
  alternates: {
    canonical: 'https://www.atlantasys.com/trackers',
  },
};

export default function TrackersIndexPage() {
  return (
    <>
      <Header />
      <main className="section-padding" style={{ paddingTop: '120px', background: '#FFFFFF' }}>
        <ProductCatalog initialCategory="all" />
      </main>
      <Footer />
    </>
  );
}
