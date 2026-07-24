"use client";

import React, { useState, useId } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROVIDERS, ProviderOption } from "@/lib/calculator-data";
import { formatBDT, formatNumber } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  Calculator,
  Zap,
  TrendingDown,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Smartphone,
  Check,
  RefreshCw,
} from "lucide-react";

export function ChargeCalculator() {
  const amountInputId = useId();
  const [amount, setAmount] = useState<number>(2000);
  const [selectedProvider, setSelectedProvider] = useState<ProviderOption>(PROVIDERS[0]);
  const [method, setMethod] = useState<"app" | "ussd">("app");
  const [actionType, setActionType] = useState<"cash-out" | "send-money">("cash-out");

  // Calculate Fee Math
  const feeRate =
    actionType === "send-money"
      ? selectedProvider.sendMoneyFee
      : method === "app"
      ? selectedProvider.appFeeRate
      : selectedProvider.ussdFeeRate;

  const totalFee = (amount * feeRate) / 100;
  const netAmountRequired = amount + totalFee;

  // Find cheapest alternative for comparison
  const cheapestProvider = PROVIDERS.reduce((min, curr) =>
    curr.appFeeRate < min.appFeeRate ? curr : min
  );
  const cheapestFee = (amount * cheapestProvider.appFeeRate) / 100;
  const potentialSavings = Math.max(0, totalFee - cheapestFee);

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#6D28D9", "#8B5CF6", "#A855F7", "#10B981"],
    });
  };

  return (
    <section id="calculator" className="py-24 relative bg-ambient-grid overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" className="mb-4" icon={<Calculator className="w-3.5 h-3.5" />}>
            Interactive Tool
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            MFS Charge <span className="text-gradient-brand">Calculator</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 font-body">
            Never pay unexpected transaction charges. Compare bKash, Nagad, Rocket, Cellfin & Bank fees in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Calculator Controls */}
          <GlassCard glowColor="primary" className="lg:col-span-7 space-y-6">
            
            {/* Action Type Toggle */}
            <div>
              <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-3">
                1. Select Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setActionType("cash-out")}
                  className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    actionType === "cash-out"
                      ? "bg-brand-primary/25 border-brand-secondary text-white shadow-glow"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Zap className="w-4 h-4 text-brand-accent" />
                  Cash Out Charge
                </button>

                <button
                  type="button"
                  onClick={() => setActionType("send-money")}
                  className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    actionType === "send-money"
                      ? "bg-brand-primary/25 border-brand-secondary text-white shadow-glow"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  Send Money Charge
                </button>
              </div>
            </div>

            {/* Amount Slider & Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={amountInputId} className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                  2. Enter Amount (BDT)
                </label>
                <span className="text-xs font-mono font-bold text-brand-accent">
                  Min ৳100 — Max ৳50,000
                </span>
              </div>

              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-zinc-400">
                  ৳
                </span>
                <input
                  id={amountInputId}
                  type="number"
                  min={100}
                  max={50000}
                  step={500}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full glass-input pl-9 pr-4 py-3.5 rounded-2xl text-xl font-bold font-mono text-white"
                />
              </div>

              {/* Preset Amount Badges */}
              <div className="flex flex-wrap gap-2">
                {[500, 1000, 2000, 5000, 10000, 25000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setAmount(preset);
                      triggerConfetti();
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
                      amount === preset
                        ? "bg-brand-secondary/30 border-brand-secondary text-white"
                        : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    ৳{formatNumber(preset)}
                  </button>
                ))}
              </div>
            </div>

            {/* Provider Picker */}
            <div>
              <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-3">
                3. Choose MFS Provider
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PROVIDERS.map((provider) => (
                  <button
                    key={provider.id}
                    type="button"
                    onClick={() => setSelectedProvider(provider)}
                    className={`relative p-3 rounded-2xl border text-left transition-all ${
                      selectedProvider.id === provider.id
                        ? "bg-zinc-800 border-brand-accent shadow-glow"
                        : "bg-zinc-900/60 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {provider.badge && (
                      <span className="absolute -top-2 right-2 px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-brand-primary text-white uppercase tracking-wider">
                        {provider.badge}
                      </span>
                    )}
                    <p className="text-sm font-bold text-white font-heading">{provider.name}</p>
                    <p className="text-[11px] text-zinc-400 mt-1 font-mono">
                      Rate: {provider.appFeeRate}%
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Method Toggle (App vs USSD) */}
            <div>
              <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-3">
                4. Transaction Channel
              </label>
              <div className="flex gap-3 p-1.5 rounded-2xl bg-zinc-950/80 border border-white/10">
                <button
                  type="button"
                  onClick={() => setMethod("app")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    method === "app"
                      ? "bg-brand-primary text-white shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Mobile App ({selectedProvider.appFeeRate}%)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("ussd")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    method === "ussd"
                      ? "bg-brand-primary text-white shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  USSD Dial *247# ({selectedProvider.ussdFeeRate}%)
                </button>
              </div>
            </div>

          </GlassCard>

          {/* Right Column: Live Calculation Breakdown */}
          <GlassCard glowColor="accent" className="lg:col-span-5 bg-gradient-to-b from-zinc-900/90 via-zinc-900/70 to-purple-950/40 border-brand-secondary/30">
            
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs uppercase font-bold text-brand-accent tracking-widest">
                  Live Result Breakdown
                </span>
                <h3 className="text-2xl font-bold font-heading text-white mt-1">
                  {selectedProvider.name} Fee
                </h3>
              </div>
              <div className="p-3 rounded-2xl bg-brand-primary/20 border border-brand-accent/30 text-brand-accent">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            {/* Big Fee Counter */}
            <div className="mb-6 p-5 rounded-2xl bg-zinc-950/80 border border-white/10 text-center">
              <p className="text-xs uppercase font-semibold text-zinc-400 tracking-wider">
                Total Charge ({feeRate}%)
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold font-heading text-gradient-brand mt-1 font-mono">
                {formatBDT(totalFee)}
              </p>
            </div>

            {/* Detailed Math Breakdown */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                <span className="text-zinc-400">Principal Amount</span>
                <span className="font-mono font-bold text-white">{formatBDT(amount)}</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                <span className="text-zinc-400">Selected Provider</span>
                <span className="font-semibold text-purple-300">{selectedProvider.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                <span className="text-zinc-400">Channel</span>
                <span className="font-semibold text-white uppercase">{method}</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                <span className="text-zinc-400">Total Cash Out Fee</span>
                <span className="font-mono font-bold text-rose-400">+ {formatBDT(totalFee)}</span>
              </div>
              <div className="flex items-center justify-between text-base py-3 font-bold text-white">
                <span>Total Amount Needed</span>
                <span className="font-mono text-emerald-400 text-lg">{formatBDT(netAmountRequired)}</span>
              </div>
            </div>

            {/* Smart Savings Suggestion Box */}
            {potentialSavings > 0 && selectedProvider.id !== cheapestProvider.id && (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 space-y-1 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4" />
                  Student Smart Savings Tip!
                </div>
                <p className="text-xs leading-relaxed">
                  Switching to <strong className="text-white">{cheapestProvider.name}</strong> will save you{" "}
                  <strong className="text-white font-mono">{formatBDT(potentialSavings)}</strong> on this transaction!
                </p>
              </div>
            )}

            <Button
              variant="glow"
              fullWidth
              size="lg"
              onClick={triggerConfetti}
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Re-Calculate & Celebrate
            </Button>

          </GlassCard>

        </div>
      </div>
    </section>
  );
}
