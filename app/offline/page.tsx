"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, WifiOff, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-ambient-grid bg-zinc-950 text-white flex items-center justify-center p-4 sm:p-6 relative">
      <div className="w-full max-w-md text-center relative z-10">
        
        <Link href="/" className="inline-flex items-center gap-3 group mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent shadow-glow flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-extrabold font-heading text-white">
            Campus<span className="text-brand-accent">Pay</span>
          </span>
        </Link>

        <GlassCard glowColor="accent" className="p-8">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-6">
            <WifiOff className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-bold font-heading text-white">You Are Offline</h1>
          <p className="text-xs text-zinc-400 font-body mt-2 mb-8 leading-relaxed">
            Internet connection lost. Please check your mobile data or Wi-Fi to continue using CampusPay financial services.
          </p>

          <Button
            variant="glow"
            fullWidth
            icon={<RefreshCcw className="w-4 h-4" />}
            onClick={() => window.location.reload()}
          >
            Retry Connection
          </Button>
        </GlassCard>

      </div>
    </div>
  );
}
