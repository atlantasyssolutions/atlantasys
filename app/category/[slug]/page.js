import { redirect } from 'next/navigation';

export default async function CategoryRedirectPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  redirect(`/trackers/${slug}`);
}
