import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms & Conditions | Atlanta Systems',
  description: 'Terms & Conditions for purchasing and using Atlanta Systems GPS tracking devices, telematics software, and services.',
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <div className="inner-banner" style={{ background: 'linear-gradient(135deg, #070b3b 0%, #1d2250 100%)', padding: '60px 0', color: '#fff' }}>
        <div className="container text-center">
          <h1 style={{ fontSize: '42px', fontWeight: '800', fontFamily: "'Oswald', sans-serif", marginBottom: '15px' }}>Terms &amp; Conditions</h1>
          <p style={{ fontSize: '16px', opacity: '0.9' }}>Last updated: August 2026</p>
        </div>
      </div>

      <section className="ptb-70">
        <div className="container" style={{ maxWidth: '900px', lineHeight: '1.8', color: '#333' }}>
          <h2 style={{ color: '#1d2250', fontWeight: '700', fontSize: '24px', marginBottom: '15px' }}>1. Agreement to Terms</h2>
          <p>By accessing our website or purchasing hardware and software subscriptions from Atlanta Systems Pvt. Ltd., you agree to be bound by these Terms and Conditions.</p>

          <h2 style={{ color: '#1d2250', fontWeight: '700', fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>2. Hardware Provisioning &amp; Installation</h2>
          <p>GPS trackers, AIS 140 devices, and video telematics hardware must be installed according to our technical guidelines by qualified technicians to ensure warranty coverage and optimal sensor performance.</p>

          <h2 style={{ color: '#1d2250', fontWeight: '700', fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>3. Service Availability</h2>
          <p>While we strive for 99.9% cloud uptime, service availability may depend on cellular network coverage (4G/LTE) provided by third-party telecom carriers.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
