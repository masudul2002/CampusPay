import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

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
  title: "CampusPay — Student Financial Services Platform",
  description:
    "CampusPay is a Student Financial Services Platform for university students offering Cash In, Cash Out, Mobile Recharge, Bank Transfers, and MFS Charge Calculator.",
  keywords: [
    "CampusPay",
    "Student Financial Services",
    "University Fintech",
    "bKash Fee Calculator",
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
  return (
    <html lang="en" className={`dark ${manrope.variable} ${inter.variable}`}>
      <body className="bg-zinc-950 text-zinc-100 antialiased font-body min-h-screen selection:bg-brand-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
