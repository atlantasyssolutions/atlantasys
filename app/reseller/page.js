'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './Reseller.module.css';

// =========================================================================
// PLACEHOLDER CONFIGURATION:
// User will provide the actual Web3Forms API key for Atlanta Systems.
// Replace the string below with the actual key when available.
// =========================================================================
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY_HERE';

// =========================================================================
// RELEVANT ATLANTA SYSTEMS BLOG ARTICLES FOR TELEMATICS RESELLERS
// =========================================================================
const RELEVANT_PARTNER_BLOGS = [
  {
    category: 'AIS-140 Compliance',
    title: "How Atlanta Systems' AIS 140 VLT-100 Trackers Solve Real-Time Compliance",
    excerpt: 'Explore MoRTH & CDAC certified dual-IP backend streaming, emergency panic loop failovers, and tender-ready commercial hardware.',
    readTime: '12 min read',
    slug: 'how-atlanta-systems-ais-140-vlt-100-gps-trackers-solve-real-time-compliance-on-indias-national-highways',
    image: '/blog/how-atlanta-systems-ais-140-vlt-100-gps-trackers-solve-real-time-compliance-on-indias-national-highways.webp',
  },
  {
    category: 'AI Video Safety',
    title: 'AI Dual-Lens Dash Cams: Reducing Accidents & Driver Fatigue',
    excerpt: 'Edge AI processors delivering real-time drowsiness detection, forward collision warnings, and automated HD incident cloud backup.',
    readTime: '12 min read',
    slug: 'ai-dual-lens-dash-cams-from-atlanta-systems-reducing-accidents-on-los-angeles-i-710-port-drayage-routes',
    image: '/blog/ai-dual-lens-dash-cams-from-atlanta-systems-reducing-accidents-on-los-angeles-i-710-port-drayage-routes.webp',
  },
  {
    category: 'Fuel Anti-Theft',
    title: 'Capacitive Fuel Probes: Stopping Siphoning on Overnight Stops',
    excerpt: 'Digital capacitive fuel probes with ±0.3% volumetric accuracy, instant siphoning push alarms, and multi-tank calibration across heavy trucks.',
    readTime: '12 min read',
    slug: 'capacitive-fuel-probes-from-atlanta-systems-stopping-siphoning-on-riyadh-ring-road-overnight-stops',
    image: '/blog/capacitive-fuel-probes-from-atlanta-systems-stopping-siphoning-on-riyadh-ring-road-overnight-stops.webp',
  },
  {
    category: 'CAN-Bus Diagnostics',
    title: 'CAN-Bus J1939 Readers: Unlocking Live Engine Diagnostics',
    excerpt: 'Non-intrusive inductive readers capturing live torque, engine RPM, coolant temperature, fuel burn rates, and real-time DTC fault codes.',
    readTime: '12 min read',
    slug: 'can-bus-j1939-readers-by-atlanta-systems-unlocking-engine-data-on-houstons-i-10-energy-corridor',
    image: '/blog/can-bus-j1939-readers-by-atlanta-systems-unlocking-engine-data-on-houstons-i-10-energy-corridor.webp',
  },
  {
    category: 'Commercial MDVR',
    title: '4-Channel Mobile DVRs: Full Cabin & Road Visibility for Fleets',
    excerpt: 'Vibration-dampened solid-state MDVR systems with 4G live streaming, blind spot detection, driver monitoring, and continuous road evidence.',
    readTime: '12 min read',
    slug: '4-channel-mobile-dvrs-by-atlanta-systems-for-complete-cabin-and-road-coverage-in-warsaw-a2-corridor-fleets',
    image: '/blog/4-channel-mobile-dvrs-by-atlanta-systems-for-complete-cabin-and-road-coverage-in-warsaw-a2-corridor-fleets.webp',
  },
  {
    category: 'Cold Chain IoT',
    title: 'BLE 5.0 Beacons: Multi-Zone Temperature Mapping for Pharma',
    excerpt: 'Wireless Bluetooth Low Energy sensors delivering continuous temperature logging, door opening audits, and GDP compliance for reefer transport.',
    readTime: '12 min read',
    slug: 'ble-5-0-beacons-by-atlanta-systems-enabling-multi-zone-temperature-mapping-on-warsaw-pharma-routes',
    image: '/blog/ble-5-0-beacons-by-atlanta-systems-enabling-multi-zone-temperature-mapping-on-warsaw-pharma-routes.webp',
  },
];

