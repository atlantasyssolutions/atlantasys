import TermsAndConditionPage from '../terms-and-condition/page';

export const metadata = {
  title: 'Terms of Service & User Agreement | Atlanta Systems',
  description: 'User Agreement and Terms of Use for Atlanta Systems telematics hardware and software platform.',
  alternates: {
    canonical: 'https://www.atlantasys.com/terms-of-service',
  },
};

export default function TermsOfServiceAlias() {
  return <TermsAndConditionPage />;
}
