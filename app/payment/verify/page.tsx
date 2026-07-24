"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/features/navbar/navbar";
import { Footer } from "@/features/footer/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TransactionTimeline } from "@/components/payment/transaction-timeline";
import { ShieldCheck, Hash, Phone, ArrowRight } from "lucide-react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const refParam = searchParams.get("ref") || "";

  const [formData, setFormData] = useState({
    referenceId: refParam,
    trxId: "",
    senderPhone: "",
    amountPaid: "1200",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (refParam) {
      setFormData((prev) => ({ ...prev, referenceId: refParam }));
    }
  }, [refParam]);

  const handleSubmitVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          amountPaid: Number(formData.amountPaid),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Verification submission failed");
      }

      router.push(`/payment/success?ref=${encodeURIComponent(formData.referenceId)}`);
    } catch (err: any) {
      setError(err.message || "Failed to submit verification");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-xl mx-auto mb-8">
        <Badge variant="purple" className="mb-3" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
          Step 2: Payment Verification
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
          Submit bKash TrxID
        </h1>
        <p className="text-xs text-zinc-400 font-body mt-2">
          Submit your bKash Transaction ID (TrxID) for instant admin audit & wallet credit.
        </p>
      </div>

      <TransactionTimeline status="UNDER_REVIEW" />

      <GlassCard glowColor="accent" className="p-8">
        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmitVerification} className="space-y-4">
          <div>
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
              Reference ID
            </label>
            <div className="relative">
              <Hash className="w-4 h-4 text-brand-accent absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="TXN-2026-9901"
                value={formData.referenceId}
                onChange={(e) => setFormData({ ...formData, referenceId: e.target.value })}
                className="w-full glass-input pl-11 pr-4 py-3 rounded-2xl text-sm font-mono font-bold text-purple-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
              bKash Transaction ID (TrxID)
            </label>
            <input
              type="text"
              placeholder="BKASH98X71QZ"
              value={formData.trxId}
              onChange={(e) => setFormData({ ...formData, trxId: e.target.value.toUpperCase() })}
              className="w-full glass-input px-4 py-3 rounded-2xl text-sm font-mono font-bold tracking-widest text-white uppercase"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                Sender bKash Phone
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="01572902196"
                  value={formData.senderPhone}
                  onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                  className="w-full glass-input pl-11 pr-4 py-3 rounded-2xl text-sm font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                Amount Paid (BDT)
              </label>
              <input
                type="number"
                placeholder="1200"
                value={formData.amountPaid}
                onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                className="w-full glass-input px-4 py-3 rounded-2xl text-sm font-mono font-bold"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
              Additional Notes / Reference Proof
            </label>
            <textarea
              rows={2}
              placeholder="Paid via bKash merchant link for semester fee deposit..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full glass-input px-4 py-3 rounded-2xl text-sm font-body"
            />
          </div>

          <Button
            type="submit"
            variant="glow"
            fullWidth
            size="lg"
            disabled={submitting}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {submitting ? "Submitting for Verification..." : "Submit Transaction ID for Review"}
          </Button>
        </form>
      </GlassCard>
    </div>
  );
}

export default function PaymentVerifyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white relative">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center text-sm text-zinc-400">Loading form...</div>}>
        <VerifyContent />
      </Suspense>
      <Footer />
    </main>
  );
}
