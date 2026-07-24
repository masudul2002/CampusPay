"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { ServiceItem, ServiceId } from "@/types/services";
import { ServiceModal } from "./service-modal";
import {
  Banknote,
  ArrowUpRight,
  Smartphone,
  Landmark,
  Receipt,
  Calculator,
  Sparkles,
} from "lucide-react";

export function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const services: ServiceItem[] = [
    {
      id: "cash-in",
      title: "Cash In",
      shortDescription: "Deposit physical cash into your digital wallet via authorized campus agents or bank desks.",
      iconName: "Banknote",
      badge: "Zero Fee",
      gradient: "from-emerald-500 to-teal-600",
      accentColor: "emerald",
      detailedFeatures: [
        "Instant deposit reflection",
        "Agent network inside hall & campus",
        "Zero hidden service charges",
        "QR slip generation for speed",
      ],
    },
    {
      id: "cash-out",
      title: "Cash Out",
      shortDescription: "Withdraw cash from bKash, Nagad, Rocket, or Cellfin at lowest student agent rates.",
      iconName: "ArrowUpRight",
      badge: "Lowest Fee",
      gradient: "from-purple-600 to-indigo-600",
      accentColor: "violet",
      detailedFeatures: [
        "Nagad App 1.49% low rate",
        "bKash agent network coverage",
        "Instant OTP verification",
        "Student emergency withdrawal line",
      ],
    },
    {
      id: "mobile-recharge",
      title: "Mobile Recharge",
      shortDescription: "Instant prepaid & postpaid mobile recharge across GP, Robi, Banglalink, Airtel & Teletalk.",
      iconName: "Smartphone",
      badge: "Instant 24/7",
      gradient: "from-pink-500 to-rose-600",
      accentColor: "purple",
      detailedFeatures: [
        "All 5 BD operators supported",
        "Special internet & minute pack offers",
        "Automated recurring recharge",
        "Instant SMS confirmation",
      ],
    },
    {
      id: "bank-transfer",
      title: "Bank Transfer",
      shortDescription: "Transfer money directly from your MFS to IBBL, City Bank, DBBL, Brac or any NPSB bank.",
      iconName: "Landmark",
      badge: "NPSB Fast",
      gradient: "from-blue-600 to-cyan-600",
      accentColor: "violet",
      detailedFeatures: [
        "24/7 Real-time NPSB transfer",
        "BEFTN clearance support",
        "Save favorite student accounts",
        "Bank account validation check",
      ],
    },
    {
      id: "bill-payment",
      title: "Bill Payment",
      shortDescription: "Pay campus hall mess fees, tuition fees, electricity (DESCO/DPDC), gas, and internet bills.",
      iconName: "Receipt",
      badge: "Campus Special",
      gradient: "from-amber-500 to-orange-600",
      accentColor: "amber",
      detailedFeatures: [
        "University tuition bill direct pay",
        "Hall mess & dining fees",
        "Utility bills (Electricity, Water, Gas)",
        "Digital receipt generator",
      ],
    },
    {
      id: "charge-calculator",
      title: "Charge Calculator",
      shortDescription: "Calculate exact Cash Out, Cash In, and Transfer fees across all MFS providers in real time.",
      iconName: "Calculator",
      badge: "Smart Tool",
      gradient: "from-purple-500 via-brand-secondary to-brand-accent",
      accentColor: "purple",
      detailedFeatures: [
        "bKash, Nagad, Rocket, Cellfin rates",
        "App vs USSD comparison",
        "Exact BDT fee breakdown",
        "Smartest savings suggestion",
      ],
    },
  ];

  const renderIcon = (name: string, gradient: string) => {
    const props = { className: "w-6 h-6 text-white" };
    let iconEl = <Banknote {...props} />;
    if (name === "ArrowUpRight") iconEl = <ArrowUpRight {...props} />;
    if (name === "Smartphone") iconEl = <Smartphone {...props} />;
    if (name === "Landmark") iconEl = <Landmark {...props} />;
    if (name === "Receipt") iconEl = <Receipt {...props} />;
    if (name === "Calculator") iconEl = <Calculator {...props} />;

    return (
      <div className={`p-3.5 rounded-2xl bg-gradient-to-tr ${gradient} shadow-lg flex items-center justify-center`}>
        {iconEl}
      </div>
    );
  };

  return (
    <section id="services" className="py-24 relative bg-zinc-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="violet" className="mb-4" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Financial Ecosystem
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Tailored Services for <br />
            <span className="text-gradient-brand">Campus Life</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 font-body">
            Access essential financial tools engineered specifically for university students with maximum speed and security.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <GlassCard
                glowColor={service.accentColor === "emerald" ? "accent" : "primary"}
                onClick={() => {
                  if (service.id === "charge-calculator") {
                    const el = document.getElementById("calculator");
                    el?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    setSelectedService(service);
                    setModalOpen(true);
                  }
                }}
                className="group cursor-pointer flex flex-col justify-between h-full hover:border-brand-secondary/50"
              >
                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    {renderIcon(service.iconName, service.gradient)}
                    {service.badge && (
                      <Badge variant={service.accentColor === "emerald" ? "emerald" : "violet"}>
                        {service.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-heading text-white mb-2 group-hover:text-brand-accent transition-colors flex items-center justify-between">
                    {service.title}
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed font-body">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-brand-secondary group-hover:text-purple-300 transition-colors">
                  <span>Explore Service Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Interactive Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onOpenCalculator={() => {
          const el = document.getElementById("calculator");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </section>
  );
}
