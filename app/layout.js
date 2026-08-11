import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hindigenous | भारतीय इतिहास, कला, साहित्य, संस्कृति एवं निष्पक्ष समाचार",
  description: "Hindigenous - देश और दुनिया की प्रामाणिक, निष्पक्ष और गहन खबरें। भारतीय इतिहास, संस्कृति, कला, साहित्य और राज-पाट पर विशेष लेख। Authentic and unbiased news & heritage coverage.",
  keywords: [
    "Hindigenous",
    "Hindigenous News",
    "हिंदी समाचार",
    "भारतीय इतिहास",
    "भारतीय संस्कृति",
    "साहित्य",
    "कला",
    "राज-पाट",
    "Indian History",
    "Indian Culture"
  ],
  authors: [{ name: "Hindigenous Team" }],
  creator: "Hindigenous",
  publisher: "Hindigenous",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Hindigenous | भारतीय इतिहास, कला, साहित्य & संस्कृति",
    description: "देश और दुनिया की प्रामाणिक एवं निष्पक्ष खबरें और भारतीय संस्कृति पर विशेष लेख।",
    siteName: "Hindigenous",
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hindigenous",
    description: "Authentic & unbiased news and Indian heritage portal.",
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

import Header from "@/components/Header";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
