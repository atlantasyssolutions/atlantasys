import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getAllLocations } from '@/lib/locations';
import { MapPin, Globe, ShieldCheck, Truck, ChevronRight, ArrowRight, Building2, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Global Telematics & Regional Compliance Hubs | Atlanta Systems',
  description: 'Explore Atlanta Systems global telematics engineering hubs across MENA, Europe, North America, Latin America, and India. AIS-140, WASAL, and FMCSA compliant hardware.',
  alternates: {
    canonical: 'https://www.atlantasys.com/locations',
  },
  openGraph: {
    title: 'Global Telematics & Regional Compliance Hubs | Atlanta Systems',
    description: 'Explore Atlanta Systems global telematics engineering hubs across MENA, Europe, North America, Latin America, and India.',
    url: 'https://www.atlantasys.com/locations',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

const locationsBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.atlantasys.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Global Locations & Compliance Hubs',
      item: 'https://www.atlantasys.com/locations',
    },
  ],
};

export default function LocationsDirectoryPage() {
  const locations = getAllLocations();

  const regions = [
    { name: 'MENA', title: 'Middle East & North Africa', desc: 'WASAL, TAMEEM, SASO, and UAE RTA compliance architectures.' },
    { name: 'Europe', title: 'European Union & UK', desc: 'Smart Tachograph 2.0, EU GSR 2024, and WHO GDP cold-chain compliance.' },
    { name: 'United States', title: 'North America', desc: 'FMCSA ELD Part 395, IFTA reporting, and intermodal drayage security.' },
    { name: 'Latin America', title: 'Latin America', desc: 'NOM-012, ANTT, DIAN, and MTC high-altitude telemetry standards.' },
    { name: 'India', title: 'India & South Asia', desc: 'MoRTH AIS-140, ARAI/ICAT certifications, and VAHAN cloud integration.' },
  ];

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationsBreadcrumbSchema) }}
      />

      <main className="section-padding" style={{ paddingTop: '140px', background: '#FFFFFF' }}>
        <div className="container">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '0.875rem', color: '#64748B' }}>
            <Link href="/" style={{ color: '#0169A9', fontWeight: '600', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#0F2D4E', fontWeight: '700' }}>Global Compliance & Engineering Hubs</span>
          </nav>

          {/* Hero Header */}
          <div style={{ maxWidth: '840px', marginBottom: '50px' }}>
            <span className="badge-pill" style={{ background: 'rgba(1, 105, 169, 0.1)', color: '#0169A9', marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={14} /> 32-Year Indigenous SMT Hardware Manufacturer
            </span>
            <h1 style={{ fontSize: '2.75rem', fontWeight: '800', lineHeight: '1.2', color: '#0F2D4E', marginBottom: '20px' }}>
              Global Telematics & Regional Compliance Engineering Hubs
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.7' }}>
              Direct factory SMT electronics manufacturing powering enterprise fleet telematics, AIS-140 GPS trackers, AI video dash cams, and capacitive fuel probes across 37 key freight corridors and logistics gateways worldwide.
            </p>
          </div>

          {/* Regional Sections */}
          {regions.map((region) => {
            const regionHubs = locations.filter((loc) => loc.region === region.name);
            if (regionHubs.length === 0) return null;

            return (
              <section key={region.name} style={{ marginBottom: '60px' }}>
                <div style={{ borderBottom: '2px solid #E2E8F0', paddingBottom: '16px', marginBottom: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F2D4E', margin: 0 }}>
                        {region.title} ({regionHubs.length} Hubs)
                      </h2>
                      <p style={{ fontSize: '0.95rem', color: '#64748B', margin: '4px 0 0' }}>{region.desc}</p>
                    </div>
                    <span style={{ background: '#F1F5F9', color: '#0F2D4E', padding: '6px 14px', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '700' }}>
                      {region.name} Region
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                  {regionHubs.map((hub) => (
                    <div
                      key={hub.slug}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '12px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0169A9', fontWeight: '700', fontSize: '0.85rem' }}>
                            <MapPin size={14} /> {hub.country}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#64748B', background: '#F8FAFC', padding: '2px 8px', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
                            Verified Hub
                          </span>
                        </div>

                        <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#0F2D4E', marginBottom: '10px' }}>
                          <Link href={`/${hub.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {hub.city}
                          </Link>
                        </h3>

                        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', marginBottom: '16px' }}>
                          <strong>Fleet Focus:</strong> {hub.fleetFocus}
                        </p>
                      </div>

                      <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                        <Link
                          href={`/${hub.slug}`}
                          style={{
                            color: '#0169A9',
                            fontWeight: '700',
                            fontSize: '0.9rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            textDecoration: 'none',
                          }}
                        >
                          Explore {hub.city} Telematics Solutions <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Wholesale B2B CTA Banner */}
          <div style={{ background: 'linear-gradient(135deg, #0F2D4E 0%, #0169A9 100%)', color: '#FFFFFF', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '14px' }}>
              Partner With Atlanta Systems Across Global Hubs
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#E2E8F0', maxWidth: '720px', margin: '0 auto 28px' }}>
              We supply direct SMT factory pricing, private-label firmware compilation, and REST API/MQTT push endpoints for fleet operators, government tenders, and telematics distributors worldwide.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn" style={{ background: '#0169A9', color: '#FFFFFF', border: '1px solid #38BDF8', fontWeight: '700', padding: '12px 30px' }}>
                Request Wholesale Partner Terms
              </Link>
              <Link href="/trackers" className="btn" style={{ background: '#FFFFFF', color: '#0F2D4E', fontWeight: '700', padding: '12px 30px' }}>
                Browse Hardware Catalog
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
