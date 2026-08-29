'use client';

import { useState } from 'react';
import Link from 'next/link';
import BlogCard from '@/components/blog/BlogCard';
import Pagination from '@/components/blog/Pagination';
import { Search, Globe, Filter, MapPin, ArrowRight, Layers } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

export default function BlogClientIndex({ blogs = [], location = null }) {
  const [selectedRegion, setSelectedRegion] = useState(location ? (location.region || 'All') : 'All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const cities = [
    'All',
    'Dubai', 'Abu Dhabi', 'Riyadh', 'Jeddah', 'Dammam', 'Kuwait City', 'Doha', 'Muscat', 'Cairo', 'Casablanca',
    'Warsaw', 'Hamburg', 'Rotterdam', 'Madrid', 'Paris', 'Milan', 'Frankfurt', 'London', 'Bucharest', 'Antwerp',
    'Houston', 'Chicago', 'Los Angeles', 'Dallas', 'Memphis', 'Miami', 'Phoenix', 'New York', 'Atlanta', 'Seattle',
    'Mexico City', 'São Paulo', 'Lima', 'Bogotá', 'Santiago', 'Buenaventura', 'Manzanillo', 'Santos', 'Querétaro', 'Guadalajara',
    'Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
  ];

  const regions = [
    'All',
    'West Africa',
    'East Africa',
    'Southern Africa',
    'GCC & Middle East',
    'Latin America (LATAM)',
    'Eastern Europe',
    'Western Europe',
    'APAC & ASEAN',
    'Global Trade Corridors'
  ];

  const categories = [
    'All',
    'Fuel Theft & Loss Prevention',
    'Security & Cargo Protection',
    'Cold Chain & Healthcare',
    'Video Telematics & Driver Safety',
    'EV & Battery Analytics',
    'Heavy Equipment & Mining Telemetry',
    'Cross-Border Logistics & Multi-SIM',
    'Intermodal & Asset Tracking',
    'ATEX & Hazardous Materials Safety',
    'Telematics ROI & Enterprise Compliance'
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesRegion =
      selectedRegion === 'All' ||
      blog.geoRegion === selectedRegion ||
      blog.geoRegion === 'Global';

    const matchesCategory =
      selectedCategory === 'All' ||
      blog.category === selectedCategory;

    const matchesCity =
      selectedCity === 'All' ||
      (blog.city && blog.city.toLowerCase() === selectedCity.toLowerCase());

    const matchesSearch =
      !searchQuery ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.city && blog.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blog.seoKeywords && blog.seoKeywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesRegion && matchesCategory && matchesCity && matchesSearch;
  });

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRegionChange = (reg) => {
    setSelectedRegion(reg);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="section-padding" style={{ paddingTop: '140px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 40px' }}>
          <div className="badge-pill">
            <Globe size={14} /> Global B2B Telematics Knowledge Hub
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: '800' }}>
            Telematics & IoT Insights {location ? `for ${location.city} Fleets` : 'Knowledge Hub'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: '1.6' }}>
            Comprehensive engineering solutions, compliance frameworks, fuel theft algorithms, and regional logistics reports for Fleet Directors{location ? ` in ${location.city} and across ${location.region}` : ' across West Africa, East Africa, GCC, LATAM, EU & APAC'}.
          </p>
        </div>

        {/* Hyper-Local Directory Cross-Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0F2D4E 0%, #0169A9 100%)',
            color: '#FFFFFF',
            padding: '20px 28px',
            borderRadius: '16px',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MapPin size={24} style={{ color: '#38BDF8' }} />
            <div>
              <strong style={{ display: 'block', fontSize: '1.05rem' }}>Looking for City-Specific Telematics Hubs?</strong>
              <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>Explore tailored hardware & sensor stacks for 20 cities in Africa, Europe, GCC & APAC.</span>
            </div>
          </div>

          <Link href="/locations" className="btn" style={{ background: '#FFFFFF', color: '#0F2D4E', fontWeight: '800', padding: '10px 22px', fontSize: '0.875rem' }}>
            View 20 City Hubs <ArrowRight size={14} />
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div
          className="glass-card"
          style={{
            padding: '24px 28px',
            marginBottom: '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* Top Row: Search & City Dropdown */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '280px' }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search by topic, keyword, city (e.g. Dubai, Chicago, WHO GDP, ADAS)..."
                className="form-input"
                style={{ paddingLeft: '44px', width: '100%' }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {/* City Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} style={{ color: 'var(--primary-blue)' }} />
              <select
                className="form-input"
                style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', minWidth: '180px', cursor: 'pointer' }}
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All 50 Fleet Cities</option>
                {cities.filter(c => c !== 'All').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              Showing {filteredBlogs.length} articles
            </div>
          </div>

          {/* Region Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700', marginRight: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={14} /> Region:
            </span>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => handleRegionChange(reg)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '99px',
                  background: selectedRegion === reg ? 'var(--primary-blue)' : '#F1F5F9',
                  border: '1px solid ' + (selectedRegion === reg ? 'var(--primary-blue)' : 'var(--border-color)'),
                  color: selectedRegion === reg ? '#FFFFFF' : 'var(--text-main)',
                  fontSize: '0.825rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700', marginRight: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={14} /> Vertical:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '99px',
                  background: selectedCategory === cat ? 'var(--accent-emerald)' : '#F1F5F9',
                  border: '1px solid ' + (selectedCategory === cat ? 'var(--accent-emerald)' : 'var(--border-color)'),
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-main)',
                  fontSize: '0.825rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Posts */}
        {filteredBlogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)', background: '#F8FAFC', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No articles match your criteria</h3>
            <p>Try resetting your search query or selecting "All" regions and verticals.</p>
          </div>
        ) : (
          <>
            <div className="grid-3">
              {paginatedBlogs.map((blog) => (
                <BlogCard key={blog.id || blog.slug} blog={blog} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
