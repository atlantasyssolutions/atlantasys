'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-area footer-bg" style={{ backgroundColor: '#0F2D4E', color: '#FFFFFF' }}>
      <div className="container">
        <div className="footer-top pt-50 pb-30">
          <div className="row g-4 justify-content-between">
            {/* Column 1: Logo, Tagline & Social */}
            <div className="col-lg-3 col-md-6 col-12">
              <div className="footer-widget">
                <div className="footer-logo mb-3">
                  <Link href="/">
                    <img 
                      src="/assets/img/logo-white.svg" 
                      style={{ maxWidth: '210px', width: '100%', height: 'auto', display: 'block' }} 
                      alt="Atlanta Systems logo" 
                    />
                  </Link>
                </div>
                <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '20px' }}>
                  Pioneering indigenous IoT &amp; telematics OEM manufacturing for 32+ years. Delivering AIS-140 GPS trackers, AI video dash cams, and smart sensors worldwide.
                </p>
                <div className="social-link">
                  <h4 style={{ 
                    fontFamily: "'Oswald', sans-serif", 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    letterSpacing: '1px', 
                    textTransform: 'uppercase', 
                    color: '#FFFFFF', 
                    marginBottom: '12px' 
                  }}>
                    Follow Us
                  </h4>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <a 
                      href="https://www.linkedin.com/company/atlanta-systems-pvt-ltd/?originalSubdomain=in" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        color: '#0169A9',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        transition: 'all 0.25s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0169A9'; e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#0169A9'; }}
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a 
                      href="https://www.facebook.com/atlantasys/?ref=page_internal" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        color: '#0169A9',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        transition: 'all 0.25s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0169A9'; e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#0169A9'; }}
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a 
                      href="https://www.youtube.com/@atlantasystems" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        color: '#0169A9',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        transition: 'all 0.25s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0169A9'; e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#0169A9'; }}
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                    <a 
                      href="https://www.instagram.com/atlanta_gps" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                        color: '#0169A9',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        transition: 'all 0.25s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0169A9'; e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#0169A9'; }}
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Important Links */}
            <div className="col-lg-2 col-md-6 col-6">
              <div className="footer-widget">
                <h3 style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '18px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  marginBottom: '22px'
                }}>
                  Important Links
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    { label: 'Privacy & Policy', href: '/privacy-policy' },
                    { label: 'Terms & Conditions', href: '/terms-and-condition' },
                    { label: 'Reseller Program', href: '/reseller' },
                    { label: 'Warranty & Repairs', href: '/warranty-and-repairs' },
                    { label: 'Cookie Policy', href: '/cookie-policy' },
                    { label: 'Reach Us', href: '/contact' }
                  ].map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '12px' }}>
                      <Link 
                        href={item.href}
                        style={{
                          color: 'rgba(255, 255, 255, 0.82)',
                          fontSize: '14.5px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.2s ease',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.82)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                      >
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" style={{ flexShrink: 0 }}>
                          <path d="M1 1L5 5L1 9" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Contact Us */}
            <div className="col-lg-4 col-md-6 col-12">
              <div className="footer-widget">
                <h3 style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '18px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  marginBottom: '22px'
                }}>
                  Contact Us
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Email */}
                  <li>
                    <a 
                      href="mailto:enquiry@atlantasys.com"
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '14px',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'; }}
                    >
                      <span style={{ color: '#38BDF8', flexShrink: 0, marginTop: '2px' }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                      </span>
                      <span>enquiry@atlantasys.com</span>
                    </a>
                  </li>

                  {/* Landline */}
                  <li>
                    <a 
                      href="tel:01149039700"
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '14px',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'; }}
                    >
                      <span style={{ color: '#38BDF8', flexShrink: 0, marginTop: '2px' }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </span>
                      <span>+91 11 49039700 (100 Lines)</span>
                    </a>
                  </li>

                  {/* Enquiry Mobile */}
                  <li>
                    <a 
                      href="tel:+919990333888"
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '14px',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'; }}
                    >
                      <span style={{ color: '#38BDF8', flexShrink: 0, marginTop: '2px' }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                          <line x1="12" y1="18" x2="12.01" y2="18"></line>
                        </svg>
                      </span>
                      <span><strong>Enquiry:</strong> +91 9990333888</span>
                    </a>
                  </li>

                  {/* Support */}
                  <li>
                    <a 
                      href="tel:01149039798"
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '14px',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'; }}
                    >
                      <span style={{ color: '#38BDF8', flexShrink: 0, marginTop: '2px' }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                        </svg>
                      </span>
                      <span><strong>Support:</strong> +91 11 49039798/799</span>
                    </a>
                  </li>

                  {/* Address */}
                  <li>
                    <a 
                      href="https://maps.app.goo.gl/mPcLDXyJwTtpMXn49" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#38BDF8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'; }}
                    >
                      <span style={{ color: '#38BDF8', flexShrink: 0, marginTop: '3px' }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </span>
                      <span>M-135, 2nd Floor, Outer Circle, Connaught Place, New Delhi - 110001, India</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div className="col-lg-3 col-md-6 col-12">
              <div className="footer-widget">
                <h3 style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '18px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}>
                  Sign Up For Our Newsletter
                </h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.72)', lineHeight: '1.5', marginBottom: '16px' }}>
                  Subscribe to receive product launches, firmware releases, and telematics industry insights.
                </p>
                <div className="newsletter-area">
                  <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Atlanta Systems!'); }}>
                    <div style={{ marginBottom: '10px' }}>
                      <input 
                        type="email" 
                        placeholder="Enter Your Email" 
                        name="email" 
                        required 
                        style={{
                          width: '100%',
                          height: '46px',
                          padding: '0 14px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          borderRadius: '6px',
                          color: '#0F2D4E',
                          fontSize: '14px',
                          outline: 'none',
                          boxShadow: 'none'
                        }}
                      />
                    </div>
                    <div>
                      <button 
                        type="submit" 
                        id="subscribe_btn" 
                        style={{ 
                          width: '100%',
                          height: '46px',
                          backgroundColor: '#0169A9', 
                          border: 'none', 
                          borderRadius: '6px',
                          color: '#FFFFFF',
                          fontFamily: "'Oswald', sans-serif",
                          fontSize: '15px',
                          fontWeight: '600',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0284C7'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#0169A9'; }}
                      >
                        <span>Subscribe Now</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div 
          className="copy-right-area" 
          style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.12)', 
            padding: '22px 0', 
            marginTop: '20px' 
          }}
        >
          <div className="copy-right-text" style={{ textAlign: 'center' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '13.5px', margin: 0 }}>
              Copyright © {new Date().getFullYear()} Atlanta Systems Pvt. Ltd. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
