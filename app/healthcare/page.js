import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'IoT in Healthcare Solutions | Atlanta Systems',
  description: 'Integrating smart IoT devices and telemetry sensors for remote patient monitoring, hospital asset tracking, and healthcare analytics. Atlanta Systems IoT healthcare solutions.',
  alternates: { canonical: 'https://www.atlantasys.com/healthcare' },
  openGraph: {
    title: 'IoT in Healthcare Solutions | Atlanta Systems',
    description: 'Transformative IoT healthcare solutions for hospital asset tracking and patient care.',
    url: 'https://www.atlantasys.com/healthcare',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

export default function HealthcarePage() {
  return (
    <>
      <Header />

      {/* Page Heading */}
      <div className="about-area about-top-area pb-50 pt-50">
        <div className="container">
          <div className="heading-title">
            <h1>IOT in Healthcare</h1>
          </div>
          <div className="row about-top pt-20">
            <div className="col-md-12">
              <p align="center">
                IoT in healthcare involves integrating smart devices and sensors to collect, transmit, and analyze patient data in real-time, enhancing remote monitoring, improving treatment efficiency, and advancing personalized healthcare solutions.
              </p>
              <img src="/assets/img/healthcare/banner.jpg" alt="IOT in Healthcare" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Transformative Impact */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-lg-5">
              <img src="/assets/img/healthcare/healthcare-1.jpg" alt="Revolutionizing Healthcare: The Transformative Impact of IoT Integration" className="img-fluid" />
            </div>
            <div className="col-md-7">
              <br />
              <h2 className="self-h2">Revolutionizing Healthcare: The Transformative Impact of IoT Integration</h2>
              <p className="solution_p">
                Explore the paradigm shift in healthcare through the integration of IoT, revolutionizing patient care. This dynamic synergy of smart devices and sensors empowers real-time data collection, fostering remote monitoring, and elevating treatment efficiency. Witness the transformative impact on personalized healthcare solutions as IoT redefines the industry landscape. From enhancing diagnostics to optimizing treatment plans, discover how this interconnected web of technology is reshaping healthcare, ushering in a new era of efficiency, accessibility, and patient-centric care.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* IOT in Healthcare Features */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#fff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <h2 className="self-h2" style={{ paddingBottom: 0 }}>IOT in Healthcare</h2>
              <p>A Solution by Atlanta Systems</p>
              <br /><br />
              <div className="row">
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/adas/collision-warning.svg" alt="Remote Patient Monitoring" />
                    <h4 className="feature-table">Remote Patient Monitoring</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/adas/lane-change.svg" alt="Data Analytics" />
                    <h4 className="feature-table">Data Analytics</h4>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/adas/adaptive-control.svg" alt="Interoperability" />
                    <h4 className="feature-table">Interoperability</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/adas/aeb.svg" alt="Wearable Technology" />
                    <h4 className="feature-table">Wearable Technology</h4>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/adas/blind-spot.svg" alt="Predictive Analytics" />
                    <h4 className="feature-table">Predictive Analytics</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/adas/dms.svg" alt="Smart Infrastructure" />
                    <h4 className="feature-table">Smart Infrastructure</h4>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/adas/rcognisation.svg" alt="Medication Adherence" />
                    <h4 className="feature-table">Medication Adherence</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/adas/parking.svg" alt="Security & Privacy Measures" />
                    <h4 className="feature-table">Security &amp; Privacy Measures</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <p>
                Atlanta Systems leads the forefront of healthcare innovation with our cutting-edge IoT solutions. Our comprehensive suite seamlessly integrates smart devices and sensors, creating a robust ecosystem that revolutionizes patient care. Through real-time data acquisition, our solution empowers healthcare providers with timely and accurate information for precise diagnostics and personalized treatment plans.<br /><br />
                Remote monitoring becomes effortless, enabling healthcare professionals to track patient vitals and adherence to treatment regimens. Our IoT integration enhances operational efficiency by optimizing resource utilization and streamlining workflows. Patient outcomes are significantly improved as healthcare becomes more proactive, preventive, and personalized.<br /><br />
                Security is paramount, and Atlanta Systems ensures data integrity and confidentiality through robust encryption and compliance with healthcare regulations. Our solution is scalable and adaptable, catering to diverse healthcare settings, from hospitals to remote clinics.<br /><br />
                Experience a transformative shift in healthcare dynamics with Atlanta Systems&apos; IoT solution, as we redefine the future of healthcare delivery, making it more connected, efficient, and patient-centric.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How IoT Works */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <h2 className="self-h2" align="center">How IOT in Healthcare Works</h2>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <img src="/assets/img/healthcare/working.png" alt="IOT in Healthcare Works" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <br />
              <h2 className="self-h2">The benefits of IOT in Healthcare</h2>
              <p className="solution_p">
                1. Simultaneous Reporting and Monitoring<br />
                2. End-to-End Connectivity and Affordability<br />
                3. Data Analysis and Data Assortment<br />
                4. Assisting the Elderly<br />
                5. Real-Time Tracking and Alerts<br />
                6. Check-Up on the Go<br />
                7. Faster Disease Diagnosis<br />
                8. Proactive Treatment<br />
                9. Drugs and Equipment Management
              </p>
            </div>
            <div className="col-md-5 col-lg-5">
              <img className="img-fluid" src="/assets/img/healthcare/healthcare-2.jpg" alt="IoT Healthcare Benefits" />
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <h2 className="self-h2" align="center">IOT in Healthcare Solutions for Technology-Enabled Care</h2>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <p align="center">We deliver solutions to make the healthcare environment more secure and convenient for patients and healthcare professionals.</p>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-3">
              <div className="atl_box">
                <center><img src="/assets/img/healthcare/solutions_hospital-asset-tracking.svg" alt="Hospital asset tracking with IoT and RFID" /></center>
                <h3 align="center">Hospital Asset Tracking with IoT and RFID</h3>
                <ul>
                  <li>Continuous monitoring of asset location and availability to prevent loss and theft.</li>
                  <li>Asset utilization management for optimized asset investments.</li>
                  <li>Automated asset management.</li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="atl_box">
                <center><img src="/assets/img/healthcare/solutions_iot-medical-devices.svg" alt="IoT for medical devices" /></center>
                <h3 align="center">IoT for Medical Devices</h3>
                <ul>
                  <li>Monitoring and assessment of patients&apos; vitals (e.g., pulse, blood pressure, glucose) in real time.</li>
                  <li>Continuous analysis of patients&apos; health data to improve disease treatment and management and enable better care decisions.</li>
                  <li>Alerting a nurse and a doctor in case of abnormal health parameters.</li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="atl_box">
                <center><img src="/assets/img/healthcare/solutions_patient-staff-tracking.svg" alt="IoT-based patient and staff tracking" /></center>
                <h3 align="center">IoT-based Patient and Staff Tracking</h3>
                <ul>
                  <li>Patients&apos; and employees&apos; locations tracking in real time.</li>
                  <li>Patient flow assessment and prediction.</li>
                  <li>Doctors&apos; and nurses&apos; schedules and daily tasks optimization.</li>
                  <li>Patient and staff safety improvement.</li>
                  <li>Bottleneck identification in internal hospital processes.</li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="atl_box">
                <center><img src="/assets/img/healthcare/solutions_additional-components-of-a-smart-hospital.svg" alt="Additional IoT-based components of a smart hospital" /></center>
                <h3 align="center">Additional IoT-based components of a smart hospital</h3>
                <ul>
                  <li>Smart rooms lighting using cloud-connected ward sensors (e.g., a light switch, door, and window contacts).</li>
                  <li>Climate control (e.g., to maintain a lower temperature in the empty wards), and more.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
