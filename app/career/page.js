import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Briefcase, Cpu, Award, Globe, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Career Opportunities & Hardware R&D Jobs | Atlanta Systems',
  description: 'Join the team shaping the future of connected IoT and telematics. Explore hardware engineering, embedded systems, and software developer roles at Atlanta Systems New Delhi.',
  alternates: {
    canonical: 'https://www.atlantasys.com/career',
  },
};

export default function CareerPage() {
  return (
    <>
      <Header />
      <main className="section-padding" style={{ paddingTop: '140px', background: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
            <span className="badge-pill" style={{ background: 'rgba(1, 105, 169, 0.1)', color: '#0169A9' }}>
              <Briefcase size={14} /> Join Atlanta Engineering Labs
            </span>
            <h1 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#0F2D4E', marginTop: '12px', marginBottom: '16px' }}>
              Build the Future of Connected Telematics
            </h1>
            <p style={{ color: '#64748B', fontSize: '1.15rem', lineHeight: '1.6' }}>
              Be part of a 32-year pioneer in IoT hardware manufacturing, embedded AI algorithms, and high-scale cloud engineering.
            </p>
          </div>

          <div style={{ background: '#F8FAFC', padding: '36px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F2D4E', marginBottom: '12px' }}>Open Positions in New Delhi R&D Center</h3>
            <p style={{ color: '#64748B', marginBottom: '24px' }}>We are hiring Embedded Firmware Engineers, SMT Production Specialists, and Senior Full-Stack Cloud Developers.</p>
            <Link href="/contact" className="btn" style={{ background: '#0169A9', color: '#FFFFFF', fontWeight: '700', padding: '12px 28px' }}>
              Submit CV / Contact HR Team <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
