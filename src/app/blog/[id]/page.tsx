import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetails from '../../../../components/productdetails/productdetails';
import { getProductByName } from '../../../../lib/fetchproduct';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const product = await getProductByName(id);

  if (!product) return {};

  const { title, description, thumbnail_url } = product.data;

  const fullTitle = `PrinteepaL Products - ${title}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      images: [
        {
          url: thumbnail_url,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [thumbnail_url],
    },
  };
}

// export default async function Page({
//     params,
//   }: {
//     params: Promise<{ id: string }>
    
//   }) {
//     const { id } = await params
//     const product = await getProductByName(id);
//     console.log("Fetch Product Data---------->>",product);
    
//     if (!product) return notFound();
//     return <ProductDetails product={product.data} />
//   }

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await getProductByName(id);

  console.log("Fetch Product Data---------->>", product);

  if (!product) return notFound();

  return <ProductDetails product={product.data} />;
}

  