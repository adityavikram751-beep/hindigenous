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
  metadataBase: new URL('https://hindigenous.com'),
  alternates: {
    canonical: 'https://hindigenous.com',
  },
  title: {
    default: "Hindigenous | भारतीय इतिहास, कला, साहित्य, संस्कृति एवं निष्पक्ष समाचार",
    template: "%s | Hindigenous"
  },
  description: "Hindigenous - देश और दुनिया की प्रामाणिक, निष्पक्ष और गहन खबरें। भारतीय इतिहास, संस्कृति, कला, साहित्य और राज-पाट पर विशेष लेख। Authentic and unbiased news & heritage coverage.",
  keywords: [
    "Hindigenous",
    "Hindigenous News",
    "hindigenous.com",
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
    url: "https://hindigenous.com",
    siteName: "Hindigenous",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Hindigenous Logo",
      },
    ],
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hindigenous",
    description: "Authentic & unbiased news and Indian heritage portal.",
    images: ["/logo.png"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://hindigenous.com/#organization",
        "name": "Hindigenous",
        "url": "https://hindigenous.com",
        "logo": "https://hindigenous.com/logo.png",
      },
      {
        "@type": "WebSite",
        "@id": "https://hindigenous.com/#website",
        "url": "https://hindigenous.com",
        "name": "Hindigenous",
        "description": "भारतीय इतिहास, कला, साहित्य, संस्कृति एवं निष्पक्ष समाचार",
        "publisher": {
          "@id": "https://hindigenous.com/#organization"
        },
        "inLanguage": ["hi-IN", "en-US"]
      }
    ]
  };

  return (
    <html lang="hi" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
