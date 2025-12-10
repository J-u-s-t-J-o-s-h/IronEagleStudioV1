import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppWrapper from "@/components/AppWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IronEagle Studio | Precision-Built Digital Systems",
  description: "American-crafted websites and software. Premium web systems, product UI, and brand-to-build execution delivered with precision and speed.",
  keywords: ["web development", "software development", "UI design", "American-built", "premium websites"],
  authors: [{ name: "IronEagle Studio" }],
  openGraph: {
    title: "IronEagle Studio | Precision-Built Digital Systems",
    description: "American-crafted websites and software. Premium web systems, product UI, and brand-to-build execution.",
    url: "https://ironeaglestudio.com",
    siteName: "IronEagle Studio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "IronEagle Studio | Precision-Built Digital Systems",
    description: "American-crafted websites and software. Premium web systems, product UI, and brand-to-build execution.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/brand/IronEagle_Mark.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-deep-navy text-off-white`}>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}

