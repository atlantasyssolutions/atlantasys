import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'GPS Tracking Devices & Industrial IoT Sensor Directory | Atlanta Systems',
  description: 'Explore the full range of Atlanta Systems GPS tracking devices, OBD dongles, video telematics dash cams, capacitive fuel probes, and BLE temperature beacons.',
  alternates: {
    canonical: 'https://www.atlantasys.com/trackers',
  },
  openGraph: {
    title: 'GPS Tracking Devices & Industrial IoT Sensor Directory | Atlanta Systems',
    description: 'Explore the full range of Atlanta Systems GPS tracking devices, OBD dongles, video telematics dash cams, capacitive fuel probes, and BLE temperature beacons.',
    url: 'https://www.atlantasys.com/trackers',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

const catalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Atlanta Systems Telematics Hardware & Sensor Catalog',
  description: 'Industrial GPS tracking units, AI dash cams, and capacitive fuel telemetry sensors.',
  url: 'https://www.atlantasys.com/trackers',
  numberOfItems: 7,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Vehicle Telematics', url: 'https://www.atlantasys.com/trackers/vehicle-telematics' },
    { '@type': 'ListItem', position: 2, name: 'Video Telematics', url: 'https://www.atlantasys.com/trackers/video-telematics' },
    { '@type': 'ListItem', position: 3, name: 'Indoor Telematics', url: 'https://www.atlantasys.com/trackers/indoor-telematics' },
    { '@type': 'ListItem', position: 4, name: 'IoT Sensors', url: 'https://www.atlantasys.com/trackers/iot-sensors' },
    { '@type': 'ListItem', position: 5, name: 'OBD Telematics', url: 'https://www.atlantasys.com/trackers/obd-telematics' },
    { '@type': 'ListItem', position: 6, name: 'Taxi GPS Meter', url: 'https://www.atlantasys.com/trackers/taxi-gps-meter' },
    { '@type': 'ListItem', position: 7, name: 'Assets & Personal Telematics', url: 'https://www.atlantasys.com/trackers/assets-&-personal-telematics' },
  ],
};

export default function TrackersIndexPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }}
      />
      <main className="section-padding" style={{ paddingTop: '120px', background: '#FFFFFF' }}>
        <ProductCatalog initialCategory="all" />
      </main>
      <Footer />
    </>
  );
}
