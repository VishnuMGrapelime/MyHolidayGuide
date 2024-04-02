import { dir } from 'i18next';
import { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';

import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';

import { siteConfig } from '@/constant/config';
import ReduxProvider from '@/redux/ReduxProvider';

import { languages } from '../i18n/settings';
import SessionProvider from '../../providers/SessionProvider';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },

  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
};

// const languages = ['en', 'de'];

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={lng} dir={dir(lng)} className='h-full bg-white-900'>
      <body className='h-full'>
        <NextTopLoader />
        <ReduxProvider>
          <SessionProvider>
            <Header lang={lng} />
            <Toaster position='bottom-center' />
            {children}
            <Footer />
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
