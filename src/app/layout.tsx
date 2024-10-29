import { Toaster } from '@/components/ui/toaster';
import Providers from '@/context/providers';
import AppHeader from '@/features/layout/components/header/app-header';
import NavigationSideBar from '@/features/layout/components/sidebar/navigation-sidebar';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import '../styles/globals.css';

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
