import TermsAndConditionPage from '../terms-and-condition/page';

export const metadata = {
  title: 'Terms of Service & User Agreement | Atlanta Systems',
  description: 'User Agreement and Terms of Use for Atlanta Systems telematics hardware and software platform.',
  alternates: {
    canonical: 'https://www.atlantasys.com/terms-of-service',
  },
  openGraph: {
    title: 'Terms of Service & User Agreement | Atlanta Systems',
    description: 'User Agreement and Terms of Use for Atlanta Systems telematics hardware and software platform.',
    url: 'https://www.atlantasys.com/terms-of-service',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

export default function TermsOfServiceAlias() {
  return <TermsAndConditionPage />;
}
