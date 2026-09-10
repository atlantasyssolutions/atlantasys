import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';
import { categories } from '@/data/products';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = categories.map(c => ({ slug: c.slug }));
  // Add common aliases
  slugs.push({ slug: 'assets-personal-telematics' });
  slugs.push({ slug: 'assets-&-personal-telematics' });
  return slugs;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const cleanSlug = slug === 'assets-&-personal-telematics' ? 'assets-personal-telematics' : slug;
  const category = categories.find(c => c.slug === cleanSlug || c.slug === slug);

  if (!category) {
    return {
      title: 'GPS Tracking Devices & Fleet Hardware | Atlanta Systems',
      description: 'Explore enterprise telematics hardware, GPS trackers, and IoT sensors from Atlanta Systems.'
    };
  }

  return {
    title: `${category.name} | Atlanta Systems GPS Hardware & Telematics`,
    description: category.shortDescription || `Explore ${category.name} solutions, technical specifications, and device brochures from Atlanta Systems.`,
    alternates: {
      canonical: `https://www.atlantasys.com/trackers/${slug}`
    },
    openGraph: {
      title: `${category.name} | Atlanta Systems`,
      description: category.shortDescription,
      url: `https://www.atlantasys.com/trackers/${slug}`,
      siteName: 'Atlanta Systems',
      type: 'website'
    }
  };
}

export default async function TrackerCategoryPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const cleanSlug = slug === 'assets-&-personal-telematics' ? 'assets-personal-telematics' : slug;
  const category = categories.find(c => c.slug === cleanSlug || c.slug === slug);

  const initialCat = category ? category.slug : 'all';

  return (
    <>
      <Header />
      <main className="section-padding" style={{ paddingTop: '100px', background: '#FFFFFF' }}>
        <ProductCatalog initialCategory={initialCat} />
      </main>
      <Footer />
    </>
  );
}
