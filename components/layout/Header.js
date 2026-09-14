'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="navbar-area" style={{ borderBottom: '1px solid #eee', background: '#ffffff', position: 'sticky', top: 0, zIndex: 999 }}>
        {/* Mobile Navigation Bar */}
        <div className="mobile-nav">
          <Link href="/" className="logo" aria-label="Atlanta Systems">
            <img src="/assets/img/logo.svg" className="logo-one" alt="Atlanta Systems Logo" loading="lazy" />
            <img src="/assets/img/logo.svg" className="logo-two" alt="Atlanta Systems Logo Two" loading="lazy" />
          </Link>
          <div className="mobile-menu-toggle" onClick={() => setDrawerOpen(true)} style={{ cursor: 'pointer' }}>
            <i className="fas fa-bars"></i>
          </div>
        </div>

        {/* Desktop Main Navigation */}
        <div className="main-nav">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-md navbar-light" aria-label="Primary">
              <Link className="navbar-brand" href="/">
                <img src="/assets/img/logo.svg" className="logo-one" alt="Logo" />
                <img src="/assets/img/logo.svg" className="logo-two" alt="Logo" />
              </Link>

              <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                <ul className="navbar-nav m-auto">
                  <li className="nav-item">
                    <Link href="/" className="nav-link active">
                      <i className="fas fa-home-alt"></i>
                    </Link>
                  </li>

                  {/* Discover Atlanta Megamenu */}
                  <li className="nav-item megamenu">
                    <a href="#" className="nav-link">
                      Discover Atlanta <i className="fas fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu mega">
                      <div className="row">
                        <div className="col-md-6">
                          <li>
                            <Link href="/about">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/about.png" alt="About Us" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    About Us<br />
                                    <span className="product_menu_description">
                                      From inception to industry leaders, our 32-year journey in ICT / IoT solutions is a testament to our passion and innovation.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link href="/career">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/career.png" alt="Career" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    Career<br />
                                    <span className="product_menu_description">
                                      Be a part of our team that's changing the world, one innovation at a time.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        </div>
                        <div className="col-md-6">
                          <li>
                            <Link href="/reseller">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/partner.png" alt="Reseller Program" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    Reseller Program<br />
                                    <span className="product_menu_description">
                                      Join our global telematics network with wholesale margins, white-label options, and dedicated partner support.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link href="/contact">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/contact.png" alt="Contact" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    Contact<br />
                                    <span className="product_menu_description">
                                      Get in touch with us and let us know how we can help you.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        </div>
                      </div>
                    </ul>
                  </li>

                  {/* Products Megamenu */}
                  <li className="nav-item megamenu">
                    <a href="#" className="nav-link">
                      Products <i className="fas fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu mega">
                      <div className="row">
                        <div className="col-md-6">
                          <li>
                            <Link href="/trackers/vehicle-telematics">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/vehicle-tracker.png" alt="Vehicle Telematics" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    Vehicle Telematics<br />
                                    <span className="product_menu_description">
                                      Vehicle telematics enhances fleet management through real-time tracking, fuel efficiency, and driver safety insights.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link href="/trackers/indoor-telematics">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/indoor.png" alt="Indoor Telematics" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    Indoor Telematics<br />
                                    <span className="product_menu_description">
                                      Indoor telematics solutions provide real-time asset tracking, improved space utilization, and enhanced operational efficiency.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link href="/trackers/assets-&-personal-telematics">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/asset.png" alt="Assets & Personal Telematics" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    Assets &amp; Personal Telematics<br />
                                    <span className="product_menu_description">
                                      Asset and personal telematics ensure real-time tracking, security, and management of valuable resources effectively.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link href="/trackers/obd-telematics">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/obd-tracker.png" alt="OBD Telematics" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    OBD Telematics<br />
                                    <span className="product_menu_description">
                                      OBD telematics offers vehicle diagnostics, performance monitoring, and real-time data for improved fleet management.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        </div>
                        <div className="col-md-6">
                          <li>
                            <Link href="/trackers/video-telematics">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/adas.png" alt="Video Telematics" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    Video Telematics<br />
                                    <span className="product_menu_description">
                                      ADAS and DMS enhance vehicle safety, providing real-time alerts and monitoring for improved driver awareness.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link href="/trackers/iot-sensors">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/iot-sensors.png" alt="IoT Sensors" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    IoT Sensors<br />
                                    <span className="product_menu_description">
                                      IoT sensors enable real-time data collection, improving monitoring, automation, and decision-making across industries.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link href="/trackers/taxi-gps-meter">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/taxi.png" alt="Taxi GPS Meter" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    Taxi GPS Meter<br />
                                    <span className="product_menu_description">
                                      GPS taxi meters provide accurate fare calculations, real-time tracking, and enhanced passenger safety features.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        </div>
                      </div>
                    </ul>
                  </li>

                  {/* Solutions Megamenu */}
                  <li className="nav-item megamenu">
                    <a href="#" className="nav-link">
                      Solutions <i className="fas fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu mega">
                      <div className="row">
                        <div className="col-md-6">
                          <li>
                            <Link href="/vehicle-telematics">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/vehicle-tracker.png" alt="Vehicle Telematics" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    Vehicle Telematics<br />
                                    <span className="product_menu_description">
                                      Discover how vehicle telematics, integrating telecommunications and information systems, revolutionizes fleet management with real-time data.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link href="/adas">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/adas.png" alt="Video Telematics" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    Video Telematics<br />
                                    <span className="product_menu_description">
                                      Explore the pivotal role of Advanced Driver Assistance Systems (ADAS) in elevating modern vehicle safety.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link href="/school-solution">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/school.png" alt="School Buddy Solution" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    School Buddy Solution<br />
                                    <span className="product_menu_description">
                                      Our school transport solution ensures safe and efficient transportation for students.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        </div>
                        <div className="col-md-6">
                          <li>
                            <Link href="/parking-solution">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/parking.png" alt="Parking Management" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    Parking Management<br />
                                    <span className="product_menu_description">
                                      Turning a parking challenge into an opportunity, our solution redefines service, protection, and intent.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link href="/smart-city-solution">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/smart-city.png" alt="Smart City Solution" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    Smart City Solution<br />
                                    <span className="product_menu_description">
                                      Smart-city technologies hold vast, untapped potential to elevate the quality of urban life significantly.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        </div>
                      </div>
                    </ul>
                  </li>

                  {/* Reseller Program Link */}
                  <li className="nav-item">
                    <Link href="/reseller" className="nav-link">Reseller</Link>
                  </li>

                  {/* Blogs Link */}
                  <li className="nav-item">
                    <Link href="/blog" className="nav-link">Blogs</Link>
                  </li>

                  {/* Support Megamenu */}
                  <li className="nav-item megamenu">
                    <a href="#" className="nav-link">
                      Support <i className="fas fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu mega">
                      <div className="row">
                        <div className="col-md-6">
                          <li>
                            <Link href="/contact">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/support.png" alt="Customer Support" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    Customer Support<br />
                                    <span className="product_menu_description">
                                      Atlanta offers global advisory and support resources at every step of your journey.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </li>
                        </div>
                        <div className="col-md-6">
                          <li>
                            <a href="#faqAccordion">
                              <div className="row">
                                <div className="col-md-2">
                                  <center><img src="/assets/img/icon/faq.png" alt="FAQ" style={{ width: '70%' }} /></center>
                                </div>
                                <div className="col-md-10">
                                  <p className="product_menu_name">
                                    FAQ<br />
                                    <span className="product_menu_description">
                                      Find answers to common inquiries here. Quick, clear, helpful responses.
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>
                        </div>
                      </div>
                    </ul>
                  </li>
                </ul>

                <div className="nav-side d-display">
                  <div className="nav-side-item">
                    <div className="search-box">
                      <i className="fas fa-search"></i>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div id="mobileDrawer" className={`mobile-drawer ${drawerOpen ? 'active' : ''}`}>
          <div className="drawer-header">
            <img src="/assets/img/logo.svg" alt="Atlanta Systems" />
            <span onClick={() => setDrawerOpen(false)} style={{ cursor: 'pointer', fontSize: '20px', fontWeight: 'bold' }}>✕</span>
          </div>

          <ul className="drawer-menu">
            <li><Link href="/" onClick={() => setDrawerOpen(false)}>Home</Link></li>
            <li><Link href="/about" onClick={() => setDrawerOpen(false)}>About Us</Link></li>
            <li><Link href="/trackers/vehicle-telematics" onClick={() => setDrawerOpen(false)}>Products</Link></li>
            <li><Link href="/vehicle-telematics" onClick={() => setDrawerOpen(false)}>Solutions</Link></li>
            <li><Link href="/reseller" onClick={() => setDrawerOpen(false)}>Reseller Program</Link></li>
            <li><Link href="/blog" onClick={() => setDrawerOpen(false)}>Blogs</Link></li>
            <li><Link href="/contact" onClick={() => setDrawerOpen(false)}>Contact</Link></li>
          </ul>
        </div>

        {drawerOpen && (
          <div
            id="drawerOverlay"
            className="drawer-overlay active"
            onClick={() => setDrawerOpen(false)}
          ></div>
        )}
      </header>
    </>
  );
}
