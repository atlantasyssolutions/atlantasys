'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-area footer-bg">
      <div className="container">
        <div className="footer-top pt-50 pb-10">
          <div className="row">
            {/* Column 1: Logo & Social */}
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="footer-widget">
                <div className="footer-logo">
                  <Link href="/">
                    <img src="/assets/img/logo-white.svg" style={{ width: '90%' }} alt="Atlanta Systems logo" />
                  </Link>
                </div>
                <div className="social-link">
                  <h4>Follow Us</h4>
                  <ul>
                    <li>
                      <a href="https://www.linkedin.com/company/atlanta-systems-pvt-ltd/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/atlantasys/?ref=page_internal" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/@atlantasystems" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/atlanta_gps" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 2: Important Links */}
            <div className="col-lg-3 col-sm-6 col-6">
              <div className="footer-widget pl-2">
                <h3>Important Links</h3>
                <ul className="footer-list">
                  <li>
                    <Link href="/privacy-policy">
                      <i className="far fa-chevron-right"></i> Privacy &amp; Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-and-condition">
                      <i className="far fa-chevron-right"></i> Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/warranty-and-repairs">
                      <i className="far fa-chevron-right"></i> Warranty &amp; Repairs
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookie-policy">
                      <i className="far fa-chevron-right"></i> Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <i className="far fa-chevron-right"></i> Reach Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 3: Contact Us */}
            <div className="col-lg-3 col-sm-6 col-6">
              <div className="footer-widget pl-md-5">
                <h3>Contact Us</h3>
                <ul className="footer-list">
                  <li>
                    <a href="mailto:enquiry@atlantasys.com">
                      <i className="far fa-envelope"></i> enquiry@atlantasys.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:01149039700">
                      <i className="fas fa-phone-alt"></i> +91 11 49039700 (100 Lines)
                    </a>
                  </li>
                  <li>
                    <a href="tel:+919990333888">
                      <i className="fas fa-mobile-alt"></i> Enquiry: +91 9990333888
                    </a>
                  </li>
                  <li>
                    <a href="tel:01149039798">
                      <i className="fas fa-headset"></i> Support: +91 11 49039798/799
                    </a>
                  </li>
                  <li>
                    <a href="https://maps.app.goo.gl/mPcLDXyJwTtpMXn49" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-map-marker-alt"></i> M-135, 2nd Floor, Outer Circle, Connaught Place, New Delhi - 110001, India
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget pl-md-5">
                <h3>SIGN UP FOR OUR NEWSLETTER <i className="far fa-arrow-right"></i></h3>
                <div className="newsletter-area mt-3">
                  <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
                    <div className="mb-3">
                      <input type="email" className="form-control" placeholder="Enter Your Email" name="email" required />
                    </div>
                    <div>
                      <button className="btn btn-info w-100" type="submit" id="subscribe_btn" style={{ background: '#0169A9', borderColor: '#0169A9', color: '#fff' }}>
                        SUBSCRIBE NOW
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copy-right-area">
          <div className="copy-right-text">
            <p>
              Copyright © {new Date().getFullYear()} Atlanta Systems Pvt. Ltd. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
