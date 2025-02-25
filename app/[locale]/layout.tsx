import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import Providers from './providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Image from 'next/image';
import Aside from './aside';
import Nav from './nav';
import Languages from './locales';
import type { Locales } from '@/lib';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locales }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <div className="wrap">
              <header className="global-header">
                <h1>
                  <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js"
                    width={150}
                    height={30}
                    priority
                  />
                </h1>
                <Languages />
              </header>
              <div className="global-inner">
                <Aside>
                  <Nav />
                </Aside>
                <main className="global-main">{children}</main>
              </div>
            </div>
          </NextIntlClientProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
