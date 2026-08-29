import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'Industrial IoT Sensors & Telemetry Solutions | Atlanta Systems',
  description: 'Fuel sensors, temperature probes, door lock sensors, and environmental monitors for complete fleet and asset intelligence.',
};

export default function IoTSensorsPage() {
  return (
    <>
      <Header />
      <ProductCatalog initialCategory="iot-sensors" />
      <Footer />
    </>
  );
}
