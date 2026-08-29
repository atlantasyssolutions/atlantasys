import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogs, generateArticleSchema, generateFaqSchema, generateBreadcrumbSchema } from '@/lib/blog';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Calendar, Clock, Globe, ArrowLeft, Tag, MapPin, ShieldCheck, Layers, ChevronRight, CheckCircle2, List, HelpCircle, Building2, Truck, Cpu, FileCheck, DollarSign, Award, Wrench } from 'lucide-react';

const CITIES_MAP = {
  dubai: { name: 'Dubai', country: 'United Arab Emirates', region: 'MENA', corridors: 'E11 Sheikh Zayed Road, E311 Emirates Road', ports: 'Jebel Ali Port (DP World)', regulator: 'UAE RTA + WASAL' },
  riyadh: { name: 'Riyadh', country: 'Saudi Arabia', region: 'MENA', corridors: 'Highway 40, Northern Ring Road (Highway 65)', ports: 'Riyadh Dry Port', regulator: 'WASAL + TAMEEM + SASO' },
  'abu-dhabi': { name: 'Abu Dhabi', country: 'United Arab Emirates', region: 'MENA', corridors: 'E11, E12, E20 coastal, E22 Al Ain Road', ports: 'Khalifa Port', regulator: 'RTA + WASAL + ADNOC' },
  doha: { name: 'Doha', country: 'Qatar', region: 'MENA', corridors: 'Al Shamal Road, Salwa Road, Orbital Highway', ports: 'Hamad Port', regulator: 'Ministry of Transport + Civil Defense' },
  muscat: { name: 'Muscat', country: 'Oman', region: 'MENA', corridors: 'Sultan Qaboos Highway, Batinah Expressway', ports: 'Port of Sohar', regulator: 'Ministry of Transport + Royal Oman Police' },
  cairo: { name: 'Cairo', country: 'Egypt', region: 'MENA', corridors: 'Ring Road, Cairo-Alexandria Desert Road', ports: 'Port Said / Alexandria Dry Port', regulator: 'Ministry of Transport' },
  casablanca: { name: 'Casablanca', country: 'Morocco', region: 'MENA', corridors: 'A1 Rabat-Tangier, A3 Marrakech', ports: 'Port of Casablanca, Tanger Med', regulator: 'Ministry of Transport + PortNet' },
  jeddah: { name: 'Jeddah', country: 'Saudi Arabia', region: 'MENA', corridors: 'Jeddah-Mecca, Jeddah-Madinah Highways', ports: 'King Abdullah Port, Jeddah Islamic Port', regulator: 'WASAL + TAMEEM' },
  dammam: { name: 'Dammam', country: 'Saudi Arabia', region: 'MENA', corridors: 'Highway 40, Jubail Road, King Fahd Causeway', ports: 'King Abdulaziz Port', regulator: 'WASAL + TAMEEM + Aramco' },
  'kuwait-city': { name: 'Kuwait City', country: 'Kuwait', region: 'MENA', corridors: 'Fifth Ring Road, Shuaiba Highway', ports: 'Shuwaikh + Shuaiba Ports', regulator: 'Ministry of Interior + KOC' },
  warsaw: { name: 'Warsaw', country: 'Poland', region: 'Europe', corridors: 'A2 Expressway, S7/S8', ports: 'Gdańsk Hinterland Rail', regulator: 'GITD + e-TOLL + Smart Tachograph 2.0' },
  hamburg: { name: 'Hamburg', country: 'Germany', region: 'Europe', corridors: 'A1, A7, A23 Motorways', ports: 'Port of Hamburg (HHLA)', regulator: 'BAG + Dakosy + EU GSR 2024' },
  rotterdam: { name: 'Rotterdam', country: 'Netherlands', region: 'Europe', corridors: 'A15, A4, A16 Ring', ports: 'Port of Rotterdam (Maasvlakte)', regulator: 'ILT + Portbase + GSR 2024' },
  madrid: { name: 'Madrid', country: 'Spain', region: 'Europe', corridors: 'A1-A6 Radials, M40/M50', ports: 'Coslada Dry Port', regulator: 'DGT + ZBE + Smart Tachograph 2.0' },
  houston: { name: 'Houston', country: 'United States', region: 'United States', corridors: 'I-10 Energy Corridor, I-45, Beltway 8', ports: 'Port of Houston (Ship Channel)', regulator: 'FMCSA ELD Part 395 + IFTA' },
  chicago: { name: 'Chicago', country: 'United States', region: 'United States', corridors: 'I-90/94, I-55, I-80, I-294', ports: 'BNSF / UP Rail Ramps', regulator: 'FMCSA ELD + IFTA + IDOT' },
  'los-angeles': { name: 'Los Angeles', country: 'United States', region: 'United States', corridors: 'I-710, I-110, I-5, I-10', ports: 'Ports of LA & Long Beach', regulator: 'FMCSA ELD + CARB Clean Truck' },
  'mexico-city': { name: 'Mexico City', country: 'Mexico', region: 'Latin America', corridors: 'Periférico, Mexico-Querétaro 57D', ports: 'Veracruz / Manzanillo Hinterland', regulator: 'NOM-012-SCT-2 + SCT' },
  'sao-paulo': { name: 'São Paulo', country: 'Brazil', region: 'Latin America', corridors: 'Anchieta-Imigrantes, Bandeirantes, Rodoanel', ports: 'Port of Santos', regulator: 'ANTT + ANVISA' },
  mumbai: { name: 'Mumbai', country: 'India', region: 'India', corridors: 'NH-44, Mumbai-Pune Expressway', ports: 'JNPT Port', regulator: 'MoRTH AIS-140 + VAHAN' },
  delhi: { name: 'Delhi', country: 'India', region: 'India', corridors: 'Eastern Peripheral Expressway, NH-48', ports: 'Tughlakabad ICD', regulator: 'MoRTH AIS-140 + CCTNS' }
};

