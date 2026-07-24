"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ServiceItem } from "@/types/services";
import { CheckCircle2, ArrowRight, ShieldCheck, MapPin, Zap, Phone, Landmark, Receipt } from "lucide-react";
import { formatBDT } from "@/lib/utils";

interface ServiceModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator?: () => void;
}

export function ServiceModal({
  service,
  isOpen,
  onClose,
  onOpenCalculator,
}: ServiceModalProps) {
  const [operator, setOperator] = useState("gp");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("100");
  const [rechargeSuccess, setRechargeSuccess] = useState(false);

  if (!service) return null;

  const handleSimulateAction = (e: React.FormEvent) => {
    e.preventDefault();
    setRechargeSuccess(true);
    setTimeout(() => {
      setRechargeSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={service.title}
      subtitle={service.shortDescription}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Features List */}
        <div>
          <h4 className="text-xs uppercase font-bold text-zinc-400 tracking-wider mb-3">
            Service Highlights & Key Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.detailedFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span className="text-xs font-semibold text-zinc-200">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Interactive Workflow Preview based on service type */}
        {service.id === "mobile-recharge" && (
          <form onSubmit={handleSimulateAction} className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-secondary" />
              Quick Mobile Recharge Simulator
            </h4>
            
            {rechargeSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-center font-semibold text-sm">
                🎉 Recharge request simulated successfully for {phone || "01700000000"}!
              </div>
            ) : (
              <>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "gp", name: "Grameenphone", color: "from-blue-500 to-cyan-500" },
                    { id: "robi", name: "Robi", color: "from-red-500 to-rose-600" },
                    { id: "banglalink", name: "Banglalink", color: "from-orange-500 to-amber-500" },
                    { id: "airtel", name: "Airtel", color: "from-purple-500 to-indigo-600" },
                  ].map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => setOperator(op.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        operator === op.id
                          ? "border-brand-accent bg-brand-primary/20 text-white shadow-glow"
                          : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {op.name}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="01712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                      Amount (BDT)
                    </label>
                    <input
                      type="number"
                      placeholder="100"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm font-mono"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" variant="glow" fullWidth size="md">
                  Simulate Recharge ({formatBDT(Number(amount) || 0)})
                </Button>
              </>
            )}
          </form>
        )}

        {service.id === "charge-calculator" && (
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 text-center space-y-4">
            <h4 className="text-sm font-bold text-white">Interactive Fee Calculator Tool</h4>
            <p className="text-xs text-zinc-400">
              Calculate exact Cash Out, Cash In, Send Money, and Bank Transfer fees across bKash, Nagad, Rocket, Cellfin, and Bank channels.
            </p>
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                onClose();
                onOpenCalculator?.();
              }}
            >
              Go to Full Calculator Section
            </Button>
          </div>
        )}

        {service.id !== "mobile-recharge" && service.id !== "charge-calculator" && (
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <p className="text-xs font-semibold text-zinc-300">
                Verified Student Platform — Scalable Phase 1 Architecture Ready.
              </p>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Future releases will connect live API gateways, biometric student authentication, and university merchant POS integration.
            </p>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex justify-end pt-4 border-t border-white/10">
          <Button variant="secondary" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </div>
    </Modal>
  );
}
