import AppHeader from "@/components/layout/app-header";
import NavigationSideBar from "@/components/layout/navigation-sidebar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import QueryProviderWrapper from "./query-provider-wrapper";

const geistSans = localFont({
  src: "../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Thesis Management System",
  description: "Archive and management of thesis in the IT Department",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProviderWrapper>
          <div id="__next">
            <AppHeader />
            <main className="pb-4 lg:pl-16">
              {children}
            </main>
            <NavigationSideBar />
          </div>
          <Toaster />
        </QueryProviderWrapper>
      </body>
    </html>
  );
}
