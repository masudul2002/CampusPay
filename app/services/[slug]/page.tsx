"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/features/navbar/navbar";
import { Footer } from "@/features/footer/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/utils";
import {
  Banknote,
  ArrowUpRight,
  Send,
  Smartphone,
  Landmark,
  Receipt,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Clock,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export default function DedicatedServicePage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "cash-in";

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceDetailsMap: Record<string, any> = {
    "cash-in": {
      name: "Cash In",
      subtitle: "Instant physical cash deposit into digital wallet with zero service charge",
      rate: 0.0,
      processingTime: "Sub-Second Instant",
      category: "DEPOSIT",
      steps: [
        { title: "Visit Campus Agent Counter", desc: "Locate any authorized CampusPay agent inside your hall or dining hall." },
        { title: "Provide Student ID", desc: "Share your student email or scan your digital Campus QR ID." },
        { title: "Hand Over Physical Cash", desc: "Pay the exact BDT amount with zero extra charges." },
        { title: "Instant Balance Confirmation", desc: "Receive immediate SMS & app notification with updated balance." },
      ],
      faqs: [
        { q: "Is there any hidden agent fee for Cash In?", a: "No! Cash In is 100% free for all verified university students." },
        { q: "What is the minimum Cash In amount?", a: "Minimum deposit is ৳50 BDT." },
      ],
    },
    "cash-out": {
      name: "Cash Out",
      subtitle: "Withdraw physical cash from bKash & Nagad agents at special student rates",
      rate: 1.49,
      processingTime: "1-3 Minutes",
      category: "WITHDRAWAL",
      steps: [
        { title: "Open CampusPay Cash Out Tool", desc: "Select Cash Out and choose your preferred MFS network (bKash/Nagad)." },
        { title: "Enter Withdrawal Amount", desc: "Input the amount in BDT to calculate your discounted fee." },
        { title: "Authorize with PIN / OTP", desc: "Confirm your withdrawal transaction." },
        { title: "Collect Cash from Agent", desc: "Hand over reference code to collect cash instantly." },
      ],
      faqs: [
        { q: "Which provider offers the lowest Cash Out fee?", a: "Nagad App Cash Out offers the lowest rate at 1.49%." },
      ],
    },
    "send-money": {
      name: "Send Money",
      subtitle: "Peer-to-peer instant money transfer to fellow students and campus merchants",
      rate: 0.0,
      processingTime: "Instant",
      category: "TRANSFER",
      steps: [
        { title: "Select Recipient Student", desc: "Enter student email or phone number." },
        { title: "Enter Amount", desc: "Input BDT amount for peer transfer." },
        { title: "Confirm & Send", desc: "Instant transfer with 0% student fee." },
      ],
      faqs: [
        { q: "Are student-to-student transfers free?", a: "Yes! All internal student transfers carry zero service charge." },
      ],
    },
    "mobile-recharge": {
      name: "Mobile Recharge",
      subtitle: "Instant talktime and internet pack recharge across all Bangladesh mobile operators",
      rate: 0.0,
      processingTime: "Instant",
      category: "RECHARGE",
      steps: [
        { title: "Choose Mobile Operator", desc: "Select GP, Robi, Banglalink, Airtel, or Teletalk." },
        { title: "Enter Phone Number & Amount", desc: "Input number or select Internet/Minute bundle." },
        { title: "Recharge Instantly", desc: "Direct balance top-up within seconds." },
      ],
      faqs: [
        { q: "Can I buy internet packs directly?", a: "Yes! All operator bundles are supported." },
      ],
    },
    "bank-transfer": {
      name: "Bank Transfer",
      subtitle: "Direct NPSB real-time transfer to all commercial bank accounts",
      rate: 0.0,
      processingTime: "Instant (NPSB 24/7)",
      category: "TRANSFER",
      steps: [
        { title: "Select Target Bank", desc: "Choose IBBL, City Bank, DBBL, Brac, or any NPSB bank." },
        { title: "Enter Account Number & Name", desc: "Provide valid beneficiary details." },
        { title: "Execute NPSB Transfer", desc: "Real-time 24/7 bank transfer." },
      ],
      faqs: [
        { q: "Is NPSB transfer available on weekends?", a: "Yes! NPSB transfers operate 24/7 year-round." },
      ],
    },
    "utility-bill": {
      name: "Utility Bill Payment",
      subtitle: "Pay hall mess fees, university tuition, electricity, and internet bills",
      rate: 0.0,
      processingTime: "Instant Digital Receipt",
      category: "UTILITY",
      steps: [
        { title: "Select Biller Category", desc: "Choose Tuition Fee, Mess Charge, or Electricity." },
        { title: "Enter Student ID / Bill Account", desc: "Fetch live bill amount." },
        { title: "Pay & Download Receipt", desc: "Get instant digital proof of payment." },
      ],
      faqs: [
        { q: "Does the university accept CampusPay receipts?", a: "Yes! CampusPay digital receipts are officially verified by SSTU." },
      ],
    },
  };

  const currentService = serviceDetailsMap[slug] || serviceDetailsMap["cash-in"];

  return (
    <main className="min-h-screen bg-zinc-950 text-white relative">
      <Navbar />

      <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Service Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="violet" className="mb-4" icon={<Sparkles className="w-3.5 h-3.5" />}>
            {currentService.category} SERVICE
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight">
            {currentService.name} <span className="text-gradient-brand">Service</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 font-body leading-relaxed">
            {currentService.subtitle}
          </p>
        </div>

        {/* Overview Box */}
        <GlassCard glowColor="accent" className="p-8 mb-12 bg-gradient-to-br from-zinc-900 via-purple-950/30 to-zinc-950">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[11px] uppercase font-bold text-zinc-400">Service Fee Rate</span>
              <p className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                {currentService.rate}%
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[11px] uppercase font-bold text-zinc-400">Processing Time</span>
              <p className="text-xl font-bold font-mono text-purple-300 mt-2">
                {currentService.processingTime}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[11px] uppercase font-bold text-zinc-400">Student Waiver</span>
              <p className="text-xl font-bold font-mono text-amber-300 mt-2">
                100% Verified
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Step-by-Step Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-heading text-white mb-8 text-center">
            How It Works (Step-by-Step Process)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentService.steps.map((step: any, idx: number) => (
              <GlassCard key={idx} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-brand-primary/30 border border-brand-accent/40 flex items-center justify-center font-bold text-brand-accent font-mono shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-body leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-heading text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {currentService.faqs.map((faq: any, idx: number) => (
              <GlassCard
                key={idx}
                className="p-6 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-accent" />
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 transition-transform ${
                      openFaq === idx ? "rotate-180 text-brand-accent" : ""
                    }`}
                  />
                </div>
                {openFaq === idx && (
                  <p className="text-xs text-zinc-300 font-body mt-4 pt-4 border-t border-white/10 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <GlassCard className="p-8 text-center space-y-4 bg-gradient-to-tr from-brand-primary/30 via-zinc-900 to-brand-accent/20 border-brand-secondary/40">
          <h2 className="text-2xl font-bold font-heading text-white">Ready to Execute {currentService.name}?</h2>
          <p className="text-xs text-zinc-300 max-w-lg mx-auto font-body">
            Calculate exact MFS charges or access your student dashboard to complete transactions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button variant="glow" onClick={() => router.push("/calculator")}>
              Calculate Fee
            </Button>
            <Button variant="secondary" onClick={() => router.push("/dashboard")}>
              Student Dashboard
            </Button>
          </div>
        </GlassCard>

      </div>

      <Footer />
    </main>
  );
}
