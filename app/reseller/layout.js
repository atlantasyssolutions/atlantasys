export const metadata = {
  title: 'GPS Telematics Reseller Program & Partner Portal | Atlanta Systems',
  description: 'Join the Atlanta Systems Telematics Reseller Program. Partner with India’s leading AIS-140 GPS manufacturer for high-margin hardware, white-label software, and AI dashcams.',
  keywords: 'telematics reseller program, GPS tracker distributor, AIS-140 partner portal, white label fleet management, Atlanta Systems reseller',
  alternates: {
    canonical: 'https://www.atlantasys.com/reseller',
  },
  openGraph: {
    title: 'GPS Fleet Tracking Reseller Program | Atlanta Systems',
    description: 'Offer your customers industry-leading AIS-140 GPS tracking, AI dashcams, and IoT solutions with Atlanta Systems Reseller Program.',
    url: 'https://www.atlantasys.com/reseller',
    siteName: 'Atlanta Systems',
    images: [
      {
        url: '/assets/img/reseller/three-img.webp',
        width: 1200,
        height: 630,
        alt: 'Atlanta Systems Reseller Program',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function ResellerLayout({ children }) {
  return children;
}
