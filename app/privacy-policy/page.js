import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | Atlanta Systems',
  description: 'Atlanta Systems Pvt. Ltd. Privacy Policy explaining data collection, telematics data security, and compliance.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <div className="inner-banner" style={{ background: 'linear-gradient(135deg, #070b3b 0%, #1d2250 100%)', padding: '60px 0', color: '#fff' }}>
        <div className="container text-center">
          <h1 style={{ fontSize: '42px', fontWeight: '800', fontFamily: "'Oswald', sans-serif", marginBottom: '15px' }}>Privacy Policy</h1>
          <p style={{ fontSize: '16px', opacity: '0.9' }}>Last updated: August 2026</p>
        </div>
      </div>

      <section className="ptb-70">
        <div className="container" style={{ maxWidth: '900px', lineHeight: '1.8', color: '#333' }}>
          <h2 style={{ color: '#1d2250', fontWeight: '700', fontSize: '24px', marginBottom: '15px' }}>1. Introduction</h2>
          <p>Atlanta Systems Pvt. Ltd. ("Atlanta Systems", "we", "us", or "our") respects your privacy and is committed to protecting the personal and telemetry data collected through our GPS tracking devices, cloud platforms, and mobile applications.</p>

          <h2 style={{ color: '#1d2250', fontWeight: '700', fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>2. Data We Collect</h2>
          <p>We collect device telemetry including GNSS coordinates, vehicle speed, engine diagnostics, video event clips (if equipped with AI Dash Cam / Mobile DVR), and contact details submitted via our web forms.</p>

          <h2 style={{ color: '#1d2250', fontWeight: '700', fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>3. How We Use Data</h2>
          <p>Telemetry data is used exclusively to provide real-time location tracking, fleet management reporting, AIS 140 regulatory transmissions, and incident analysis for registered fleet administrators.</p>

          <h2 style={{ color: '#1d2250', fontWeight: '700', fontSize: '24px', marginTop: '30px', marginBottom: '15px' }}>4. Data Security &amp; Compliance</h2>
          <p>We employ AES-256 encryption in transit and at rest, role-based access controls, and strict ISO-certified data retention policies aligned with international privacy regulations.</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
