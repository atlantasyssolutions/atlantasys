import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Warranty & Repairs Policy | Atlanta Systems',
  description: 'Atlanta Systems hardware warranty coverage, RMA process, and repair guidelines for GPS devices and telematics hardware.',
};

export default function WarrantyPage() {
  return (
    <>
      <Header />

      <div className="inner-banner" style={{ background: 'linear-gradient(135deg, #070b3b 0%, #1d2250 100%)', padding: '60px 0', color: '#fff' }}>
        <div className="container text-center">
          <h1 style={{ fontSize: '42px', fontWeight: '800', fontFamily: "'Oswald', sans-serif", marginBottom: '15px' }}>Warranty &amp; Repairs</h1>
          <p style={{ fontSize: '16px', opacity: '0.9' }}>Standard and extended hardware protection policies</p>
        </div>
      </div>

      <section className="ptb-70">
        <div className="container" style={{ maxWidth: '900px', lineHeight: '1.8', color: '#333' }}>
          <h2 style={{ color: '#1d2250', fontWeight: '700', fontSize: '24px', marginBottom: '15px' }}>1. Standard Hardware Warranty</h2>
          <p>All Atlanta Systems GPS trackers, video telematics hardware, and IoT sensors come with a standard 12-month manufacturer warranty covering component defects and workmanship.</p>

          <h2 style={{ color: '#1d2250', fontWeight: '700', fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>2. RMA &amp; Repair Process</h2>
          <p>To initiate a Return Merchandise Authorization (RMA), contact our technical support at <strong>+91-11-49039798</strong> or email <strong>enquiry@atlantasys.com</strong> with your serial number and diagnostic logs.</p>

          <h2 style={{ color: '#1d2250', fontWeight: '700', fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>3. Advanced Replacement SLAs</h2>
          <p>For enterprise clients with SLA agreements, we offer advanced unit replacements dispatched within 24 to 48 hours to minimize fleet downtime.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
