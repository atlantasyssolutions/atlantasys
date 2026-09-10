import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Warranty & Repairs | Atlanta Systems GPS Tracker Service Policy',
  description: 'Atlanta Systems warranty policy: 12-month device warranty, 6-month battery warranty, post-warranty repair service, and RMA process for GPS trackers and IoT devices.',
  alternates: { canonical: 'https://www.atlantasys.com/warranty-and-repairs' },
  openGraph: {
    title: 'Warranty & Repairs | Atlanta Systems',
    description: 'Atlanta Systems warranty and repair policy for GPS trackers and IoT devices.',
    url: 'https://www.atlantasys.com/warranty-and-repairs',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

export default function WarrantyAndRepairsPage() {
  return (
    <>
      <Header />

      <style>{`
        .partner-table tr td {
          border: none !important;
          vertical-align: middle;
          padding-bottom: 50px;
        }
      `}</style>

      {/* Hero Banner */}
      <div className="about-area about-top-area" style={{ background: '#F4F4F4' }}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6" style={{ paddingLeft: 0 }}>
              <img src="/assets/img/warranty/banner.webp" alt="Warranty & Repair" style={{ width: '100%' }} />
            </div>
            <div className="col-md-6" style={{ padding: '20px 30px 0' }}>
              <div className="heading-title">
                <h1 style={{ textAlign: 'left' }}>Warranty &amp; Repair</h1>
              </div>
              <p align="left">
                Warranty covers defects and malfunctions; repair service addresses issues, ensuring product functionality and customer satisfaction within the warranty period.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warranty Terms */}
      <div className="about-area about-top-area pt-50">
        <div className="container">
          <div className="row about-top pt-20">
            <div className="col-md-12">
              <p align="justify" style={{ fontSize: '17px', lineHeight: 2 }}>
                - Our products are backed by a 12-month warranty period<br />
                - Within this warranty period, service costs are covered, except for physical and liquid damage to device components.<br />
                - Batteries are covered by a 6-month warranty period.<br />
                - Post-warranty repair service is available for all our products.<br />
                - For extended service warranty options, please inquire the sales representative.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warranty Disclaimer */}
      <div className="container-fluid pt-50">
        <div className="container">
          <div className="heading-title">
            <h2>Warranty Disclaimer</h2>
            <p align="center">While we ensure the quality of our products, certain conditions apply:</p>
          </div>
          <br />
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
              <p>- Product replacement is applicable only in cases of defects due to assembly or manufacturing faults.</p>
              <p>- Our products are designed for use by trained personnel. Warranty does not cover damages resulting from accidents, misuse, abuse, or improper maintenance.</p>
              <p>- Consequential damages are not covered under warranty.</p>
              <p>- Warranty does not extend to supplementary product equipment unless the accessory is found to be defective upon arrival.</p>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <img src="/assets/img/warranty/packaging-boxes.webp" alt="Atlanta Warranty & Repair" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Repair Process */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#FFFFFF' }}>
        <div className="container-fluid">
          <div className="heading-title">
            <h2>Repair Process</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12" align="center">
              <ul className="process">
                <li className="process__item">
                  <span className="process__number">1</span>
                  <span className="process__title">Initiating Repair</span>
                  <span>Customers can initiate the repair process by contacting us at se4@atlantasys.in or support@atlantasys.com with the device&apos;s IMEI number and issue.</span>
                </li>
                <li className="process__item">
                  <span className="process__number">2</span>
                  <span className="process__title">Ticket Generation</span>
                  <span>Upon receipt of the device, our support team generates an OEM ticket with detailed information.</span>
                </li>
                <li className="process__item">
                  <span className="process__number">3</span>
                  <span className="process__title">Customer Notification</span>
                  <span>Customers are informed of the receipt of their devices, providing relevant details.</span>
                </li>
                <li className="process__item">
                  <span className="process__number">4</span>
                  <span className="process__title">Repair Assessment</span>
                  <span>Our repair team evaluates the device, providing cost and repair details within 48 hours.</span>
                </li>
              </ul>
            </div>
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12" align="center">
              <ul className="process">
                <li className="process__item">
                  <span className="process__number">5</span>
                  <span className="process__title">Communication</span>
                  <span>Details of the repair assessment are shared with the customer for approval over the mail.</span>
                </li>
                <li className="process__item">
                  <span className="process__number">6</span>
                  <span className="process__title">Repair Process</span>
                  <span>Upon approval, the repair process commences.</span>
                </li>
                <li className="process__item">
                  <span className="process__number">7</span>
                  <span className="process__title">Final Billing and Dispatch</span>
                  <span>Once repairs are completed, the finance team generates final billing and dispatches the device.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Packaging & Shipping */}
      <div className="faq-area pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img src="/assets/img/warranty/box.webp" alt="Atlanta Warranty & Repair" style={{ width: '100%' }} />
            </div>
            <div className="col-md-7">
              <div className="heading-title">
                <h2 style={{ textAlign: 'left' }}>Packaging Guidelines</h2>
                <p style={{ lineHeight: 2, fontSize: '17px' }}>
                  - Devices must be properly packed, preferably in the original box.<br />
                  - Customers are responsible for packaging warranty products securely.
                </p>
              </div>
              <br />
              <div className="heading-title">
                <h2 style={{ textAlign: 'left' }}>Shipping Information</h2>
                <p style={{ lineHeight: 2, fontSize: '17px' }}>
                  - Warranty items should be sent to the Repairing Centre in Parwanoo.<br />
                  - Clients bear the shipment costs for returning items.<br />
                  - We recommend using a trackable shipping service to ensure safe delivery.<br />
                  - We do not take responsibility for loss or theft during transportation.
                </p>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12">
              <p>
                For any concerns regarding warranty or repair processes, please feel free to contact us at 011-49039798 / 011-49039799 / 011-49039718. We&apos;re here to ensure a seamless experience for our customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
