"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { QrSection } from "./qr-section";
import { formatBDT } from "@/lib/utils";
import { Copy, ExternalLink, Check, ShieldCheck, HelpCircle } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  referenceId: string;
  serviceName: string;
  amount: number;
  providerName?: string;
  merchantLink?: string;
  merchantName?: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  referenceId,
  serviceName,
  amount,
  providerName = "bKash",
  merchantLink = "https://shop.bkash.com/masudul01572902196/paymentlink/default-payment",
  merchantName = "MD. MASUDUL HASAN",
}: PaymentModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenMerchantLink = () => {
    window.open(merchantLink, "_blank", "noopener,noreferrer");
  };

  const handleContinueToVerify = () => {
    onClose();
    window.location.href = `/payment/verify?ref=${encodeURIComponent(referenceId)}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Official Merchant Checkout"
      subtitle={`Service: ${serviceName} • Amount: ${formatBDT(amount)}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        
        {/* Reference & Amount Summary Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-primary/20 via-purple-900/30 to-brand-accent/20 border border-brand-secondary/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
              Reference ID (Copy for Payment Note)
            </span>
            <span className="text-lg font-extrabold font-mono text-purple-300">
              {referenceId}
            </span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopyRef}
            icon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          >
            {copied ? "Copied!" : "Copy Reference"}
          </Button>
        </div>

        {/* QR Section & Instructions Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* QR Code Column */}
          <div className="md:col-span-5 flex justify-center">
            <QrSection merchantName={merchantName} merchantLink={merchantLink} />
          </div>

          {/* Instructions Column */}
          <div className="md:col-span-7 space-y-3 text-xs">
            <h4 className="text-xs uppercase font-bold text-zinc-300 tracking-wider font-heading mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              6-Step Payment Instructions
            </h4>

            <ol className="space-y-2 list-decimal list-inside text-zinc-300 leading-relaxed font-body">
              <li className="pl-1">
                <strong className="text-white">Copy your Reference ID:</strong>{" "}
                <span className="font-mono text-purple-300 font-bold">{referenceId}</span>
              </li>
              <li className="pl-1">
                <strong className="text-white">Click "Pay with bKash":</strong> Open the official merchant payment page.
              </li>
              <li className="pl-1">
                <strong className="text-white">Complete Payment:</strong> Enter your bKash number & PIN on the official page.
              </li>
              <li className="pl-1">
                <strong className="text-white">Copy bKash TrxID:</strong> Copy the transaction ID from your SMS/app receipt.
              </li>
              <li className="pl-1">
                <strong className="text-white">Return to CampusPay:</strong> Click "Continue After Payment".
              </li>
              <li className="pl-1">
                <strong className="text-white">Submit TrxID:</strong> Submit your TrxID for instant admin verification.
              </li>
            </ol>
          </div>

        </div>

        {/* Action Buttons Row */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={handleOpenMerchantLink}
              className="bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border-rose-500/40"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              Pay with bKash
            </Button>

            <Button variant="glow" size="md" onClick={handleContinueToVerify}>
              Continue After Payment
            </Button>
          </div>
        </div>

      </div>
    </Modal>
  );
}
