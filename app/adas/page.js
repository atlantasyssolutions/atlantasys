import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'ADAS & DMS — Advanced Driver Assistance Systems | Atlanta Systems',
  description: 'Advanced Driver Assistance Systems (ADAS) and Driver Monitoring Systems (DMS) with collision warning, lane-keeping assistance, automatic emergency braking, and blind spot detection.',
  alternates: { canonical: 'https://www.atlantasys.com/adas' },
  openGraph: {
    title: 'ADAS & DMS Video Telematics AI Dash Cams | Atlanta Systems',
    description: 'Dual-lens AI video telematics with ADAS and DMS driver microsleep detection.',
    url: 'https://www.atlantasys.com/adas',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

export default function AdasPage() {
  return (
    <>
      <Header />

      {/* Page Heading */}
      <div className="about-area about-top-area pb-50 pt-50">
        <div className="container">
          <div className="heading-title">
            <h1>Advanced Driver Assistance System</h1>
          </div>
          <div className="row about-top pt-20">
            <div className="col-md-12">
              <p align="center">
                Advanced Driver Assistance Systems (ADAS) enhance vehicle safety by employing sensors and technologies, such as cameras and radars, to assist drivers with features like collision warning, lane-keeping, and adaptive cruise control.
              </p>
              <img src="/assets/img/adas/adas-banner.webp" alt="ADAS-DMS Solution" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Crucial Advancements */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-lg-5">
              <img src="/assets/img/adas/adas-advantage.webp" alt="Adas Advancements" className="img-fluid" />
            </div>
            <div className="col-md-7">
              <br />
              <h2 className="self-h2">Crucial Advancements: Understanding the Importance of ADAS in Modern Vehicle Safety</h2>
              <p className="solution_p">
                Explore the pivotal role of Advanced Driver Assistance Systems (ADAS) in elevating modern vehicle safety. This solution delves into the intricate technologies behind ADAS, such as collision detection and lane-keeping assistance, showcasing their crucial contributions to preventing accidents and enhancing overall driving experience. Gain insights into how ADAS represents a paradigm shift in automotive safety, embodying innovation that significantly reduces the risk of collisions and empowers drivers with cutting-edge features for a safer and more secure journey on the road.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ADAS & DMS Features */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#fff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <h2 className="self-h2" style={{ paddingBottom: 0 }}>ADAS &amp; DMS Solutions</h2>
              <p>A Solution by Atlanta Systems</p>
              <br /><br />
              <div className="row">
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/adas/collision-warning.svg" alt="Collision Warning" />
                    <h4 className="feature-table">Collision Warning</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/adas/lane-change.svg" alt="Lane-Keeping Assistance" />
                    <h4 className="feature-table">Lane-Keeping Assistance</h4>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/adas/adaptive-control.svg" alt="Adaptive Cruise Control" />
                    <h4 className="feature-table">Adaptive Cruise Control</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/adas/aeb.svg" alt="Automatic Emergency Braking" />
                    <h4 className="feature-table">Automatic Emergency Braking (AEB)</h4>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/adas/blind-spot.svg" alt="Blind Spot Detection" />
                    <h4 className="feature-table">Blind Spot Detection</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/adas/dms.svg" alt="Driver Monitoring System" />
                    <h4 className="feature-table">Driver Monitoring System (DMS)</h4>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/adas/rcognisation.svg" alt="Traffic Sign Recognition" />
                    <h4 className="feature-table">Traffic Sign Recognition</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/adas/parking.svg" alt="Parking Assistance" />
                    <h4 className="feature-table">Parking Assistance</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <p>
                Atlanta Systems&apos; Advanced Driver Assistance Systems (ADAS) Solution represents a cutting-edge technology suite designed to elevate vehicle safety and redefine the driving experience. This comprehensive solution integrates an array of sophisticated features to mitigate risks and enhance overall road safety.<br /><br />
                Our ADAS Solution includes Collision Warning systems, providing real-time alerts to drivers about potential hazards, and Lane-Keeping Assistance to prevent unintentional lane departures. The Adaptive Cruise Control feature ensures a safe following distance, while Automatic Emergency Braking intervenes in critical situations, mitigating collision impact. Blind Spot Detection enhances awareness during lane changes, and Traffic Sign Recognition keeps drivers informed about road regulations.<br /><br />
                To prioritize driver safety, our solution incorporates a Driver Monitoring System (DMS) that tracks driver behavior, issuing alerts for fatigue or distraction. Additionally, our ADAS Solution integrates Parking Assistance, simplifying parking maneuvers.<br /><br />
                Atlanta Systems is committed to revolutionizing the driving experience through our ADAS Solution, delivering state-of-the-art technologies that make roads safer, reduce accidents, and empower drivers with intelligent assistance for a more secure and enjoyable journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why ADAS */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <br />
              <h2 className="self-h2">Why ADAS Solution?</h2>
              <p>
                1. Enhanced Safety: ADAS features, such as Collision Warning, Automatic Emergency Braking, and Lane-Keeping Assistance, significantly reduce the risk of accidents by providing timely alerts and interventions.<br />
                2. Risk Mitigation: The integration of Adaptive Cruise Control and Blind Spot Detection helps drivers navigate traffic more safely, minimizing the potential for collisions and improving overall road safety.<br />
                3. Driver Assistance: ADAS solutions offer valuable assistance to drivers, making driving more comfortable and less stressful. Features like Traffic Sign Recognition and Parking Assistance simplify complex driving situations.<br />
                4. Reduced Severity of Collisions: Automatic Emergency Braking intervenes in critical situations, mitigating the impact of collisions and potentially preventing accidents altogether, thereby reducing injury severity.<br />
                5. Technological Innovation: ADAS represents a significant technological leap in automotive safety, showcasing the industry&apos;s commitment to innovation and the development of intelligent systems that prioritize safety and improve the driving experience.<br />
                6. Regulatory Compliance: ADAS features, such as Traffic Sign Recognition, aid drivers in adhering to traffic regulations, promoting compliance with speed limits and other road rules.
              </p>
            </div>
            <div className="col-md-5 col-lg-5">
              <img className="img-fluid" src="/assets/img/adas/why-adas-solution.webp" alt="Why Adas Solution" />
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <h2 className="self-h2" align="center">How ADAS Solution Works</h2>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <img src="/assets/img/adas/working.webp" alt="How ADAS Works" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
