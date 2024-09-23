import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import NavigationBar from "@/components/layout/navigation-bar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen flex flex-col`}
      >
        <NavigationBar />
        <ScrollArea className="flex w-full flex-grow">
          {children}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </body>
    </html>
  );
}
