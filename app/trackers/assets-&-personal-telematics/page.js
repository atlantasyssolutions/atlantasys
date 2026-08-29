import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'Assets & Personal Telematics | Atlanta Systems',
  description: 'Magnetic GPS asset trackers, personal safety devices, and container tracking hardware.',
};

export default function AssetsPersonalTelematicsPage() {
  return (
    <>
      <Header />
      <ProductCatalog initialCategory="assets-&-personal-telematics" />
      <Footer />
    </>
  );
}
