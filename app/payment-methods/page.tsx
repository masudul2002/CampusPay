"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/features/navbar/navbar";
import { Footer } from "@/features/footer/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardSkeleton } from "@/components/ui/loading-skeleton";
import { formatBDT } from "@/lib/utils";
import { ShieldCheck, Clock, Zap, Layers, ArrowUpRight, CheckCircle } from "lucide-react";

interface PaymentMethodData {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  isAvailable: boolean;
  estTime: string;
  dailyLimit: number;
  feeRate: number;
}

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState<PaymentMethodData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/payment-methods")
      .then((res) => res.json())
      .then((data) => setMethods(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white relative">
      <Navbar />

      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" className="mb-4" icon={<Layers className="w-3.5 h-3.5" />}>
            Supported Payment Networks
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight">
            Integrated Payment <span className="text-gradient-brand">Channels</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 font-body">
            CampusPay connects Bangladesh's premier MFS networks and commercial banks into one unified hub.
          </p>
        </div>

        {/* Methods Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {methods.map((method) => (
              <GlassCard key={method.id} glowColor="accent" className="flex flex-col justify-between group">
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent p-0.5 shadow-glow flex items-center justify-center">
                        <div className="w-full h-full rounded-[14px] bg-zinc-950 flex items-center justify-center font-extrabold text-sm text-brand-accent">
                          {method.name.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-heading text-white">{method.name}</h3>
                        <span className="text-[11px] text-zinc-400 font-mono">Rate: {method.feeRate}%</span>
                      </div>
                    </div>

                    {method.isAvailable ? (
                      <Badge variant="emerald" icon={<CheckCircle className="w-3 h-3" />}>
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="glass">Maintenance</Badge>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 font-body leading-relaxed mb-6">
                    {method.description}
                  </p>

                  {/* Limits and Speed info */}
                  <div className="space-y-2 text-xs font-mono p-3 rounded-2xl bg-white/5 border border-white/10 mb-6">
                    <div className="flex items-center justify-between text-zinc-300">
                      <span>Transaction Time</span>
                      <span className="text-purple-300 font-bold">{method.estTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-300">
                      <span>Daily Limit</span>
                      <span className="text-emerald-400 font-bold">{formatBDT(method.dailyLimit)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="glow"
                  fullWidth
                  icon={<ArrowUpRight className="w-4 h-4" />}
                  onClick={() => (window.location.href = "/calculator")}
                >
                  Calculate {method.name} Fee
                </Button>
              </GlassCard>
            ))}
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}
