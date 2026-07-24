"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Calculator, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FintechIllustration } from "./fintech-illustration";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center bg-ambient-grid overflow-hidden"
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hero-glow pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <Badge variant="violet" icon={<Sparkles className="w-3.5 h-3.5" />}>
                Fintech Platform for University Students
              </Badge>
            </motion.div>

            {/* Large Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.1] mb-6">
              Student Financial <br />
              <span className="text-gradient-brand">Services</span> Platform
            </h1>

            {/* Small Description */}
            <p className="text-lg sm:text-xl text-zinc-400 font-body font-normal leading-relaxed max-w-2xl mb-8">
              Everything students need for daily financial transactions in one place — Cash In, Cash Out, Mobile Recharge, Bank Transfers & Fee Calculators built with zero hassle.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-12">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={() => {
                  const el = document.getElementById("services");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Services
              </Button>

              <Button
                variant="secondary"
                size="lg"
                icon={<PhoneCall className="w-5 h-5" />}
                onClick={() => {
                  const el = document.getElementById("contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact Developer
              </Button>
            </div>

            {/* Key Metrics / Highlights */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 w-full max-w-lg">
              <div>
                <p className="text-2xl font-extrabold font-heading text-white">0%</p>
                <p className="text-xs text-zinc-400 mt-0.5">Hidden Platform Fees</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold font-heading text-white">5+</p>
                <p className="text-xs text-zinc-400 mt-0.5">MFS Channels</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold font-heading text-white">24/7</p>
                <p className="text-xs text-zinc-400 mt-0.5">Campus Access</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Fintech Vector Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <FintechIllustration />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
