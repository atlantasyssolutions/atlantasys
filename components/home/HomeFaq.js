'use client';

import { useState } from 'react';
import { ORIGINAL_HOMEPAGE_FAQS } from '@/data/homepageFaqs';

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="heading-title text-center mb-4">
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '42px', color: '#1d2250', textTransform: 'uppercase' }}>
            Frequently Asked Questions
          </h2>
        </div>
        <br />
        <div className="accordion faq-accordion" id="faqAccordion">
          {ORIGINAL_HOMEPAGE_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div className="accordion-item" key={faq.id}>
                <h2 className="accordion-header" id={`heading${idx}`}>
                  <button
                    className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen ? 'true' : 'false'}
                    aria-controls={`collapse${idx}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`collapse${idx}`}
                  className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                  aria-labelledby={`heading${idx}`}
                  style={{ display: isOpen ? 'block' : 'none' }}
                >
                  <div className="accordion-body">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