// Generates dynamic, unique, non-repetitive anchor texts for GEO & SEO
function getDynamicAnchorText(cityObj, seed) {
  const variations = [
    `[${cityObj.name} B2B Fleet Telematics Procurement & SMT Hardware Wholesale Portal](/locations/${cityObj.name.toLowerCase().replace(/\s+/g, '-')})`,
    `[${cityObj.name} Heavy Fleet TCO & Diesel Anti-Siphoning ROI Analysis](/locations/${cityObj.name.toLowerCase().replace(/\s+/g, '-')})`,
    `[${cityObj.name} Telematics Distributor Territory Rights & White-Label SDK Portal](/locations/${cityObj.name.toLowerCase().replace(/\s+/g, '-')})`,
    `[${cityObj.name} ${cityObj.corridors} Commercial Fleet Compliance & Hardware Audit](/locations/${cityObj.name.toLowerCase().replace(/\s+/g, '-')})`,
    `[${cityObj.name} System Integrator API Throughput & FOTA Specification Portal](/locations/${cityObj.name.toLowerCase().replace(/\s+/g, '-')})`
  ];
  return variations[seed % variations.length];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const citySlug = resolvedParams?.city?.toLowerCase() || 'dubai';
  const blogSlug = resolvedParams?.slug;

  const cityInfo = CITIES_MAP[citySlug] || { name: 'Global Fleet Hub', country: 'Global', regulator: 'International Telematics Standards' };
  const blog = getBlogBySlug(blogSlug);

  if (!blog) return { title: 'Telematics Guide Not Found | Atlanta Systems' };

  return {
    title: `${blog.title} - ${cityInfo.name} Founder & Distributor Engineering Briefing | Atlanta Systems`,
    description: `B2B Procurement, wholesale MOQ pricing, TCO ROI calculation, and ${cityInfo.regulator} compliance framework for fleet founders and distributors in ${cityInfo.name}, ${cityInfo.country}.`,
    alternates: {
      canonical: `https://www.atlantasys.com/blog/${citySlug}/${blog.slug}`,
    },
    openGraph: {
      title: `${blog.title} | ${cityInfo.name} Executive Telematics Briefing`,
      description: blog.excerpt,
      url: `https://www.atlantasys.com/blog/${citySlug}/${blog.slug}`,
      siteName: 'Atlanta Systems',
      type: 'article',
    },
  };
}

