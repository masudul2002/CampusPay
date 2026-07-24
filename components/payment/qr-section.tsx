"use client";

import React, { useState } from "react";
import { QrCode, ZoomIn, Download, Maximize2, X } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface QrSectionProps {
  merchantName?: string;
  merchantLink?: string;
}

export function QrSection({
  merchantName = "MD. MASUDUL HASAN",
  merchantLink = "https://shop.bkash.com/masudul01572902196/paymentlink/default-payment",
}: QrSectionProps) {
  const [zoomOpen, setZoomOpen] = useState(false);

  // SVG QR Code representation for bKash Merchant
  const qrSvgDataUri = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 100 100" fill="%2309090B"><rect width="100" height="100" fill="%23FFFFFF"/><rect x="10" y="10" width="30" height="30" fill="%23E2136E"/><rect x="15" y="15" width="20" height="20" fill="%23FFFFFF"/><rect x="20" y="20" width="10" height="10" fill="%23E2136E"/><rect x="60" y="10" width="30" height="30" fill="%23E2136E"/><rect x="65" y="15" width="20" height="20" fill="%23FFFFFF"/><rect x="70" y="20" width="10" height="10" fill="%23E2136E"/><rect x="10" y="60" width="30" height="30" fill="%23E2136E"/><rect x="15" y="65" width="20" height="20" fill="%23FFFFFF"/><rect x="20" y="70" width="10" height="10" fill="%23E2136E"/><circle cx="50" cy="50" r="10" fill="%236D28D9"/></svg>`;

  const handleDownloadQr = () => {
    const link = document.createElement("a");
    link.href = qrSvgDataUri;
    link.download = `bKash-Merchant-QR-${merchantName.replace(/\s+/g, "_")}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center text-center p-5 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-3">
      <div className="relative group cursor-pointer" onClick={() => setZoomOpen(true)}>
        <div className="w-44 h-44 rounded-2xl bg-white p-3 shadow-2xl flex items-center justify-center border-4 border-rose-500/80">
          <img
            src={qrSvgDataUri}
            alt="bKash Official Merchant QR Code"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
          <ZoomIn className="w-5 h-5" /> Zoom QR
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-bold text-white font-heading">{merchantName}</p>
        <p className="text-[10px] text-pink-400 font-mono">bKash Official Merchant QR</p>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1 border border-white/10"
        >
          <Maximize2 className="w-3.5 h-3.5" /> Fullscreen
        </button>

        <button
          type="button"
          onClick={handleDownloadQr}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1 border border-white/10"
        >
          <Download className="w-3.5 h-3.5" /> Save QR
        </button>
      </div>

      {/* Fullscreen Zoom Modal */}
      <Modal
        isOpen={zoomOpen}
        onClose={() => setZoomOpen(false)}
        title="Official bKash Merchant QR Code"
        subtitle={`Merchant: ${merchantName}`}
      >
        <div className="flex flex-col items-center justify-center space-y-6 py-4">
          <div className="w-64 h-64 rounded-3xl bg-white p-4 shadow-2xl border-4 border-rose-600">
            <img src={qrSvgDataUri} alt="bKash QR" className="w-full h-full object-contain" />
          </div>
          <p className="text-xs text-zinc-400 max-w-sm text-center">
            Scan using bKash Mobile App or click the Merchant Payment Link button below to proceed.
          </p>
          <Button variant="glow" onClick={handleDownloadQr} icon={<Download className="w-4 h-4" />}>
            Download High-Res QR
          </Button>
        </div>
      </Modal>
    </div>
  );
}
