import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "El-Praise's Portfolio",
  description: "Fullstack developer portfolio showcasing projects and skills",
  applicationName: "El-Praise's Portfolio",
  authors: [{ name: "El-Praise" }],
  keywords: ["portfolio", "developer", "fullstack", "web development"],
  robots: "index, follow",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
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
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[6000] focus:p-4 focus:bg-black focus:text-white focus:m-4 focus:rounded"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
