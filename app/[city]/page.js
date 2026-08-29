import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getLocationBySlug, getAllLocations } from '@/lib/locations';
import { productsData } from '@/data/products';

export async function generateStaticParams() {
  const locations = getAllLocations();
  return locations.map((loc) => ({
    city: loc.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams?.city);
  if (!location) return { title: 'Location Not Found' };

  return {
    title: `GPS Tracking Devices & Fleet Management Software in ${location.city}, ${location.country} | Atlanta Systems`,
    description: `Atlanta Systems delivers end-to-end GPS Tracking Devices, Fleet Management Software, AI Dash Cam Video Telematics, and Fuel Theft Sensors in ${location.city}, ${location.country}.`,
    alternates: {
      canonical: `https://www.atlantasys.com/${location.slug}`,
    },
    openGraph: {
      title: `GPS Tracking Devices & Fleet Software in ${location.city} | Atlanta Systems`,
      description: `Enterprise telematics, fuel theft defense, and AI video surveillance solutions tailored for commercial fleets in ${location.city}.`,
      url: `https://www.atlantasys.com/${location.slug}`,
      type: 'website',
      images: ['/assets/img/banner/vehicle-telematics.webp'],
    },
  };
}

export default async function CityLocationPage({ params }) {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams?.city);
  if (!location) notFound();

  const allLocations = getAllLocations();
  const nearbyLocations = allLocations
    .filter((l) => l.region === location.region && l.slug !== location.slug)
    .slice(0, 6);

  const featuredProducts = productsData.slice(0, 3);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': (location.faqs || []).map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  const locationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `Atlanta Systems ${location.city}`,
    'description': `Enterprise GPS tracking, fleet management software, fuel sensors, and AI video telematics in ${location.city}, ${location.country}.`,
    'url': `https://www.atlantasys.com/${location.slug}`,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': location.city,
      'addressCountry': location.country,
    },
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Page Header */}
      <div className="page-title-area" style={{ background: '#ffffff', padding: '50px 0 30px', borderBottom: '1px solid #eee' }}>
        <div className="container">
          <div className="page-title-content text-center">
            <span style={{ color: '#ff6000', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '13px', display: 'block', marginBottom: '10px' }}>
              📍 {location.region} Region • {location.country}
            </span>
            <h1 style={{ fontSize: '34px', color: '#1d2250', fontWeight: '800', marginBottom: '15px' }}>
              GPS Tracking Devices &amp; Fleet Management Software in {location.city}
            </h1>
            <p style={{ fontSize: '16px', color: '#555', maxWidth: '850px', margin: '0 auto', lineHeight: '1.6' }}>
              End-to-end telematics hardware manufacturing, cloud software, capacitive fuel sensors, AI video dash cams, and regional compliance solutions for commercial fleets operating in {location.city}.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-60 pb-60" style={{ background: '#fff' }}>
        <div className="container">
          <div className="row">
            {/* Left Column */}
            <div className="col-lg-8">
              {/* Fleet Focus & Context */}
              <div style={{ background: '#fafafa', padding: '30px', borderRadius: '10px', border: '1px solid #eee', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px', color: '#1d2250', fontWeight: 'bold', marginBottom: '15px' }}>
                  Commercial Fleet Focus in {location.city}
                </h2>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7', marginBottom: '15px' }}>
                  <strong>Industry Specialization:</strong> {location.fleetFocus}
                </p>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7' }}>
                  Commercial operators in {location.city}, {location.country} require end-to-end telematics visibility to tackle idling fuel waste, unauthorized siphoning, route delays, and strict regional regulatory mandates.
                </p>
              </div>

              {/* Local Case Study */}
              <div style={{ background: '#fff5f0', padding: '30px', borderRadius: '10px', border: '1px solid #ffd6c2', marginBottom: '30px' }}>
                <span style={{ background: '#ff6000', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
                  Verified Case Study — {location.city}
                </span>
                <h3 style={{ fontSize: '22px', color: '#1d2250', marginTop: '15px', marginBottom: '12px', fontWeight: 'bold' }}>
                  Operational Telematics Audit &amp; ROI Impact
                </h3>
                <p style={{ fontSize: '15px', color: '#333', lineHeight: '1.7', fontStyle: 'italic', margin: 0 }}>
                  &quot;{location.localCaseStudy}&quot;
                </p>
              </div>

              {/* FAQs */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', color: '#1d2250', fontWeight: 'bold', marginBottom: '20px' }}>
                  Frequently Asked Questions — {location.city}
                </h3>
                {(location.faqs || []).map((faq, idx) => (
                  <div key={idx} style={{ background: '#fafafa', padding: '20px', borderRadius: '8px', border: '1px solid #eee', marginBottom: '15px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#252525', marginBottom: '8px' }}>
                      <i className="fas fa-question-circle me-2" style={{ color: '#ff6000' }}></i> {faq.question}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* Internal Product Cross-Links */}
              <div className="mb-4">
                <h3 style={{ fontSize: '22px', color: '#1d2250', fontWeight: 'bold', marginBottom: '15px' }}>
                  Recommended Atlanta Telematics Hardware for {location.city}
                </h3>
                <div className="row g-3">
                  {featuredProducts.map((prod) => (
                    <div className="col-md-4" key={prod.id}>
                      <div className="p-3 text-center" style={{ border: '1px solid #eee', borderRadius: '8px', background: '#fff' }}>
                        <img src={prod.image} alt={prod.name} style={{ height: '100px', objectFit: 'contain', marginBottom: '10px' }} />
                        <h5 style={{ fontSize: '14px', fontWeight: 'bold', color: '#252525' }}>{prod.name}</h5>
                        <Link href={`/trackers/${prod.category}`} style={{ fontSize: '12px', color: '#ff6000', fontWeight: 'bold', textDecoration: 'none' }}>
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
              <div style={{ background: '#1d2250', color: '#fff', padding: '30px', borderRadius: '10px', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '20px', color: '#fff', fontWeight: 'bold', marginBottom: '15px' }}>
                  Deploy in {location.city}
                </h3>
                <p style={{ fontSize: '14px', color: '#ddd', lineHeight: '1.6', marginBottom: '20px' }}>
                  Consult with Atlanta Systems telematics engineers to request hardware samples, cloud software demos, or custom API integration specs for your fleet in {location.city}.
                </p>
                <Link href="/contact" className="default-btn w-100 text-center" style={{ background: '#ff6000', color: '#fff', padding: '12px', borderRadius: '50px', display: 'block', fontWeight: 'bold', textDecoration: 'none' }}>
                  Contact {location.city} Team <i className="fas fa-paper-plane ms-2"></i>
                </Link>
              </div>

              {/* Nearby Hubs Links */}
              {nearbyLocations.length > 0 && (
                <div style={{ background: '#fafafa', padding: '25px', borderRadius: '10px', border: '1px solid #eee' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1d2250', marginBottom: '15px' }}>
                    Other {location.region} Telematics Hubs
                  </h4>
                  <ul className="list-unstyled mb-0">
                    {nearbyLocations.map((loc) => (
                      <li key={loc.slug} className="mb-2">
                        <Link href={`/${loc.slug}`} style={{ color: '#444', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span><i className="fas fa-map-marker-alt me-2" style={{ color: '#ff6000' }}></i> {loc.city}, {loc.country}</span>
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
