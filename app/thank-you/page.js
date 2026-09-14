'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ThankYouPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [submittedSource, setSubmittedSource] = useState('enquiry');

  useEffect(() => {
    // SECURITY GUARD: Only open if form was filled and verified in sessionStorage
    const submitted = sessionStorage.getItem('formSubmitted');
    const source = sessionStorage.getItem('submittedSource') || 'enquiry';

    if (!submitted) {
      // Unauthorized direct visit — redirect back to contact
      router.replace('/contact');
    } else {
      setIsAuthorized(true);
      setSubmittedSource(source);
      // Consume the single-use token after showing the page
      sessionStorage.removeItem('formSubmitted');
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
        <div style={{ textAlign: 'center', color: '#64748B', fontSize: '15px' }}>
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p>Verifying submission authorization...</p>
        </div>
      </div>
    );
  }

  const isReseller = submittedSource === 'reseller';

  return (
    <>
      <head>
        <title>Thank You | Atlanta Systems</title>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <Header />
      <main style={{ backgroundColor: '#F8FAFC', paddingTop: '140px', paddingBottom: '90px', minHeight: '85vh' }}>
        <div className="container" style={{ maxWidth: '840px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Main Card */}
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 20px 40px -15px rgba(15, 45, 78, 0.08)',
              padding: 'clamp(30px, 5vw, 60px)',
              textAlign: 'center'
            }}
          >
            {/* Animated Checkmark Icon */}
            <div 
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                backgroundColor: '#ECFDF5',
                color: '#059669',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                border: '2px solid #A7F3D0',
                boxShadow: '0 8px 20px -4px rgba(5, 150, 105, 0.25)'
              }}
            >
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            {/* Badge */}
            <div>
              <span 
                style={{
                  backgroundColor: '#F0F9FF',
                  color: '#0169A9',
                  border: '1px solid #BAE6FD',
                  borderRadius: '999px',
                  padding: '6px 18px',
                  fontSize: '13px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'inline-block',
                  marginBottom: '14px'
                }}
              >
                {isReseller ? 'Reseller Application Logged' : 'Enquiry Received & Dispatched'}
              </span>
            </div>

            {/* Heading */}
            <h1 
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: '700',
                color: '#0F2D4E',
                marginBottom: '16px',
                lineHeight: '1.2'
              }}
            >
              Thank You! Your Request Has Been Logged.
            </h1>

            {/* Subtitle */}
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '620px', margin: '0 auto 32px auto' }}>
              {isReseller 
                ? 'Thank you for applying to the Atlanta Systems Authorized Reseller & Distributor Network. Our commercial partnerships team is currently evaluating your territory allocation.'
                : 'Thank you for reaching out to Atlanta Systems. Our senior fleet engineering desk has received your details and is preparing your tailored telematics specifications.'}
            </p>

            {/* What Happens Next Timeline */}
            <div 
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '24px',
                textAlign: 'left',
                marginBottom: '36px'
              }}
            >
              <h4 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '16px', fontWeight: '700', color: '#0F2D4E', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '18px' }}>
                What Happens Next:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#0169A9', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', flexShrink: 0, marginTop: '2px' }}>
                    1
                  </div>
                  <div>
                    <strong style={{ color: '#0F2D4E', fontSize: '14.5px', display: 'block' }}>Technical Review (Within 30 Minutes)</strong>
                    <span style={{ color: '#64748B', fontSize: '13.5px', lineHeight: '1.5' }}>
                      Our systems engineers review your fleet size, required protocols (AIS-140, CAN J1939, BLE, ADAS), or distributor region.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#0169A9', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', flexShrink: 0, marginTop: '2px' }}>
                    2
                  </div>
                  <div>
                    <strong style={{ color: '#0F2D4E', fontSize: '14.5px', display: 'block' }}>Direct Contact by Account Engineer</strong>
                    <span style={{ color: '#64748B', fontSize: '13.5px', lineHeight: '1.5' }}>
                      You will receive a call or detailed proposal via email within <strong>2 business hours</strong> with wholesale pricing and spec sheets.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#0169A9', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', flexShrink: 0, marginTop: '2px' }}>
                    3
                  </div>
                  <div>
                    <strong style={{ color: '#0F2D4E', fontSize: '14.5px', display: 'block' }}>Sample Pilot Units &amp; Dashboard Setup</strong>
                    <span style={{ color: '#64748B', fontSize: '13.5px', lineHeight: '1.5' }}>
                      We arrange evaluation hardware dispatched to your workshop and provision test cloud credentials.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Urgent Assistance Strip */}
            <div style={{ marginBottom: '32px', padding: '16px', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <span style={{ color: '#1E40AF', fontSize: '14px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                Need immediate technical assistance or priority dispatch?
              </span>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '14px' }}>
                <a href="tel:+919990333888" style={{ color: '#0169A9', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  📞 Direct Fleet Desk: +91 9990333888
                </a>
                <span style={{ color: '#94A3B8' }}>&bull;</span>
                <a href="tel:01149039700" style={{ color: '#0169A9', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  🏢 HQ Board: +91 11 49039700
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link 
                href="/"
                style={{
                  backgroundColor: '#0169A9',
                  color: '#FFFFFF',
                  padding: '13px 28px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontFamily: "'Oswald', sans-serif",
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  fontSize: '15px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(1, 105, 169, 0.25)',
                  transition: 'background-color 0.2s'
                }}
              >
                Return to Homepage
              </Link>
              <Link 
                href="/all-product"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#0F2D4E',
                  border: '1px solid #CBD5E1',
                  padding: '13px 28px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontFamily: "'Oswald', sans-serif",
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  fontSize: '15px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s'
                }}
              >
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
