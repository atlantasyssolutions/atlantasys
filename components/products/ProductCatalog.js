'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { productsData, categories } from '@/data/products';

export default function ProductCatalog({ initialCategory = 'vehicle-telematics' }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expandedAll, setExpandedAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('specs');

  // Filter groups
  const filterGroups = [
    {
      id: 'connectivity',
      title: 'Connectivity',
      options: ['2G Band', '4G Band', 'Channels', 'GNSS']
    },
    {
      id: 'hardwareconnectors',
      title: 'Hardware Connectors',
      options: ['1-RPM / 1-Wire', '1-Wire', 'Analog Input', 'CAN', 'Digital Input', 'Digital Output', 'Pulse Counter', 'RS232', 'RS485', 'RS232/RS485']
    },
    {
      id: 'powersupply',
      title: 'Power Supply',
      options: ['8-36V DC', '8-55V DC', '9-90V DC']
    },
    {
      id: 'bluetooth',
      title: 'Bluetooth',
      options: ['BLE 5.0', 'BT 4.0']
    },
    {
      id: 'sim',
      title: 'SIM',
      options: ['Dual Micro SIM', 'eSIM', 'Micro SIM', 'Nano SIM- 4FF']
    },
    {
      id: 'ingressprotection',
      title: 'Ingress Protection',
      options: ['IP54', 'IP65', 'IP67']
    },
    {
      id: 'antennas',
      title: 'Antennas',
      options: ['GNSS Antenna', 'GSM Antenna', 'LTE Antenna']
    }
  ];

  const handleCheckboxChange = (group, value) => {
    setSelectedFilters(prev => {
      const currentGroup = prev[group] || [];
      const updated = currentGroup.includes(value)
        ? currentGroup.filter(v => v !== value)
        : [...currentGroup, value];
      
      return {
        ...prev,
        [group]: updated
      };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      // Category check (if category is selected)
      if (activeCategory && activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Check each filter group
      for (const [group, selectedValues] of Object.entries(selectedFilters)) {
        if (selectedValues && selectedValues.length > 0) {
          const productValue = product.specs[group];
          if (!productValue) return false;
          
          const match = selectedValues.some(val => productValue.toLowerCase().includes(val.toLowerCase()));
          if (!match) return false;
        }
      }

      return true;
    });
  }, [activeCategory, selectedFilters]);

  return (
    <div className="about-area about-top-area pt-50 pb-50" style={{ background: '#fff' }}>
      <div className="container">
        <div className="heading-title mb-4">
          <h2 style={{ color: '#0F2D4E', fontWeight: '800' }}>Our Products</h2>
        </div>

        {/* Sub-nav categories bar */}
        <div className="list-design mb-5">
          <div className="cata-sub-nav text-center" style={{ background: '#F8FAFC', padding: '15px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <ul className="d-flex flex-wrap justify-content-center gap-2 list-unstyled mb-0">
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => setActiveCategory(cat.id)}
                    className="btn text-capitalize"
                    style={{
                      background: activeCategory === cat.id ? '#0F2D4E' : '#FFFFFF',
                      color: activeCategory === cat.id ? '#FFFFFF' : '#475569',
                      border: '1px solid ' + (activeCategory === cat.id ? '#0F2D4E' : '#CBD5E1'),
                      borderRadius: '6px',
                      padding: '8px 18px',
                      fontSize: '14px',
                      fontWeight: '700',
                      transition: 'all 0.2s'
                    }}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Product Layout */}
        <div className="row">
          {/* Left Column: Product Cards */}
          <div className="col-lg-9 col-md-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-5" style={{ background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <i className="fas fa-search-minus fa-3x text-muted mb-3"></i>
                <h4 style={{ color: '#0F2D4E' }}>No Products Found</h4>
                <p className="text-muted">Try unchecking some filter options to see more products.</p>
                <button onClick={clearFilters} className="btn btn-outline-primary btn-sm mt-2">Clear All Filters</button>
              </div>
            ) : (
              <div className="row g-4">
                {filteredProducts.map(product => (
                  <div className="col-lg-4 col-md-6" key={product.id}>
                    <div className="card h-100 product-card" style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', background: '#FFFFFF', transition: 'transform 0.2s' }}>
                      <div style={{ position: 'relative', height: '220px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <img src={product.image} alt={product.name} style={{ maxHeight: '180px', maxWidth: '100%', objectFit: 'contain' }} />
                        <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#0F2D4E', color: '#FFFFFF', fontSize: '11px', padding: '4px 10px', borderRadius: '20px', fontWeight: '700' }}>
                          {product.tag}
                        </span>
                      </div>

                      <div className="card-body d-flex flex-column p-4">
                        <span style={{ color: '#0169A9', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>{product.categoryName}</span>
                        <h3 className="card-title mt-1 mb-2" style={{ fontSize: '18px', fontWeight: '800', color: '#0F2D4E' }}>{product.name}</h3>
                        <p className="card-text text-muted" style={{ fontSize: '13px', lineHeight: '1.5', flexGrow: 1 }}>{product.description}</p>

                        <div className="mt-3 pt-3 border-top d-flex gap-2">
                          <button
                            onClick={() => { setSelectedProduct(product); setActiveTab('specs'); }}
                            className="btn btn-outline-dark btn-sm flex-grow-1"
                            style={{ borderRadius: '6px', fontSize: '13px', fontWeight: '700', borderColor: '#CBD5E1' }}
                          >
                            <i className="fas fa-info-circle me-1"></i> Details
                          </button>
                          <Link
                            href="/contact"
                            className="btn btn-primary btn-sm flex-grow-1"
                            style={{ background: '#0169A9', borderColor: '#0169A9', borderRadius: '6px', fontSize: '13px', fontWeight: '700' }}
                          >
                            Inquire <i className="fas fa-arrow-right ms-1"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Filter Sidebar */}
          <div className="col-lg-3 col-md-4">
            <div className="filter-sidebar p-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', position: 'sticky', top: '90px' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: '#0F2D4E' }}>
                  <i className="fas fa-filter me-2" style={{ color: '#0169A9' }}></i> Filters
                </h4>
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none"
                  style={{ fontSize: '13px', color: '#0169A9', fontWeight: '700' }}
                  onClick={() => setExpandedAll(!expandedAll)}
                >
                  {expandedAll ? 'Collapse all' : 'Expand all'}
                </button>
              </div>
              <hr className="my-2" />

              <div className="accordion accordion-flush" id="productFilterAccordion">
                {filterGroups.map((group) => (
                  <div className="accordion-item" key={group.id} style={{ background: 'transparent' }}>
                    <h2 className="accordion-header" id={`heading_${group.id}`}>
                      <button
                        className={`accordion-button ${expandedAll ? '' : 'collapsed'}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse_${group.id}`}
                        aria-expanded={expandedAll}
                        style={{ background: 'transparent', padding: '12px 0', fontSize: '14px', fontWeight: '700', color: '#0F2D4E' }}
                      >
                        {group.title}
                      </button>
                    </h2>
                    <div
                      id={`collapse_${group.id}`}
                      className={`accordion-collapse collapse ${expandedAll ? 'show' : ''}`}
                    >
                      <div className="accordion-body px-0 py-2">
                        {group.options.map(opt => (
                          <div className="form-check mb-1" key={opt}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`check_${group.id}_${opt}`}
                              checked={(selectedFilters[group.id] || []).includes(opt)}
                              onChange={() => handleCheckboxChange(group.id, opt)}
                              style={{ cursor: 'pointer' }}
                            />
                            <label className="form-check-label ms-1" htmlFor={`check_${group.id}_${opt}`} style={{ fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                              {opt}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {Object.values(selectedFilters).some(arr => arr.length > 0) && (
                <button onClick={clearFilters} className="btn btn-outline-danger btn-sm w-100 mt-3" style={{ fontSize: '12px', fontWeight: '700' }}>
                  <i className="fas fa-trash-alt me-1"></i> Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', zIndex: 1050 }} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: '12px', border: 'none', overflow: 'hidden' }}>
              <div className="modal-header px-4 py-3" style={{ background: '#0F2D4E', color: '#FFFFFF' }}>
                <h5 className="modal-title font-weight-bold" style={{ fontSize: '20px' }}>{selectedProduct.name}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedProduct(null)}></button>
              </div>
              <div className="modal-body p-4" style={{ background: '#FFFFFF' }}>
                <div className="row align-items-center mb-4">
                  <div className="col-md-5 text-center p-3" style={{ background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <img src={selectedProduct.image} alt={selectedProduct.name} style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                  <div className="col-md-7">
                    <span style={{ background: '#0F2D4E', color: '#FFFFFF', fontSize: '12px', padding: '4px 12px', borderRadius: '20px', fontWeight: '700' }}>
                      {selectedProduct.tag}
                    </span>
                    <h4 className="mt-3 mb-2" style={{ color: '#0F2D4E', fontWeight: '800' }}>{selectedProduct.name}</h4>
                    <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.6' }}>{selectedProduct.description}</p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="custom-tabs d-flex gap-3 mb-3 border-bottom pb-2">
                  <button
                    className={`btn btn-link text-decoration-none p-0 pb-2 ${activeTab === 'specs' ? 'fw-bold border-bottom border-primary border-3' : 'text-muted'}`}
                    onClick={() => setActiveTab('specs')}
                    style={{ color: activeTab === 'specs' ? '#0169A9' : '#64748B', fontWeight: '700' }}
                  >
                    Technical Specifications
                  </button>
                </div>

                <div className="tab-content">
                  {activeTab === 'specs' && (
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped" style={{ fontSize: '13px' }}>
                        <tbody>
                          {Object.entries(selectedProduct.specs).map(([key, val]) => (
                            <tr key={key}>
                              <td className="fw-bold text-capitalize" style={{ width: '40%', background: '#F8FAFC', color: '#0F2D4E' }}>{key.replace(/([A-Z])/g, ' $1')}</td>
                              <td style={{ color: '#334155' }}>{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer px-4 py-3" style={{ background: '#F8FAFC' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedProduct(null)}>Close</button>
                <Link href="/contact" className="btn btn-primary" style={{ background: '#0169A9', borderColor: '#0169A9', fontWeight: '700' }}>
                  Request Quote / Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
