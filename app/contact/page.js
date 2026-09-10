import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Contact Us | Atlanta Systems — GPS Tracking & Fleet Telematics',
  description: 'Get in touch with Atlanta Systems for GPS tracking, IoT telematics hardware, fleet management software, AIS 140 devices, and enterprise fleet deployments.',
  alternates: { canonical: 'https://www.atlantasys.com/contact' },
  openGraph: {
    title: 'Contact Us | Atlanta Systems',
    description: 'Contact Atlanta Systems for GPS tracking, IoT telematics hardware, and enterprise fleet solutions.',
    url: 'https://www.atlantasys.com/contact',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Atlanta Systems',
  url: 'https://www.atlantasys.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Atlanta Systems Pvt. Ltd.',
    telephone: '+91-9990333888',
    email: 'enquiry@atlantasys.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'M-135, 2nd Floor, Connaught Place',
      addressLocality: 'New Delhi',
      postalCode: '110001',
      addressCountry: 'IN',
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* Page Heading */}
      <div className="about-area about-top-area pb-50 pt-50">
        <div className="container">
          <div className="heading-title">
            <h2>Reach Us</h2>
          </div>
          <div className="row about-top pt-20">
            <div className="col-md-12">
              <p align="center">
                Revolutionize your fleet management with our Telematics solutions. Enhance efficiency, monitor vehicle health, and optimize routes with cutting-edge technology. Reach us for tailored solutions that drive productivity and fuel your business success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Head Office + Enquiry Form */}
      <div className="container-fluid" style={{ paddingTop: '0px', paddingBottom: '100px' }}>
        <div className="container">
          <div className="row">
            {/* Head Office Info */}
            <div className="col-md-6">
              <h2 className="self-h2">HEAD OFFICE</h2>
              <h3>Atlanta Systems Pvt. Ltd.</h3>
              <p>
                <a href="https://g.page/atlanta-systems-pvt-ltd-?share" target="_blank" rel="noopener noreferrer" style={{ color: '#222', fontSize: '18px' }}>
                  <i className="fas fa-map-marker-alt"></i> M-135, 2nd Floor, Connaught Place, New Delhi – 110001
                </a>
              </p>
              <p style={{ fontSize: '20px', color: '#000' }} id="support">
                For Sales Enquiry<br />
                <a href="tel:919990333888" style={{ color: '#222', fontSize: '18px' }}>
                  <i className="fas fa-phone-alt"></i> +91 9990 333 888
                </a><br />
                <a href="tel:04903970" style={{ color: '#222', fontSize: '18px' }}>
                  <i className="fas fa-phone"></i> +91-11-49039700 (100 Lines)
                </a><br />
                <a href="mailto:enquiry@atlantasys.com" style={{ color: '#222', fontSize: '18px' }}>
                  <i className="fas fa-envelope"></i> enquiry@atlantasys.com
                </a>
              </p>
              <br />
              <p style={{ fontSize: '20px', color: '#000' }}>
                In case of any complaint please write to us or contact our customer support center at<br />
                <a href="tel:01149039798" style={{ color: '#222', fontSize: '18px' }}>
                  <i className="fas fa-phone-alt"></i> +91 1149039798 / 799
                </a><br />
                <a href="mailto:support@atlantasys.com" style={{ color: '#222', fontSize: '18px' }}>
                  <i className="fas fa-envelope"></i> support@atlantasys.com
                </a>
              </p>
            </div>

            {/* Enquiry Form */}
            <div className="col-md-6">
              <h2 className="self-h2">Enquiry Form</h2>
              <p>Note: <span style={{ color: 'red' }}>*</span> fields are mandatory</p>
              <form id="contact_form2" action="/api/contact" method="POST">
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                    <label><strong>Full Name<span style={{ color: 'red' }}>*</span></strong></label>
                    <input type="text" className="form-control" name="name" placeholder="Full Name" />
                  </div>
                  <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                    <label><strong>Phone<span style={{ color: 'red' }}>*</span></strong></label>
                    <input type="text" className="form-control" name="contact" placeholder="Contact No." />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                    <label><strong>Email Address<span style={{ color: 'red' }}>*</span></strong></label>
                    <input type="text" className="form-control" name="email" placeholder="Email Address" />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                    <label><strong>Leave us a message</strong><span style={{ color: 'red' }}>*</span></label>
                    <textarea className="form-control" name="message" rows={4}></textarea>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-12 col-lg-12" align="right">
                    <button type="submit" id="submitBtnn2" className="btn btn-success">
                      <i className="fas fa-paper-plane"></i> Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Google Map */}
      <div className="container-fluid">
        <div className="row">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.874944575708!2d77.2225933!3d28.6335099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2d6c1143121%3A0x4010a3b8bb14e624!2sAtlanta%20Systems%20Private%20Limited!5e0!3m2!1sen!2sin!4v1710137559131!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Atlanta Systems Head Office - Connaught Place, New Delhi"
          ></iframe>
        </div>
      </div>

      <Footer />
    </>
  );
}
