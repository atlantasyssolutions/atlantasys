export const metadata = {
  title: 'Global Telematics Hardware Partner Program | Atlanta Systems OEM',
  description: 'Join the Atlanta Systems Global Partner Program. Partner directly with an enterprise telematics hardware manufacturer for factory-direct GPS trackers, AI dashcams, fuel sensors, and tier-3 firmware engineering support.',
  keywords: 'telematics partner program, GPS hardware distributor, OEM telematics manufacturer, fleet hardware partner, GPS tracker factory wholesale, Atlanta Systems partner',
  alternates: {
    canonical: 'https://www.atlantasys.com/partner-program',
  },
  openGraph: {
    title: 'Global Telematics Hardware Partner Program | Atlanta Systems',
    description: 'Partner directly with a premier global telematics hardware OEM for high-performance GPS devices, AI video dashcams, and industrial IoT sensors.',
    url: 'https://www.atlantasys.com/partner-program',
    type: 'website',
    images: [
      {
        url: '/assets/img/reseller/three-img.webp',
        width: 1200,
        height: 630,
        alt: 'Atlanta Systems Global Partner Program',
      },
    ],
  },
};

export default function PartnerProgramLayout({ children }) {
  return children;
}