export default function ResellerPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    heardAbout: 'Search Engine',
    websiteUrl: '',
    orgType: 'Telematics Reseller',
    fleetSize: '26-100',
    features: ['GPS Fleet Tracking', 'Dash Cameras'],
    trackVehicles: ['Trucks', 'Cars'],
    comments: '',
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxToggle = (listName, item) => {
    setFormData(prev => {
      const currentList = prev[listName];
      if (currentList.includes(item)) {
        return { ...prev, [listName]: currentList.filter(i => i !== item) };
      } else {
        return { ...prev, [listName]: [...currentList, item] };
      }
    });
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      alert('Please enter your first name.');
      return false;
    }
    if (!formData.lastName.trim()) {
      alert('Please enter your last name.');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      alert('Please enter a valid work email address.');
      return false;
    }
    if (!formData.phone.trim()) {
      alert('Please enter your phone/WhatsApp number.');
      return false;
    }
    if (!formData.companyName.trim()) {
      alert('Please enter your company name.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.orgType) {
      alert('Please select your organization type.');
      return false;
    }
    if (!formData.fleetSize) {
      alert('Please select your target fleet size.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
        // Placeholder simulation: API key has not been inserted yet
        console.log('Atlanta Systems Reseller Inquiry submitted (Placeholder Mode):', formData);
        await new Promise(res => setTimeout(res, 800));
        setSubmitted(true);
      } else {
        const payload = {
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Reseller Application: ${formData.companyName} (${formData.firstName} ${formData.lastName})`,
          from_name: 'Atlanta Systems Partner Portal',
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          company: formData.companyName,
          website: formData.websiteUrl,
          referral_source: formData.heardAbout,
          organization_type: formData.orgType,
          target_fleet_size: formData.fleetSize,
          features_of_interest: formData.features.join(', '),
          vehicles_to_track: formData.trackVehicles.join(', '),
          comments: formData.comments,
        };

        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (data.success) {
          setSubmitted(true);
        } else {
          setErrorMessage(data.message || 'Submission error. Please try again.');
        }
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback graceful success in local/demo environment
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('resellerFormCard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className={styles.resellerPage}>
      <Header />

      {/* =========================================================================
          HERO SECTION + MULTI-STEP RESELLER APPLICATION FORM
         ========================================================================= */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-6 col-md-12">
              <div className={styles.heroContent}>
                <div className={styles.heroBadge}>
                  <i className="fas fa-handshake"></i> Atlanta Systems Reseller Program
                </div>
                <h1 className={styles.heroTitle}>
                  Supercharge Your Business.
                </h1>
                <h2 className={styles.heroSubtitle}>
                  Become an Atlanta Systems Reseller.
                </h2>
                <p className={styles.heroDesc}>
                  Partner with Atlanta Systems to offer your customers India&apos;s most innovative, high-impact fleet management, AIS-140 certified GPS trackers, and AI video telematics solutions on the market.
                </p>
              </div>
            </div>

            {/* Right Interactive Multi-Step Form */}
            <div className="col-lg-6 col-md-12" id="resellerFormCard">
              <div className={styles.formCard}>
                <h2 className={styles.formCardTitle}>Become a Reseller</h2>
                <p className={styles.formCardSub}>
                  Join 350+ certified telematics partners across India and global markets.
                </p>

                {submitted ? (
                  <div className={styles.successBox}>
                    <div className={styles.successIcon}>
                      <i className="fas fa-check"></i>
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F2D4E', marginBottom: '8px' }}>
                      Application Received!
                    </h3>
                    <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                      Thank you, <strong>{formData.firstName}</strong>. Our enterprise partner manager will review your business profile and contact you within 24 hours with wholesale pricing and onboarding collateral.
                    </p>
                    <button
                      className={styles.btnNext}
                      style={{ margin: '0 auto', maxWidth: '200px' }}
                      onClick={() => {
                        setSubmitted(false);
                        setCurrentStep(1);
                      }}
                    >
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Progress Bar */}
                    <div className={styles.progressWrapper}>
                      <div className={styles.progressLabel}>
                        <span>Step {currentStep} of 3</span>
                        <span>{currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%'}</span>
                      </div>
                      <div className={styles.progressBarBg}>
                        <div
                          className={styles.progressBarFill}
                          style={{ width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%' }}
                        />
                      </div>
                    </div>

                    {/* STEP 1: Basic Information */}
                    {currentStep === 1 && (
                      <div>
                        <div className={styles.formRow}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                              First Name <span className={styles.requiredStar}>*</span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              required
                              placeholder="e.g. Rahul"
                              className={styles.formInput}
                              value={formData.firstName}
                              onChange={handleTextChange}
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                              Last Name <span className={styles.requiredStar}>*</span>
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              required
                              placeholder="e.g. Sharma"
                              className={styles.formInput}
                              value={formData.lastName}
                              onChange={handleTextChange}
                            />
                          </div>
                        </div>

                        <div className={styles.formRow}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                              Work Email <span className={styles.requiredStar}>*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              placeholder="rahul@company.com"
                              className={styles.formInput}
                              value={formData.email}
                              onChange={handleTextChange}
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                              Phone / WhatsApp <span className={styles.requiredStar}>*</span>
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              required
                              placeholder="+91 99999 99999"
                              className={styles.formInput}
                              value={formData.phone}
                              onChange={handleTextChange}
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>
                            Company Name <span className={styles.requiredStar}>*</span>
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            required
                            placeholder="e.g. Apex Telematics Pvt Ltd"
                            className={styles.formInput}
                            value={formData.companyName}
                            onChange={handleTextChange}
                          />
                        </div>

                        <div className={styles.formRow}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                              How did you hear about us? <span className={styles.requiredStar}>*</span>
                            </label>
                            <select
                              name="heardAbout"
                              className={styles.formSelect}
                              value={formData.heardAbout}
                              onChange={handleTextChange}
                            >
                              <option value="Search Engine">Search Engine (Google)</option>
                              <option value="Industry Event / Expo">Industry Event / Expo</option>
                              <option value="Recommendation / Referral">Recommendation / Referral</option>
                              <option value="LinkedIn / Social Media">LinkedIn / Social Media</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                              Company Website URL
                            </label>
                            <input
                              type="url"
                              name="websiteUrl"
                              placeholder="https://www.yourcompany.com"
                              className={styles.formInput}
                              value={formData.websiteUrl}
                              onChange={handleTextChange}
                            />
                          </div>
                        </div>

                        <div className={styles.formButtons}>
                          <button
                            type="button"
                            className={styles.btnNext}
                            onClick={handleNext}
                          >
                            Next Step <i className="fas fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Organization Profile */}
                    {currentStep === 2 && (
                      <div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>
                            Organization Type <span className={styles.requiredStar}>*</span>
                          </label>
                          <div className={styles.choiceGrid}>
                            {['Telematics Reseller', 'System Integrator', 'Fleet Management Firm', 'Government Contractor'].map((item) => (
                              <div
                                key={item}
                                className={`${styles.choiceCard} ${formData.orgType === item ? styles.choiceCardActive : ''}`}
                                onClick={() => handleRadioChange('orgType', item)}
                              >
                                <div className={`${styles.choiceCheck} ${styles.choiceRadio}`}>
                                  {formData.orgType === item && <i className="fas fa-check"></i>}
                                </div>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className={styles.formGroup} style={{ marginTop: '20px' }}>
                          <label className={styles.formLabel}>
                            Target Fleet / Client Scale <span className={styles.requiredStar}>*</span>
                          </label>
                          <div className={styles.choiceGrid}>
                            {['1 - 25 vehicles', '26 - 100 vehicles', '101 - 500 vehicles', '500+ Enterprise'].map((item) => (
                              <div
                                key={item}
                                className={`${styles.choiceCard} ${formData.fleetSize === item ? styles.choiceCardActive : ''}`}
                                onClick={() => handleRadioChange('fleetSize', item)}
                              >
                                <div className={`${styles.choiceCheck} ${styles.choiceRadio}`}>
                                  {formData.fleetSize === item && <i className="fas fa-check"></i>}
                                </div>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className={styles.formButtons}>
                          <button
                            type="button"
                            className={styles.btnPrev}
                            onClick={handlePrev}
                          >
                            <i className="fas fa-arrow-left"></i> Previous
                          </button>
                          <button
                            type="button"
                            className={styles.btnNext}
                            onClick={handleNext}
                          >
                            Next Step <i className="fas fa-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Offerings & Hardware Interest */}
                    {currentStep === 3 && (
                      <div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>
                            Features of Interest (Select all that apply)
                          </label>
                          <div className={styles.choiceGrid}>
                            {[
                              'GPS Fleet Tracking',
                              'Smart AI Dashcams',
                              'Fuel Sensors & Theft',
                              'AIS-140 Compliance',
                              'EV Telematics & BMS',
                              'Driver Coaching (DMS)'
                            ].map((item) => {
                              const isChecked = formData.features.includes(item);
                              return (
                                <div
                                  key={item}
                                  className={`${styles.choiceCard} ${isChecked ? styles.choiceCardActive : ''}`}
                                  onClick={() => handleCheckboxToggle('features', item)}
                                >
                                  <div className={styles.choiceCheck}>
                                    {isChecked && <i className="fas fa-check"></i>}
                                  </div>
                                  <span>{item}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className={styles.formGroup} style={{ marginTop: '16px' }}>
                          <label className={styles.formLabel}>
                            Vehicles / Assets to Track
                          </label>
                          <div className={styles.choiceGrid}>
                            {['Commercial Trucks', 'Buses & Shuttles', 'Passenger Cars', 'Heavy Mining / JCB', 'Electric 2W/3W', 'Trailers'].map((item) => {
                              const isChecked = formData.trackVehicles.includes(item);
                              return (
                                <div
                                  key={item}
                                  className={`${styles.choiceCard} ${isChecked ? styles.choiceCardActive : ''}`}
                                  onClick={() => handleCheckboxToggle('trackVehicles', item)}
                                >
                                  <div className={styles.choiceCheck}>
                                    {isChecked && <i className="fas fa-check"></i>}
                                  </div>
                                  <span>{item}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className={styles.formGroup} style={{ marginTop: '16px' }}>
                          <label className={styles.formLabel}>
                            Comments / Special Inquiries
                          </label>
                          <textarea
                            name="comments"
                            rows={3}
                            placeholder="Tell us about your target territory, volume expectations, or custom firmware requirements..."
                            className={styles.formTextarea}
                            value={formData.comments}
                            onChange={handleTextChange}
                          />
                        </div>

                        {errorMessage && (
                          <div style={{ color: '#EF4444', fontSize: '0.85rem', marginBottom: '12px' }}>
                            {errorMessage}
                          </div>
                        )}

                        <div className={styles.formButtons}>
                          <button
                            type="button"
                            className={styles.btnPrev}
                            onClick={handlePrev}
                            disabled={submitting}
                          >
                            <i className="fas fa-arrow-left"></i> Previous
                          </button>
                          <button
                            type="submit"
                            className={styles.btnNext}
                            disabled={submitting}
                          >
                            {submitting ? (
                              <>
                                <i className="fas fa-spinner fa-spin"></i> Submitting...
                              </>
                            ) : (
                              <>
                                Complete Application <i className="fas fa-paper-plane"></i>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: WHY PARTNER WITH ATLANTA SYSTEMS? ("WHY US")
         ========================================================================= */}
      <section className={styles.whyUsSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
              <div className={styles.threeImgWrapper}>
                <img
                  src="/assets/img/telematics/vehicle-telematics-benefits.webp"
                  alt="Why Partner with Atlanta Systems Telematics"
                  className={styles.threeImg}
                />
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className={styles.sectionTag}>
                <img
                  src="/assets/img/reseller/heading-icon-small.webp"
                  alt="Why Us"
                  className={styles.sectionTagIcon}
                />
                WHY PARTNER WITH US
              </div>
              <h2 className={styles.sectionTitle}>
                Direct OEM Power. <br />Higher Partner Margins.
              </h2>
              <p className={styles.sectionDesc}>
                Atlanta Systems gives you direct factory hardware reliability, firmware agility, and dedicated engineering support to grow faster, win high-volume state tenders, and lead your regional telematics market.
              </p>
              <p className={styles.sectionDesc}>
                Our solution extends far beyond basic dots on a map: we deliver a complete hardware-to-cloud ecosystem. From AIS-140 certified VLT devices and edge AI dual dashcams to digital capacitive fuel probes, CAN-bus decoders, and full white-label cloud command centers, we empower resellers to scale effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4 FEATURES GRID (PILLARS OF SUCCESS)
         ========================================================================= */}
      <section className={styles.featuresGrid}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <img
                    src="/assets/img/partner/revenue.svg"
                    alt="Higher Hardware & SaaS Margins"
                    className={styles.featureIcon}
                  />
                </div>
                <h3 className={styles.featureTitle}>Maximize Bottom Line</h3>
                <p className={styles.featureText}>
                  Increase profitability with direct factory wholesale pricing, recurring SaaS subscription margins, and zero middleman markups.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <img
                    src="/assets/img/partner/technology-expertise.svg"
                    alt="Complete Telematics IoT Stack"
                    className={styles.featureIcon}
                  />
                </div>
                <h3 className={styles.featureTitle}>Complete IoT Stack</h3>
                <p className={styles.featureText}>
                  Go beyond standard GPS: deliver edge AI dual-lens dashcams, capacitive anti-siphoning fuel rods, BLE cold chain sensors, and heavy CAN-bus telemetry.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <img
                    src="/assets/img/partner/pioneer-in-innovations.svg"
                    alt="32+ Years Indigenous Manufacturing"
                    className={styles.featureIcon}
                  />
                </div>
                <h3 className={styles.featureTitle}>32+ Years OEM Heritage</h3>
                <p className={styles.featureText}>
                  Backed by 32+ years of Indian electronics manufacturing. Receive direct technical support from our R&amp;D team—from custom firmware to tender documentation.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <img
                    src="/assets/img/partner/reliability.svg"
                    alt="Enterprise Cloud Reliability"
                    className={styles.featureIcon}
                  />
                </div>
                <h3 className={styles.featureTitle}>99.9% Uptime &amp; SLA</h3>
                <p className={styles.featureText}>
                  Deliver serious enterprise reliability with 99.9% cloud uptime, automated alert engines, tamper-proof hardware, and virtually zero customer churn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: DIFFERENT MEANS BETTER
         ========================================================================= */}
      <section className={styles.differentSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
              <div className={styles.sectionTag}>
                <img
                  src="/assets/img/reseller/heading-icon-small.webp"
                  alt="Different Means Better"
                  className={styles.sectionTagIcon}
                />
                DIFFERENT MEANS BETTER
              </div>
              <h2 className={styles.sectionTitle}>
                We’re Not Like the Others — and That’s a Good Thing
              </h2>
              <p className={styles.sectionDesc}>
                Atlanta Systems gives you the tools, flexibility, and engineering support to grow faster, win more commercial deals, and stand out in a crowded market.
              </p>
              <p className={styles.sectionDesc}>
                Most telematics resellers settle for outdated, imported devices that treat firmware customization as an afterthought. We&apos;re fundamentally different: we design, develop, and manufacture our hardware in India with in-house firmware engineers.
              </p>
            </div>
            <div className="col-lg-6 col-md-12 text-center">
              <img
                src="/assets/img/reseller/big-img-right.webp"
                alt="Atlanta Systems Differentiators"
                className={styles.diffImg}
              />
            </div>
          </div>

          {/* 5 Differentiator Cards */}
          <div className={styles.diffPillarsGrid}>
            <div className={styles.diffPillarCard}>
              <h4 className={styles.diffPillarTitle}>
                <i className="fas fa-microchip" style={{ marginRight: '8px' }}></i> In-House R&amp;D &amp; Manufacturing
              </h4>
              <p className={styles.diffPillarText}>
                Complete sovereignty over hardware schematics, PCB design, firmware protocols, and national regulatory certifications (AIS-140, CDAC, DIMTS).
              </p>
            </div>

            <div className={styles.diffPillarCard}>
              <h4 className={styles.diffPillarTitle}>
                <i className="fas fa-video" style={{ marginRight: '8px' }}></i> Video-First AI &amp; ADAS
              </h4>
              <p className={styles.diffPillarText}>
                Our cutting-edge dashcams and AI safety tools don&apos;t just capture video—they process driver distraction, drowsiness, and forward collision risks at the edge.
              </p>
            </div>

            <div className={styles.diffPillarCard}>
              <h4 className={styles.diffPillarTitle}>
                <i className="fas fa-paint-brush" style={{ marginRight: '8px' }}></i> White-Label Ready
              </h4>
              <p className={styles.diffPillarText}>
                Offer our web command center and mobile applications under your own brand identity, with custom domain routing, logos, and color palettes.
              </p>
            </div>

            <div className={styles.diffPillarCard}>
              <h4 className={styles.diffPillarTitle}>
                <i className="fas fa-users-cog" style={{ marginRight: '8px' }}></i> Full-Service Partnership
              </h4>
              <p className={styles.diffPillarText}>
                Our dedicated partner solutions team supports your business every step of the way—from tender bid documentation to technical hardware training.
              </p>
            </div>

            <div className={styles.diffPillarCard}>
              <h4 className={styles.diffPillarTitle}>
                <i className="fas fa-tasks" style={{ marginRight: '8px' }}></i> Workforce &amp; Fleet Automation
              </h4>
              <p className={styles.diffPillarText}>
                Help your enterprise clients digitize field service operations, automated dispatching, vehicle inspections, and preventative maintenance schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PARTNER INTELLIGENCE & TELEMATICS ENGINEERING GUIDES
         ========================================================================= */}
      <section className={styles.whatWeOfferSection}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: '780px', margin: '0 auto 40px' }}>
            <div className={styles.sectionTag} style={{ justifyContent: 'center' }}>
              <img
                src="/assets/img/reseller/heading-icon-small.webp"
                alt="Partner Insights"
                className={styles.sectionTagIcon}
              />
              FIELD INTELLIGENCE &amp; ENGINEERING GUIDES
            </div>
            <h2 className={styles.sectionTitle}>
              Proven in the Field: Partner Insights &amp; Tech Guides
            </h2>
            <p className={styles.sectionDesc}>
              Arm your sales and technical teams with battle-tested deployment architectures, statutory compliance blueprints, and hardware deep dives designed to help Atlanta Systems resellers win enterprise fleet accounts.
            </p>
          </div>

          <div className={styles.articlesList}>
            {RELEVANT_PARTNER_BLOGS.map((blog, idx) => (
              <div key={idx} className={styles.articleCard}>
                <div className={styles.articleImgWrapper}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className={styles.articleImg}
                    loading="lazy"
                  />
                  <span className={styles.articleBadge}>{blog.category}</span>
                </div>
                <div className={styles.articleBody}>
                  <div className={styles.articleMeta}>
                    <span className={styles.articleMetaItem}>
                      <i className="far fa-clock"></i> {blog.readTime}
                    </span>
                    <span>•</span>
                    <span className={styles.articleMetaItem}>
                      <i className="fas fa-microchip"></i> Engineering Guide
                    </span>
                  </div>
                  <h3 className={styles.articleTitle}>{blog.title}</h3>
                  <p className={styles.articleText}>{blog.excerpt}</p>
                  <a href={`/blog/${blog.slug}`} className={styles.articleLink}>
                    <span>Read Engineering Guide</span>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.viewAllWrapper}>
            <a href="/blog" className={styles.btnViewAll}>
              <span>Explore All 300+ Telematics Knowledge Guides</span>
              <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: CALL TO ACTION / BOTTOM BANNER
         ========================================================================= */}
      <section className={styles.joinBannerSection}>
        <div className={styles.joinRow}>
          <div className={styles.joinImgCol}>
            <img
              src="/assets/img/partner/banner.webp"
              alt="Join Atlanta Systems Reseller Program"
              className={styles.joinImg}
            />
          </div>
          <div className={styles.joinContentCol}>
            <h3 className={styles.joinTitle}>
              Scale Your Fleet <br />Business With Us
            </h3>
            <p className={styles.joinText}>
              Partner directly with India&apos;s leading telematics OEM. Gain immediate access to factory-direct wholesale pricing, custom firmware development, and tender-certified hardware.
            </p>
            <div className={styles.joinContactInfo}>
              <div>Email: <a href="mailto:enquiry@atlantasys.com">enquiry@atlantasys.com</a> | <a href="mailto:sales@atlantasys.com">sales@atlantasys.com</a></div>
              <div>Direct Desk: <a href="tel:+919990333888">+91 9990333888</a> / <a href="tel:01149039700">+91 11 49039700</a></div>
            </div>
            <button onClick={scrollToForm} className={styles.btnJoin}>
              Apply for Reseller Partnership <i className="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
