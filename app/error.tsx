"use client";

import React, { useEffect } from "react";
import { ShieldCheck, RefreshCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export default function ErrorBoundaryPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("System Error Boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-ambient-grid bg-zinc-950 text-white flex items-center justify-center p-4 sm:p-6 relative">
      <div className="w-full max-w-md text-center relative z-10">
        
        <a href="/" className="inline-flex items-center gap-3 group mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent shadow-glow flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-extrabold font-heading text-white">
            Campus<span className="text-brand-accent">Pay</span>
          </span>
        </a>

        <GlassCard glowColor="primary" className="p-8">
          <span className="text-4xl font-extrabold font-mono text-rose-400">500</span>
          <h1 className="text-2xl font-bold font-heading text-white mt-2">Unexpected System Error</h1>
          <p className="text-xs text-zinc-400 font-body mt-2 mb-8 leading-relaxed">
            Something went wrong while processing your request. Don't worry, your wallet balance is safe.
          </p>

          <div className="space-y-3">
            <Button variant="glow" fullWidth icon={<RefreshCcw className="w-4 h-4" />} onClick={() => reset()}>
              Try Again
            </Button>

            <a href="/" className="block">
              <Button variant="secondary" fullWidth icon={<ArrowLeft className="w-4 h-4" />}>
                Go Back to Home
              </Button>
            </a>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
