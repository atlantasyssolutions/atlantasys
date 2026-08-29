import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'OBD Telematics & Diagnostics | Atlanta Systems',
  description: 'Plug-and-play OBD-II telematics devices for vehicle diagnostics, driver monitoring, and ELD compliance.',
};

export default function ObdTelematicsPage() {
  return (
    <>
      <Header />
      <ProductCatalog initialCategory="obd-telematics" />
      <Footer />
    </>
  );
}
