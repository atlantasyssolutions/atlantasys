import './globals.css';

export const metadata = {
  title: 'GPS Tracking Devices & Fleet Management Software | Atlanta Systems',
  description: 'Atlanta Systems delivers enterprise-grade GPS Tracking Devices and Fleet Management Software with Dash Cam video telematics, Video Surveillance, AIS 140 compliant hardware, and Mobile Video Recording for global fleets.',
  metadataBase: new URL('https://www.atlantasys.com'),
  alternates: {
    canonical: 'https://www.atlantasys.com/',
  },
  openGraph: {
    siteName: 'Atlanta Systems Pvt. Ltd.',
    type: 'website',
    title: 'GPS Tracking Devices & Fleet Management Software | Atlanta Systems',
    description: 'Enterprise GPS tracking, fleet software, Dash Cams, Video Surveillance, AIS 140 compliant devices and Mobile Video Recording for global operations.',
    url: 'https://www.atlantasys.com/',
    images: ['/assets/img/logo.svg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/animate.min.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/meanmenu.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/responsive.css" rel="stylesheet" type="text/css" />
        <link href="/assets/css/style.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <link rel="icon" href="/assets/img/favicon-32x32.png" sizes="32x32" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
