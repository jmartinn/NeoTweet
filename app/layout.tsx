import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import Footer from '@/components/footer';
import Header from '@/components/header/header';
import { cn } from '@/lib/utils';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.neotweet.com/'),
  title: {
    default: 'NeoTweet',
    template: '%s | NeoTweet',
  },
  description:
    'NeoTweet is a Twitter like social media platform based on the NOSTR protocol.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get('theme');

  return (
    <html
      lang="en"
      className={cn(theme?.value, GeistSans.variable, GeistMono.variable)}
    >
      <body className="bg-muted flex h-full antialiased">
        <div className="flex w-full">
          <div className="fixed inset-0 flex justify-center sm:px-8 ">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="bg-background w-full ring-1 ring-zinc-100 dark:ring-zinc-400/20" />
            </div>
          </div>
          <div className="relative flex w-full flex-col">
            <main className="flex-auto">
              <div className="relative px-4 sm:px-8 lg:px-12">
                <div className="sm:px-8">
                  <div className="mx-auto w-full max-w-7xl lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-5xl">
                      <Header />
                      {children}
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
