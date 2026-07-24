"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, ShieldCheck, XCircle } from "lucide-react";

interface TimelineProps {
  status: "PENDING" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
}

export function TransactionTimeline({ status }: TimelineProps) {
  const steps = [
    { key: "PENDING", label: "Initiated", desc: "Reference created" },
    { key: "SUBMITTED", label: "Paid at Merchant", desc: "Completed bKash checkout" },
    { key: "UNDER_REVIEW", label: "TrxID Submitted", desc: "Under Admin Verification" },
    { key: "APPROVED", label: "Verified & Credited", desc: "Wallet balance updated" },
  ];

  const getStepState = (stepKey: string) => {
    if (status === "REJECTED") {
      if (stepKey === "APPROVED") return "rejected";
    }
    const order = ["PENDING", "SUBMITTED", "UNDER_REVIEW", "APPROVED"];
    const currentIndex = order.indexOf(status === "REJECTED" ? "UNDER_REVIEW" : status);
    const stepIndex = order.indexOf(stepKey);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="py-6 px-4 rounded-3xl bg-zinc-950/80 border border-white/10 my-6">
      <h4 className="text-xs uppercase font-bold text-zinc-400 tracking-wider mb-6 text-center">
        Payment Verification Status Timeline
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
        {steps.map((s, idx) => {
          const state = getStepState(s.key);
          return (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs mb-2 transition-all border ${
                  state === "completed"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : state === "current"
                    ? "bg-brand-primary text-white border-brand-accent shadow-glow animate-pulse"
                    : state === "rejected"
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                    : "bg-white/5 text-zinc-500 border-white/10"
                }`}
              >
                {state === "completed" ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : state === "rejected" ? (
                  <XCircle className="w-5 h-5" />
                ) : state === "current" ? (
                  <Clock className="w-5 h-5 animate-spin" />
                ) : (
                  <span>0{idx + 1}</span>
                )}
              </div>

              <span className="text-xs font-bold text-white font-heading">{s.label}</span>
              <span className="text-[10px] text-zinc-400 font-mono mt-0.5">{s.desc}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
