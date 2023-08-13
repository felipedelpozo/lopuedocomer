import '@/styles/globals.css';
import { Metadata } from 'next';
import { fontSans } from '@/config/fonts';
import { Providers } from './providers';
import { Navbar } from '@/components/navbar';
import clsx from 'clsx';
import { PageLocale } from '@/types';
import { notFound } from 'next/navigation';
import Footer from '@/components/footer';
import getMessages from '@/i18n';
import { getTranslator } from 'next-intl/server';
import AdsByGoogle from '@/components/adsbygoogle';

export async function generateMetadata({
  params,
}: PageLocale): Promise<Metadata> {
  const t = await getTranslator(params.locale, 'metadata');

  return {
    title: {
      default: t('name'),
      template: `%s - ${t('name')}`,
    },
    description: t('description'),
    keywords: t('keywords'),
    applicationName: t('applicationName'),
    authors: {
      url: 'https://www.linkedin.com/in/felipedelpozo/',
      name: 'Felipe Del Pozo',
    },
    creator: 'Felipe Del Pozo',
    robots: 'index, follow',
    alternates: { canonical: process.env.BASE_URL! },
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      type: 'website',
      locale: params.locale,
      url: process.env.BASE_URL!,
      title: t('name'),
      description: t('description'),
    },
    bookmarks: process.env.BASE_URL!,
    category: t('category'),
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
} & PageLocale) {
  const { messages } = await getMessages({ locale: params.locale });

  if (!messages) {
    notFound();
  }

  return (
    <html lang={params.locale}>
      <head>
        <AdsByGoogle />
      </head>
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers
          themeProps={{ attribute: 'class', defaultTheme: 'dark' }}
          localeProps={{ locale: params.locale, messages }}
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 container mx-auto max-w-7xl pt-16 px-6">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
