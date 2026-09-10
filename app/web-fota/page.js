import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Web FOTA (Firmware Over-The-Air) Portal | Atlanta Systems',
  description: 'Enterprise Web FOTA portal for remote firmware updates, bulk device configuration, and device health monitoring across connected fleets.',
  alternates: {
    canonical: 'https://www.atlantasys.com/web-fota'
  },
  openGraph: {
    title: 'Web FOTA Portal | Atlanta Systems',
    description: 'Enterprise Web FOTA portal for remote firmware updates and configuration management.',
    url: 'https://www.atlantasys.com/web-fota',
    siteName: 'Atlanta Systems',
    type: 'website'
  }
};

export default function WebFotaPage() {
  const fotaFeatures = [
    { title: 'Over-The-Air Firmware Updates', desc: 'Push delta and full binary firmware updates to thousands of vehicles simultaneously with automated rollbacks.' },
    { title: 'Remote Configuration Management', desc: 'Modify APN settings, server IPs, reporting intervals, and I/O logic remotely without physical vehicle visits.' },
    { title: 'Task Scheduling & Progress', desc: 'Schedule maintenance windows during off-hours with real-time percentage completion tracking across device groups.' },
    { title: 'Device Grouping & Tagging', desc: 'Organize fleets by client, vehicle type, or geographic territory for structured firmware governance.' }
  ];

  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px', background: '#FFFFFF' }}>
        <section className="py-5" style={{ background: '#f8fafc' }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '13px', fontWeight: '700', padding: '4px 12px', borderRadius: '4px', textTransform: 'uppercase' }}>
                  Cloud Device Management
                </span>
                <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0F2D4E', margin: '14px 0' }}>
                  Atlanta Web FOTA Platform
                </h1>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.7', marginBottom: '24px' }}>
                  The Atlanta FOTA Web Portal is a comprehensive device management platform engineered to monitor, configure, and update the status of thousands of field telematics devices over the air. Eliminate manual truck rolls and keep your fleet hardware running the latest secure firmware.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <a href="https://fotaweb.atlantasys.in/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: '#0169A9', borderColor: '#0169A9', borderRadius: '50px', padding: '12px 28px', fontWeight: '700' }}>
                    Access FOTA Portal <i className="fas fa-external-link-alt ms-2"></i>
                  </a>
                  <Link href="/contact" className="btn btn-outline-secondary" style={{ borderRadius: '50px', padding: '12px 24px', fontWeight: '600' }}>
                    Request FOTA Account
                  </Link>
                </div>
              </div>

              <div className="col-lg-5 mt-4 mt-lg-0 text-center">
                <img src="/assets/wiki/fota/fota-dashboard.webp" alt="FOTA Web Portal Dashboard" className="img-fluid rounded-3 shadow" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0F2D4E', marginBottom: '36px', textAlign: 'center' }}>
              FOTA Web Management Capabilities
            </h2>
            <div className="row g-4">
              {fotaFeatures.map((feat, idx) => (
                <div className="col-md-6" key={idx}>
                  <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', height: '100%' }}>
                    <div style={{ width: '40px', height: '40px', background: '#eff6ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0169A9', fontWeight: '800', marginBottom: '14px' }}>
                      {idx + 1}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0F2D4E', marginBottom: '8px' }}>{feat.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
