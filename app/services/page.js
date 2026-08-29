import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Cpu, ShieldCheck, Wrench, Globe, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Enterprise Telematics Engineering & Manufacturing Services | Atlanta Systems',
  description: 'Custom SMT hardware manufacturing, embedded firmware development, REST/MQTT API integration, and 24/7 SLA field engineering services.',
  alternates: {
    canonical: 'https://www.atlantasys.com/services',
  },
  openGraph: {
    title: 'Enterprise Telematics Engineering & Services | Atlanta Systems',
    description: 'Custom SMT hardware manufacturing, embedded firmware development, and SLA services.',
    url: 'https://www.atlantasys.com/services',
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="section-padding" style={{ paddingTop: '140px', background: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 50px' }}>
            <span className="badge-pill" style={{ background: 'rgba(1, 105, 169, 0.1)', color: '#0169A9' }}>
              <Cpu size={14} /> End-to-End Hardware & Software Engineering
            </span>
            <h1 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#0F2D4E', marginTop: '12px', marginBottom: '16px' }}>
              Indigenous Telematics Services & SMT Manufacturing
            </h1>
            <p style={{ color: '#64748B', fontSize: '1.15rem', lineHeight: '1.6' }}>
              From initial PCB circuit design to high-throughput cloud webhooks, Atlanta Systems provides end-to-end services for commercial logistics fleets and hardware distributors.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginBottom: '60px' }}>
            
            <div style={{ background: '#F8FAFC', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <Cpu size={32} style={{ color: '#0169A9', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F2D4E', marginBottom: '12px' }}>Indigenously Manufactured SMT Hardware</h3>
              <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
                State-of-the-art SMT assembly facilities in New Delhi. Custom PCB design, automated optical inspection (AOI), and IP67/IP69K environmental potting.
              </p>
              <Link href="/contact" style={{ color: '#0169A9', fontWeight: '700', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Explore OEM Manufacturing →
              </Link>
            </div>

            <div style={{ background: '#F8FAFC', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <ShieldCheck size={32} style={{ color: '#10B981', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F2D4E', marginBottom: '12px' }}>Regulatory Homologation & Audit Support</h3>
              <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
                Type-approval certifications and official data push compliance for MoRTH VAHAN (India), UAE RTA & WASAL (GCC), and FMCSA ELD (USA).
              </p>
              <Link href="/contact" style={{ color: '#0169A9', fontWeight: '700', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Request Certification Package →
              </Link>
            </div>

            <div style={{ background: '#F8FAFC', padding: '32px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <Wrench size={32} style={{ color: '#0169A9', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F2D4E', marginBottom: '12px' }}>Field Calibration & SLA Maintenance</h3>
              <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px' }}>
                Certified field engineers performing depot 10-point capacitive fuel tank calibration, BLE beacon installation, and 24/7 hardware replacement.
              </p>
              <Link href="/contact" style={{ color: '#0169A9', fontWeight: '700', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                Book Field Engineering Team →
              </Link>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
