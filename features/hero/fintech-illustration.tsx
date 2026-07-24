"use client";

import React from "react";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, ArrowUpRight, TrendingUp, Smartphone, Banknote, Zap } from "lucide-react";

export function FintechIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
      {/* Background glowing orb */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-brand-primary/30 via-brand-secondary/40 to-brand-accent/20 blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Main Floating Glass Credit Card */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-80 sm:w-96 rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-zinc-900/90 via-purple-950/40 to-zinc-950/90 border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(109,40,217,0.35)] overflow-hidden"
      >
        {/* Card Top Row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-primary/30 flex items-center justify-center border border-brand-accent/40">
              <Zap className="w-4 h-4 text-brand-accent" />
            </div>
            <span className="text-sm font-bold font-heading text-white tracking-wider">
              CAMPUS CARD
            </span>
          </div>
          <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
            ● ACTIVE
          </span>
        </div>

        {/* Card Chip & Contactless */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-11 h-9 rounded-lg bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-500 border border-yellow-200/50 shadow-inner flex items-center justify-center">
            <div className="w-7 h-5 border border-amber-800/40 rounded-sm grid grid-cols-2 gap-0.5 p-0.5">
              <div className="bg-amber-600/30 rounded-xs" />
              <div className="bg-amber-600/30 rounded-xs" />
            </div>
          </div>
          <div className="flex gap-1 text-zinc-400">
            <div className="w-1.5 h-4 bg-purple-400/40 rounded-full" />
            <div className="w-1.5 h-4 bg-purple-400/70 rounded-full" />
            <div className="w-1.5 h-4 bg-purple-400 rounded-full" />
          </div>
        </div>

        {/* Card Balance */}
        <div className="mb-6">
          <p className="text-xs uppercase font-medium text-zinc-400 tracking-wider">
            Available Balance
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              ৳ 24,850<span className="text-zinc-400 text-lg sm:text-xl">.00</span>
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              +12.4% <TrendingUp className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Student ID</p>
            <p className="text-xs font-mono font-semibold text-zinc-200">CSE-2024-401</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Valid Thru</p>
            <p className="text-xs font-mono font-semibold text-zinc-200">12/28</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Badge 1: Instant Cash Transfer */}
      <motion.div
        animate={{ y: [0, -8, 0], x: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -top-4 -left-4 sm:-left-8 z-30 flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/90 border border-brand-accent/30 backdrop-blur-xl shadow-2xl"
      >
        <div className="p-2.5 rounded-xl bg-brand-primary/20 text-brand-accent border border-brand-primary/40">
          <Banknote className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-white">Instant Cash In</p>
          <p className="text-[11px] text-emerald-400 font-semibold">0% Extra Charge</p>
        </div>
      </motion.div>

      {/* Floating Badge 2: Recharge Status */}
      <motion.div
        animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-6 -right-2 sm:-right-6 z-30 flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900/90 border border-emerald-500/30 backdrop-blur-xl shadow-2xl"
      >
        <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
          <Smartphone className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-white">Mobile Recharge</p>
          <p className="text-[11px] text-zinc-400">All Operators Supported</p>
        </div>
      </motion.div>

      {/* Floating Badge 3: Student Verification Shield */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-30 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-primary/20 border border-brand-secondary/40 backdrop-blur-md"
      >
        <ShieldCheck className="w-4 h-4 text-brand-accent" />
        <span className="text-xs font-bold text-purple-200">Campus Verified</span>
      </motion.div>
    </div>
  );
}
