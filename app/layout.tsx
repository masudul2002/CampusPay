import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { GlobalSearchModal } from "@/components/ui/global-search";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CampusPay — Production Ready Student FinTech Platform",
  description:
    "CampusPay is a Student Financial Services Platform for university students offering Cash In, Cash Out, Mobile Recharge, Bank Transfers, and MFS Charge Calculator.",
  keywords: [
    "CampusPay",
    "Student Financial Services",
    "University Fintech",
    "bKash Merchant Payment",
    "Nagad Fee Calculator",
    "Mobile Recharge",
    "Student Payments",
  ],
  authors: [{ name: "MD. MASUDUL HASAN" }],
  openGraph: {
    title: "CampusPay — Student Financial Services Platform",
    description:
      "All-in-one financial services platform designed specifically for university students.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "CampusPay Student Financial Platform",
    description: "Fintech web platform for university students in Bangladesh.",
    url: "https://campuspay.edu",
    author: {
      "@type": "Person",
      name: "MD. MASUDUL HASAN",
    },
  };

  return (
    <html lang="en" className={`dark ${manrope.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 antialiased font-body min-h-screen selection:bg-brand-primary selection:text-white">
        {children}
        <GlobalSearchModal />
      </body>
    </html>
  );
}
