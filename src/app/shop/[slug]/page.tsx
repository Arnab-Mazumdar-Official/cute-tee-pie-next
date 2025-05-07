import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetails from '../../../../components/productdetails/productdetails';
import { getProductByName } from '../../../../lib/fetchproduct';

export async function generateMetadata({
    params,
  }: {
    params: Promise<{ slug: string }>
    
  }): Promise<Metadata> {
    const { slug } = await params
    const product = await getProductByName(slug);
  
    if (!product) return {};
  
    const { title, description, thumbnail_url } = product.data;
  
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: thumbnail_url,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [thumbnail_url],
      },
    };
  }

export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
    
  }) {
    const { slug } = await params
    const product = await getProductByName(slug);
    console.log("Fetch Product Data---------->>",product);
    
    if (!product) return notFound();
    return <ProductDetails product={product.data} />
  }

  