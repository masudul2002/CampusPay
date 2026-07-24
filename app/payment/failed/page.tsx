"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/features/navbar/navbar";
import { Footer } from "@/features/footer/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, ArrowLeft, HelpCircle } from "lucide-react";

function FailedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reason = searchParams.get("reason") || "Invalid Transaction ID or Cancelled Session";

  return (
    <div className="pt-32 pb-24 max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
      <GlassCard glowColor="primary" className="p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto shadow-glow">
          <AlertTriangle className="w-9 h-9" />
        </div>

        <div>
          <Badge variant="glass" className="mb-2">PAYMENT EXCEPTION</Badge>
          <h1 className="text-2xl font-bold font-heading text-white">Payment Unverified</h1>
          <p className="text-xs text-rose-300 font-body mt-2 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            Reason: {reason}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10 text-xs text-zinc-400 text-left space-y-2">
          <p className="font-bold text-white flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-brand-accent" /> Common Causes & Fixes:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Mismatched Transaction ID (TrxID) format</li>
            <li>bKash payment checkout timeout before completion</li>
            <li>Incorrect sender mobile number entered</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button
            variant="glow"
            fullWidth
            icon={<RefreshCcw className="w-4 h-4" />}
            onClick={() => router.push("/calculator")}
          >
            Retry Payment Flow
          </Button>

          <Button
            variant="secondary"
            fullWidth
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white relative">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center text-sm text-zinc-400">Loading error status...</div>}>
        <FailedContent />
      </Suspense>
      <Footer />
    </main>
  );
}
