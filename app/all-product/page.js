import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'All Products & GPS Tracking Devices Directory | Atlanta Systems',
  description: 'Complete product catalog of Atlanta Systems GPS vehicle trackers, AIS 140 devices, video telematics dash cams, OBD dongles, and industrial IoT sensors.',
  alternates: {
    canonical: 'https://www.atlantasys.com/all-product'
  },
  openGraph: {
    title: 'All Products | Atlanta Systems Telematics Hardware',
    description: 'Explore all 66 commercial GPS trackers, sensors, and telematics terminals manufactured by Atlanta Systems.',
    url: 'https://www.atlantasys.com/all-product',
    siteName: 'Atlanta Systems',
    type: 'website'
  }
};

export default function AllProductsPage() {
  return (
    <>
      <Header />
      <main className="section-padding" style={{ paddingTop: '100px', background: '#FFFFFF' }}>
        <ProductCatalog initialCategory="all" />
      </main>
      <Footer />
    </>
  );
}
