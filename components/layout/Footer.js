'use client';
import Link from 'next/link';
import { getAllLocations } from '@/lib/locations';

export default function Footer() {
  const locations = getAllLocations();
  // Select top featured cities for footer links
  const featuredCities = locations.slice(0, 15);

  return (
    <footer className="footer-area footer-bg">
      <div className="container">
        <div className="footer-top pt-50 pb-10">
          <div className="row">
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="footer-widget">
                <div className="footer-logo mb-3">
                  <Link href="/">
                    <img src="/assets/img/logo-white.svg" style={{ width: '85%' }} alt="Atlanta Systems logo" />
                  </Link>
                </div>
                <p className="text-white-50" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  Atlanta Systems Pvt. Ltd. is a premier indigenous IoT and telematics manufacturer delivering end-to-end hardware, software, fuel theft defense, and AI video fleet solutions worldwide.
                </p>
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

            <div className="col-lg-3 col-sm-6 col-6">
              <div className="footer-widget pl-2">
                <h3>Product Lines</h3>
                <ul className="footer-list">
                  <li><Link href="/trackers/vehicle-telematics"><i className="far fa-chevron-right"></i> Vehicle Telematics</Link></li>
                  <li><Link href="/trackers/video-telematics"><i className="far fa-chevron-right"></i> AI Video Telematics</Link></li>
                  <li><Link href="/trackers/indoor-telematics"><i className="far fa-chevron-right"></i> Indoor BLE Telematics</Link></li>
                  <li><Link href="/trackers/iot-sensors"><i className="far fa-chevron-right"></i> Fuel &amp; IoT Sensors</Link></li>
                  <li><Link href="/trackers/obd-telematics"><i className="far fa-chevron-right"></i> OBD Diagnostics &amp; ELD</Link></li>
                  <li><Link href="/trackers/taxi-gps-meter"><i className="far fa-chevron-right"></i> Taxi GPS Meters &amp; POS</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 col-6">
              <div className="footer-widget pl-2">
                <h3>Global Telematics Hubs</h3>
                <ul className="footer-list">
                  {featuredCities.map(city => (
                    <li key={city.slug}>
                      <Link href={`/${city.slug}`}><i className="far fa-map-marker-alt me-1"></i> {city.city}, {city.country}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="footer-widget pl-2">
                <h3>Corporate &amp; Contact</h3>
                <ul className="footer-list">
                  <li><Link href="/about"><i className="far fa-chevron-right"></i> About Atlanta Systems</Link></li>
                  <li><Link href="/contact"><i className="far fa-chevron-right"></i> Contact &amp; Support</Link></li>
                  <li><Link href="/privacy-policy"><i className="far fa-chevron-right"></i> Privacy &amp; Policy</Link></li>
                  <li><Link href="/terms-and-condition"><i className="far fa-chevron-right"></i> Terms &amp; Conditions</Link></li>
                  <li><Link href="/warranty-and-repairs"><i className="far fa-chevron-right"></i> Warranty &amp; Repairs</Link></li>
                  <li>
                    <a href="mailto:enquiry@atlantasys.com" className="mt-2 d-block"><i className="far fa-envelope"></i> enquiry@atlantasys.com</a>
                  </li>
                  <li>
                    <a href="tel:+919990333888"><i className="far fa-phone-alt"></i> +91 9990333888</a>
                  </li>
                </ul>
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
