'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from '../reseller/Reseller.module.css';

// Technical Engineering & Hardware Guides for Partners
const RELEVANT_PARTNER_BLOGS = [
  {
    category: 'Vehicle Tracking Hardware',
    title: "How Atlanta Systems' VLT-100 GPS Trackers Ensure Mission-Critical Reliability",
    excerpt: 'Explore dual-IP backend streaming, emergency panic failover loops, IP67 ruggedized housings, and high-precision GNSS tracking hardware.',
    readTime: '12 min read',
    slug: 'how-atlanta-systems-ais-140-vlt-100-gps-trackers-solve-real-time-compliance-on-indias-national-highways',
    image: '/blog/how-atlanta-systems-ais-140-vlt-100-gps-trackers-solve-real-time-compliance-on-indias-national-highways.webp',
  },
  {
    category: 'Edge AI Video Hardware',
    title: 'AI Dual-Lens Dash Cams: Edge Safety & Driver In-Cabin Monitoring',
    excerpt: 'On-device neural processing units (NPU) delivering drowsiness detection, driver distraction alarms, forward collision warnings, and local SD card storage.',
    readTime: '12 min read',
    slug: 'ai-dual-lens-dash-cams-from-atlanta-systems-reducing-accidents-on-los-angeles-i-710-port-drayage-routes',
    image: '/blog/ai-dual-lens-dash-cams-from-atlanta-systems-reducing-accidents-on-los-angeles-i-710-port-drayage-routes.webp',
  },
  {
    category: 'Precision Fuel Instrumentation',
    title: 'Digital Capacitive Fuel Probes: Eliminating Theft Across Commercial Routes',
    excerpt: 'Solid-state capacitive fuel sensors with ±0.3% volumetric accuracy, rapid sampling frequency, and RS-485 digital output across heavy vehicle tanks.',
    readTime: '12 min read',
    slug: 'capacitive-fuel-probes-from-atlanta-systems-stopping-siphoning-on-riyadh-ring-road-overnight-stops',
    image: '/blog/capacitive-fuel-probes-from-atlanta-systems-stopping-siphoning-on-riyadh-ring-road-overnight-stops.webp',
  },
  {
    category: 'Engine Telemetry',
    title: 'CAN-Bus J1939 Decoders: Unlocking High-Resolution Engine Diagnostics',
    excerpt: 'Non-intrusive contactless magnetic readers capturing live torque, engine RPM, coolant temperature, fuel consumption rates, and real-time DTC fault codes.',
    readTime: '12 min read',
    slug: 'can-bus-j1939-readers-by-atlanta-systems-unlocking-engine-data-on-houstons-i-10-energy-corridor',
    image: '/blog/can-bus-j1939-readers-by-atlanta-systems-unlocking-engine-data-on-houstons-i-10-energy-corridor.webp',
  },
  {
    category: 'Commercial MDVR Systems',
    title: '4-Channel Mobile DVRs: Multi-Camera Visibility for Heavy Fleets',
    excerpt: 'Vibration-dampened solid-state MDVR systems with 4G cellular transmission, blind-spot monitoring, lockable storage bays, and aviation-grade connectors.',
    readTime: '12 min read',
    slug: '4-channel-mobile-dvrs-by-atlanta-systems-for-complete-cabin-and-road-coverage-in-warsaw-a2-corridor-fleets',
    image: '/blog/4-channel-mobile-dvrs-by-atlanta-systems-for-complete-cabin-and-road-coverage-in-warsaw-a2-corridor-fleets.webp',
  },
  {
    category: 'Cold Chain Instrumentation',
    title: 'BLE 5.0 Wireless Beacons: Multi-Zone Temperature Telemetry',
    excerpt: 'Industrial Bluetooth Low Energy sensors delivering continuous temperature logging, door opening audits, and multi-year battery longevity for reefers.',
    readTime: '12 min read',
    slug: 'ble-5-0-beacons-by-atlanta-systems-enabling-multi-zone-temperature-mapping-on-warsaw-pharma-routes',
    image: '/blog/ble-5-0-beacons-by-atlanta-systems-enabling-multi-zone-temperature-mapping-on-warsaw-pharma-routes.webp',
  },
];

