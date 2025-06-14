// src/app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import WhatsAppButton from '../../components/whatsappbtn/whatsapp';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientLayout from '../../components/client-layout/client-layout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Prin Tee Pal – Custom T-Shirts & Apparel',
  description:
    'Discover unique and high-quality custom t-shirts at Prin Tee Pal. Perfect for individuals and businesses. Style meets comfort with every print!',
  icons: {
    icon: '/customise_image/541H3vUmTh-_Qj3JI1UfJQ.webp',
  },
  metadataBase: new URL('https://prin-tee-pal.d28tf79avao1gk.amplifyapp.com/'),
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  keywords: [
    'custom t-shirts',
    'Prin Tee Pal',
    'tshirt printing',
    'custom apparel',
    'design your own shirt',
    'bulk t-shirt orders',
    't-shirt',
    'tshirt',
    'tshirt website',
    't-shirt website',
  ],
  openGraph: {
    title: 'Prin Tee Pal – Custom T-Shirts & Apparel',
    description:
      'Discover unique and high-quality custom t-shirts at Prin Tee Pal. Perfect for individuals and businesses. Style meets comfort with every print!',
    url: 'https://prin-tee-pal.d28tf79avao1gk.amplifyapp.com/',
    siteName: 'Prin Tee Pal',
    images: [
      {
        url: 'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/logo/27250cb0-6277-43fb-9fce-ba82a97cc364.jpeg',
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
      'https://printeepal-collections-images.s3.us-east-1.amazonaws.com/logo/27250cb0-6277-43fb-9fce-ba82a97cc364.jpeg',
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8W65Y0NRBP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8W65Y0NRBP');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ margin: 0, padding: 0 }}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
