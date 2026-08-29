import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ShieldCheck, MapPin, PhoneCall, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'School Bus Student Safety & GPS Fleet Tracking Solution | Atlanta Systems',
  description: 'Real-time school bus tracking, parent notification app, RFID student attendance logging, and emergency SOS alerts for educational institutions.',
  alternates: {
    canonical: 'https://www.atlantasys.com/school-solution',
  },
};

export default function SchoolSolutionPage() {
  return (
    <>
      <Header />
      <main className="section-padding" style={{ paddingTop: '140px', background: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
            <span className="badge-pill" style={{ background: 'rgba(1, 105, 169, 0.1)', color: '#0169A9' }}>
              <ShieldCheck size={14} /> Student Safety & Fleet Management
            </span>
            <h1 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#0F2D4E', marginTop: '12px', marginBottom: '16px' }}>
              School Buddy Transport & Bus Telematics Solution
            </h1>
            <p style={{ color: '#64748B', fontSize: '1.15rem', lineHeight: '1.6' }}>
              Ensuring safe, efficient transportation for students with real-time GPS tracking, automated parent ETA alerts, and RFID card boarding logs.
            </p>
          </div>

          <div style={{ background: '#F8FAFC', padding: '36px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F2D4E', marginBottom: '16px' }}>Key Features for Schools & Transport Managers</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', fontSize: '0.95rem', color: '#334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} style={{ color: '#10B981' }} /> Live GPS Bus Tracking & Route Geofencing</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} style={{ color: '#10B981' }} /> Parent Mobile App Instant Push Notifications</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} style={{ color: '#10B981' }} /> RFID Student Boarding & Deboarding Logs</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={18} style={{ color: '#10B981' }} /> In-Cab SOS Emergency Panic Buttons</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
