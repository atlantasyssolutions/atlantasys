'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { productsData, categories } from '@/data/products';

export default function ProductCatalog({ initialCategory = 'all' }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [openAccordions, setOpenAccordions] = useState({});
  const [activeTab, setActiveTab] = useState('india');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter groups
  const filterGroups = [
    {
      id: 'connectivity',
      title: 'Connectivity',
      options: ['2G Band', '4G Band', '4G LTE Cat M1 Band', 'Channels', 'GNSS']
    },
    {
      id: 'hardwareconnectors',
      title: 'Hardware Connectors',
      options: ['1-RPM / 1-Wire', '1-Wire', 'Analog Input', 'CAN', 'Digital Input', 'Digital Output', 'Pulse Counter', 'RS232', 'RS485', 'RS232/RS485', 'Uart', 'Can', 'K-Line']
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
      options: ['Plastic SIM', 'Dual Micro SIM', 'eSIM', 'Micro SIM', 'Nano SIM- 4FF']
    },
    {
      id: 'ingressprotection',
      title: 'Ingress Protection',
      options: ['IP30', 'IP41', 'IP54', 'IP65', 'IP67', 'IP68', 'IP69']
    },
    {
      id: 'battery',
      title: 'Battery',
      options: ['120mAh Li-Po 3.7V', '170mAh Li-Po 3.7V', '250mAh Li-Po 3.7V', '300mAh Li-Po 3.7V', '500mAh Li-Po 3.7V', '1000mAh Li-Po 3.7V', '2600mAh Li-Po 3.7V', '5000mAh Li-Po 3.7V', '10000mAh Li-Po 3.7V', '19000mAh Li-Po 3.7V']
    },
    {
      id: 'antennas',
      title: 'Antennas',
      options: ['Internal GNSS', 'External GNSS', 'Internal GSM', 'External GSM', 'GNSS Antenna', 'GSM Antenna', 'LTE Antenna']
    },
    {
      id: 'memory',
      title: 'Memory',
      options: ['6,000 Log Packets', '10,000 Log Packets', '12,000 Log Packets', '25,000 Log Packets', '40,000 Log Packets', '50,000 Log Packets', '80,000 Log Packets', '32Mb', '16GB SD Card & 4MB Flash']
    }
  ];

  const handleCheckboxChange = (group, value) => {
    setCurrentPage(1); // Reset page on filter change
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

  const toggleAccordion = (id) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAllFilters = () => {
    const allOpen = {};
    filterGroups.forEach(g => allOpen[g.id] = true);
    setOpenAccordions(allOpen);
  };

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      // Category check
      if (activeCategory && activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Check each filter group
      for (const [group, selectedValues] of Object.entries(selectedFilters)) {
        if (selectedValues && selectedValues.length > 0) {
          const allSpecs = product.specsGrouped?.flatMap(g => g.items) || [];
          
          // In legacy PHP, multiple selections within the same filter group use AND logic (HAVING SUM(x=?)>0 AND SUM(x=?)>0)
          const match = selectedValues.every(val => {
            const lowerVal = val.toLowerCase();
            
            // Legacy mapped groups:
            // name-based: interface (hardwareconnectors), connectivity, antennas
            // value-based: power, bluetooth, sim, ingress, battery, memory
            const nameBasedGroups = ['hardwareconnectors', 'connectivity', 'antennas'];
            const valueBasedGroups = ['powersupply', 'bluetooth', 'sim', 'ingressprotection', 'battery', 'memory'];
            
            let matchInGrouped = false;
            
            if (nameBasedGroups.includes(group)) {
              matchInGrouped = allSpecs.some(spec => spec.name && spec.name.toLowerCase().includes(lowerVal));
            } else if (valueBasedGroups.includes(group)) {
              matchInGrouped = allSpecs.some(spec => spec.value && spec.value.toLowerCase().includes(lowerVal));
            } else {
              // Fallback
              matchInGrouped = allSpecs.some(spec => 
                (spec.name && spec.name.toLowerCase().includes(lowerVal)) || 
                (spec.value && spec.value.toLowerCase().includes(lowerVal))
              );
            }

            // Fallback check in flat specs object if not found in grouped specs
            const matchInFlat = !matchInGrouped && Object.values(product.specs || {}).some(specVal => 
              String(specVal).toLowerCase().includes(lowerVal)
            );

            return matchInGrouped || matchInFlat;
          });

          if (!match) return false;
        }
      }

      return true;
    });
  }, [activeCategory, selectedFilters]);

  const activeCategoryObj = categories.find(c => c.id === activeCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {/* Category Tabs / Sub-nav */}
      <div className="about-area about-top-area pt-50 pb-50">
        <div className="container">
          <div className="heading-title">
            <h2>Our Products</h2>
            <p align="center">World-leading tracking hardware for aftermarket and OEM applications. From easy track &amp; trace to professional CAN bus data reading, we cover it all.</p>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .active-cat button {
            color: #FFFFFF !important;
            background: #1d2250 !important;
            padding: 5px 20px;
            border-radius: 5px;
          }
          .accordion-button::after {
            display: none;
          }
          .filter_data {
            padding-right: 40px;
          }
          .filter-hide {
            background: #fafafa;
          }
          .accordion-item:first-of-type .accordion-button {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
          }
          .accordion-item:first-of-type {
            border-top-left-radius: 0 !important;
            border-top-right-radius: 0 !important;
          }
          .accordion-item {
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          .accordion button {
            padding: 10px 20px 20px;
          }
          .custom-tabs {
            border-bottom: 1px solid #dee2e6;
          }
          .tab-button {
            color: #6c757d;
            border: none;
            background: none;
            padding: 12px 20px;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
            text-decoration: none;
          }
          .tab-button:hover {
            color: #0d6efd;
            border-bottom-color: rgba(13, 110, 253, 0.3);
            background-color: rgba(13, 110, 253, 0.05);
          }
          .tab-button.active {
            color: #0d6efd;
            border-bottom-color: #0d6efd;
            font-weight: 600;
            background-color: rgba(13, 110, 253, 0.1);
          }
        `}} />
        <br />
        <div className="list-design">
          <div className="cata-sub-nav" align="center">
            <ul>
              <li className={activeCategory === 'all' ? 'active-cat' : ''}>
                <button onClick={() => setActiveCategory('all')} style={{background: 'none', border: 'none', cursor: 'pointer', padding: '5px 20px', color: '#1d2250'}}>All Trackers</button>
              </li>
              {categories.map(cat => (
                <li key={cat.id} className={activeCategory === cat.id ? 'active-cat' : ''}>
                  <button onClick={() => setActiveCategory(cat.id)} style={{background: 'none', border: 'none', cursor: 'pointer', padding: '5px 20px', color: '#1d2250'}}>{cat.name}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="product-area pt-10 pb-50">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9">
              <div className="heading-title">
                <h2 style={{ textAlign: 'left' }}>
                  {activeCategory === 'all' ? 'All Trackers' : activeCategoryObj?.name}
                  {activeCategory !== 'all' && <small style={{ fontSize: '15px', color: '#666', marginLeft: '10px' }}>({filteredProducts.length} Products)</small>}
                </h2>
                <p>
                  {activeCategory === 'all' ? 'Atlanta Systems offers a wide range of vehicle tracking products dedicated to professional applications.' : activeCategoryObj?.shortDescription}
                </p>
              </div>

              {/* India / International Tabs */}
              {activeCategory !== 'iot-sensors' && activeCategory !== 'universal-find-devices' && (
                <div className="custom-tabs mb-3">
                  <div className="d-flex">
                    <button 
                      className={`tab-button ${activeTab === 'india' ? 'active' : ''}`}
                      onClick={() => setActiveTab('india')}
                    >
                      INDIA
                    </button>
                    <button 
                      className={`tab-button ${activeTab === 'international' ? 'active' : ''}`}
                      onClick={() => setActiveTab('international')}
                    >
                      INTERNATIONAL
                    </button>
                  </div>
                </div>
              )}

              <div className="row filter_data">
                {currentItems.length === 0 ? (
                  <h3>No Product Found!!!</h3>
                ) : (
                  currentItems.map((product, idx) => (
                    <div className={activeCategory === 'iot-sensors' || activeCategory === 'universal-find-devices' ? "col-md-4 d-flex" : "col-md-6 d-flex"} key={`${product.id}-${idx}`}>
                      <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%' }}>
                        <div className="row align-items-center justify-content-center pro-bx h-100">
                          <div className="col-md-5">
                            <img src={product.image} className="pro-imgs" alt={product.name} style={{ maxHeight: '150px', objectFit: 'contain' }} />
                          </div>
                          <div className="col-md-7">
                            <div className="product-details">
                              <h4>{product.name}</h4>
                              <span>{product.tag || 'GPS Tracker'}</span>
                              <ul>
                                {product.features?.slice(0, 3).map((feat, fidx) => (
                                  <li key={fidx}>{typeof feat === 'string' ? feat : (feat.name || feat.description || '')}</li>
                                ))}
                              </ul>
                              <div className="product-bottom-details">
                                <div className="product-price">
                                  <span>View Details <i className="fas fa-angle-double-right"></i></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>
              
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4 mb-4">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => paginate(number)}>{number}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="col-md-3 filter-hide">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="filter-h3 m-0"><i className="fas fa-filter"></i> Filter</h3>
                <button onClick={expandAllFilters} className="btn btn-sm btn-outline-secondary">Expand all</button>
              </div>
              <hr />
              
              <div className="accordion" id="accordionStayOpen">
                {filterGroups.map((group) => {
                  const isOpen = openAccordions[group.id];
                  return (
                    <div className="accordion-item" key={group.id}>
                      <h2 className="accordion-header" id={`heading_${group.id}`}>
                        <button 
                          className={`accordion-button ${!isOpen ? 'collapsed' : ''}`}
                          type="button" 
                          onClick={() => toggleAccordion(group.id)}
                        >
                          {group.title}
                        </button>
                      </h2>
                      {isOpen && (
                        <div id={`collapse_${group.id}`} className="accordion-collapse collapse show">
                          <div className="accordion-body">
                            {group.options.map(opt => (
                              <div className="list-group-item checkbox" key={opt}>
                                <label>
                                  <input 
                                    type="checkbox" 
                                    className={`common_selector ${group.id}`} 
                                    value={opt}
                                    checked={(selectedFilters[group.id] || []).includes(opt)}
                                    onChange={() => handleCheckboxChange(group.id, opt)}
                                  /> 
                                  {' '}{opt}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
