import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';

export const metadata = {
  title: 'Taxi GPS Meters & Smart POS Terminals | Atlanta Systems',
  description: 'Digital taxi fare meters with built-in GPS tracking, thermal receipt printers, and roof light integration.',
};

export default function TaxiGpsMeterPage() {
  return (
    <>
      <Header />
      <ProductCatalog initialCategory="taxi-gps-meter" />
      <Footer />
    </>
  );
}
