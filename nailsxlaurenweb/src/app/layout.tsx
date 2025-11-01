import type { Metadata } from "next";
import { Cormorant_Garamond, Work_Sans } from 'next/font/google';
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant-garamond',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-work-sans',
});

export const metadata: Metadata = {
  title: "Nails X Lauren",
  description: "Nail services including Gel X, manicures, and custom designs. Book your appointment today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${workSans.variable}`}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
