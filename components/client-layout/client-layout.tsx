'use client';

import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import QueryProvider from '../../components/QueryProvider/QueryProvider';
import ThemeProviderWrapper from '../../components/theamprovider/theamprovider';
import RootLayoutInner from '../../components/rootlayout/rootlayout';
import WhatsAppButton from '../../components/whatsappbtn/whatsapp';

// ✅ Correct env var for client-side
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!clientId) {
    console.error('❌ Missing Google Client ID. Make sure NEXT_PUBLIC_GOOGLE_CLIENT_ID is defined.');
  }

  return (
    <QueryProvider>
      <ThemeProviderWrapper>
        <GoogleOAuthProvider clientId={clientId}>
          <RootLayoutInner>{children}</RootLayoutInner>
        </GoogleOAuthProvider>
      </ThemeProviderWrapper>
      <WhatsAppButton />
    </QueryProvider>
  );
}
