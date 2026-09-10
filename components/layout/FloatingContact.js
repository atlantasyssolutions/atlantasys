'use client';

import { useState } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 2500);
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
                <button type="submit" id="submitBtn" className="btn btn-primary" style={{ background: '#0169A9', borderColor: '#0169A9' }}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
