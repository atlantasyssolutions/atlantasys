import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'Industrial IoT Sensors & Telemetry Solutions | Atlanta Systems',
  description: 'Fuel sensors, temperature probes, door lock sensors, and environmental monitors for complete fleet and asset intelligence.',
  alternates: {
    canonical: 'https://www.atlantasys.com/trackers/iot-sensors',
  },
  openGraph: {
    title: 'Industrial IoT Sensors & Telemetry Solutions | Atlanta Systems',
    description: 'Capacitive fuel sensors, ultrasonic level probes, temperature beacons, and door lock sensors.',
    url: 'https://www.atlantasys.com/trackers/iot-sensors',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Industrial IoT Sensors & Telemetry Solutions',
  description: 'Capacitive fuel probes, BLE temperature sensors, and multi-tank telemetry hardware.',
  url: 'https://www.atlantasys.com/trackers/iot-sensors',
};

export default function IoTSensorsPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <ProductCatalog initialCategory="iot-sensors" />
      <Footer />
    </>
  );
}