export default async function ProgrammaticCityBlogPage({ params }) {
  const resolvedParams = await params;
  const citySlug = resolvedParams?.city?.toLowerCase() || 'dubai';
  const blogSlug = resolvedParams?.slug;

  const cityInfo = CITIES_MAP[citySlug] || { name: 'Global Fleet Hub', country: 'Global', corridors: 'Major Freight Corridors', ports: 'Primary Container Terminals', regulator: 'MoRTH / RTA / FMCSA Compliance' };
  const blog = getBlogBySlug(blogSlug);

  if (!blog) notFound();

  // Create deterministic hash for stochastic layout permutations
  const seed = (citySlug.length * 13 + (blogSlug ? blogSlug.length * 7 : 42)) % 5;
  const dynamicAnchor = getDynamicAnchorText(cityInfo, seed);

  return (
    <>
      <Header />
      <main className="section-padding" style={{ paddingTop: '140px' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          
          {/* Breadcrumbs & City Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '24px', flexWrap: 'wrap' }}>
            <Link href="/blog">Blog</Link>
            <ChevronRight size={14} />
            <Link href="/locations">Locations</Link>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--primary-blue)', fontWeight: '700' }}>{cityInfo.name}</span>
            <ChevronRight size={14} />
            <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{blog.title}</span>
          </div>

          <div className="badge-pill" style={{ marginBottom: '16px', background: 'rgba(1, 105, 169, 0.1)', color: 'var(--primary-blue)' }}>
            <MapPin size={14} /> {cityInfo.name}, {cityInfo.country} Executive & Distributor Telematics Matrix
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.25', marginBottom: '20px', color: '#0F2D4E' }}>
            {blog.title} ({cityInfo.name} Fleet Operational Guide)
          </h1>

          {/* B2B Founder, Procurement & Distributor Business Intelligence Module */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', marginBottom: '36px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F2D4E', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={20} style={{ color: '#0169A9' }} /> Founder & Distributor Briefing: {cityInfo.name} Operations
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontSize: '0.9rem' }}>
              <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <strong style={{ color: '#0F2D4E', display: 'block' }}>Freight Corridors:</strong>
                <span>{cityInfo.corridors}</span>
              </div>
              <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <strong style={{ color: '#0F2D4E', display: 'block' }}>Port & Intermodal Nodes:</strong>
                <span>{cityInfo.ports}</span>
              </div>
              <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <strong style={{ color: '#0F2D4E', display: 'block' }}>Mandatory Regulations:</strong>
                <span>{cityInfo.regulator}</span>
              </div>
              <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <strong style={{ color: '#0F2D4E', display: 'block' }}>OEM Warranty Preservation:</strong>
                <span>Non-intrusive CAN induction clamps (No wire slicing)</span>
              </div>
            </div>

            {/* Decision-Maker Commercial Queries Resolution */}
            <div style={{ marginTop: '20px', borderTop: '1px solid #E2E8F0', paddingTop: '16px', fontSize: '0.875rem', color: '#475569' }}>
              <strong>Procurement & Distributor Directives:</strong> Direct SMT manufacturing lead time: 10-14 days. Volume tier discounts at 500 / 1,000 / 5,000 units. Certified REST API & MQTT pings: up to 10,000 pings/sec per tenant with 0% data loss buffer.
            </div>
          </div>

          {/* Article Body Content */}
          <article className="prose" style={{ lineHeight: '1.8', fontSize: '1.05rem', color: '#334155' }}>
            <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} />
          </article>

          {/* Dynamic Non-Duplicate GEO Anchor Hub Link */}
          <div style={{ marginTop: '40px', padding: '20px', background: '#EFF6FF', borderRadius: '12px', border: '1px solid #BFDBFE' }}>
            <strong style={{ display: 'block', color: '#1E40AF', marginBottom: '6px' }}>📍 Hyper-Local Regional Engineering Hub:</strong>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              Explore detailed hardware specs, local case studies, and compliance certifications for {cityInfo.name} in our dedicated portal: {dynamicAnchor}
            </p>
          </div>

          {/* B2B Procurement & Distributor Contact CTA */}
          <div style={{ background: 'linear-gradient(135deg, #0F2D4E 0%, #0169A9 100%)', color: '#FFFFFF', borderRadius: '16px', padding: '36px', marginTop: '48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '12px' }}>
              Procure Atlanta Telematics Hardware for {cityInfo.name} Fleets
            </h2>
            <p style={{ fontSize: '1rem', color: '#E2E8F0', maxWidth: '680px', margin: '0 auto 24px' }}>
              Direct SMT factory pricing, white-label distributor margins, private APN compilation, and certified REST API webhooks for system integrators and fleet operators in {cityInfo.name}, {cityInfo.country}.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn" style={{ background: '#FF6000', color: '#FFFFFF', fontWeight: '700', padding: '12px 28px' }}>
                Request Wholesale Bulk Quotation
              </Link>
              <Link href="/trackers/vehicle-telematics" className="btn" style={{ background: '#FFFFFF', color: '#0F2D4E', fontWeight: '700', padding: '12px 28px' }}>
                View SMT Hardware Specs
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
