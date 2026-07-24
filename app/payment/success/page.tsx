"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/features/navbar/navbar";
import { Footer } from "@/features/footer/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TransactionTimeline } from "@/components/payment/transaction-timeline";
import { CheckCircle2, Clock, Printer, Download, ArrowLeft, ShieldCheck } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const refId = searchParams.get("ref") || "TXN-2026-9901";

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Success Banner */}
      <div className="text-center max-w-md mx-auto mb-8">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 shadow-glow">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
          Verification Submitted!
        </h1>
        <p className="text-xs text-zinc-400 font-body mt-2">
          Your transaction proof was successfully logged for Admin review.
        </p>
      </div>

      {/* Status Timeline */}
      <TransactionTimeline status="UNDER_REVIEW" />

      {/* Printable Digital Receipt Card */}
      <GlassCard id="printable-receipt" glowColor="accent" className="p-8 space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-white">CampusPay Receipt</h3>
              <span className="text-[10px] text-zinc-400 font-mono block -mt-0.5">
                Official Merchant Verification Slip
              </span>
            </div>
          </div>

          <Badge variant="emerald">UNDER REVIEW</Badge>
        </div>

        {/* Receipt Key-Value Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">
              Reference ID
            </span>
            <span className="text-purple-300 font-bold text-sm">{refId}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">
              Payment Channel
            </span>
            <span className="text-white font-bold text-sm">bKash Official Merchant</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">
              Date & Time
            </span>
            <span className="text-white font-semibold">{currentDate}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">
              Estimated Audit Time
            </span>
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <Clock className="w-3 h-3" /> 5 - 15 Minutes
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 space-y-1">
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
            Verification Next Steps
          </span>
          <p className="text-xs text-zinc-300 font-body leading-relaxed">
            Our campus administration team verifies all submitted bKash TrxIDs against merchant bank statements. Upon verification, your wallet balance will automatically update.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={<Printer className="w-4 h-4" />}
              onClick={handlePrintReceipt}
            >
              Print Slip
            </Button>

            <Button
              variant="glow"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              onClick={handlePrintReceipt}
            >
              Download PDF
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white relative">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center text-sm text-zinc-400">Loading receipt...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}
