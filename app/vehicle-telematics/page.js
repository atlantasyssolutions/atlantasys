import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'AIS-140 GPS Trackers & Commercial Vehicle Telematics | Atlanta Systems',
  description: 'ARAI and MoRTH certified AIS-140 GPS tracking units, 4G LTE gateways, emergency panic buttons, and dual-SIM auto-failover hardware.',
  alternates: {
    canonical: 'https://www.atlantasys.com/vehicle-telematics',
  },
};

export default function VehicleTelematicsPage() {
  return (
    <>
      <Header />
      <main className="section-padding" style={{ paddingTop: '120px', background: '#FFFFFF' }}>
        <ProductCatalog initialCategory="vehicle-telematics" />
      </main>
      <Footer />
    </>
  );
}
