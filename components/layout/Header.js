'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header className="top-header top-header-bg">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6">
              <div className="top-head-left">
                <div className="top-contact me-4">
                  <h3>
                    <i className="fas fa-phone me-2"></i>
                    <a href="tel:+911140131433">+91-11-40131433</a>
                  </h3>
                </div>
                <div className="top-contact">
                  <h3>
                    <i className="fas fa-envelope me-2"></i>
                    <a href="mailto:info@atlantasys.com">info@atlantasys.com</a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="top-header-right">
                <div className="top-header-social">
                  <ul>
                    <li><a href="https://www.facebook.com/atlantasys"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="https://twitter.com/atlantasys"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="https://www.linkedin.com/company/atlanta-systems-pvt-ltd"><i className="fab fa-linkedin-in"></i></a></li>
                    <li><a href="https://www.youtube.com/user/atlantasys"><i className="fab fa-youtube"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="navbar-area" style={{ borderBottom: '1px solid #eee', background: '#ffffff' }}>
      <div className="mobile-nav">
        <Link href="/" className="logo" aria-label="Atlanta Systems">
          <img src="/assets/img/logo.svg" className="logo-one" alt="Atlanta Systems Logo" loading="lazy" />
          <img src="/assets/img/logo.svg" className="logo-two" alt="Atlanta Systems Logo Two" loading="lazy" />
        </Link>
      </div>

      <div className="main-nav">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md navbar-light" aria-label="Primary">
            <Link className="navbar-brand" href="/">
              <img src="/assets/img/logo.svg" className="logo-one" alt="Logo" style={{ height: '42px' }} />
              <img src="/assets/img/logo.svg" className="logo-two" alt="Logo" style={{ height: '42px' }} />
            </Link>

            <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
              <ul className="navbar-nav m-auto">
                <li className="nav-item">
                  <Link href="/" className="nav-link active">
                    <i className="fas fa-home-alt"></i>
                  </Link>
                </li>

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
                          <Link href="/contact">
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
                          <Link href="/contact">
                            <div className="row">
                              <div className="col-md-2">
                                <center><img src="/assets/img/icon/partner.png" alt="Partner With Us" style={{ width: '70%' }} /></center>
                              </div>
                              <div className="col-md-10">
                                <p className="product_menu_name">
                                  Partner With Us<br />
                                  <span className="product_menu_description">
                                    Discover the future of connectivity and operational excellence with Atlanta's premier GPS tracking and IoT solutions.
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
                      </div>
                    </div>
                  </ul>
                </li>

                <li className="nav-item megamenu">
                  <a href="#" className="nav-link">
                    Solutions <i className="fas fa-caret-down"></i>
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
                                    Discover how vehicle telematics revolutionizes fleet management with real-time data.
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
                                    Explore the pivotal role of ADAS in elevating modern vehicle safety.
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

                <li className="nav-item">
                  <Link href="/blog" className="nav-link">Blogs</Link>
                </li>

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
                          <Link href="/contact">
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
                          </Link>
                        </li>
                      </div>
                    </div>
                  </ul>
                </li>
              </ul>

              <div className="nav-side d-display">
                <div className="search-box">
                  <i className="far fa-search"></i>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
    </>
  );
}
