import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.atlantasys.com'),
  title: {
    default: 'Atlanta Systems | GPS Tracking Devices, Fleet Management & Video Telematics',
    template: '%s',
  },
  description: 'Atlanta Systems delivers enterprise-grade GPS Tracking Devices and Fleet Management Software with Dash Cam video telematics, Video Surveillance, AIS 140 compliant hardware, and Mobile Video Recording for global fleets.',
  alternates: {
    canonical: 'https://www.atlantasys.com/',
  },
  openGraph: {
    siteName: 'Atlanta Systems Pvt. Ltd.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.atlantasys.com/',
    images: ['/assets/img/logo.svg'],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Atlanta Systems Pvt. Ltd.',
  alternateName: 'Atlanta Systems',
  url: 'https://www.atlantasys.com',
  logo: 'https://www.atlantasys.com/assets/img/logo.svg',
  description: '32-year indigenous SMT electronics manufacturer powering enterprise fleet telematics, AIS-140 GPS trackers, AI video dash cams, and capacitive fuel sensors globally.',
  sameAs: [
    'https://www.linkedin.com/company/atlanta-systems-pvt-ltd',
    'https://www.facebook.com/atlantasys',
    'https://twitter.com/atlantasys',
    'https://www.youtube.com/user/atlantasys'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-11-40131433',
    contactType: 'sales',
    email: 'info@atlantasys.com',
    availableLanguage: ['English', 'Hindi', 'Arabic']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&family=Livvic:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/animate.min.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/meanmenu.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/responsive.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/style.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/map-1.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <link rel="icon" href="/assets/img/favicon-32x32.png" sizes="32x32" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
