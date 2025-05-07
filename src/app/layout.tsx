// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import WhatsAppButton from '../../components/whatsappbtn/whatsapp';

export const metadata: Metadata = {
  title: 'Prin Tee Pal – Custom T-Shirts & Apparel',
  description:
    'Discover unique and high-quality custom t-shirts at Prin Tee Pal. Perfect for individuals and businesses. Style meets comfort with every print!',
  metadataBase: new URL('https://www.printeepal.com'),
  openGraph: {
    title: 'Prin Tee Pal – Custom T-Shirts & Apparel',
    description:
      'Discover unique and high-quality custom t-shirts at Prin Tee Pal. Perfect for individuals and businesses. Style meets comfort with every print!',
    url: 'https://www.printeepal.com',
    siteName: 'Prin Tee Pal',
    images: [
      {
        url: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/79bdb959-d316-4642-8750-da7ab560ec39.jpeg',
        width: 1200,
        height: 630,
        alt: 'Prin Tee Pal Product Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prin Tee Pal – Custom T-Shirts & Apparel',
    description:
      'Discover unique and high-quality custom t-shirts at Prin Tee Pal. Perfect for individuals and businesses. Style meets comfort with every print!',
    images: [
      'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/products/79bdb959-d316-4642-8750-da7ab560ec39.jpeg',
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <AdminLayout>{children}</AdminLayout> */} {/* Uncomment if needed */}
        <main>{children}</main>
        <WhatsAppButton />
      </body>
    </html>
  );
}
