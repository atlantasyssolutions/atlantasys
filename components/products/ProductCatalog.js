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

  const availableFilterOptions = useMemo(() => {
    const available = {};
    filterGroups.forEach(g => available[g.id] = new Set());
    
    // Compute available filters based on products in the current category
    const categoryProducts = productsData.filter(product => 
      activeCategory === 'all' || product.category === activeCategory
    );

    categoryProducts.forEach(product => {
      const allSpecs = product.specsGrouped?.flatMap(g => g.items) || [];
      const flatSpecs = Object.values(product.specs || {}).map(v => String(v));

      filterGroups.forEach(group => {
        const nameBasedGroups = ['hardwareconnectors', 'connectivity', 'antennas'];
        const valueBasedGroups = ['powersupply', 'bluetooth', 'sim', 'ingressprotection', 'battery', 'memory'];

        group.options.forEach(opt => {
          const lowerOpt = opt.toLowerCase();
          let matchInGrouped = false;
          
          if (nameBasedGroups.includes(group.id)) {
            matchInGrouped = allSpecs.some(spec => spec.name && spec.name.toLowerCase().includes(lowerOpt));
          } else if (valueBasedGroups.includes(group.id)) {
            matchInGrouped = allSpecs.some(spec => spec.value && spec.value.toLowerCase().includes(lowerOpt));
          } else {
            matchInGrouped = allSpecs.some(spec => 
              (spec.name && spec.name.toLowerCase().includes(lowerOpt)) || 
              (spec.value && spec.value.toLowerCase().includes(lowerOpt))
            );
          }
          
          const matchInFlat = !matchInGrouped && flatSpecs.some(specVal => 
            specVal.toLowerCase().includes(lowerOpt)
          );

          if (matchInGrouped || matchInFlat) {
            available[group.id].add(opt);
          }
        });
      });
    });
    return available;
  }, [activeCategory]);

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
    setOpenAccordions(prev => ({ ...prev, [id] : !prev[id] }));
  };

  const expandAllFilters = () => {
    const allOpen = {};
    filterGroups.forEach(g => {
      // Only expand if there are actual options available
      const validOptions = g.options.filter(opt => availableFilterOptions[g.id].has(opt));
      if (validOptions.length > 0) {
        allOpen[g.id] = true;
      }
    });
    setOpenAccordions(allOpen);
  };

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      // Category check
      if (activeCategory && activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Check each filter group (AND between groups, OR within a group)
      for (const [group, selectedValues] of Object.entries(selectedFilters)) {
        if (selectedValues && selectedValues.length > 0) {
          const allSpecs = product.specsGrouped?.flatMap(g => g.items) || [];
          
          // Use 'some' so that selecting multiple options in the same group acts as an OR condition
          const match = selectedValues.some(val => {
            const lowerVal = val.toLowerCase();
            
            const nameBasedGroups = ['hardwareconnectors', 'connectivity', 'antennas'];
            const valueBasedGroups = ['powersupply', 'bluetooth', 'sim', 'ingressprotection', 'battery', 'memory'];
            
            let matchInGrouped = false;
            
            if (nameBasedGroups.includes(group)) {
              matchInGrouped = allSpecs.some(spec => spec.name && spec.name.toLowerCase().includes(lowerVal));
            } else if (valueBasedGroups.includes(group)) {
              matchInGrouped = allSpecs.some(spec => spec.value && spec.value.toLowerCase().includes(lowerVal));
            } else {
              matchInGrouped = allSpecs.some(spec => 
                (spec.name && spec.name.toLowerCase().includes(lowerVal)) || 
                (spec.value && spec.value.toLowerCase().includes(lowerVal))
              );
            }

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
          .tabs--scrollable::-webkit-scrollbar {
            height: 6px;
          }
          .tabs--scrollable::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
          }
          .product-cards {
            border: 1px solid #eee;
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            background: #fff;
            position: relative;
          }
          .product-cards:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          .pro-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            background: #1d2250;
            color: #fff;
            padding: 4px 10px;
            font-size: 12px;
            border-radius: 4px;
            z-index: 10;
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
          .tabs__toggle {
            transition: all 0.25s ease;
            border-radius: 12px;
            padding: 16px 12px 14px;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: space-between !important;
            min-height: 145px;
            background: #ffffff;
            border: 1px solid #eef0f4;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            flex-shrink: 0;
            cursor: pointer;
            text-align: center;
          }
          .tabs__toggle:hover {
            background: #fbfbfd;
            border-color: #cbd5e1;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          }
          .tabs__toggle--active {
            background: #ffffff !important;
            border-color: #1d2250 !important;
            box-shadow: 0 6px 18px rgba(29, 34, 80, 0.15) !important;
          }
          .tabs__toggle .content {
            padding: 7px 18px;
            border-radius: 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.25s ease;
            margin-top: 14px;
            white-space: nowrap;
            background: #f1f3f7;
            border: 1px solid #e2e8f0;
          }
          .tabs__toggle:hover .content {
            background: #e5e9f0;
            border-color: #cbd5e1;
          }
          .tabs__toggle .content h3 {
            margin: 0;
            font-size: 12px;
            font-weight: 600;
            color: #1d2250;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: color 0.25s ease;
          }
          .tabs__toggle--active .content {
            background: #1d2250 !important;
            border-color: #1d2250 !important;
            box-shadow: 0 4px 10px rgba(29, 34, 80, 0.3) !important;
          }
          .tabs__toggle--active .content h3 {
            color: #ffffff !important;
          }
        `}} />
        <br />
        <div className="tabs--container pt-4 pb-4">
          <div className="container">
            <div className="tabs js-tabs">
              <div className="tabs--scrollable" style={{ display: 'flex', overflowX: 'auto', gap: '18px', padding: '10px 6px 20px 6px' }}>
                <div 
                  className={`tabs__toggle ${activeCategory === 'all' ? 'tabs__toggle--active' : ''}`} 
                  onClick={() => setActiveCategory('all')} 
                  style={{ minWidth: '155px' }}
                >
                  <img src="/assets/product_category/advanced.webp" alt="All Trackers" style={{ height: '70px', maxWidth: '100px', objectFit: 'contain' }} />
                  <div className="content">
                    <h3>All Trackers</h3>
                  </div>
                </div>
                {categories.map(cat => (
                  <div 
                    className={`tabs__toggle ${activeCategory === cat.id ? 'tabs__toggle--active' : ''}`} 
                    key={cat.id} 
                    onClick={() => setActiveCategory(cat.id)} 
                    style={{ minWidth: '155px' }}
                  >
                    <img src={cat.featuresImg.replace('essential.webp', 'essential.png')} alt={cat.name} style={{ height: '70px', maxWidth: '100px', objectFit: 'contain' }} />
                    <div className="content">
                      <h3>{cat.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                    <div className="col-md-4 mb-4" key={`${product.id}-${idx}`}>
                      <div className="inner-box h-100">
                        <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                          <div className="product-cards h-100 d-flex flex-column">
                            <div className="pro-badge">{product.categoryName}</div>
                            <div className="product-tumb d-flex align-items-center justify-content-center p-3" style={{ background: '#f8f9fa', minHeight: '200px' }}>
                              <img src={product.image} alt={product.name} style={{ maxHeight: '180px', maxWidth: '100%', objectFit: 'contain' }} />
                            </div>
                            <div className="product-details flex-grow-1 d-flex flex-column p-3">
                              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>{product.name}</h4>
                              <ul className="list-unstyled mb-3 flex-grow-1">
                                {product.features?.slice(0, 3).map((feat, fidx) => (
                                  <li key={fidx} style={{ fontSize: '13px', marginBottom: '8px', color: '#555' }}>
                                    <i className="fas fa-check text-primary me-2"></i>
                                    {typeof feat === 'string' ? feat : (feat.name || feat.description || '')}
                                  </li>
                                ))}
                              </ul>
                              <div className="product-bottom-details mt-auto">
                                <div className="product-price">
                                  <span className="text-primary font-weight-bold" style={{ fontSize: '14px' }}>View Details <i className="fas fa-angle-double-right"></i></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
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
                  const validOptions = group.options.filter(opt => availableFilterOptions[group.id].has(opt));
                  
                  // Hide filter group completely if there are no valid options for current products
                  if (validOptions.length === 0) return null;

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
                            {validOptions.map(opt => (
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
