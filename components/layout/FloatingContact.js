'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FloatingContact() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      contact: formData.get('contact'),
      email: formData.get('email'),
      message: formData.get('message'),
      source: 'Floating "Let\'s Connect" Widget'
    };

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error('Floating contact submit error:', err);
    } finally {
      setSubmitting(false);
    }

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('formSubmitted', 'true');
      sessionStorage.setItem('submittedSource', 'floating_contact');
    }
    setIsOpen(false);
    router.push('/thank-you');
  };

  return (
    <div className={`floating-form ${isOpen ? 'open' : ''}`} id="contact_form" style={{ right: isOpen ? '0px' : '-310px', transition: 'right 0.4s ease' }}>
      <div className="contact-opener" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
        Let&apos;s Connect
      </div>
      <div className="floating-form-inner">
        <div className="floating-form-heading">Please Contact Us</div>
        {submitted ? (
          <div className="p-3 text-center text-success">
            <strong>Thank you!</strong>
            <p className="small mb-0">Our team will reach out shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 mb-3">
                <input type="text" className="form-control" name="name" placeholder="Full Name*" required />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-3">
                <input type="tel" className="form-control" name="contact" placeholder="Phone No.*" required />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-3">
                <input type="email" className="form-control" name="email" placeholder="Email Address*" required />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-3">
                <textarea className="form-control" name="message" placeholder="Leave us a message*" rows={3} required></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-end">
                <button type="submit" id="submitBtn" disabled={submitting} className="btn btn-primary" style={{ background: '#0169A9', borderColor: '#0169A9' }}>
                  {submitting ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
