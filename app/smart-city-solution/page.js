import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Building2, Cpu, Globe, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Smart City IoT & Intelligent Parking Management Solution | Atlanta Systems',
  description: 'Smart City IoT infrastructure, municipal fleet tracking, automated parking management, and environmental sensor telemetry.',
  alternates: {
    canonical: 'https://www.atlantasys.com/smart-city-solution',
  },
};

export default function SmartCitySolutionPage() {
  return (
    <>
      <Header />
      <main className="section-padding" style={{ paddingTop: '140px', background: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
            <span className="badge-pill" style={{ background: 'rgba(1, 105, 169, 0.1)', color: '#0169A9' }}>
              <Building2 size={14} /> Municipal & Urban IoT Technology
            </span>
            <h1 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#0F2D4E', marginTop: '12px', marginBottom: '16px' }}>
              Smart City & Intelligent Parking IoT Infrastructure
            </h1>
            <p style={{ color: '#64748B', fontSize: '1.15rem', lineHeight: '1.6' }}>
              Empowering urban municipalities with smart fleet management, parking guidance sensors, and environmental monitoring gateways.
            </p>
          </div>

          <div style={{ background: '#F8FAFC', padding: '36px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F2D4E', marginBottom: '16px' }}>Smart City Core Infrastructure</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontSize: '0.95rem', color: '#334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} style={{ color: '#10B981' }} /> Municipal Waste Truck & Sweeper Telematics</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} style={{ color: '#10B981' }} /> Automated Parking Sensor Occupancy Guidance</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} style={{ color: '#10B981' }} /> City Transit Bus AIS-140 Public Safety</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} style={{ color: '#10B981' }} /> Air Quality & Noise Monitoring IoT Gateways</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
