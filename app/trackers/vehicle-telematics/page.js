import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'Vehicle Telematics & GPS Trackers | Atlanta Systems',
  description: 'Enterprise GPS tracking devices for vehicle fleets with real-time location monitoring, CAN-bus data, fuel telematics, and driver safety features.',
};

export default function VehicleTelematicsPage() {
  return (
    <>
      <Header />
      <ProductCatalog initialCategory="vehicle-telematics" />
      <Footer />
    </>
  );
}
