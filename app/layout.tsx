import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";

import { site, siteUrl } from "@/lib/site";

import "./globals.css";
import { ThemeProvider } from "./provider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  adjustFontFallback: false,
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  // Everything relative below resolves against this, including the
  // generated opengraph-image — without it those URLs ship relative and
  // most scrapers quietly drop the card.
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "El-Praise Ayo",
    "Eldevode",
    "software engineer",
    "fullstack developer",
    "Rust developer",
    "TypeScript",
    "React",
    "Next.js",
    "Abuja",
    "Nigeria",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
    locale: site.locale,
    firstName: "El-Praise",
    lastName: "Ayo",
    username: "Eldevode",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: site.twitter,
    site: site.twitter,
  },
  category: "technology",
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3e6cf" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1410" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.className} ${cormorant.variable} ${cinzel.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[6000] focus:m-4 focus:border focus:border-gold focus:bg-paper focus:p-4 focus:font-display focus:text-[11px] focus:tracking-[0.18em] focus:text-ink"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="data-theme"
          themes={["day", "night"]}
          defaultTheme="day"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
