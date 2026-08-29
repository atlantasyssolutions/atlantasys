import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getAllLocations } from '@/lib/locations';

export default function HomePage() {
  const locations = getAllLocations();

  const menaLocations = locations.filter((l) => l.region === 'MENA');
  const europeLocations = locations.filter((l) => l.region === 'Europe');
  const usLocations = locations.filter((l) => l.region === 'US');
  const latamLocations = locations.filter((l) => l.region === 'Latin America');

  return (
    <>
      <Header />

      {/* Classic Carousel Banner */}
      <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel" data-interval="2000" aria-label="Atlanta Systems Highlights">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item img-overlay active">
            <img src="/assets/img/banner/adas-and-dms.webp" className="d-block w-100" alt="Dash Cam and Video Surveillance for fleets" loading="eager" />
            <div className="banner-item-content carousel-caption d-flex flex-column h-100 bottom-0">
              <h2>ADAS &amp; DMS</h2>
              <p>Elevating your safety with every drive and every mile</p>
              <div className="banner-btn">
                <Link href="/trackers/video-telematics" className="default-btn btn-bg-two border-radius-50">Learn More <i className="far fa-chevron-right"></i></Link>
              </div>
            </div>
          </div>
          <div className="carousel-item img-overlay">
            <img src="/assets/img/banner/vehicle-telematics.webp" className="d-block w-100" alt="Fleet Management Software with real-time GPS tracking" loading="lazy" />
            <div className="banner-item-content carousel-caption d-flex flex-column h-100 bottom-0">
              <h2>Vehicle Telematics</h2>
              <p>Track, analyze, and optimize your fleet with real-time insights</p>
              <div className="banner-btn">
                <Link href="/trackers/vehicle-telematics" className="default-btn btn-bg-two border-radius-50">Learn More <i className="far fa-chevron-right"></i></Link>
              </div>
            </div>
          </div>
          <div className="carousel-item img-overlay">
            <img src="/assets/img/banner/asset-management.webp" className="d-block w-100" alt="Asset tracking devices and software" loading="lazy" />
            <div className="banner-item-content carousel-caption d-flex flex-column h-100 bottom-0">
              <h2>Asset Management</h2>
              <p>Secure your assets, streamline operations, and ensure accuracy</p>
              <div className="banner-btn">
                <Link href="/trackers/assets-telematics" className="default-btn btn-bg-two border-radius-50">Learn More <i className="far fa-chevron-right"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Title Heading Section (H1 for SEO Audit Fix) */}
      <div className="container pt-50">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="heading-title" style={{ position: 'relative', zIndex: 101 }}>
              <h1 style={{ fontSize: '48px', textAlign: 'center', fontFamily: "'Oswald', sans-serif", color: '#1d2250', fontWeight: '800' }}>
                GPS Tracking Devices &amp; Fleet Management Software | Atlanta Systems
              </h1>
              <br />
              <p align="center" style={{ fontSize: '16px', color: '#444', lineHeight: '1.7' }}>
                We combine GPS Tracking Devices, Fleet Management Software, and integrated video—Dash Cam, Video Surveillance, and Mobile Video Recording—to deliver measurable safety, productivity, and compliance outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Design / Create / Assist */}
        <div className="row">
          <div className="col-md-12">
            <div className="design">
              <div className="row">
                <div className="col-md-4">
                  <div className="bxx">
                    <img src="/assets/img/design.webp" loading="lazy" alt="Hardware and enclosure design for GPS tracking devices" />
                    <div className="bxx_content">
                      <div className="bxx_title">Design</div>
                      <div className="bxx_description">Concept-to-production design across PCB, enclosure and firmware for robust GPS Tracking Devices and AIS 140 compliant hardware.</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bxx">
                    <img src="/assets/img/create.webp" loading="lazy" alt="Manufacturing and software integration for fleet solutions" />
                    <div className="bxx_content">
                      <div className="bxx_title">Create</div>
                      <div className="bxx_description">Integrated hardware + cloud platform for Fleet Management Software, video telematics, and IoT sensors at scale.</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bxx">
                    <img src="/assets/img/assist.webp" loading="lazy" alt="Deployment and after-sales support" />
                    <div className="bxx_content">
                      <div className="bxx_title">Assist</div>
                      <div className="bxx_description">Global deployment, onboarding, and lifecycle support with enterprise SLAs and compliance guidance.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discover Range Of Products */}
      <div className="case-study-area pt-50">
        <div className="container-fluid p-0">
          <div className="heading-title">
            <h2>Discover Our Range Of Products</h2>
          </div>
          <div className="container mt-4 mb-4">
            <div className="row justify-content-center">
              <div className="col-md-3 col-6 text-center mb-4">
                <Link href="/trackers/vehicle-telematics">
                  <img src="/assets/product_category/advanced.webp" alt="Vehicle Telematics" style={{ borderRadius: '8px', maxWidth: '100%' }} />
                </Link>
                <div className="content mt-2">
                  <h3><Link href="/trackers/vehicle-telematics" style={{ color: '#1d2250', fontWeight: '700', textDecoration: 'none' }}>Vehicle Telematics</Link></h3>
                </div>
              </div>
              <div className="col-md-3 col-6 text-center mb-4">
                <Link href="/trackers/indoor-telematics">
                  <img src="/assets/product_category/indoorr.webp" alt="Indoor Telematics" style={{ borderRadius: '8px', maxWidth: '100%' }} />
                </Link>
                <div className="content mt-2">
                  <h3><Link href="/trackers/indoor-telematics" style={{ color: '#1d2250', fontWeight: '700', textDecoration: 'none' }}>Indoor Telematics</Link></h3>
                </div>
              </div>
              <div className="col-md-3 col-6 text-center mb-4">
                <Link href="/trackers/video-telematics">
                  <img src="/assets/product_category/video-telematics.webp" alt="Video Telematics" style={{ borderRadius: '8px', maxWidth: '100%' }} />
                </Link>
                <div className="content mt-2">
                  <h3><Link href="/trackers/video-telematics" style={{ color: '#1d2250', fontWeight: '700', textDecoration: 'none' }}>Video Telematics</Link></h3>
                </div>
              </div>
              <div className="col-md-3 col-6 text-center mb-4">
                <Link href="/trackers/iot-sensors">
                  <img src="/assets/product_category/iot-sensors.webp" alt="IOT Sensors" style={{ borderRadius: '8px', maxWidth: '100%' }} />
                </Link>
                <div className="content mt-2">
                  <h3><Link href="/trackers/iot-sensors" style={{ color: '#1d2250', fontWeight: '700', textDecoration: 'none' }}>IOT Sensors</Link></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid Section */}
      <section className="services-area pt-30 pb-50">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-6 mb-4">
              <Link href="/trackers/vehicle-telematics" className="pr" style={{ textDecoration: 'none' }}>
                <div className="product_box">
                  <h3>Vehicle Telematics</h3>
                  <p>Stay ahead of the curve and maintain a competitive edge with our advanced tracking system. From enhancing productivity to reducing costs, our solution enables informed decision-making that offers unparalleled precision.</p>
                  <span>Show devices</span>
                  <p className="image"><img src="/assets/product_category/advanced.webp" loading="lazy" alt="Vehicle Telematics" /></p>
                </div>
              </Link>
            </div>
            <div className="col-md-6 mb-4">
              <Link href="/trackers/indoor-telematics" className="pr" style={{ textDecoration: 'none' }}>
                <div className="product_box">
                  <h3>Indoor Telematics</h3>
                  <p>Indoor telematics solutions provide real-time asset tracking, improved space utilization, and enhanced operational efficiency.</p>
                  <span>Show devices</span>
                  <p className="image"><img src="/assets/product_category/indoorr.webp" loading="lazy" alt="Indoor Telematics" /></p>
                </div>
              </Link>
            </div>
            <div className="col-md-6 mb-4">
              <Link href="/trackers/video-telematics" className="pr" style={{ textDecoration: 'none' }}>
                <div className="product_box">
                  <h3>Video Telematics</h3>
                  <p>Atlanta's Video Telematics offers state-of-the-art safety features for vehicles, including advanced driver assistance systems and driver monitoring technology.</p>
                  <span>Show devices</span>
                  <p className="image"><img src="/assets/product_category/video-telematics.webp" loading="lazy" alt="Video Telematics" /></p>
                </div>
              </Link>
            </div>
            <div className="col-md-6 mb-4">
              <Link href="/trackers/iot-sensors" className="pr" style={{ textDecoration: 'none' }}>
                <div className="product_box">
                  <h3>IOT Sensors</h3>
                  <p>Our IOT sensors offer comprehensive monitoring solutions for various industries. With real-time data collection and analysis, optimize efficiency, safety, and decision-making processes.</p>
                  <span>Show devices</span>
                  <p className="image"><img src="/assets/product_category/iot-sensors.webp" loading="lazy" alt="IOT Sensors" /></p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Strength Section */}
      <section className="work-process-area pt-50 pb-70">
        <div className="container">
          <div className="heading-title">
            <h2>Our Strength</h2>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-4 pt-30">
              <div className="half-box">
                <h2><i className="far fa-dollar-sign"></i> Enterprise-grade</h2>
                <div className="content-main">
                  <p>Reliable hardware and cloud platform engineered for uptime, security and scale.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 pt-30">
              <div className="half-box">
                <h2><i className="far fa-user-tie"></i> Compliance</h2>
                <div className="content-main">
                  <p>AIS 140 compliant GPS devices, audit-ready reporting and configurable data retention.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 pt-30">
              <div className="half-box">
                <h2><i className="fal fa-award"></i> Global Support</h2>
                <div className="content-main">
                  <p>Consultative deployment and lifecycle support with clear SLAs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Counter Area */}
      <div className="counter-area pt-50 pb-50">
        <div className="container">
          <div className="heading-title">
            <h2>Global Presence</h2>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-8 col-md-8 text-center">
              <div className="map-container" style={{ position: 'relative' }}>
                <img src="/assets/img/map-back.webp" alt="Global presence map" loading="lazy" style={{ maxWidth: '100%' }} />
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center mt-4" id="counter">
            <div className="col-md-2 col-4 text-center">
              <div className="counter-another-content">
                <i className="fal fa-microchip" style={{ fontSize: '28px', color: '#0052cc' }}></i>
                <div className="milestone-counter mt-2">
                  <h3 className="highlight" style={{ fontSize: '24px', fontWeight: '800' }}>2</h3>
                  <span style={{ fontSize: '12px' }}>State-of-the-art manufacturing plants</span>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-4 text-center">
              <div className="counter-another-content">
                <i className="fal fa-award" style={{ fontSize: '28px', color: '#0052cc' }}></i>
                <div className="milestone-counter mt-2">
                  <h3 className="highlight" style={{ fontSize: '24px', fontWeight: '800' }}>32+</h3>
                  <span style={{ fontSize: '12px' }}>Years of expertise</span>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-4 text-center">
              <div className="counter-another-content">
                <i className="fal fa-globe-americas" style={{ fontSize: '28px', color: '#0052cc' }}></i>
                <div className="milestone-counter mt-2">
                  <h3 className="highlight" style={{ fontSize: '24px', fontWeight: '800' }}>27+</h3>
                  <span style={{ fontSize: '12px' }}>Countries served</span>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-4 text-center">
              <div className="counter-another-content">
                <i className="fal fa-trophy-alt" style={{ fontSize: '28px', color: '#0052cc' }}></i>
                <div className="milestone-counter mt-2">
                  <h3 className="highlight" style={{ fontSize: '24px', fontWeight: '800' }}>20+</h3>
                  <span style={{ fontSize: '12px' }}>Awards won</span>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-4 text-center">
              <div className="counter-another-content">
                <i className="fal fa-globe-asia" style={{ fontSize: '28px', color: '#0052cc' }}></i>
                <div className="milestone-counter mt-2">
                  <h3 className="highlight" style={{ fontSize: '24px', fontWeight: '800' }}>2M+</h3>
                  <span style={{ fontSize: '12px' }}>Devices delivered</span>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-4 text-center">
              <div className="counter-another-content">
                <i className="fal fa-chart-network" style={{ fontSize: '28px', color: '#0052cc' }}></i>
                <div className="milestone-counter mt-2">
                  <h3 className="highlight" style={{ fontSize: '24px', fontWeight: '800' }}>25+</h3>
                  <span style={{ fontSize: '12px' }}>States &amp; UTs empanelled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional City Hubs Section */}
      <section style={{ padding: '60px 0', background: '#f8fafc', borderTop: '1px solid #eee' }}>
        <div className="container">
          <div className="heading-title text-center mb-5">
            <h2 style={{ fontSize: '32px', fontFamily: "'Oswald', sans-serif", color: '#1d2250' }}>Global Telematics &amp; Regional Compliance Hubs</h2>
            <p style={{ color: '#666' }}>Providing city-localized fleet telemetry across MENA, Europe, US, and Latin America.</p>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', height: '100%' }}>
                <h3 style={{ fontSize: '18px', color: '#0052cc', fontWeight: '700', marginBottom: '15px' }}>🇦🇪 MENA Region</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {menaLocations.map((loc) => (
                    <li key={loc.slug} style={{ marginBottom: '8px' }}>
                      <Link href={`/${loc.slug}`} style={{ color: '#1e293b', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
                        📍 {loc.city}, {loc.country}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', height: '100%' }}>
                <h3 style={{ fontSize: '18px', color: '#0052cc', fontWeight: '700', marginBottom: '15px' }}>🇪🇺 Europe &amp; UK</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {europeLocations.map((loc) => (
                    <li key={loc.slug} style={{ marginBottom: '8px' }}>
                      <Link href={`/${loc.slug}`} style={{ color: '#1e293b', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
                        📍 {loc.city}, {loc.country}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', height: '100%' }}>
                <h3 style={{ fontSize: '18px', color: '#0052cc', fontWeight: '700', marginBottom: '15px' }}>🇺🇸 United States</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {usLocations.map((loc) => (
                    <li key={loc.slug} style={{ marginBottom: '8px' }}>
                      <Link href={`/${loc.slug}`} style={{ color: '#1e293b', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
                        📍 {loc.city}, {loc.country}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', height: '100%' }}>
                <h3 style={{ fontSize: '18px', color: '#0052cc', fontWeight: '700', marginBottom: '15px' }}>🇲🇽 Latin America</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {latamLocations.map((loc) => (
                    <li key={loc.slug} style={{ marginBottom: '8px' }}>
                      <Link href={`/${loc.slug}`} style={{ color: '#1e293b', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
                        📍 {loc.city}, {loc.country}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="faq-section pt-50 pb-50">
        <div className="container">
          <div className="heading-title text-center">
            <h2>Frequently Asked Questions</h2>
          </div>
          <br />
          <div className="accordion faq-accordion" id="faqAccordion">
            <div className="accordion-item mb-3" style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <h3 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" style={{ fontSize: '17px', fontWeight: '700', color: '#1d2250' }}>
                  What’s the difference between a GPS Tracking Device and Fleet Management Software?
                </button>
              </h3>
              <div className="accordion-body" style={{ padding: '15px 20px', color: '#555', fontSize: '15px' }}>
                A GPS Tracking Device captures real-time data; Fleet Management Software converts it into dashboards, alerts and reports for routes, driver behavior, fuel, maintenance and compliance.
              </div>
            </div>

            <div className="accordion-item mb-3" style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <h3 className="accordion-header" id="headingTwo">
                <button className="accordion-button" type="button" style={{ fontSize: '17px', fontWeight: '700', color: '#1d2250' }}>
                  Do you support Dash Cam and Video Surveillance?
                </button>
              </h3>
              <div className="accordion-body" style={{ padding: '15px 20px', color: '#555', fontSize: '15px' }}>
                Yes, including AI Dash Cam (forward/cabin), ADAS/DMS driver monitoring and Mobile Video Recording with event-based uploads.
              </div>
            </div>

            <div className="accordion-item mb-3" style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <h3 className="accordion-header" id="headingThree">
                <button className="accordion-button" type="button" style={{ fontSize: '17px', fontWeight: '700', color: '#1d2250' }}>
                  Are your devices AIS 140 compliant?
                </button>
              </h3>
              <div className="accordion-body" style={{ padding: '15px 20px', color: '#555', fontSize: '15px' }}>
                Yes. We supply AIS 140 compliant GPS devices and provide the documentation and configuration required for rollouts.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Catalogue Banner */}
      <div className="product_catalog pt-50 pb-50">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-5 text-center">
              <img src="/assets/img/pro-catalog.webp" alt="Download product catalogue" loading="lazy" style={{ maxWidth: '100%' }} />
            </div>
            <div className="col-md-7 catalog_row">
              <h2 className="catalog_heading">Ready to explore our products?</h2>
              <p>Explore GPS Tracking Devices, Fleet Management Software, Dash Cam video, Video Surveillance and AIS 140 compliant hardware.</p>
              <Link href="/contact" className="catalog_margin default-btn btn-bg-two border-radius-50">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
