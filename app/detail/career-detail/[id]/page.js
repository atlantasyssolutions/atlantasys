import { redirect } from 'next/navigation';

export default async function LegacyCareerRedirect({ params }) {
  const { id } = await params;
  redirect(`/career/${id}`);
}
