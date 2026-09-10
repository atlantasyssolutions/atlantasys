import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'PARK EZY - Parking Management Solution | Atlanta Systems',
  description: 'Smart parking management systems with fast ticketing, automated barrier control, slot allocation, LoRaWAN sensors, and cloud monitoring. PARK EZY by Atlanta Systems.',
  alternates: { canonical: 'https://www.atlantasys.com/parking-solution' },
  openGraph: {
    title: 'PARK EZY Parking Management Solution | Atlanta Systems',
    description: 'Smart parking management systems with automated ticketing and revenue control.',
    url: 'https://www.atlantasys.com/parking-solution',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

export default function ParkingSolutionPage() {
  return (
    <>
      <Header />

      {/* Page Heading */}
      <div className="about-area about-top-area pb-50 pt-50">
        <div className="container">
          <div className="heading-title">
            <h1>Parking Management Solution</h1>
          </div>
          <div className="row about-top pt-20">
            <div className="col-md-12">
              <p align="center">
                Streamline parking with our comprehensive Parking Management Solution. Utilizing advanced technology, it offers efficient space allocation, real-time monitoring, and seamless payment options, ensuring a hassle-free parking experience for all.
              </p>
              <img src="/assets/img/parking/banner.webp" alt="Parking Management Solution" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Opportunity Section */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-lg-5">
              <img src="/assets/img/parking/about.webp" alt="Parking Management Solution" className="img-fluid" />
            </div>
            <div className="col-md-7">
              <br />
              <h2 className="self-h2">A Parking challenge is morphed into an opportunity to provide an additional level of Service, Protection and Intent</h2>
              <p className="solution_p">
                Turning a parking challenge into an opportunity, our solution redefines service, protection, and intent. Experience a seamless, customer-centric parking experience with intuitive navigation and personalized assistance. Our robust security measures prioritize the safety of your vehicle, while our commitment to simplification ensures effortless transactions. Beyond parking, we foster connectivity and environmental responsibility, contributing to a greener urban future. Embrace a transformative journey where challenges become gateways to elevated service, heightened protection, and a clear intent to enhance urban living.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PARK EZY Features */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#fff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <h2 className="self-h2" style={{ paddingBottom: 0 }}>PARK EZY</h2>
              <p>A Parking Management Solution by Atlanta Systems</p>
              <br /><br />
              <div className="row">
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/parking/fast-ticket.svg" alt="Automation & Fast Ticketing" />
                    <h4 className="feature-table">Automation &amp; Fast Ticketing</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/parking/userfriendly.svg" alt="User Friendly & Easy to Operate" />
                    <h4 className="feature-table">User Friendly &amp; Easy to Operate</h4>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/parking/dashboard.svg" alt="Admin Controlled" />
                    <h4 className="feature-table">Admin Controlled</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/parking/slots-vehicle.svg" alt="Slots Per Vehicle Type" />
                    <h4 className="feature-table">Slots Per Vehicle Type</h4>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/parking/cost.svg" alt="Cost-Effective & Quick Recurring Cost" />
                    <h4 className="feature-table">Cost-Effective &amp; Quick Recurring Cost</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/parking/wire.svg" alt="Wire-Free Installation" />
                    <h4 className="feature-table">Wire-Free Installation</h4>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/parking/revenue.svg" alt="Revenue Control & Fare Management" />
                    <h4 className="feature-table">Revenue Control &amp; Fare Management</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/parking/slots-led.svg" alt="Slots on LED Display" />
                    <h4 className="feature-table">Slots on LED Display</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <p>
                Park Ezy revolutionizes parking management, offering a seamless and user-friendly solution. Effortlessly navigate parking lots, optimize space allocation, and eliminate the stress of finding a spot with our intuitive platform.<br /><br />
                Park Ezy a solution incepted by ATLANTA Systems to meet multidimensional need of Parking Management Solution. Park Ezy solution is a combination of Robust, Efficient &amp; Cost Effective Parking Sensor along with user friendly and future proof software application and industrial built Parking ticket dispensing KIOSK.<br /><br />
                This altogether create Park Ezy as a highly evolved, dynamic, intelligent parking management systems that integrates smart features such as complete audit control, real-time monitoring, mobile cashiering etc which contribute toward maximizing customer satisfaction.<br /><br />
                Rest easy knowing that Park Ezy prioritizes the security of your data and vehicles. Our robust security measures safeguard against unauthorized access, ensuring a secure and protected environment for both users and their vehicles.<br /><br />
                Choose Park Ezy by Atlanta Systems – where innovation meets convenience, security, and sustainability. Experience parking management reimagined. Embrace a future where parking is no longer a challenge but a seamless, enjoyable experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Components */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="self-h2">Components of Park Ezy</h2>
            </div>
          </div>
          <br />
          <div className="row align-items-center justify-content-center">
            <div className="col-md-2">
              <div className="profile_bx" align="center">
                <img src="/assets/img/parking/parking-sensor.webp" alt="Parking Sensor GP-1000" /><br />
                <h4><Link href="/product/gp-1000" className="mobile-anchor">Parking Sensor</Link></h4>
              </div>
            </div>
            <div className="col-md-2">
              <div className="profile_bx" align="center">
                <img src="/assets/img/parking/kiosk.webp" alt="Ticket Vending KIOSK" /><br />
                <h4>Ticket Vending KIOSK</h4>
              </div>
            </div>
            <div className="col-md-2">
              <div className="profile_bx" align="center">
                <img src="/assets/img/parking/software-panel.webp" alt="Software Panel" /><br />
                <h4>Software Panel</h4>
              </div>
            </div>
            <div className="col-md-2">
              <div className="profile_bx" align="center">
                <img src="/assets/img/parking/handheld.webp" alt="Hand Held Terminal" /><br />
                <h4>Hand Held Terminal</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Park Ezy */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <br />
              <h2 className="self-h2">Why Park Ezy?</h2>
              <p className="solution_p">
                1. An efficient method to control mismanagement of Parking.<br />
                2. Facilitates in increasing operational efficiency and profitability for the parking management company.<br />
                3. Saves a lot of time for the general public looking for available parking spots, hence improving customer satisfaction.<br />
                4. Unlock the power of data. Our solution transforms parking data into actionable insights, empowering decision-makers to refine strategies, enhance operations, and stay ahead of evolving urban dynamics.<br />
                5. We don&apos;t just solve the parking challenge; we build connections. Our platform fosters connectivity, linking users, vehicles, and the urban landscape. Embrace a networked future where parking becomes a seamless part of the larger urban experience.
              </p>
            </div>
            <div className="col-md-5 col-lg-5">
              <img className="img-fluid" src="/assets/img/parking/parking-about.webp" alt="Park Ezy" />
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-lg-5">
              <img src="/assets/img/parking/parking-management.webp" alt="Parking Management Solution" style={{ width: '100%' }} />
            </div>
            <div className="col-md-7">
              <p className="solution_p"><strong>Point 1:</strong> Parking ticket KIOSK generates parking ticket with in time &amp; vehicle No. printed on it. Parking ticket KIOSK also capture picture of driver.</p>
              <p className="solution_p"><strong>Point 2:</strong> Driver parks the vehicle in available area. Parking sensors detects the presence and absence of vehicle and display the availability on server.</p>
              <p className="solution_p"><strong>Point 3:</strong> On exit driver shows parking ticket and pays the amount as per time duration of parking.</p>
              <p className="solution_p"><strong>Point 4:</strong> After payment driver leaves the parking bay</p>
            </div>
          </div>
        </div>
      </div>

      {/* LoRaWAN Diagram */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <br />
              <h2 className="self-h2">Diagram Representing Working of Parking Sensors, LoRa, Gateway &amp; Server</h2>
              <p className="solution_p">
                LoRaWAN is a Low Power Wide Area Network (LPWAN) created for wireless, battery-operated devices it helps in long range strong connection of multiple devices to strengthen and secure the communication it uses bi-directional, localization services and AES, EUI64, EUI128 encryption.
              </p>
            </div>
            <div className="col-md-5 col-lg-5">
              <img src="/assets/img/parking/graphical.webp" alt="Parking Management Solution" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
