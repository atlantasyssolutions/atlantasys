import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Indoor Tracking Solutions & BLE Telematics | Atlanta Systems',
  description: 'Real-time indoor location intelligence for assets, staff, and visitors across buildings and warehouses where satellite GPS fails.',
  alternates: {
    canonical: 'https://www.atlantasys.com/indoor-telematics'
  },
  openGraph: {
    title: 'Indoor Tracking Solutions | Atlanta Systems',
    description: 'Real-time indoor location intelligence for assets and staff across warehouses and hospitals.',
    url: 'https://www.atlantasys.com/indoor-telematics',
    siteName: 'Atlanta Systems',
    type: 'website'
  }
};

export default function IndoorTelematicsPage() {
  const features = [
    { title: 'Real-Time Location Tracking', img: '/assets/img/indoor/real-time.svg', desc: 'Track indoor assets with sub-meter accuracy using BLE and Wi-Fi sniffing.' },
    { title: 'Zone-Based Geofencing', img: '/assets/img/indoor/geofence.svg', desc: 'Instant alerts when equipment or personnel enter unauthorized cleanrooms or zones.' },
    { title: 'Heatmaps & Analytics', img: '/assets/img/indoor/heatmap.svg', desc: 'Visualize pedestrian and forklift traffic patterns to eliminate facility congestion.' },
    { title: 'Emergency SOS Evacuation', img: '/assets/img/indoor/sos.svg', desc: 'Personal duress badges that pinpoint trapped staff during facility evacuations.' }
  ];

  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px', background: '#FFFFFF' }}>
        <section className="about-area about-top-area pb-50 pt-50" style={{ background: '#f8fafc' }}>
          <div className="container text-center">
            <div className="heading-title mb-4">
              <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#0F2D4E' }}>
                Indoor Tracking Solutions for Real-Time Asset & People Visibility
              </h1>
              <p style={{ maxWidth: '800px', margin: '15px auto', color: '#475569', fontSize: '16px' }}>
                Gain precise, real-time indoor location intelligence for assets, staff, and visitors across buildings where satellite GPS signals fail.
              </p>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-10">
                <img src="/assets/img/indoor/banner.webp" alt="Indoor Tracking Solutions" className="img-fluid rounded-4 shadow-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Diagram */}
        <section className="pt-50 pb-50">
          <div className="container text-center">
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0F2D4E', marginBottom: '30px' }}>
              How Our Indoor Tracking Solution Works
            </h2>
            <div className="row justify-content-center">
              <div className="col-md-11">
                <img src="/assets/img/indoor/indoor.webp" alt="Architecture Diagram" className="img-fluid rounded-3 shadow-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="pt-50 pb-50" style={{ background: '#f8fafc' }}>
          <div className="container">
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0F2D4E', marginBottom: '30px', textAlign: 'center' }}>
              Key Indoor Positioning Features
            </h2>
            <div className="row g-4">
              {features.map((f, idx) => (
                <div className="col-md-6 col-lg-3" key={idx}>
                  <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', height: '100%', textAlign: 'center' }}>
                    <img src={f.img} alt={f.title} style={{ height: '48px', marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F2D4E', marginBottom: '8px' }}>{f.title}</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <Link href="/trackers/indoor-telematics" className="btn btn-primary" style={{ background: '#0169A9', borderColor: '#0169A9', borderRadius: '50px', padding: '12px 28px', fontWeight: '700' }}>
                View Indoor Trackers & Beacons <i className="fas fa-chevron-right ms-2"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
