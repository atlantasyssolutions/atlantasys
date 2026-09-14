'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import faqsData from '@/data/faqs.json';

export default function SupportPage() {
  const router = useRouter();
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticket, setTicket] = useState({
    name: '',
    email: '',
    phone: '',
    deviceModel: '',
    serialNumber: '',
    issueType: 'Technical Issue',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('formSubmitted', 'true');
      sessionStorage.setItem('submittedSource', 'support');
    }
    router.push('/thank-you');
  };

  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px', background: '#FFFFFF' }}>
        {/* Hero */}
        <section style={{ background: 'linear-gradient(135deg, #0F2D4E 0%, #0169A9 100%)', color: '#fff', padding: '70px 0' }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 mb-4 mb-lg-0">
                <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', lineHeight: '1.2' }}>
                  Technical Support & Customer Assistance
                </h1>
                <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: '1.7', marginBottom: '24px' }}>
                  Get expert help for telematics devices, IoT sensors, vehicle tracking systems, software platforms, and enterprise deployments.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <a href="#supportTicket" className="btn btn-light" style={{ fontWeight: '700', borderRadius: '50px', padding: '12px 28px', color: '#0F2D4E' }}>
                    Raise Support Ticket
                  </a>
                  <a href="tel:+919990333888" className="btn btn-outline-light" style={{ fontWeight: '700', borderRadius: '50px', padding: '12px 24px' }}>
                    <i className="fas fa-phone-alt me-2"></i> +91-9990333888
                  </a>
                </div>
              </div>

              <div className="col-lg-5 text-center">
                <img src="/assets/img/support.png" alt="Atlanta Technical Support" className="img-fluid" style={{ maxHeight: '280px' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Support Cards */}
        <section className="py-5" style={{ background: '#F8FAFC' }}>
          <div className="container">
            <div className="row g-4">
              <div className="col-md-3 col-6">
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', height: '100%', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚙️</div>
                  <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0F2D4E', marginBottom: '8px' }}>Product Support</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Installation, wiring schemes, and hardware troubleshooting.</p>
                </div>
              </div>

              <div className="col-md-3 col-6">
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', height: '100%', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>🖥️</div>
                  <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0F2D4E', marginBottom: '8px' }}>Firmware & FOTA</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>FOTA cloud updates, configurator files, and API integration.</p>
                </div>
              </div>

              <div className="col-md-3 col-6">
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', height: '100%', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>🛡️</div>
                  <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0F2D4E', marginBottom: '8px' }}>Warranty & RMA</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Hardware replacement claims, repairs, and RMA tracking.</p>
                </div>
              </div>

              <div className="col-md-3 col-6">
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', height: '100%', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>📞</div>
                  <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0F2D4E', marginBottom: '8px' }}>Direct Helpdesk</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Immediate phone assistance from certified support engineers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ticket Form & Contact Info */}
        <section className="py-5" id="supportTicket">
          <div className="container">
            <div className="row">
              {/* Left Column: Direct Contacts */}
              <div className="col-lg-4 mb-4 mb-lg-0">
                <div style={{ background: '#F8FAFC', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '28px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0F2D4E', marginBottom: '20px' }}>Contact Support</h3>

                  <div className="mb-4">
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700' }}>Email Support</div>
                    <a href="mailto:support@atlantasys.com" style={{ fontSize: '16px', color: '#0169A9', fontWeight: '600', textDecoration: 'none' }}>
                      support@atlantasys.com
                    </a>
                  </div>

                  <div className="mb-4">
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700' }}>Toll Free / Central Phone</div>
                    <a href="tel:+919990333888" style={{ fontSize: '16px', color: '#0169A9', fontWeight: '600', textDecoration: 'none' }}>
                      +91-9990333888
                    </a>
                  </div>

                  <div className="mb-4">
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700' }}>Operating Hours</div>
                    <div style={{ fontSize: '14px', color: '#334155' }}>
                      Monday – Saturday<br />
                      09:30 AM – 06:30 PM IST
                    </div>
                  </div>

                  <div className="p-3" style={{ background: '#e0f2fe', borderRadius: '8px', borderLeft: '4px solid #0284c7' }}>
                    <div style={{ fontSize: '13px', color: '#0369a1', fontWeight: '600' }}>Emergency Roadside Assistance:</div>
                    <div style={{ fontSize: '12px', color: '#075985', marginTop: '2px' }}>Enterprise fleet accounts receive 24/7 dedicated dispatch engineer lines.</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Ticket Submission */}
              <div className="col-lg-8 ps-lg-4">
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '32px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0F2D4E', marginBottom: '8px' }}>Raise a Support Ticket</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Fill in your device details for rapid diagnostic assistance from our hardware engineering lab.</p>

                  {ticketSubmitted ? (
                    <div style={{ padding: '24px', background: '#ecfdf5', borderRadius: '8px', textAlign: 'center', color: '#065f46' }}>
                      <i className="fas fa-check-circle" style={{ fontSize: '36px', marginBottom: '10px' }}></i>
                      <div style={{ fontWeight: '700', fontSize: '16px' }}>Support Ticket #ATL-{Math.floor(100000 + Math.random() * 900000)} Created!</div>
                      <div style={{ fontSize: '14px', marginTop: '4px' }}>Our technical support team will contact you within 2 hours.</div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Your Name *</label>
                          <input type="text" required className="form-control" placeholder="Full name" value={ticket.name} onChange={(e) => setTicket({ ...ticket, name: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Email Address *</label>
                          <input type="email" required className="form-control" placeholder="name@company.com" value={ticket.email} onChange={(e) => setTicket({ ...ticket, email: e.target.value })} />
                        </div>
                      </div>

                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Contact Phone *</label>
                          <input type="tel" required className="form-control" placeholder="+91..." value={ticket.phone} onChange={(e) => setTicket({ ...ticket, phone: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Issue Category</label>
                          <select className="form-select" value={ticket.issueType} onChange={(e) => setTicket({ ...ticket, issueType: e.target.value })}>
                            <option>Hardware Connectivity / Power</option>
                            <option>Firmware Update / FOTA</option>
                            <option>Configuration / APN Settings</option>
                            <option>Software Dashboard / API</option>
                            <option>Warranty & RMA Replacement</option>
                          </select>
                        </div>
                      </div>

                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Device Model</label>
                          <input type="text" className="form-control" placeholder="e.g. ATL-140, E-101, AVD-100" value={ticket.deviceModel} onChange={(e) => setTicket({ ...ticket, deviceModel: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Device IMEI / Serial Number</label>
                          <input type="text" className="form-control" placeholder="15-digit IMEI (if known)" value={ticket.serialNumber} onChange={(e) => setTicket({ ...ticket, serialNumber: e.target.value })} />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Description of Issue *</label>
                        <textarea required className="form-control" rows="4" placeholder="Describe symptoms, vehicle type, and any error indicators..." value={ticket.description} onChange={(e) => setTicket({ ...ticket, description: e.target.value })}></textarea>
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ background: '#0169A9', borderColor: '#0169A9', borderRadius: '8px', padding: '12px 32px', fontWeight: '700' }}>
                        Submit Support Ticket
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        {faqsData && faqsData.length > 0 && (
          <section className="py-5" style={{ background: '#F8FAFC', borderTop: '1px solid #e2e8f0' }}>
            <div className="container">
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0F2D4E', marginBottom: '30px', textAlign: 'center' }}>
                Frequently Asked Support Questions
              </h2>
              <div className="row justify-content-center">
                <div className="col-lg-9">
                  {faqsData.map((f, idx) => (
                    <div key={idx} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F2D4E', marginBottom: '8px' }}>
                        {f.question}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#475569', margin: 0, lineHeight: '1.6' }}>
                        {f.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
