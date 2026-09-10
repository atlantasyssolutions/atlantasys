import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Asset Management Solutions | Atlanta Systems',
  description:
    'Effective asset management involves tracking, monitoring, and optimizing an organization\'s assets throughout their lifecycle. It ensures efficiency, reduces costs, and maximizes the utilization of valuable resources.',
  alternates: {
    canonical: 'https://www.atlantasys.com/asset-management',
  },
  openGraph: {
    title: 'Asset Management Solutions | Atlanta Systems',
    description:
      'Effective asset management involves tracking, monitoring, and optimizing an organization\'s assets throughout their lifecycle.',
    url: 'https://www.atlantasys.com/asset-management',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

export default function AssetManagementPage() {
  return (
    <>
      <Header />

      {/* Top Banner Area */}
      <div className="about-area about-top-area pb-50 pt-50" style={{ paddingTop: '100px' }}>
        <div className="container">
          <div className="heading-title" style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2>Asset Management</h2>
          </div>
          <div className="row about-top pt-20">
            <div className="col-md-12 text-center">
              <p style={{ maxWidth: '850px', margin: '0 auto 25px', lineHeight: '1.7', color: '#444' }}>
                Effective asset management involves tracking, monitoring, and optimizing an organization&apos;s assets throughout their lifecycle. It ensures efficiency, reduces costs, and maximizes the utilization of valuable resources.
              </p>
              <img
                src="/assets/img/asset/banner.jpg"
                alt="Asset Management"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Transformative Asset Management Solutions */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 col-lg-5 mb-4 mb-md-0">
              <img
                src="/assets/img/asset/asset-1.jpg"
                alt="Transformative Asset Management Solutions for Optimal Resource Utilization"
                className="img-fluid"
                style={{ borderRadius: '8px' }}
                loading="lazy"
              />
            </div>
            <div className="col-md-7">
              <h2 className="self-h2" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '1.85rem', color: '#1d2250', fontWeight: '700', marginBottom: '16px' }}>
                Transformative Asset Management Solutions for Optimal Resource Utilization
              </h2>
              <p className="solution_p" style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', textAlign: 'justify' }}>
                Unlock unparalleled efficiency with our transformative asset management solutions. Seamlessly track, monitor, and optimize resources throughout their lifecycle, ensuring optimal utilization. Our comprehensive approach enhances operational productivity, reduces costs, and streamlines workflows. From asset tracking to preventive maintenance, experience a revolutionary shift in how you manage resources. Maximize the value of your assets with precision and ease, empowering your organization to thrive in a dynamic and competitive landscape.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: 8 Feature Boxes & Overview */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#fff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <h2 className="self-h2" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '2rem', color: '#1d2250', fontWeight: '700', paddingBottom: 0, marginBottom: '6px' }}>
                Asset Management
              </h2>
              <p style={{ color: '#0169A9', fontWeight: '600', marginBottom: '24px' }}>A Solution by Atlanta Systems</p>

              <div className="row">
                <div className="col-md-3 col-6 mb-4">
                  <div className="solution_box text-center">
                    <img src="/assets/img/adas/collision-warning.svg" alt="Comprehensive Tracking" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Comprehensive Tracking</h4>
                  </div>
                  <div className="solution_box text-center" style={{ marginTop: '30px' }}>
                    <img src="/assets/img/adas/lane-change.svg" alt="Predictive Maintenance" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Predictive Maintenance</h4>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-4">
                  <div className="solution_box text-center">
                    <img src="/assets/img/adas/adaptive-control.svg" alt="Real-time Analytics" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Real-time Analytics</h4>
                  </div>
                  <div className="solution_box text-center" style={{ marginTop: '30px' }}>
                    <img src="/assets/img/adas/aeb.svg" alt="Scalability" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Scalability</h4>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-4">
                  <div className="solution_box text-center">
                    <img src="/assets/img/adas/blind-spot.svg" alt="Security Measures" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Security Measures</h4>
                  </div>
                  <div className="solution_box text-center" style={{ marginTop: '30px' }}>
                    <img src="/assets/img/adas/dms.svg" alt="Customization" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Customization</h4>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-4">
                  <div className="solution_box text-center">
                    <img src="/assets/img/adas/rcognisation.svg" alt="Automated Workflows" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Automated Workflows</h4>
                  </div>
                  <div className="solution_box text-center" style={{ marginTop: '30px' }}>
                    <img src="/assets/img/adas/parking.svg" alt="Mobile Accessibility" style={{ width: '45px', height: '45px', marginBottom: '10px' }} />
                    <h4 className="feature-table" style={{ fontSize: '13px', fontWeight: '700', color: '#1d2250' }}>Mobile Accessibility</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', textAlign: 'justify' }}>
                Atlanta Systems pioneers a comprehensive Asset Management Solution, revolutionizing how organizations optimize their resources. Our cutting-edge system seamlessly integrates with your infrastructure, providing end-to-end visibility into asset lifecycles. From acquisition to disposal, track assets with precision, facilitating efficient planning and utilization.
                <br /><br />
                Our solution goes beyond mere tracking, incorporating predictive maintenance capabilities to ensure assets operate at peak performance, reducing downtime and extending their lifespan. Real-time analytics empower data-driven decision-making, enabling organizations to strategically allocate resources and minimize operational costs.
                <br /><br />
                Atlanta Systems prioritizes security, implementing robust measures to safeguard asset data. Our solution is scalable, adapting to diverse industries, from manufacturing to healthcare, offering customizable features to meet unique organizational needs.
                <br /><br />
                Experience streamlined workflows with automated processes for inventory management, depreciation tracking, and compliance reporting. Our user-friendly interface ensures ease of use, promoting seamless adoption across teams.
                <br /><br />
                Atlanta Systems&apos; Asset Management Solution isn&apos;t just a tool; it&apos;s a catalyst for organizational efficiency, helping you stay ahead in a dynamic business environment. Maximize the value of your assets, minimize risks, and elevate your operational capabilities with our innovative and tailored asset management solution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: How Asset Management Works */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h2 className="self-h2" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '2.2rem', color: '#1d2250', fontWeight: '700', marginBottom: '30px' }}>
                How Asset Management Works
              </h2>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <img
                src="/assets/img/asset/working.png"
                alt="Asset Management Works"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Key Benefits of Using IoT for Asset Management */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 mb-4 mb-md-0">
              <h2 className="self-h2" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '2rem', color: '#1d2250', fontWeight: '700', marginBottom: '16px' }}>
                Key Benefits of Using IoT for Asset Management
              </h2>
              <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#555' }}>
                <p><strong>1. Real-Time Asset Tracking:</strong> Being able to monitor assets at any time of day or night and remotely through an asset tracking software tool.</p>
                <br />
                <p><strong>2. Rich Data Insights:</strong> Utilising IoT means you’ll know much more than where your assets are located. Through useful data insights, you can make better strategic decisions and improve day-to-day operations.</p>
                <br />
                <p><strong>3. Fewer Supply Chain Disruptions:</strong> You can see where assets are at every stage of the supply chain and use IoT data to ensure that goods arrive at their destination in their rightful condition.</p>
                <br />
                <p><strong>4. Better Time-Management and Fewer Errors:</strong> IoT brings automation to asset tracking workflows, which saves many manual hours and reduces the risk of human error.</p>
                <br />
                <p><strong>5. Reduction of Theft and Losses:</strong> Through IoT devices and asset tracking software, you can ensure your assets aren’t moved without authorisation. In the event of theft, IoT makes recovery much easier.</p>
              </div>
            </div>
            <div className="col-md-5 col-lg-5">
              <img
                className="img-fluid"
                src="/assets/img/asset/asset-2.jpg"
                alt="content-image"
                style={{ borderRadius: '8px' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Asset Management Uses */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-12">
              <h2 className="self-h2" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '2.2rem', color: '#1d2250', fontWeight: '700', marginBottom: '15px' }}>
                Asset Management Uses
              </h2>
              <p style={{ maxWidth: '850px', margin: '0 auto 30px', fontSize: '15px', color: '#555' }}>
                The Internet of Things devices can be used alongside asset tracking software for several different business types and industries. Such as:
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="atl_box" style={{ padding: '30px 20px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <img
                  src="/assets/img/healthcare/solutions_hospital-asset-tracking.svg"
                  alt="Hospital asset tracking with IoT and RFID"
                  style={{ width: '60px', height: '60px', marginBottom: '16px' }}
                />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1d2250', marginBottom: '12px' }}>Tracking Healthcare Assets</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#64748B' }}>
                  Efficiently monitor healthcare assets with precision through real-time tracking, ensuring optimal utilization, preventive maintenance, and compliance adherence, ultimately enhancing patient care and operational efficiency.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="atl_box" style={{ padding: '30px 20px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <img
                  src="/assets/img/healthcare/solutions_iot-medical-devices.svg"
                  alt="IoT for medical devices"
                  style={{ width: '60px', height: '60px', marginBottom: '16px' }}
                />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1d2250', marginBottom: '12px' }}>Transporting Chilled Foods</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#64748B' }}>
                  Safely transport chilled foods with our specialized logistics, maintaining precise temperature control. Our solutions ensure freshness, compliance, and reliability throughout the supply chain for perishable goods.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="atl_box" style={{ padding: '30px 20px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', height: '100%', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                <img
                  src="/assets/img/healthcare/solutions_patient-staff-tracking.svg"
                  alt="IoT-based patient and staff tracking"
                  style={{ width: '60px', height: '60px', marginBottom: '16px' }}
                />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1d2250', marginBottom: '12px' }}>Fire Health and Safety</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#64748B' }}>
                  Business owners benefit from IoT-connected smoke detectors with asset tracking, ensuring real-time monitoring of device location and condition for enhanced safety and streamlined maintenance of facilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
