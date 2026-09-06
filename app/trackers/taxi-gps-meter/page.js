import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'Taxi GPS Meters & Smart POS Terminals | Atlanta Systems',
  description: 'Digital taxi fare meters with built-in GPS tracking, thermal receipt printers, and roof light integration.',
  alternates: {
    canonical: 'https://www.atlantasys.com/trackers/taxi-gps-meter',
  },
  openGraph: {
    title: 'Taxi GPS Meters & Smart POS Terminals | Atlanta Systems',
    description: 'Digital taxi fare meters with built-in GPS tracking, thermal receipt printers, and roof light integration.',
    url: 'https://www.atlantasys.com/trackers/taxi-gps-meter',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

const categorySchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Taxi GPS Meters & Smart POS Terminals',
  description: 'Digital electronic taxi meters, POS thermal printers, and roof LED indicators.',
  url: 'https://www.atlantasys.com/trackers/taxi-gps-meter',
};

export default function TaxiGpsMeterPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <ProductCatalog initialCategory="taxi-gps-meter" />
      <Footer />
    </>
  );
}
