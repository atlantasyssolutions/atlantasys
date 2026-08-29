import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocationBySlug, getAllLocations, generateLocationSchema } from '@/lib/locations';
import { productsData } from '@/data/products';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export async function generateStaticParams() {
  const locations = getAllLocations();
  return locations.map((loc) => ({
    city: loc.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams?.city);
  if (!location) return { title: 'Location Not Found | Atlanta Systems' };

  return {
    title: `GPS Tracking & Fleet Telematics in ${location.city}, ${location.country} | Atlanta Systems`,
    description: `Enterprise telematics hardware, AIS 140 GPS trackers, capacitive fuel sensors, AI video dash cams, and regional compliance for fleets in ${location.city}.`,
    alternates: {
      canonical: `https://www.atlantasys.com/${location.slug}`,
    },
    openGraph: {
      title: `GPS Tracking & Fleet Telematics in ${location.city} | Atlanta Systems`,
      description: `Enterprise telematics hardware, capacitive fuel sensors, AI video dash cams, and regional compliance for fleets in ${location.city}.`,
      url: `https://www.atlantasys.com/${location.slug}`,
      siteName: 'Atlanta Systems',
      type: 'website',
    },
  };
}

export default async function CityLocationPage({ params }) {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams?.city);
  if (!location) notFound();

  const locationSchema = generateLocationSchema(location);
  const allLocations = getAllLocations();
  const nearbyLocations = allLocations
    .filter((l) => l.region === location.region && l.slug !== location.slug)
    .slice(0, 5);

  const featuredProducts = productsData.slice(0, 3);

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />

      {/* Page Header */}
      <div className="page-title-area" style={{ background: '#FFFFFF', padding: '140px 0 30px', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div className="page-title-content text-center">
            <span style={{ color: '#0169A9', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '13px', display: 'block', marginBottom: '10px' }}>
              📍 {location.region} Region • {location.country}
            </span>
            <h1 style={{ fontSize: '34px', color: '#0F2D4E', fontWeight: '800', marginBottom: '15px' }}>
              GPS Tracking Devices &amp; Fleet Management Software in {location.city}
            </h1>
            <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '850px', margin: '0 auto', lineHeight: '1.6' }}>
              End-to-end telematics hardware manufacturing, cloud software, capacitive fuel sensors, AI video dash cams, and regional compliance solutions for commercial fleets operating in {location.city}.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-60 pb-60" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="row">
            {/* Left Column */}
            <div className="col-lg-8">
              {/* Fleet Focus & Context */}
              <div style={{ background: '#F8FAFC', padding: '30px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px', color: '#0F2D4E', fontWeight: '800', marginBottom: '15px' }}>
                  Commercial Fleet Focus in {location.city}
                </h2>
                <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7', marginBottom: '15px' }}>
                  <strong>Industry Specialization:</strong> {location.fleetFocus}
                </p>
                <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.7' }}>
                  Commercial operators in {location.city}, {location.country} require end-to-end telematics visibility to tackle idling fuel waste, unauthorized siphoning, route delays, and strict regional regulatory mandates.
                </p>
              </div>

              {/* Local Case Study */}
              <div style={{ background: '#F0F9FF', padding: '30px', borderRadius: '12px', border: '1px solid #BAE6FD', borderLeft: '4px solid #0169A9', marginBottom: '30px' }}>
                <span style={{ background: '#0169A9', color: '#FFFFFF', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
                  Verified Case Study — {location.city}
                </span>
                <h3 style={{ fontSize: '22px', color: '#0F2D4E', marginTop: '15px', marginBottom: '12px', fontWeight: '800' }}>
                  Operational Telematics Audit &amp; ROI Impact
                </h3>
                <p style={{ fontSize: '15px', color: '#0F2D4E', lineHeight: '1.7', fontStyle: 'italic', margin: 0 }}>
                  &quot;{location.localCaseStudy}&quot;
                </p>
              </div>

              {/* FAQs */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', color: '#0F2D4E', fontWeight: '800', marginBottom: '20px' }}>
                  Frequently Asked Questions — {location.city}
                </h3>
                {(location.faqs || []).map((faq, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', padding: '20px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '15px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0F2D4E', marginBottom: '8px' }}>
                      <i className="fas fa-question-circle me-2" style={{ color: '#0169A9' }}></i> {faq.question}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* Internal Product Cross-Links */}
              <div className="mb-4">
                <h3 style={{ fontSize: '22px', color: '#0F2D4E', fontWeight: '800', marginBottom: '15px' }}>
                  Recommended Atlanta Telematics Hardware for {location.city}
                </h3>
                <div className="row g-3">
                  {featuredProducts.map((prod) => (
                    <div className="col-md-4" key={prod.id}>
                      <div className="p-3 text-center" style={{ border: '1px solid #E2E8F0', borderRadius: '12px', background: '#FFFFFF' }}>
                        <img src={prod.image} alt={prod.name} style={{ height: '100px', objectFit: 'contain', marginBottom: '10px' }} />
                        <h5 style={{ fontSize: '14px', fontWeight: '800', color: '#0F2D4E' }}>{prod.name}</h5>
                        <Link href={`/trackers/${prod.category}`} style={{ fontSize: '12px', color: '#0169A9', fontWeight: '700', textDecoration: 'none' }}>
                          View Category <i className="fas fa-arrow-right ms-1"></i>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* Contact Card */}
              <div style={{ background: '#0F2D4E', color: '#FFFFFF', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: '800', marginBottom: '15px' }}>
                  Deploy in {location.city}
                </h3>
                <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: '1.6', marginBottom: '20px' }}>
                  Consult with Atlanta Systems telematics engineers to request hardware samples, cloud software demos, or custom API integration specs for your fleet in {location.city}.
                </p>
                <Link href="/contact" className="default-btn w-100 text-center" style={{ background: '#0169A9', color: '#FFFFFF', padding: '12px', borderRadius: '6px', display: 'block', fontWeight: '700', textDecoration: 'none' }}>
                  Contact {location.city} Team <i className="fas fa-paper-plane ms-2"></i>
                </Link>
              </div>

              {/* Nearby Hubs Links */}
              {nearbyLocations.length > 0 && (
                <div style={{ background: '#F8FAFC', padding: '25px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0F2D4E', marginBottom: '15px' }}>
                    Other {location.region} Telematics Hubs
                  </h4>
                  <ul className="list-unstyled mb-0">
                    {nearbyLocations.map((loc) => (
                      <li key={loc.slug} className="mb-2">
                        <Link href={`/${loc.slug}`} style={{ color: '#475569', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span><i className="fas fa-map-marker-alt me-2" style={{ color: '#0169A9' }}></i> {loc.city}, {loc.country}</span>
                          <i className="fas fa-chevron-right text-muted" style={{ fontSize: '11px' }}></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
