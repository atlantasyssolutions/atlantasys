'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Optional: Post to Web3Forms or endpoint if configured
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',
          subject: 'New Inquiry on Atlanta Systems Website'
        })
      }).catch(() => {});
    } catch (err) {
      console.warn('Form network request warning:', err);
    }

    // Set one-time authorization token for /thank-you page
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('formSubmitted', 'true');
      sessionStorage.setItem('submittedSource', 'enquiry');
    }

    router.push('/thank-you');
  };

  return (
    <form id="contact_form2" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6 col-12">
          <label className="form-label" style={{ fontWeight: '600', color: '#0F2D4E' }}>
            Full Name <span style={{ color: '#E11D48' }}>*</span>
          </label>
          <input 
            type="text" 
            className="form-control" 
            name="name" 
            placeholder="Your Name" 
            required 
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ borderRadius: '8px', padding: '12px 14px', border: '1px solid #CBD5E1' }}
          />
        </div>
        <div className="col-md-6 col-12">
          <label className="form-label" style={{ fontWeight: '600', color: '#0F2D4E' }}>
            Phone / Mobile <span style={{ color: '#E11D48' }}>*</span>
          </label>
          <input 
            type="tel" 
            className="form-control" 
            name="contact" 
            placeholder="Contact Number" 
            required 
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            style={{ borderRadius: '8px', padding: '12px 14px', border: '1px solid #CBD5E1' }}
          />
        </div>

        <div className="col-12">
          <label className="form-label" style={{ fontWeight: '600', color: '#0F2D4E' }}>
            Email Address <span style={{ color: '#E11D48' }}>*</span>
          </label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            placeholder="name@company.com" 
            required 
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ borderRadius: '8px', padding: '12px 14px', border: '1px solid #CBD5E1' }}
          />
        </div>

        <div className="col-12">
          <label className="form-label" style={{ fontWeight: '600', color: '#0F2D4E' }}>
            Fleet / Project Requirements <span style={{ color: '#E11D48' }}>*</span>
          </label>
          <textarea 
            className="form-control" 
            name="message" 
            rows={4} 
            placeholder="Tell us about your fleet size, required hardware (AIS-140, CAN J1939, AI Dashcams), or integration needs..." 
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            style={{ borderRadius: '8px', padding: '12px 14px', border: '1px solid #CBD5E1' }}
          ></textarea>
        </div>

        <div className="col-12 text-end pt-2">
          <button 
            type="submit" 
            disabled={submitting}
            className="btn"
            style={{
              backgroundColor: '#0169A9',
              color: '#FFFFFF',
              fontFamily: "'Oswald', sans-serif",
              fontSize: '16px',
              fontWeight: '600',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              padding: '12px 32px',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 14px rgba(1, 105, 169, 0.3)',
              cursor: submitting ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {submitting ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                <span>Submit Inquiry</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
