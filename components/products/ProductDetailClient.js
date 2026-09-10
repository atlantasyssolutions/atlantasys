'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProductDetailClient({ product, relatedProducts = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [expandedAll, setExpandedAll] = useState(false);
  const [openPanels, setOpenPanels] = useState({});

  const togglePanel = (idx) => {
    setOpenPanels(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleAllAccordions = () => {
    setExpandedAll(!expandedAll);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .banner-btn .default-btn {
          color: #222;
          border: 1px solid #222;
          background: transparent;
        }
        @media (min-width: 1200px) {
          .container, .container-lg, .container-md, .container-sm, .container-xl {
            max-width: 1140px !important;
          }
        }
      `}} />

      <div className="banner-four-area product-detail-area pt-50 pb-50">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-5">
              <div className="banner-four-content">
                <div className="heading-title">
                  <h2 style={{ textAlign: 'left' }}>{product.name}</h2>
                </div>
                <p>{product.description}</p>
                <div className="banner-btn">
                  <Link href="/contact" className="default-btn btn-bg-two border-radius-50 edit">
                    Get Quotation <i className="fas fa-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-6" style={{ zIndex: 100 }} align="center">
              <div id="contents1" className="contents">
                <img src={product.image} itemProp="thumbnail" alt={product.name} className="w-100 d-block" style={{ maxHeight: '400px', objectFit: 'contain', margin: '0 auto' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {product.features && product.features.length > 0 && (
        <div className="about-area pb-50 pt-50">
          <div className="container">
            <div className="heading-title">
              <h2>Features</h2>
            </div>
            <div className="row align-items-center justify-content-center">
              {product.features.map((fea, idx) => (
                <div className="col-md-6 pt-50" key={idx}>
                  <div className="feature_bx">
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <img src={fea.image || '/assets/img/product.png'} alt={fea.name} />
                      </div>
                      <div className="col-md-7">
                        <h2 className="feature-h2">{fea.name}</h2>
                        <p>{fea.description || fea.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {product.specsGrouped && product.specsGrouped.length > 0 && (
        <div className="faq-area pt-50 pb-50">
          <div className="container">
            <div className="heading-title">
              <h2>Product Specifications</h2>
            </div>
            <div align="right">
              <button id="collapseAll" onClick={toggleAllAccordions} className="btn btn-primary mb-3">
                {expandedAll ? 'Hide all' : 'Show all'}
              </button>
            </div>
            <div className="accordion" id="accordionExample">
              {product.specsGrouped.map((grp, idx) => (
                <div className="accordion-item" key={idx}>
                  <h2 className="accordion-header" id={`heading${idx}`}>
                    <button 
                      className={`accordion-button ${expandedAll || openPanels[idx] ? '' : 'collapsed'}`}
                      type="button" 
                      onClick={() => togglePanel(idx)}
                      aria-expanded={expandedAll || openPanels[idx] ? "true" : "false"}
                    >
                      {grp.category}
                    </button>
                  </h2>
                  <div id={`collapse${idx}`} className={`accordion-collapse collapse ${expandedAll || openPanels[idx] ? 'show' : ''}`} aria-labelledby={`heading${idx}`}>
                    <div className="accordion-body">
                      <div className="row align-items-center justify-content-center">
                        <div className="col-md-7">
                          <table className="table">
                            <tbody>
                              {grp.items.map((item, sIdx) => (
                                <tr key={sIdx}>
                                  <td>{item.name}</td>
                                  <td>{item.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(product.brochure || product.userManual || product.driver || product.wiringScheme) && (
        <div className="service-area pb-50" style={{ background: '#f7f7f7' }}>
          <br /><br />
          <div className="container">
            <div className="row align-items-center justify-content-center">
              {product.brochure && (
                <div className="col-md-3">
                  <div className="brochure-div">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-4">
                        <img src="/assets/img/pdf.webp" style={{ width: '100%' }} alt="Brochure" />
                      </div>
                      <div className="col-md-8">
                        <a href={product.brochure} target="_blank" rel="noopener noreferrer">Download Brochure</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {product.userManual && (
                <div className="col-md-3">
                  <div className="brochure-div">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-4">
                        <img src="/assets/img/pdf.webp" style={{ width: '100%' }} alt="User Manual" />
                      </div>
                      <div className="col-md-8">
                        <a href={product.userManual} target="_blank" rel="noopener noreferrer">Download User Manual</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {product.driver && (
                <div className="col-md-3">
                  <div className="brochure-div">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-4">
                        <img src="/assets/img/pdf.webp" style={{ width: '100%' }} alt="Driver" />
                      </div>
                      <div className="col-md-8">
                        <a href={product.driver} target="_blank" rel="noopener noreferrer">Download Driver</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {product.wiringScheme && (
                <div className="col-md-3">
                  <div className="brochure-div">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-4">
                        <img src="/assets/img/pdf.webp" style={{ width: '100%' }} alt="Wiring Scheme" />
                      </div>
                      <div className="col-md-8">
                        <a href={product.wiringScheme} target="_blank" rel="noopener noreferrer">Download Wiring Scheme</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
