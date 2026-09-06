import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'Vehicle Telematics & GPS Trackers | Atlanta Systems',
  description: 'Enterprise GPS tracking devices for vehicle fleets with real-time location monitoring, CAN-bus data, fuel telematics, and driver safety features.',
  alternates: {
    canonical: 'https://www.atlantasys.com/trackers/vehicle-telematics',
  },
  openGraph: {
    title: 'Vehicle Telematics & GPS Trackers | Atlanta Systems',
    description: 'Enterprise GPS tracking devices for vehicle fleets with real-time location monitoring and CAN-bus integration.',
    url: 'https://www.atlantasys.com/trackers/vehicle-telematics',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Vehicle Telematics & GPS Trackers',
  description: 'ARAI AIS-140 certified GPS trackers, 4G LTE gateways, and commercial vehicle telematics terminals.',
  url: 'https://www.atlantasys.com/trackers/vehicle-telematics',
};

export default function VehicleTelematicsPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <ProductCatalog initialCategory="vehicle-telematics" />
      <Footer />
    </>
  );
}
