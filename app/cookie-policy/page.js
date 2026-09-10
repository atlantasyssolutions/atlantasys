import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Cookie Policy | Atlanta Systems',
  description: 'Learn about how Atlanta Systems Pvt. Ltd. handles cookies and ensures user privacy across our website and telematics portals.',
  alternates: {
    canonical: 'https://www.atlantasys.com/cookie-policy',
  },
  openGraph: {
    title: 'Cookie Policy | Atlanta Systems',
    description: 'Atlanta Systems Cookie Policy and privacy-first standards.',
    url: 'https://www.atlantasys.com/cookie-policy',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

export default function CookiePolicyPage() {
  const sections = [
    {
      id: 1,
      title: '1. What Are Cookies?',
      content:
        'Cookies are small text files stored on your device (computer, tablet, or mobile) when you browse websites. They help web applications function efficiently, preserve session preferences, and provide diagnostic performance feedback to site administrators.',
    },
    {
      id: 2,
      title: '2. How We Use Cookies',
      content: (
        <>
          <p>We use essential cookies strictly to provide core website functionality, security, and performance. Our categories include:</p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Essential Cookies:</strong> Enable secure page navigation, load balancing, and form validation. These cannot be switched off in our systems.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Functional Preferences:</strong> Store selected language or region preferences during your visit to improve user experience.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Diagnostics &amp; Security:</strong> Prevent unauthorized submissions, detect malicious bots, and protect customer inquiry channels.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 3,
      title: '3. Zero Third-Party Tracker Commitment',
      content:
        'Atlanta Systems prioritizes enterprise privacy and telemetry confidentiality. We do not sell user data, nor do we employ invasive third-party cross-site advertising networks or third-party behavioral profiling trackers on this website.',
    },
    {
      id: 4,
      title: '4. Managing Cookies',
      content: (
        <>
          <p>
            You can control, filter, or delete cookies at any time through your browser settings. Most browsers allow you to block cookies or alert you when cookies are being sent. Note that disabling essential cookies may impact specific portal features or form submissions.
          </p>
        </>
      ),
    },
    {
      id: 5,
      title: '5. Policy Updates',
      content:
        'We may periodically update this Cookie Policy to reflect technical enhancements, architectural updates, or regulatory compliance standards. Any revisions will be reflected on this page with the latest effective date.',
    },
    {
      id: 6,
      title: '6. Contact Information',
      content: (
        <>
          <p>If you have any questions regarding our cookie practices or data privacy standards, please reach out to us:</p>
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '12px' }}>
            <strong style={{ color: '#1d2250' }}>Atlanta Systems Pvt. Ltd.</strong>
            <br />
            Email: <a href="mailto:enquiry@atlantasys.com" style={{ color: '#ff5e14', textDecoration: 'none' }}>enquiry@atlantasys.com</a>
            <br />
            Address: M-135, 2nd Floor, Outer Circle, Connaught Place, New Delhi - 110001, India
            <br />
            Phone: +91-11-4777 5555
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Header />

      <div
        className="inner-banner"
        style={{
          background: 'linear-gradient(135deg, #070b3b 0%, #1d2250 100%)',
          padding: '60px 0',
          color: '#fff',
        }}
      >
        <div className="container text-center">
          <h1
            style={{
              fontSize: '42px',
              fontWeight: '800',
              fontFamily: "'Oswald', sans-serif",
              marginBottom: '15px',
            }}
          >
            Cookie Policy
          </h1>
          <p style={{ fontSize: '16px', opacity: '0.9' }}>
            Transparency and privacy-first commitment at Atlanta Systems Pvt. Ltd.
          </p>
        </div>
      </div>

      <section className="ptb-70">
        <div className="container" style={{ maxWidth: '900px', lineHeight: '1.8', color: '#333' }}>
          <p style={{ fontSize: '16px', marginBottom: '35px', color: '#555' }}>
            This Cookie Policy explains how <strong>Atlanta Systems Pvt. Ltd.</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) uses cookies and similar technologies to ensure reliable, secure navigation when you visit <strong>www.atlantasys.com</strong> and related enterprise telematics platforms.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {sections.map((section) => (
              <div
                key={section.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '25px 30px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                <h2
                  style={{
                    color: '#1d2250',
                    fontWeight: '700',
                    fontSize: '20px',
                    marginBottom: '12px',
                    fontFamily: "'Oswald', sans-serif",
                  }}
                >
                  {section.title}
                </h2>
                <div style={{ fontSize: '15px', color: '#4b5563' }}>{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
