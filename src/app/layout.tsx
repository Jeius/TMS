import AppHeader from "@/components/layout/header/app-header";
import NavigationSideBar from "@/components/layout/navigation/navigation-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from "next";
import { cookies } from "next/headers";
import QueryProvider from "../components/providers/query-provider";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Thesis Management System",
  description: "Archive and management of thesis in the IT Department",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("theme");
  return (
    <html lang="en" className={theme?.value === 'dark' ? 'dark' : ''} suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased`}>
        <QueryProvider>
          <div id="__next">
            <AppHeader />
            <main className="pb-4 lg:pl-16">
              {children}
            </main>
            <NavigationSideBar />
          </div>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