export default function PartnerProgramPage() {
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
    targetRegion: 'North America',
    websiteUrl: '',
    orgType: 'Hardware Distributor / Channel Partner',
    hardwareVolume: '500 - 2,500 units/year',
    features: ['GPS Vehicle Trackers', 'AI Dash Cams & MDVR'],
    trackVehicles: ['Commercial Trucks', 'Trailers & Containers'],
    comments: '',
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxToggle = (field, item) => {
    setFormData(prev => {
      const current = prev[field];
      const next = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [field]: next };
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.companyName.trim()) {
        setErrorMessage('Please fill in all required fields before proceeding.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorMessage('Please enter a valid work email address.');
        return;
      }
    }
    setErrorMessage('');
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setErrorMessage('');
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    try {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('formSubmitted', 'true');
        sessionStorage.setItem('submittedSource', 'partner-program');
        sessionStorage.setItem('partnerName', `${formData.firstName} ${formData.lastName}`);
        sessionStorage.setItem('partnerCompany', formData.companyName);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('Submission failed. Please reach out directly to enquiry@atlantasys.com.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('partnerFormCard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className={styles.resellerPage}>
      <Header />

      {/* HERO SECTION + MULTI-STEP PARTNER APPLICATION FORM */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-6 col-md-12">
              <div className={styles.heroContent}>
                <div className={styles.heroBadge}>
                  <i className="fas fa-handshake"></i> Atlanta Systems Global Partner Program
                </div>
                <h1 className={styles.heroTitle}>
                  Direct Factory OEM Telematics Hardware.
                </h1>
                <h2 className={styles.heroSubtitle}>
                  Engineered for Global Deployments.
                </h2>
                <p className={styles.heroDesc}>
                  Partner directly with Atlanta Systems to supply high-reliability GPS tracking devices, edge AI dashcams, digital fuel probes, and CAN-bus telemetry hardware. Accelerate your market expansion with tier-3 engineering collaboration and direct wholesale manufacturing pricing.
                </p>
              </div>
            </div>

            {/* Right Interactive Multi-Step Form */}
            <div className="col-lg-6 col-md-12" id="partnerFormCard">
              <div className={styles.formCard}>
                <h2 className={styles.formCardTitle}>Apply for Partner Program</h2>
                <p className={styles.formCardSub}>
                  Join 500+ certified hardware distributors, system integrators, and telematics partners operating across 50+ countries.
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
                      Thank you, <strong>{formData.firstName}</strong>. Our commercial OEM partnerships team will review your market requirements and contact you within 24 hours with volume hardware catalogs and protocol specifications.
                    </p>
                    <button
                      className={styles.btnNext}
                      style={{ margin: '0 auto', maxWidth: '240px' }}
                      onClick={() => {
                        setSubmitted(false);
                        setCurrentStep(1);
                      }}
                    >
                      Submit Another Inquiry
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
                              placeholder="e.g. David"
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
                              placeholder="e.g. Miller"
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
                              placeholder="david@company.com"
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
                              placeholder="+1 (555) 234-5678"
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
                            placeholder="e.g. Apex Telematics Solutions"
                            className={styles.formInput}
                            value={formData.companyName}
                            onChange={handleTextChange}
                          />
                        </div>

                        <div className={styles.formRow}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                              Primary Target Territory <span className={styles.requiredStar}>*</span>
                            </label>
                            <select
                              name="targetRegion"
                              className={styles.formSelect}
                              value={formData.targetRegion}
                              onChange={handleTextChange}
                            >
                              <option value="North America">North America (USA &amp; Canada)</option>
                              <option value="Europe">Europe (EU &amp; UK)</option>
                              <option value="Middle East / GCC">Middle East &amp; GCC</option>
                              <option value="Southeast Asia">Southeast Asia (ASEAN)</option>
                              <option value="Latin America">Latin America</option>
                              <option value="Africa">Africa</option>
                              <option value="Global / Other">Global / Multi-Region</option>
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
                            Business Classification <span className={styles.requiredStar}>*</span>
                          </label>
                          <div className={styles.choiceGrid}>
                            {[
                              'Hardware Distributor / Channel Partner',
                              'Telematics Solution Provider',
                              'System Integrator',
                              'Enterprise Fleet Operator / OEM'
                            ].map((item) => (
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
                            Estimated Annual Hardware Volume <span className={styles.requiredStar}>*</span>
                          </label>
                          <div className={styles.choiceGrid}>
                            {[
                              '100 - 500 units/year',
                              '500 - 2,500 units/year',
                              '2,500 - 10,000 units/year',
                              '10,000+ Enterprise Volume'
                            ].map((item) => (
                              <div
                                key={item}
                                className={`${styles.choiceCard} ${formData.hardwareVolume === item ? styles.choiceCardActive : ''}`}
                                onClick={() => handleRadioChange('hardwareVolume', item)}
                              >
                                <div className={`${styles.choiceCheck} ${styles.choiceRadio}`}>
                                  {formData.hardwareVolume === item && <i className="fas fa-check"></i>}
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
                            Hardware Categories of Interest (Select all that apply)
                          </label>
                          <div className={styles.choiceGrid}>
                            {[
                              'GPS Vehicle Trackers',
                              'AI Dash Cams & MDVR',
                              'Capacitive Fuel Level Probes',
                              'Asset & Solar Trackers',
                              'CAN-Bus Decoders (J1939)',
                              'BLE Temperature Sensors'
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
                            Target Assets &amp; Fleet Types
                          </label>
                          <div className={styles.choiceGrid}>
                            {[
                              'Commercial Trucks',
                              'Reefer & Cold Chain',
                              'Buses & Transit Coaches',
                              'Heavy Mining & Construction',
                              'Passenger Vehicles',
                              'Trailers & Shipping Containers'
                            ].map((item) => {
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
                            Protocol &amp; Hardware Specifications
                          </label>
                          <textarea
                            name="comments"
                            rows={3}
                            placeholder="Specify required protocols (TCP/UDP, MQTT), cellular bands, custom firmware routines, or certification requirements..."
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

      {/* SECTION 1: WHY PARTNER WITH US */}
      <section className={styles.whySection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
              <div className={styles.threeImgGrid}>
                <img
                  src="/assets/img/reseller/three-img.webp"
                  alt="Atlanta Systems Telematics Hardware Engineering"
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
                DIRECT OEM ADVANTAGE
              </div>
              <h2 className={styles.sectionTitle}>
                Direct Factory Engineering. <br />Maximum Margin Control.
              </h2>
              <p className={styles.sectionDesc}>
                Atlanta Systems equips hardware distributors and system integrators with factory-direct reliability, agile firmware engineering, and dedicated tier-3 technical support to win high-volume commercial contracts and dominate regional telematics channels.
              </p>
              <p className={styles.sectionDesc}>
                Our hardware ecosystem covers the entire commercial mobility spectrum: high-precision GPS tracking devices, on-device AI dual-lens dashcams, digital capacitive fuel probes with sub-millimeter calibration, inductive CAN-bus listeners, and long-life asset trackers engineered for extreme physical environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 PILLARS GRID */}
      <section className={styles.featuresGrid}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <img
                    src="/assets/img/partner/revenue.svg"
                    alt="Direct Factory Wholesale Margins"
                    className={styles.featureIcon}
                  />
                </div>
                <h3 className={styles.featureTitle}>Factory-Direct Margins</h3>
                <p className={styles.featureText}>
                  Maximize commercial profitability with factory-direct wholesale pricing, tier-based volume discounts, and zero distributor markups.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <img
                    src="/assets/img/partner/technology-expertise.svg"
                    alt="Full Hardware Telematics Stack"
                    className={styles.featureIcon}
                  />
                </div>
                <h3 className={styles.featureTitle}>Complete Hardware Stack</h3>
                <p className={styles.featureText}>
                  Supply everything your customers need: 4G/5G GPS trackers, AI safety dashcams, digital anti-siphoning fuel rods, BLE temperature beacons, and heavy CAN-bus readers.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <img
                    src="/assets/img/partner/pioneer-in-innovations.svg"
                    alt="32+ Years Hardware Engineering"
                    className={styles.featureIcon}
                  />
                </div>
                <h3 className={styles.featureTitle}>32+ Years OEM Heritage</h3>
                <p className={styles.featureText}>
                  Backed by three decades of electronics manufacturing expertise. Receive direct collaboration from in-house RF and firmware engineering teams.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIconWrapper}>
                  <img
                    src="/assets/img/partner/reliability.svg"
                    alt="Industrial Grade Hardware Reliability"
                    className={styles.featureIcon}
                  />
                </div>
                <h3 className={styles.featureTitle}>Industrial Durability</h3>
                <p className={styles.featureText}>
                  Engineered with automotive-grade surge protection, IP67/IP69K ingress ratings, vibration-dampened housings, and zero field failures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DIFFERENT MEANS BETTER */}
      <section className={styles.differentSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
              <div className={styles.sectionTag}>
                <img
                  src="/assets/img/reseller/heading-icon-small.webp"
                  alt="Our Differentiators"
                  className={styles.sectionTagIcon}
                />
                TRUE HARDWARE SOVEREIGNTY
              </div>
              <h2 className={styles.sectionTitle}>
                Original Engineering From Component Sourcing to Surface Mount
              </h2>
              <p className={styles.sectionDesc}>
                Atlanta Systems gives your business technical control, rapid firmware adjustments, and hardware reliability to stand out in competitive commercial markets.
              </p>
              <p className={styles.sectionDesc}>
                Unlike trading intermediaries that distribute third-party gadgets with closed, unalterable firmware, Atlanta Systems maintains complete design and production ownership. We architect our multi-layer PCBs, select automotive-grade silicon, compile proprietary embedded firmware, and operate precision surface-mount assembly lines.
              </p>
            </div>
            <div className="col-lg-6 col-md-12 text-center">
              <img
                src="/assets/img/reseller/big-img-right.webp"
                alt="Atlanta Systems Hardware Differentiators"
                className={styles.diffImg}
              />
            </div>
          </div>

          {/* 5 Differentiator Cards */}
          <div className={styles.diffPillarsGrid}>
            <div className={styles.diffPillarCard}>
              <h4 className={styles.diffPillarTitle}>
                <i className="fas fa-microchip" style={{ marginRight: '8px' }}></i> SMT Manufacturing &amp; Firmware R&amp;D
              </h4>
              <p className={styles.diffPillarText}>
                Complete engineering sovereignty over circuit design, component selection, RF antenna layout, and custom firmware protocol stacks.
              </p>
            </div>

            <div className={styles.diffPillarCard}>
              <h4 className={styles.diffPillarTitle}>
                <i className="fas fa-video" style={{ marginRight: '8px' }}></i> Edge AI Video &amp; ADAS Cameras
              </h4>
              <p className={styles.diffPillarText}>
                Dual-lens dashcams with on-device neural processing units (NPU) that execute real-time driver distraction, fatigue, and collision alerts directly on the device.
              </p>
            </div>

            <div className={styles.diffPillarCard}>
              <h4 className={styles.diffPillarTitle}>
                <i className="fas fa-cogs" style={{ marginRight: '8px' }}></i> Custom OEM &amp; Hardware Branding
              </h4>
              <p className={styles.diffPillarText}>
                Tailor hardware enclosures with laser-etched partner logos, bespoke color finishes, custom packaging, and customized device startup handshakes.
              </p>
            </div>

            <div className={styles.diffPillarCard}>
              <h4 className={styles.diffPillarTitle}>
                <i className="fas fa-network-wired" style={{ marginRight: '8px' }}></i> Open Telemetry Protocols
              </h4>
              <p className={styles.diffPillarText}>
                Zero vendor lock-in. Devices stream raw, structured telemetry via TCP/UDP, MQTT, or HTTP REST webhooks directly to your own server or third-party fleet software.
              </p>
            </div>

            <div className={styles.diffPillarCard}>
              <h4 className={styles.diffPillarTitle}>
                <i className="fas fa-shield-alt" style={{ marginRight: '8px' }}></i> Global Regulatory Certifications
              </h4>
              <p className={styles.diffPillarText}>
                Hardware built to meet international compliance frameworks including CE, FCC, RoHS, PTCRB, E-Mark, AIS-140, and ISO 9001 quality governance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PARTNER INTELLIGENCE & TELEMATICS ENGINEERING GUIDES */}
      <section className={styles.whatWeOfferSection}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: '780px', margin: '0 auto 40px' }}>
            <div className={styles.sectionTag} style={{ justifyContent: 'center' }}>
              <img
                src="/assets/img/reseller/heading-icon-small.webp"
                alt="Partner Insights"
                className={styles.sectionTagIcon}
              />
              HARDWARE INTELLIGENCE &amp; ENGINEERING BLUEPRINTS
            </div>
            <h2 className={styles.sectionTitle}>
              Field-Proven Engineering: Hardware Deep Dives
            </h2>
            <p className={styles.sectionDesc}>
              Arm your technical and sales teams with deployment architectures, sensor integration protocols, and hardware benchmarks designed to win commercial fleet tenders.
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
                      <i className="fas fa-microchip"></i> Technical Guide
                    </span>
                  </div>
                  <h3 className={styles.articleTitle}>{blog.title}</h3>
                  <p className={styles.articleText}>{blog.excerpt}</p>
                  <a href={`/blog/${blog.slug}`} className={styles.articleLink}>
                    <span>Read Technical Guide</span>
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

      {/* SECTION 4: CALL TO ACTION / BOTTOM BANNER */}
      <section className={styles.joinBannerSection}>
        <div className={styles.joinRow}>
          <div className={styles.joinImgCol}>
            <img
              src="/assets/img/partner/banner.webp"
              alt="Join Atlanta Systems Partner Program"
              className={styles.joinImg}
            />
          </div>
          <div className={styles.joinContentCol}>
            <h3 className={styles.joinTitle}>
              Scale Your Fleet <br />Hardware Business
            </h3>
            <p className={styles.joinText}>
              Partner directly with a premier global telematics hardware OEM. Gain immediate access to factory-direct wholesale pricing, custom firmware compilation, and tender-certified hardware.
            </p>
            <div className={styles.joinContactInfo}>
              <div>Email: <a href="mailto:enquiry@atlantasys.com">enquiry@atlantasys.com</a> | <a href="mailto:sales@atlantasys.com">sales@atlantasys.com</a></div>
              <div>International Desk: <a href="tel:+919990333888">+91 9990333888</a> / <a href="tel:+911149039700">+91 11 49039700</a></div>
            </div>
            <button onClick={scrollToForm} className={styles.btnJoin}>
              Apply for Partner Program <i className="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
