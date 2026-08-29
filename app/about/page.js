import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'About Us & Executive Leadership | Atlanta Systems — 32+ Years Telematics R&D',
  description: 'Established in 1994, Atlanta Systems is a trusted leader in IoT-GPS Telematics hardware products and solutions with 32+ years of expertise across 27+ countries.',
  alternates: { canonical: 'https://www.atlantasys.com/about' },
  openGraph: {
    title: 'About Us & Executive Leadership | Atlanta Systems',
    description: 'Established in 1994, Atlanta Systems is a trusted leader in IoT-GPS Telematics hardware products and solutions.',
    url: 'https://www.atlantasys.com/about'
  }
};

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* About Us Section */}
      <div className="about-area about-top-area counter-area pb-50 pt-50" style={{ background: '#fff' }}>
        <div className="container">
          <div className="heading-title">
            <h2>About Us</h2>
          </div>
          <div className="row about-top pt-20">
            <div className="col-md-12">
              <p style={{ textAlign: 'justify' }}>
                Established in 1994, Atlanta Systems Private Limited has been a cornerstone in India&apos;s ICT landscape for nearly three decades. As a trusted leader in IoT-GPS Telematics hardware products &amp; solutions, we have delivered over a million connected devices to thousands of users around the world, reflecting our unwavering commitment to quality and innovation. Our product range is designed to cater to diverse market needs, making us a preferred partner for our clients and channel partners alike.
              </p>
              <br />
              <p style={{ textAlign: 'justify' }}>
                Our core strength is rooted in our in-house expertise spanning hardware product conceptualization, design ideation and development, implementation of embedded systems, software development. In addition, we indigenously manufacture our products with the help of a state-of-the-art SMT manufacturing facility, fully equipped with advanced quality control technologies and certified governance practices, ensuring the highest standards of product excellence and innovation.
              </p>
              <br />
              <p style={{ textAlign: 'justify' }}>
                With a strong commitment to the Make-In-India initiative, we integrate certified governance standards to ensure excellence in every aspect of our operations. Our dedicated team of professionals drives our success, ensuring we remain at the forefront of industry evolution and transformation.
              </p>
              <br />

              {/* Counter Stats */}
              <div className="row justify-content-center" id="counter">
                <div className="col-md-2" style={{ textAlign: 'center' }}>
                  <div className="counter-another-content">
                    <i className="fas fa-microchip"></i>
                    <div className="milestone-counter">
                      <h3 className="highlight"><span></span><b>2</b></h3>
                      <span>State-of-the-art manufacturing plants</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-2" style={{ textAlign: 'center' }}>
                  <div className="counter-another-content">
                    <i className="fas fa-award"></i>
                    <div className="milestone-counter">
                      <h3 className="highlight"><span></span><b>32</b>+</h3>
                      <span>Years of<br />expertise</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-2" style={{ textAlign: 'center' }}>
                  <div className="counter-another-content">
                    <i className="fas fa-globe-americas"></i>
                    <div className="milestone-counter">
                      <h3 className="highlight"><span></span><b>27</b>+</h3>
                      <span>Countries<br />served</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-2" style={{ textAlign: 'center' }}>
                  <div className="counter-another-content">
                    <i className="fas fa-trophy"></i>
                    <div className="milestone-counter">
                      <h3 className="highlight"><span></span><b>20</b>+</h3>
                      <span>Awards<br />won</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-2" style={{ textAlign: 'center' }}>
                  <div className="counter-another-content">
                    <i className="fas fa-globe-asia"></i>
                    <div className="milestone-counter">
                      <h3 className="highlight"><span></span><b>1</b>M+</h3>
                      <span>Devices<br />delivered</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-2" style={{ textAlign: 'center' }}>
                  <div className="counter-another-content">
                    <i className="fas fa-project-diagram"></i>
                    <div className="milestone-counter">
                      <h3 className="highlight"><span></span><b>25</b>+</h3>
                      <span>States &amp; UTs empanelled across India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container" style={{ background: '#fff' }}>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-9">
            <div className="timeline">
              <div className="timeline-row">
                <div className="timeline-time">1994</div>
                <div className="timeline-content">
                  <h4>Atlanta Systems Pvt. Ltd. was founded.</h4>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">1998</div>
                <div className="timeline-content">
                  <h4>Began manufacturing Pay Phones.</h4>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">2002</div>
                <div className="timeline-content">
                  <h4>Established offices across India (PAN India presence).</h4>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">2004</div>
                <div className="timeline-content">
                  <h4>Started manufacturing Voice Loggers and Fixed Wireless Terminals (FWTs).</h4>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">2007</div>
                <div className="timeline-content">
                  <h4>Expanded product range to include POS and Tracking Devices.</h4>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">2009</div>
                <div className="timeline-content">
                  <h4>Successfully executed large-scale government projects.</h4>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">2012</div>
                <div className="timeline-content">
                  <h4>Initiated exports and established offices in Southeast Asian (SEA) countries.</h4>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">2013</div>
                <div className="timeline-content">
                  <h4>Launched School Bus Management Solutions.</h4>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">2015</div>
                <div className="timeline-content">
                  <h4>Established a manufacturing facility in a Special Economic Zone (SEZ).</h4>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">2017</div>
                <div className="timeline-content">
                  <h4>Pioneered solutions for vehicles carrying minerals.</h4>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">2020</div>
                <div className="timeline-content">
                  <h4>Introduced a new range of IoT devices.</h4>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">2023</div>
                <div className="timeline-content">
                  <h4>Expanded product offerings to include EV devices.</h4>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">2024</div>
                <div className="timeline-content">
                  <h4>Launched Advanced Driver Assistance Systems (ADAS) and Driver Monitoring System (DMS) devices.</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Leadership */}
      <div className="services-area pb-50 pt-50" style={{ background: '#fff' }}>
        <div className="container">
          <div className="heading-title">
            <h2>Our Leadership</h2>
          </div>
          <div className="row align-items-center justify-content-center pt-50">
            <div className="col-md-3 col-6">
              <div className="profile_bx">
                <img src="/assets/img/about/sujeet-sir.webp" alt="Sujeet Narula - Founder" />
                <h3>Sujeet Narula</h3>
                <p className="designation">Founder</p>
                <p><a href="https://www.linkedin.com/in/sujeet-narula-2843b012/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a></p>
              </div>
            </div>
            <div className="col-md-1 d-none d-md-block"></div>
            <div className="col-md-3 col-6">
              <div className="profile_bx">
                <img src="/assets/img/about/sandeep-sir.webp" alt="Sandeep Narula - Co-Founder" />
                <h3>Sandeep Narula</h3>
                <p className="designation">Co-Founder</p>
                <p><a href="https://www.linkedin.com/in/sandeepnarula/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container-fluid" style={{ background: '#fbfbfb' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mission-div" style={{ background: '#fbfbfb', boxShadow: '11px 0px 5px -9px #000', zIndex: 10, padding: '30px 0' }}>
              <div className="mission">
                <p className="self-h2" style={{ textAlign: 'center' }}>Our Mission</p><br />
                <p className="new-p" style={{ textAlign: 'center' }}>
                  Our mission is to shape the connected future through cutting-edge IoT products and solutions. We are dedicated to innovate new solutions while upholding the highest ethical standards in business. As we grow, we strive to empower industries with seamless connectivity and transformative technologies and our commitment to integrity and excellence drives every aspect of our journey.
                </p>
                <center><img src="/assets/img/about/mission.webp" alt="GPS For Tracking Mission" /></center>
              </div>
            </div>
            <div className="col-md-6" style={{ background: '#fbfbfb', padding: '30px 0' }}>
              <div className="mission">
                <p className="self-h2" style={{ textAlign: 'center' }}>Our Vision</p>
                <br />
                <p className="new-p" style={{ textAlign: 'center' }}>
                  We are on the path of driving innovation in the products and solutions that enable the global transition to connected platforms, while cultivating a robust network of strategic partners. Our focus is on fostering mutual loyalty and delivering sustainable value. Through collaboration, we aim to shape the future of seamless connectivity with a vision to become one of the biggest IoT solution providers in India and eventually the world.
                </p>
                <center><img src="/assets/img/about/vision.webp" alt="GPS Tracking Vision" /></center>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
