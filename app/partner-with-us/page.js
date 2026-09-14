'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PartnerWithUsPage() {
  const router = useRouter();
  const [openAccordion, setOpenAccordion] = useState(null);

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('formSubmitted', 'true');
      sessionStorage.setItem('submittedSource', 'partner');
    }
    router.push('/thank-you');
  };

  const toggleAccordion = (id) => {
    setOpenAccordion(prev => prev === id ? null : id);
  };

  const accordionItems = [
    { id: 1, title: 'Cutting-Edge Technology', body: "Stay ahead with our state-of-the-art GPS hardware and IoT solutions, ensuring you're always at the forefront of innovation." },
    { id: 2, title: 'Customized Solutions', body: 'Tailored GPS and IoT solutions to meet your specific needs, ensuring maximum efficiency and cost-effectiveness.' },
    { id: 3, title: 'Enhanced Operational Efficiency', body: 'Streamline operations with our solutions, optimizing fleet management, asset tracking, and resource utilization.' },
    { id: 4, title: 'Improved Security', body: 'Ensure the safety of your assets and personnel with our advanced security features and real-time tracking capabilities.' },
    { id: 5, title: 'Scalability', body: 'Easily scale our solutions as your business grows, providing seamless integration and expansion opportunities.' },
    { id: 6, title: 'Dedicated Support', body: 'Get expert support from our team, ensuring a smooth implementation process and ongoing assistance.' },
    { id: 7, title: 'Cost Savings', body: 'Reduce operational costs with our efficient solutions, helping you achieve higher profitability.' },
    { id: 8, title: 'Future-Ready Solutions', body: 'Prepare for the future with our solutions, designed to adapt and evolve with the changing technological landscape.' },
  ];

  return (
    <>
      <Header />

      <style dangerouslySetInnerHTML={{__html: `
        .partner-table tr td {
          border: none !important;
          vertical-align: middle;
          padding-bottom: 50px;
        }
      `}} />

      {/* Hero Banner */}
      <div className="about-area about-top-area" style={{ background: '#F4F4F4' }}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6" style={{ paddingLeft: 0 }}>
              <img src="/assets/img/partner/banner.webp" alt="Partner With Us" style={{ width: '100%' }} />
            </div>
            <div className="col-md-6" style={{ padding: '20px 30px 0' }}>
              <div className="heading-title">
                <h1 style={{ textAlign: 'left' }}>Grow with Atlanta Systems</h1>
              </div>
              <p align="left">
                Our model enables LSP partners to maintain complete control over the business while leveraging our technological innovations and business know-how.
              </p>
              <div className="actions">
                <a
                  href="#partnerForm"
                  className="btncta normal-cta edit"
                  style={{ borderColor: '#1A1A1A', color: '#1a1a1a', textTransform: 'capitalize' }}
                >
                  Become A Partner
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="about-area about-top-area pb-50 pt-50">
        <div className="container">
          <div className="row about-top pt-20">
            <div className="col-md-12">
              <p align="justify">
                Discover the future of connectivity and operational excellence with Atlanta&apos;s premier GPS tracking and IoT solutions. At Atlanta Systems we are not just solution providers; we&apos;re innovators dedicated to transforming the way businesses operate. Whether you&apos;re in transportation, logistics, fleet management, agriculture, or any other sector, our comprehensive suite of services is tailored to meet your unique needs and ensure you stay ahead in a competitive landscape.<br /><br />
                Partner with us and unlock access to groundbreaking technology, unparalleled support, and a relentless pursuit of excellence that drives your success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Partner With Us */}
      <div className="container-fluid pt-50">
        <div className="container">
          <div className="heading-title">
            <h2>Why Partner With Us</h2>
          </div>
          <br /><br />
          <div className="row partner-icon justify-content-center">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              <table className="table partner-table">
                <tbody>
                  <tr>
                    <td><img src="/assets/img/partner/pioneer-in-innovations.svg" title="Pioneers in Innovation" alt="Pioneers in Innovation" /></td>
                    <td>
                      <h3>Pioneers in Innovation</h3>
                      <p>Harness the power of next-generation GPS and IoT technologies with us, as we lead the charge in innovation, constantly delivering solutions that propel businesses to new heights of growth and efficiency.</p>
                    </td>
                  </tr>
                  <tr>
                    <td><img src="/assets/img/partner/end-to-end-solutions.svg" title="End-to-End Solutions" alt="End-to-End Solutions" /></td>
                    <td>
                      <h3>End-to-End Solutions</h3>
                      <p>Stay ahead of the game and effortlessly achieve your objectives with our comprehensive suite of solutions. From dynamic real-time tracking to insightful data analytics and predictive maintenance, we offer innovative solutions tailored to your evolving needs.</p>
                    </td>
                  </tr>
                  <tr>
                    <td><img src="/assets/img/partner/customized.svg" title="Customization and Scalability" alt="Customization and Scalability" /></td>
                    <td>
                      <h3>Customization and Scalability:</h3>
                      <p>Our solutions are crafted with precision to align perfectly with your unique needs and grow seamlessly alongside your business, ensuring that you&apos;re always equipped to conquer new horizons.</p>
                    </td>
                  </tr>
                  <tr>
                    <td><img src="/assets/img/partner/reliability.svg" title="Reliability Redefined" alt="Reliability Redefined" /></td>
                    <td>
                      <h3>Reliability Redefined:</h3>
                      <p>Partnering with us means more than just gaining access to cutting-edge technology. It means gaining a reliable ally dedicated to your success. Our unwavering support team is there every step of the way, from seamless implementation to ongoing assistance, ensuring that you get the most out of our solutions.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Who Can Partner */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#FFFFFF' }}>
        <div className="container-fluid">
          <div className="heading-title">
            <h2>Who Can Partner with us</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12" align="center">
              <ul className="process">
                <li className="process__item">
                  <span className="process__number">1</span>
                  <span className="process__title">Automobile Original Equipment Manufacturers (OEMs)</span>
                </li>
                <li className="process__item">
                  <span className="process__number">2</span>
                  <span className="process__title">Logistics and Fleet Management Companies</span>
                </li>
                <li className="process__item">
                  <span className="process__number">3</span>
                  <span className="process__title">Security and Surveillance Companies</span>
                </li>
                <li className="process__item">
                  <span className="process__number">4</span>
                  <span className="process__title">Electric Vehicle (EV) Manufacturers</span>
                </li>
              </ul>
            </div>
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12" align="center">
              <ul className="process">
                <li className="process__item">
                  <span className="process__number">5</span>
                  <span className="process__title">Smart Cities and Municipalities</span>
                </li>
                <li className="process__item">
                  <span className="process__number">6</span>
                  <span className="process__title">Telecommunications Providers</span>
                </li>
                <li className="process__item">
                  <span className="process__number">7</span>
                  <span className="process__title">Retail and E-commerce Companies</span>
                </li>
                <li className="process__item">
                  <span className="process__number">8</span>
                  <span className="process__title">Renewable Energy Companies</span>
                </li>
              </ul>
            </div>
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12" align="center">
              <ul className="process">
                <li className="process__item">
                  <span className="process__number">9</span>
                  <span className="process__title">Insurance Companies</span>
                </li>
                <li className="process__item">
                  <span className="process__number">10</span>
                  <span className="process__title">Healthcare Providers</span>
                </li>
                <li className="process__item">
                  <span className="process__number">11</span>
                  <span className="process__title">Agricultural Sector</span>
                </li>
                <li className="process__item">
                  <span className="process__number">12</span>
                  <span className="process__title">Education and Research Institution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="faq-area pt-50 pb-50">
        <div className="container">
          <div className="heading-title">
            <h2>What Makes Us Different</h2>
          </div>
          <div className="accordion" id="accordionExample">
            {accordionItems.map((item) => (
              <div key={item.id} className="accordion-item">
                <h2 className="accordion-header" id={`heading${item.id}`}>
                  <button
                    className={`accordion-button ${openAccordion === item.id ? '' : 'collapsed'}`}
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={openAccordion === item.id ? "true" : "false"}
                  >
                    {item.title}
                  </button>
                </h2>
                <div id={`collapse${item.id}`} className={`accordion-collapse collapse ${openAccordion === item.id ? 'show' : ''}`}>
                  <div className="accordion-body">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-12">
                        <p>{item.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partner Enquiry Form */}
      <div className="container-fluid pt-50 pb-50" id="partnerForm" style={{ background: '#F4F4F4' }}>
        <div className="container">
          <div className="heading-title">
            <h2>Partner With Us</h2>
          </div>
          <p>Note: <span style={{ color: 'red' }}>*</span> fields are mandatory</p>
          <form id="partner_form" onSubmit={handlePartnerSubmit}>
            <div className="row">
              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                <p><strong>Select the type of enquiry<span style={{ color: 'red' }}>*</span></strong></p>
                <div className="toggle">
                  <input type="radio" name="enquiry" value="Business/Sales" id="business" defaultChecked />
                  <label htmlFor="business">Business/Sales</label>
                  <input type="radio" name="enquiry" value="Collaboration" id="collaboration" />
                  <label htmlFor="collaboration">Collaboration</label>
                  <input type="radio" name="enquiry" value="Become An LSP" id="lsp" />
                  <label htmlFor="lsp">Become An LSP</label>
                  <input type="radio" name="enquiry" value="Others" id="others" />
                  <label htmlFor="others">Others</label>
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label><strong>Full Name<span style={{ color: 'red' }}>*</span></strong></label>
                <input type="text" className="form-control" name="name" placeholder="Full Name" />
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label><strong>Email<span style={{ color: 'red' }}>*</span></strong></label>
                <input type="text" className="form-control" name="email" placeholder="Email Address" />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label><strong>Contact Number<span style={{ color: 'red' }}>*</span></strong></label>
                <input type="text" className="form-control" name="contact" placeholder="Contact Number" />
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label><strong>Company<span style={{ color: 'red' }}>*</span></strong></label>
                <select className="form-control" name="company">
                  <option value="Company">Company</option>
                  <option value="An Individual">An Individual</option>
                  <option value="Government Official">Government Official</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                <label><strong>Subject<span style={{ color: 'red' }}>*</span></strong></label>
                <input type="text" className="form-control" name="subject" placeholder="Subject" />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                <label><strong>Leave us a message</strong></label>
                <textarea className="form-control" name="message" rows={4}></textarea>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12 col-lg-12" align="right">
                <button type="submit" className="btn btn-success" id="partner_btn">
                  <i className="fas fa-paper-plane"></i> Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
