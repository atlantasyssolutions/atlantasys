import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us & Career Opportunities | Atlanta Systems',
  description: 'Get in touch with Atlanta Systems for GPS tracking, IoT telematics hardware, enterprise solutions, and career opportunities.',
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <div className="inner-banner" style={{ background: '#FFFFFF', padding: '40px 0 20px', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div className="inner-title">
            <h1 style={{ color: '#0F2D4E', fontWeight: '800' }}>Contact Us</h1>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '8px' }}>
              <li><Link href="/" style={{ color: '#0169A9', fontWeight: '600' }}>Home</Link> / </li>
              <li style={{ color: '#64748B' }}>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="contact-section pt-100 pb-70" style={{ background: '#FFFFFF' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="contact-info-box" style={{ background: '#F8FAFC', padding: '30px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #E2E8F0' }}>
                <div className="icon" style={{ fontSize: '30px', color: '#0169A9', marginBottom: '15px' }}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3 style={{ color: '#0F2D4E', fontWeight: '700' }}>Corporate Office</h3>
                <p style={{ color: '#475569' }}>M-135, 2nd Floor, Outer Circle, Connaught Place, New Delhi - 110001, India</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="contact-info-box" style={{ background: '#F8FAFC', padding: '30px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #E2E8F0' }}>
                <div className="icon" style={{ fontSize: '30px', color: '#0169A9', marginBottom: '15px' }}>
                  <i className="fas fa-phone-alt"></i>
                </div>
                <h3 style={{ color: '#0F2D4E', fontWeight: '700' }}>Phone & Support</h3>
                <p style={{ color: '#475569' }}><strong>Enquiry:</strong> +91 9990333888</p>
                <p style={{ color: '#475569' }}><strong>Board:</strong> +91 11 49039700 (100 Lines)</p>
                <p style={{ color: '#475569' }}><strong>Support:</strong> +91 11 49039798 / 799</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="contact-info-box" style={{ background: '#F8FAFC', padding: '30px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #E2E8F0' }}>
                <div className="icon" style={{ fontSize: '30px', color: '#0169A9', marginBottom: '15px' }}>
                  <i className="fas fa-envelope"></i>
                </div>
                <h3 style={{ color: '#0F2D4E', fontWeight: '700' }}>Email Us</h3>
                <p style={{ color: '#475569' }}><strong>General:</strong> enquiry@atlantasys.com</p>
                <p style={{ color: '#475569' }}><strong>Support:</strong> support@atlantasys.com</p>
                <p style={{ color: '#475569' }}><strong>Careers:</strong> hr@atlantasys.com</p>
              </div>
            </div>
          </div>

          <div className="row pt-40">
            <div className="col-lg-7">
              <div className="contact-form" style={{ background: '#F8FAFC', padding: '40px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div className="section-title mb-4">
                  <h2 style={{ fontSize: '28px', color: '#0F2D4E', fontWeight: '800' }}>Send Us a Message</h2>
                  <p style={{ color: '#64748B' }}>Fill out the form below and our team will get back to you within 24 hours.</p>
                </div>

                <form>
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group mb-3">
                        <label style={{ fontWeight: '600', marginBottom: '5px', color: '#0F2D4E' }}>Full Name *</label>
                        <input type="text" className="form-control" placeholder="Enter your full name" required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="form-group mb-3">
                        <label style={{ fontWeight: '600', marginBottom: '5px', color: '#0F2D4E' }}>Phone Number *</label>
                        <input type="tel" className="form-control" placeholder="Enter your phone number" required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group mb-3">
                        <label style={{ fontWeight: '600', marginBottom: '5px', color: '#0F2D4E' }}>Email Address *</label>
                        <input type="email" className="form-control" placeholder="Enter your email address" required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #CBD5E1' }} />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group mb-3">
                        <label style={{ fontWeight: '600', marginBottom: '5px', color: '#0F2D4E' }}>Subject</label>
                        <select className="form-select" style={{ padding: '12px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                          <option value="sales">Product Inquiry / Sales</option>
                          <option value="partnership">Partner With Us</option>
                          <option value="support">Technical Support</option>
                          <option value="careers">Careers &amp; Jobs</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group mb-3">
                        <label style={{ fontWeight: '600', marginBottom: '5px', color: '#0F2D4E' }}>Message *</label>
                        <textarea className="form-control" rows="5" placeholder="How can we help you?" required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #CBD5E1' }}></textarea>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <button type="submit" className="btn btn-primary" style={{ background: '#0169A9', color: '#FFFFFF', padding: '12px 30px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>
                        Submit Message <i className="fas fa-paper-plane ms-2"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="map-area" style={{ height: '100%', minHeight: '400px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.997232230232!2d77.2173167!3d28.6328224!2m3!1f0!0!f0!0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd36c1e55555%3A0x7d67b7e5f1d4f20!2sAtlanta%20Systems%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Atlanta Systems Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
