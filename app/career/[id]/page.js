import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import careersData from '@/data/careers.json';
import { MapPin, Briefcase, GraduationCap, Users, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

export async function generateStaticParams() {
  return (careersData || []).map((job) => ({
    id: String(job.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = (careersData || []).find((j) => String(j.id) === String(id));

  if (!job) {
    return {
      title: 'Job Not Found | Atlanta Systems',
    };
  }

  return {
    title: `${job.job_position} - Careers | Atlanta Systems`,
    description: `Apply for ${job.job_position} at Atlanta Systems. Location: ${job.location}. Experience: ${job.work_experience}.`,
    alternates: {
      canonical: `https://www.atlantasys.com/career/${id}`,
    },
  };
}

export default async function CareerDetailPage({ params }) {
  const { id } = await params;
  const job = (careersData || []).find((j) => String(j.id) === String(id));

  if (!job) {
    notFound();
  }

  return (
    <>
      <Header />

      <div
        style={{
          background: 'linear-gradient(135deg, #070b3b 0%, #1d2250 100%)',
          padding: '70px 0 50px',
          color: '#fff',
        }}
      >
        <div className="container">
          <Link
            href="/career"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              textDecoration: 'none',
              marginBottom: '20px',
            }}
          >
            <ArrowLeft size={16} /> Back to all openings
          </Link>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: '800',
              fontFamily: "'Oswald', sans-serif",
              marginBottom: '15px',
            }}
          >
            {job.job_position}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '15px', opacity: 0.9 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} style={{ color: '#ff5e14' }} /> {job.location}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Briefcase size={16} style={{ color: '#ff5e14' }} /> {job.work_experience}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <GraduationCap size={16} style={{ color: '#ff5e14' }} /> {job.qualification}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} style={{ color: '#ff5e14' }} /> {job.openings || '1'} Opening(s)
            </span>
          </div>
        </div>
      </div>

      <section style={{ padding: '60px 0 80px', background: '#f8fafc' }}>
        <div className="container">
          <div className="row">
            {/* Main Job Details */}
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '35px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  marginBottom: '30px',
                }}
              >
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    fontFamily: "'Oswald', sans-serif",
                    color: '#070b3b',
                    marginBottom: '18px',
                    borderBottom: '2px solid #ff5e14',
                    paddingBottom: '8px',
                    display: 'inline-block',
                  }}
                >
                  Roles &amp; Responsibilities
                </h3>
                <div
                  style={{ lineHeight: '1.8', color: '#4b5563', fontSize: '15px' }}
                  dangerouslySetInnerHTML={{ __html: job.roles || '<p>Detailed responsibilities will be briefed during technical interview.</p>' }}
                />

                <div style={{ height: '30px' }} />

                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    fontFamily: "'Oswald', sans-serif",
                    color: '#070b3b',
                    marginBottom: '18px',
                    borderBottom: '2px solid #0169A9',
                    paddingBottom: '8px',
                    display: 'inline-block',
                  }}
                >
                  Candidate Requirements
                </h3>
                <div
                  style={{ lineHeight: '1.8', color: '#4b5563', fontSize: '15px' }}
                  dangerouslySetInnerHTML={{ __html: job.requirements || '<p>Relevant engineering degree and experience required.</p>' }}
                />
              </div>
            </div>

            {/* Application Sidebar / Form */}
            <div className="col-lg-4">
              <div
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '30px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                  position: 'sticky',
                  top: '100px',
                }}
              >
                <h4
                  style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    fontFamily: "'Oswald', sans-serif",
                    color: '#070b3b',
                    marginBottom: '15px',
                  }}
                >
                  Apply for this Role
                </h4>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
                  Send your resume and credentials directly to our HR &amp; Technical Talent Acquisition team.
                </p>

                <form
                  action="/api/contact"
                  method="POST"
                  style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                >
                  <input type="hidden" name="subject" value={`Job Application: ${job.job_position}`} />

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@example.com"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                      Total Experience
                    </label>
                    <input
                      type="text"
                      name="experience"
                      placeholder="e.g. 3 years"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                      Resume / Portfolio Link or Notes
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Share your LinkedIn profile, GitHub, or portfolio link..."
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      background: '#ff5e14',
                      color: '#fff',
                      padding: '12px 20px',
                      borderRadius: '6px',
                      fontWeight: '700',
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(255,94,20,0.3)',
                    }}
                  >
                    Submit Application <Send size={15} />
                  </button>
                </form>

                <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b' }}>
                  Or email your CV directly to <a href="mailto:hr@atlantasys.com" style={{ color: '#0169A9', fontWeight: '600' }}>hr@atlantasys.com</a> with subject <em>&quot;Application: {job.job_position}&quot;</em>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
