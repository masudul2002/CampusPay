"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/features/navbar/navbar";
import { Footer } from "@/features/footer/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CardSkeleton } from "@/components/ui/loading-skeleton";
import {
  Banknote,
  ArrowUpRight,
  Send,
  Smartphone,
  Landmark,
  Receipt,
  Sparkles,
  Zap,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface ServiceData {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  baseChargeRate: number;
  estProcessingTime: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const renderIcon = (name: string) => {
    const props = { className: "w-6 h-6 text-white" };
    if (name === "ArrowUpRight") return <ArrowUpRight {...props} />;
    if (name === "Send") return <Send {...props} />;
    if (name === "Smartphone") return <Smartphone {...props} />;
    if (name === "Landmark") return <Landmark {...props} />;
    if (name === "Receipt") return <Receipt {...props} />;
    return <Banknote {...props} />;
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white relative">
      <Navbar />
      
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="violet" className="mb-4" icon={<Sparkles className="w-3.5 h-3.5" />}>
            CampusPay Services
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight">
            Student Financial <span className="text-gradient-brand">Services</span> Catalog
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 font-body">
            Transparent, zero-hidden-cost financial tools engineered for university campus life.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service) => (
              <GlassCard
                key={service.id}
                glowColor="primary"
                className="group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-accent shadow-glow">
                      {renderIcon(service.icon)}
                    </div>
                    <Badge variant="glass" icon={<Clock className="w-3 h-3 text-emerald-400" />}>
                      {service.estProcessingTime}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-white mb-2 group-hover:text-brand-accent transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-sm text-zinc-400 font-body leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider block">
                      Estimated Rate
                    </span>
                    <span className="text-sm font-bold font-mono text-emerald-400">
                      {service.baseChargeRate}% Fee
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedService(service)}
                  >
                    Learn More
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

      </div>

      {/* Learn More Detail Modal */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.name}
          subtitle={`Category: ${selectedService.category}`}
        >
          <div className="space-y-4">
            <p className="text-sm text-zinc-300 leading-relaxed font-body">
              {selectedService.description}
            </p>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
              <div>
                <span className="text-zinc-400 block">Estimated Charge</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {selectedService.baseChargeRate}%
                </span>
              </div>
              <div>
                <span className="text-zinc-400 block">Processing Speed</span>
                <span className="text-purple-300 font-bold text-sm">
                  {selectedService.estProcessingTime}
                </span>
              </div>
            </div>

            <Button
              variant="glow"
              fullWidth
              onClick={() => {
                setSelectedService(null);
                window.location.href = "/calculator";
              }}
            >
              Calculate Transaction Fee Now
            </Button>
          </div>
        </Modal>
      )}

      <Footer />
    </main>
  );
}
