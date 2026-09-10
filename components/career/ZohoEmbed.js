'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function ZohoEmbed() {
  const containerRef = useRef(null);

  useEffect(() => {
    const initZoho = () => {
      if (typeof window.rec_embed_js !== 'undefined' && containerRef.current) {
        // Ensure we only initialize once
        if (!containerRef.current.hasAttribute('data-zoho-initialized')) {
          containerRef.current.setAttribute('data-zoho-initialized', 'true');
          window.rec_embed_js.load({
            widget_id: "rec_job_listing_div",
            page_name: "Careers",
            source: "CareerSite",
            site: "https://atlantasys.zohorecruit.com",
            brand_color: "#6875E2",
            empty_job_msg: "No current Openings"
          });
        }
      }
    };

    // If script is already loaded
    if (typeof window !== 'undefined' && window.rec_embed_js) {
      initZoho();
    } else {
      // Add event listener for script load
      window.addEventListener('zoho-script-loaded', initZoho);
    }

    return () => {
      window.removeEventListener('zoho-script-loaded', initZoho);
    };
  }, []);

  return (
    <>
      <div id="rec_job_listing_div" ref={containerRef} suppressHydrationWarning></div>
      <Script 
        src="https://static.zohocdn.com/recruit/embed_careers_site/javascript/v1.1/embed_jobs.js" 
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('zoho-script-loaded'));
          }
        }}
      />
    </>
  );
}
