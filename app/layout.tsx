import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.advancedcraftjoiners.co.uk"),
  title: {
    default: "Advanced Craft Joiners | Premium Joinery & Construction in Scotland",
    template: "%s | Advanced Craft Joiners",
  },
  description:
    "Master craftsmen delivering bespoke joinery, kitchens, extensions, and complete construction solutions across Scotland. 20+ years of excellence.",
  keywords: [
    "joinery",
    "construction",
    "Scotland",
    "bespoke kitchens",
    "extensions",
    "carpentry",
    "Scottish craftsmen",
  ],
  authors: [{ name: "Advanced Craft Joiners" }],
  creator: "Advanced Craft Joiners",
  publisher: "Advanced Craft Joiners",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.advancedcraftjoiners.co.uk",
    siteName: "Advanced Craft Joiners",
    title: "Advanced Craft Joiners | Premium Joinery & Construction",
    description:
      "Master craftsmen delivering bespoke joinery and construction across Scotland.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Advanced Craft Joiners - Premium Scottish Craftsmanship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Craft Joiners | Premium Joinery",
    description: "Bespoke joinery and construction across Scotland.",
    images: ["/og-image.jpg"],
  },
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
  alternates: {
    canonical: "https://www.advancedcraftjoiners.co.uk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
