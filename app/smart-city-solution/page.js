import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Smart City Solution | Atlanta Systems IoT & Urban Telematics',
  description:
    'Revolutionize urban living with our Smart City Solution, integrating technology for efficient services, sustainable practices, and enhanced citizen experiences.',
  alternates: {
    canonical: 'https://www.atlantasys.com/smart-city-solution',
  },
  openGraph: {
    title: 'Smart City Solution | Atlanta Systems',
    description:
      'Revolutionize urban living with our Smart City Solution, integrating technology for efficient services, sustainable practices, and enhanced citizen experiences.',
    url: 'https://www.atlantasys.com/smart-city-solution',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

export default function SmartCitySolutionPage() {
  return (
    <>
      <Header />

      {/* Top Banner Area */}
      <div className="about-area about-top-area pb-50 pt-50" style={{ paddingTop: '100px' }}>
        <div className="container">
          <div className="heading-title" style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2>Smart City Solution</h2>
          </div>
          <div className="row about-top pt-20">
            <div className="col-md-12 text-center">
              <p style={{ maxWidth: '850px', margin: '0 auto 25px', lineHeight: '1.7', color: '#444' }}>
                Revolutionize urban living with our Smart City Solution, integrating technology for efficient services, sustainable practices, and enhanced citizen experiences.
              </p>
              <img
                src="/assets/img/smartcity/banner.webp"
                alt="Smart City Solution"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Potential of Smart City */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 col-lg-5 mb-4 mb-md-0">
              <img
                src="/assets/img/smartcity/smart-city.webp"
                alt="Smart City Solution"
                className="img-fluid"
                style={{ borderRadius: '8px' }}
                loading="lazy"
              />
            </div>
            <div className="col-md-7">
              <h2 className="self-h2" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '1.85rem', color: '#1d2250', fontWeight: '700', marginBottom: '16px' }}>
                Smart-city technologies have substantial unrealized potential to improve the urban quality of life
              </h2>
              <p className="solution_p" style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', textAlign: 'justify' }}>
                Smart-city technologies hold vast, untapped potential to elevate the quality of urban life significantly. From optimizing traffic flow to enhancing public services, these innovations can foster sustainability, connectivity, and efficiency.
                <br /><br />
                By harnessing data and technology, cities can address challenges, making urban environments more responsive and adaptive. Unlocking this potential promises a future where cities become more livable, resilient, and responsive to the needs of their inhabitants, paving the way for a truly smart and connected urban landscape.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: 8 Smart City Feature Boxes & Overview */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#fff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <h2 className="self-h2" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '2rem', color: '#1d2250', fontWeight: '700', paddingBottom: 0, marginBottom: '6px' }}>
                Smart City Solution
              </h2>
              <p style={{ color: '#0169A9', fontWeight: '600', marginBottom: '24px' }}>A Smart City Solution by Atlanta Systems</p>

              <div className="row">
                <div className="col-md-3 col-6 mb-4">
                  <div className="solution_box text-center">
                    <img src="/assets/img/smartcity/smart-parking.svg" alt="Smart Car Parking" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Smart Car Parking</h4>
                  </div>
                  <div className="solution_box text-center" style={{ marginTop: '30px' }}>
                    <img src="/assets/img/smartcity/smart-streetlight.svg" alt="Smart Street Light" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Smart Street Light</h4>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-4">
                  <div className="solution_box text-center">
                    <img src="/assets/img/smartcity/smart-meter.svg" alt="Smart Meter" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Smart Meter</h4>
                  </div>
                  <div className="solution_box text-center" style={{ marginTop: '30px' }}>
                    <img src="/assets/img/smartcity/water-resource-management.svg" alt="Water Resource Management" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Water Resource Management</h4>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-4">
                  <div className="solution_box text-center">
                    <img src="/assets/img/smartcity/smart-energy.svg" alt="Smart Energy Management" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Smart Energy Management</h4>
                  </div>
                  <div className="solution_box text-center" style={{ marginTop: '30px' }}>
                    <img src="/assets/img/smartcity/survelliance-and-control.svg" alt="Surveillance and Control" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Surveillance and Control</h4>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-4">
                  <div className="solution_box text-center">
                    <img src="/assets/img/smartcity/home-automation.svg" alt="Home Automation" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Home Automation</h4>
                  </div>
                  <div className="solution_box text-center" style={{ marginTop: '30px' }}>
                    <img src="/assets/img/smartcity/temperature-management.svg" alt="Temparature Management" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Temparature Management</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', textAlign: 'justify' }}>
                Atlanta Systems proudly introduces our groundbreaking Smart City Solution, a transformative approach to urban living that leverages cutting-edge technology for unparalleled efficiency and enhanced quality of life. By seamlessly integrating IoT, data analytics, and connectivity, our solution addresses diverse urban challenges.
                <br /><br />
                Our Smart City Solution optimizes transportation with intelligent traffic management, reducing congestion and minimizing environmental impact. Efficient public services are ensured through real-time monitoring, enabling rapid response and resource allocation. Enhanced security features guarantee citizen safety, while smart infrastructure improves energy utilization, contributing to sustainability goals.
                <br /><br />
                Citizens experience heightened convenience through smart amenities, such as intelligent parking solutions and streamlined utility services. Our comprehensive platform fosters citizen engagement with accessible information, participatory governance, and community connectivity.
                <br /><br />
                Atlanta Systems envisions a future where our Smart City Solution transforms urban landscapes into vibrant, responsive ecosystems. From resource management to citizen well-being, our holistic approach propels cities toward a sustainable and technologically advanced future, improving the overall urban quality of life. Embrace the evolution with Atlanta Systems – shaping cities that are smarter, safer, and more connected than ever before.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Why Smart City Solution? */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 mb-4 mb-md-0">
              <h2 className="self-h2" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '2rem', color: '#1d2250', fontWeight: '700', marginBottom: '16px' }}>
                Why Smart City Solution?
              </h2>
              <p className="solution_p" style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', textAlign: 'justify' }}>
                <strong>1. Efficiency Redefined:</strong> Our Smart City Solution streamlines operations across various sectors, from transportation to public services, optimizing resources and reducing inefficiencies. This results in a more agile, responsive, and resource-efficient urban environment.
                <br /><br />
                <strong>2. Sustainability at Its Core:</strong> With a commitment to environmental stewardship, our solution incorporates smart infrastructure and energy management, contributing to sustainability goals. It paves the way for cities to embrace eco-friendly practices and reduce their ecological footprint.
                <br /><br />
                <strong>3. Enhanced Quality of Life:</strong> By leveraging technology to address urban challenges, our solution enhances the overall quality of life for citizens. From improved traffic flow to seamless access to public services, we aim to make daily life more convenient, enjoyable, and interconnected.
              </p>
            </div>
            <div className="col-md-5 col-lg-5">
              <img
                className="img-fluid"
                src="/assets/img/smartcity/city-about.webp"
                alt="Vehicle Tracker"
                style={{ borderRadius: '8px' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Parking Management Flow */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#fff' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 col-lg-5 mb-4 mb-md-0">
              <img
                src="/assets/img/smartcity/parking-management.webp"
                alt="Parking Management Solution"
                className="img-fluid"
                style={{ borderRadius: '8px' }}
                loading="lazy"
              />
            </div>
            <div className="col-md-7">
              <p className="solution_p" style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', marginBottom: '12px' }}>
                <strong>Point 1:</strong> Parking ticket KIOSK generates parking ticket with in time &amp; vehicle No. printed on it. Parking ticket KIOSK also capture picture of driver.
              </p>
              <p className="solution_p" style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', marginBottom: '12px' }}>
                <strong>Point 2:</strong> Driver parks the vehicle in available area. Parking sensors detects the presence and absence of vehicle and display the availability on server.
              </p>
              <p className="solution_p" style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', marginBottom: '12px' }}>
                <strong>Point 3:</strong> On exit driver shows parking ticket and pays the amount as per time duration of parking.
              </p>
              <p className="solution_p" style={{ fontSize: '15px', lineHeight: '1.8', color: '#555' }}>
                <strong>Point 4:</strong> After payment driver leaves the parking bay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Benefits of Smart Cities */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="self-h2" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '2rem', color: '#1d2250', fontWeight: '700', marginBottom: '20px' }}>
                Benefits of Smart Cities
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#555' }}>
                <strong>1. Environmental impact:</strong> The primary motivation for the creation of smart and sustainable cities is lowering the CO2 footprint. Among the biggest benefits are better waste management, better traffic conditions, and improved energy storage and efficiency.
              </p>
              <br />
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#555' }}>
                <strong>2. Optimized energy &amp; water management:</strong> Smart cities frequently focus on smart water management and smart grids. Monitoring of potable water use and energy usage guarantees the city&apos;s access to energy and the high quality of its tap water.
              </p>
              <br />
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#555' }}>
                <strong>3. Transportation:</strong> Transportation of goods, services, and people must be clean and effective. Many cities are using smart technologies to reduce traffic congestion and give people real-time updates in the hopes of maximising mobility.
              </p>
              <br />
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#555' }}>
                <strong>4. Security:</strong> All cities place a high focus on safety. Municipalities should be able to better monitor their inhabitants thanks to CCTV cameras with facial recognition as the development of smart cities picks up speed. Modern CCTV cameras also come with fire alarms, motion and smoke detectors, and other features.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
