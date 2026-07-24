"use client";

import React from "react";
import { Navbar } from "@/features/navbar/navbar";
import { Hero } from "@/features/hero/hero";
import { ServicesGrid } from "@/features/services/services-grid";
import { ChargeCalculator } from "@/features/calculator/charge-calculator";
import { WhyCampusPay } from "@/features/why-us/why-campus-pay";
import { ContactCard } from "@/features/contact/contact-card";
import { Footer } from "@/features/footer/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white relative selection:bg-brand-primary selection:text-white">
      <Navbar />
      <Hero />
      <ServicesGrid />
      <ChargeCalculator />
      <WhyCampusPay />
      <ContactCard />
      <Footer />
    </main>
  );
}
