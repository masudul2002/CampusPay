"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Zap, Layers, GraduationCap, ShieldCheck, Award } from "lucide-react";

export function WhyCampusPay() {
  const features = [
    {
      id: "fast-access",
      title: "Fast Access",
      description: "Perform calculations and service lookups in under 3 seconds with zero lag or waiting time.",
      icon: Zap,
      badge: "Sub-Second Speed",
      gradient: "from-purple-600 to-indigo-600",
      accent: "primary" as const,
      stat: "< 0.3s",
      statLabel: "Response Latency",
    },
    {
      id: "multiple-payments",
      title: "Multiple Payment Methods",
      description: "Support for bKash, Nagad, Rocket, Cellfin, and all major BD commercial bank channels in one unified hub.",
      icon: Layers,
      badge: "5+ Networks",
      gradient: "from-pink-500 to-rose-600",
      accent: "accent" as const,
      stat: "100%",
      statLabel: "MFS Coverage",
    },
    {
      id: "designed-for-students",
      title: "Designed for Students",
      description: "Crafted specifically for university life — hall mess payments, tuition fees, and agent location guides.",
      icon: GraduationCap,
      badge: "Student First",
      gradient: "from-emerald-500 to-teal-600",
      accent: "secondary" as const,
      stat: "৳0",
      statLabel: "Student Surcharge",
    },
  ];

  return (
    <section id="why-us" className="py-24 relative bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="violet" className="mb-4" icon={<Award className="w-3.5 h-3.5" />}>
            Why Choose Us
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Built for the Modern <br />
            <span className="text-gradient-brand">University Lifestyle</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 font-body">
            Empowering students with seamless financial access, transparent fee calculations, and intuitive design.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <GlassCard
                  glowColor={item.accent}
                  className="h-full flex flex-col justify-between group hover:border-brand-secondary/50"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-tr ${item.gradient} shadow-lg text-white`}>
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <Badge variant="glass">{item.badge}</Badge>
                    </div>

                    <h3 className="text-2xl font-bold font-heading text-white mb-3 group-hover:text-brand-accent transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-zinc-400 text-sm leading-relaxed font-body">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-extrabold font-heading text-white">{item.stat}</p>
                      <p className="text-[11px] text-zinc-400 uppercase tracking-wider">{item.statLabel}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
