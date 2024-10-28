import { Toaster } from '@/components/ui/toaster';
import Providers from '@/context/providers';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import '../styles/globals.css';
import AppHeader from './_components/header/app-header';
import NavigationSideBar from './_components/navigation/navigation-sidebar';

export const metadata: Metadata = {
  title: 'Thesis Management System',
  description: 'Archive and management of thesis in the IT Department',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased`}>
        <Providers>
          <div id="__next">
            <AppHeader />
            {children}
            <NavigationSideBar />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
