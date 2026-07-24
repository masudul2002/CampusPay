"use client";

import React from "react";
import { Navbar } from "@/features/navbar/navbar";
import { Footer } from "@/features/footer/footer";
import { ChargeCalculator } from "@/features/calculator/charge-calculator";

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white relative">
      <Navbar />
      <div className="pt-16">
        <ChargeCalculator />
      </div>
      <Footer />
    </main>
  );
}
