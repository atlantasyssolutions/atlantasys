import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingContact from '@/components/layout/FloatingContact';
import HeroSlider from '@/components/home/HeroSlider';
import ProductRangeSlider from '@/components/home/ProductRangeSlider';
import HomeFaq from '@/components/home/HomeFaq';
import CounterSection from '@/components/home/CounterSection';
import { ORIGINAL_HOMEPAGE_FAQS } from '@/data/homepageFaqs';

export const metadata = {
  title: 'GPS Tracking Devices & Fleet Management Software | Atlanta Systems',
  description:
    'Atlanta Systems delivers enterprise-grade GPS Tracking Devices and Fleet Management Software with Dash Cam video telematics, Video Surveillance, AIS 140 compliant hardware, and Mobile Video Recording for global fleets.',
  alternates: {
    canonical: 'https://www.atlantasys.com/',
  },
  openGraph: {
    siteName: 'Atlanta Systems Pvt. Ltd.',
    type: 'website',
    title: 'GPS Tracking Devices & Fleet Management Software | Atlanta Systems',
    description:
      'Enterprise GPS tracking, fleet software, Dash Cams, Video Surveillance, AIS 140 compliant devices and Mobile Video Recording for global operations.',
    url: 'https://www.atlantasys.com/',
    images: ['/assets/img/logo.svg'],
  },
};

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ORIGINAL_HOMEPAGE_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <FloatingContact />
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />

      {/* 1. Hero Carousel Banner */}
      <HeroSlider />

      {/* 2. Concept Section: Enterprise Telematics for Global Fleets & Design, Create, Assist */}
      <div className="container pt-50">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="heading-title" style={{ position: 'relative', zIndex: 101 }}>
              <h1
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 50px)',
                  textAlign: 'center',
                  fontFamily: "'Oswald', sans-serif",
                  color: '#1d2250',
                  fontWeight: '700',
                  marginBottom: '15px',
                }}
              >
                Enterprise Telematics for Global Fleets
              </h1>
              <p
                style={{
                  fontSize: '16px',
                  color: '#475569',
                  maxWidth: '850px',
                  margin: '0 auto 35px',
                  lineHeight: '1.7',
                  textAlign: 'center',
                }}
              >
                We combine GPS Tracking Devices, Fleet Management Software, and integrated video—Dash Cam, Video
                Surveillance, and Mobile Video Recording—to deliver measurable safety, productivity, and compliance outcomes.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="design">
              <div className="row">
                {/* Design Card */}
                <div className="col-md-4 mb-4">
                  <div className="bxx">
                    <img
                      decoding="async"
                      src="/assets/img/design.webp"
                      loading="lazy"
                      alt="Hardware and enclosure design for GPS tracking devices"
                    />
                    <div className="bxx_content">
                      <div className="bxx_title">Design</div>
                      <div className="bxx_description">
                        Concept-to-production design across PCB, enclosure and firmware for robust GPS Tracking Devices and AIS 140 compliant hardware.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Create Card */}
                <div className="col-md-4 mb-4">
                  <div className="bxx">
                    <img
                      decoding="async"
                      src="/assets/img/create.webp"
                      loading="lazy"
                      alt="Manufacturing and software integration for fleet solutions"
                    />
                    <div className="bxx_content">
                      <div className="bxx_title">Create</div>
                      <div className="bxx_description">
                        Integrated hardware + cloud platform for Fleet Management Software, video telematics, and IoT sensors at scale.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assist Card */}
                <div className="col-md-4 mb-4">
                  <div className="bxx">
                    <img
                      decoding="async"
                      src="/assets/img/assist.webp"
                      loading="lazy"
                      alt="Deployment and after-sales support"
                    />
                    <div className="bxx_content">
                      <div className="bxx_title">Assist</div>
                      <div className="bxx_description">
                        Global deployment, onboarding, and lifecycle support with enterprise SLAs and compliance guidance.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Range of Products Slider */}
      <ProductRangeSlider />

      {/* 4. Services Area / Product Showcase Boxes */}
      <section className="services-area">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            {/* Box 1: Vehicle Telematics */}
            <div className="col-md-6">
              <br />
              <Link href="/trackers/vehicle-telematics" className="pr">
                <div className="product_box">
                  <h3>Vehicle Telematics</h3>
                  <p>
                    Stay ahead of the curve and maintain a competitive edge with our advanced tracking system. From enhancing
                    productivity to reducing costs, our solution enables informed decision-making that offers unparalleled precision.
                  </p>
                  <span>Show devices</span>
                  <p className="image">
                    <img src="/assets/product_category/advanced.webp" loading="lazy" alt="Vehicle Telematics" />
                  </p>
                </div>
              </Link>
            </div>

            {/* Box 2: Indoor Telematics */}
            <div className="col-md-6">
              <br />
              <Link href="/trackers/indoor-telematics" className="pr">
                <div className="product_box">
                  <h3>Indoor Telematics</h3>
                  <p>
                    Indoor telematics solutions provide real-time asset tracking, improved space utilization, and enhanced
                    operational efficiency.
                  </p>
                  <span>Show devices</span>
                  <p className="image">
                    <img src="/assets/product_category/indoorr.webp" loading="lazy" alt="Indoor Telematics" />
                  </p>
                </div>
              </Link>
            </div>

            {/* Box 3: Video Telematics */}
            <div className="col-md-6">
              <br />
              <Link href="/trackers/video-telematics" className="pr">
                <div className="product_box">
                  <h3>Video Telematics</h3>
                  <p>
                    Atlanta&apos;s Video Telematic offers state-of-the-art safety features for vehicles, including advanced driver assistance
                    systems and driver monitoring technology. Elevate your driving experience with enhanced safety and peace of mind.
                  </p>
                  <span>Show devices</span>
                  <p className="image">
                    <img src="/assets/product_category/video-telematics.webp" loading="lazy" alt="Video Telematics" />
                  </p>
                </div>
              </Link>
            </div>

            {/* Box 4: Assets & Personal Telematics */}
            <div className="col-md-6">
              <br />
              <Link href="/trackers/assets-&-personal-telematics" className="pr">
                <div className="product_box">
                  <h3>Assets &amp; Personal Telematics</h3>
                  <p>
                    Secure valuable assets and individuals with our state-of-the-art Asset and Personal Tracker. Our solution
                    guarantees efficiency and tranquility by facilitating geo-fencing, SOS alerts, and tamper detection.
                  </p>
                  <span>Show devices</span>
                  <p className="image">
                    <img src="/assets/product_category/asset-telematics.webp" loading="lazy" alt="Assets & Personal Telematics" />
                  </p>
                </div>
              </Link>
            </div>

            {/* Box 5: OBD Telematics */}
            <div className="col-md-6">
              <br />
              <Link href="/trackers/obd-telematics" className="pr">
                <div className="product_box">
                  <h3>OBD Telematics</h3>
                  <p>
                    Atlanta&apos;s OBD trackers provide seamless vehicle monitoring and diagnostics. With real-time data insights and
                    easy installation, optimize fleet performance and ensure operational efficiency with confidence and ease.
                  </p>
                  <span>Show devices</span>
                  <p className="image">
                    <img src="/assets/product_category/obd.webp" loading="lazy" alt="OBD Telematics" />
                  </p>
                </div>
              </Link>
            </div>

            {/* Box 6: IOT Sensors */}
            <div className="col-md-6">
              <br />
              <Link href="/trackers/iot-sensors" className="pr">
                <div className="product_box">
                  <h3>IOT Sensors</h3>
                  <p>
                    Our IOT sensors offer comprehensive monitoring solutions for various industries. With real-time data collection
                    and analysis, optimize efficiency, safety, and decision-making processes across your operations seamlessly.
                  </p>
                  <span>Show devices</span>
                  <p className="image">
                    <img src="/assets/product_category/iot-sensors.webp" loading="lazy" alt="IOT Sensors" />
                  </p>
                </div>
              </Link>
            </div>

            {/* Box 7: Taxi GPS Meter */}
            <div className="col-md-6">
              <br />
              <Link href="/trackers/taxi-gps-meter" className="pr">
                <div className="product_box">
                  <h3>Taxi GPS Meter</h3>
                  <p>
                    GPS taxi meters provide accurate fare calculations, real-time tracking, and enhanced passenger safety features.
                  </p>
                  <span>Show devices</span>
                  <p className="image">
                    <img src="/assets/product_category/taxi-meter.webp" loading="lazy" alt="Taxi GPS Meter" />
                  </p>
                </div>
              </Link>
            </div>

            {/* Box 8: Universal Find Devices */}
            <div className="col-md-6">
              <br />
              <Link href="/trackers/universal-find-devices" className="pr">
                <div className="product_box">
                  <h3>Universal Find Devices</h3>
                  <p>
                    Universal Find Trackers are smart Bluetooth tracking devices that help you locate keys, wallets, bags, luggage, and
                    other valuables.
                  </p>
                  <span>Show devices</span>
                  <p className="image">
                    <img src="/assets/product_category/5b747f0f4ab017ea24599204282d2635.webp" loading="lazy" alt="Universal Find Devices" />
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Our Strength Section */}
      <section className="work-process-area pt-50 pb-70">
        <div className="container">
          <div className="heading-title">
            <h2>Our Strength</h2>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-4 pt-50">
              <div className="half-box">
                <h2><i className="fas fa-dollar-sign me-2"></i> Enterprise-grade</h2>
                <div className="content-main">
                  <p>Reliable hardware and cloud platform engineered for uptime, security and scale.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 pt-50">
              <div className="half-box">
                <h2><i className="fas fa-user-tie me-2"></i> Compliance</h2>
                <div className="content-main">
                  <p>AIS 140 compliant GPS devices, audit-ready reporting and configurable data retention.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 pt-50">
              <div className="half-box">
                <h2><i className="fas fa-award me-2"></i> Global Support</h2>
                <div className="content-main">
                  <p>Consultative deployment and lifecycle support with clear SLAs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Global Presence Map & Animated Running Milestone Counters */}
      <CounterSection showMap={true} />

      {/* 7. Frequently Asked Questions Accordion */}
      <HomeFaq />

      {/* 8. Product Catalogue Download CTA Banner */}
      <div className="product_catalog pt-20 pb-20">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-5">
              <img src="/assets/img/pro-catalog.webp" alt="Download product catalogue" loading="lazy" />
            </div>
            <div className="col-md-7 catalog_row">
              <h2 className="catalog_heading">Ready to explore our products?</h2>
              <p>Explore GPS Tracking Devices, Fleet Management Software, Dash Cam video, Video Surveillance and AIS 140 compliant hardware.</p>
              <Link href="/contact" className="catalog_margin default-btn btn-bg-two border-radius-50">
                Download
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
