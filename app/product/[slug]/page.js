import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductDetailClient from '@/components/products/ProductDetailClient';
import { productsData, getProductBySlug } from '@/data/products';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return productsData.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: 'Product Details | Atlanta Systems',
      description: 'Explore telematics devices and hardware specifications from Atlanta Systems.'
    };
  }

  return {
    title: `${product.name} | ${product.categoryName} | Atlanta Systems`,
    description: product.description || `Technical specifications, features, and downloadable brochures for ${product.name} by Atlanta Systems.`,
    alternates: {
      canonical: `https://www.atlantasys.com/product/${product.slug}`
    },
    openGraph: {
      title: `${product.name} | Atlanta Systems`,
      description: product.description,
      url: `https://www.atlantasys.com/product/${product.slug}`,
      siteName: 'Atlanta Systems',
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name
        }
      ]
    }
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Related products from same category
  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px', background: '#FFFFFF' }}>
        <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </>
  );
}
