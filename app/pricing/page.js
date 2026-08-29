import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Cpu, Building2, Truck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Enterprise B2B Telematics Pricing & SMT Hardware Wholesale | Atlanta Systems',
  description: 'Direct manufacturer pricing for enterprise fleets and hardware distributors. Custom volume tier discounts, certified REST APIs, and SMT OEM manufacturing terms.',
  alternates: {
    canonical: 'https://www.atlantasys.com/pricing',
  },
  openGraph: {
    title: 'Enterprise B2B Telematics Pricing & Hardware Wholesale | Atlanta Systems',
    description: 'Direct manufacturer pricing for enterprise fleets and hardware distributors.',
    url: 'https://www.atlantasys.com/pricing',
  },
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="section-padding" style={{ paddingTop: '140px', background: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 50px' }}>
            <span className="badge-pill" style={{ background: 'rgba(1, 105, 169, 0.1)', color: '#0169A9' }}>
              <Building2 size={14} /> Direct SMT Factory Pricing
            </span>
            <h1 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#0F2D4E', marginTop: '12px', marginBottom: '16px' }}>
              Transparent B2B Wholesale & Hardware Subscriptions
            </h1>
            <p style={{ color: '#64748B', fontSize: '1.15rem', lineHeight: '1.6' }}>
              Direct manufacturer volume pricing for commercial fleets, system integrators, and regional telematics distributors worldwide.
            </p>
          </div>

          {/* Pricing Tiers Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            
            {/* Starter Tier */}
            <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '32px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0169A9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fleet Operator</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F2D4E', margin: '8px 0 4px' }}>Starter Fleet</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '24px' }}>For commercial fleets up to 100 assets requiring certified GPS & fuel tracking.</p>
              
              <div style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0F2D4E', marginBottom: '24px' }}>
                $8 <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748B' }}>/ asset / month</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', flex: 1, fontSize: '0.9rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#10B981' }} /> AIS-140 / WASAL Compliant Hardware</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#10B981' }} /> Real-time GPS & Fuel Theft Alerts</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#10B981' }} /> Web & Mobile App Access</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#10B981' }} /> Standard Email & Phone SLA</div>
              </div>

              <Link href="/contact" className="btn" style={{ background: '#0F2D4E', color: '#FFFFFF', fontWeight: '700', textAlign: 'center', padding: '12px' }}>
                Request Starter Quote
              </Link>
            </div>

            {/* Professional Tier */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', border: '2px solid #0169A9', boxShadow: '0 12px 36px rgba(1, 105, 169, 0.1)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-14px', right: '24px', background: '#0169A9', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: '800', padding: '4px 14px', borderRadius: '99px' }}>
                MOST POPULAR
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0169A9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Enterprise Commercial</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F2D4E', margin: '8px 0 4px' }}>Professional Enterprise</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '24px' }}>For fleets (100–1,000+ assets) needing AI ADAS video, CAN-bus & cold chain telemetry.</p>
              
              <div style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0F2D4E', marginBottom: '24px' }}>
                Custom <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748B' }}>volume tiered quotes</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', flex: 1, fontSize: '0.9rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#10B981' }} /> Everything in Starter Tier</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#10B981' }} /> Dual-Lens ADAS & DMS AI Dash Cam</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#10B981' }} /> Non-intrusive CAN J1939 Reading</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#10B981' }} /> WHO GDP Wireless BLE Probes</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#10B981' }} /> REST Webhook & SAP/Oracle TMS Sync</div>
              </div>

              <Link href="/contact" className="btn" style={{ background: '#0169A9', color: '#FFFFFF', fontWeight: '700', textAlign: 'center', padding: '12px' }}>
                Request Wholesale Consultation
              </Link>
            </div>

            {/* Wholesale Distributor Tier */}
            <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '32px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0169A9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>System Integrator</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F2D4E', margin: '8px 0 4px' }}>Distributor & SI</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '24px' }}>For master distributors & OEMs purchasing 500+ SMT hardware units per order.</p>
              
              <div style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0F2D4E', marginBottom: '24px' }}>
                Wholesale <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#64748B' }}>SMT factory pricing</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', flex: 1, fontSize: '0.9rem', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#10B981' }} /> Direct SMT Factory Price Breaks</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#10B981' }} /> White-Label Enclosure & Laser Etching</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#10B981' }} /> Private APN & Firmware Compilation</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} style={{ color: '#10B981' }} /> High-Throughput OpenAPI 3.0 SDK</div>
              </div>

              <Link href="/contact" className="btn" style={{ background: '#0F2D4E', color: '#FFFFFF', fontWeight: '700', textAlign: 'center', padding: '12px' }}>
                Apply for Regional Distributorship
              </Link>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
