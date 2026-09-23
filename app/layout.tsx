import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";

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
  title: "El-Praise Ayo — Software Engineer",
  description:
    "Software engineer specializing in building scalable software applications.",
  applicationName: "El-Praise Ayo",
  authors: [{ name: "El-Praise Ayo" }],
  keywords: ["portfolio", "software engineer", "fullstack", "rust", "react"],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3e6cf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/me.jpeg" sizes="any" />
      </head>
      <body className={`${cormorant.className} ${cormorant.variable} ${cinzel.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[6000] focus:p-4 focus:bg-black focus:text-white focus:m-4 focus:rounded"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
