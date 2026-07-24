"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PhoneCall,
  MessageSquare,
  Globe,
  User,
  GraduationCap,
  Building2,
  DoorClosed,
  Phone,
  Mail,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export function ContactCard() {
  const contactInfo = {
    name: "MD. MASUDUL HASAN",
    department: "Computer Science & Engineering",
    university: "Sunamganj Science and Technology University",
    room: "401",
    phone: "01572902196",
    whatsapp: "8801572902196",
    portfolioUrl: "https://portfolio-placeholder.com", // User's portfolio link
  };

  return (
    <section id="contact" className="py-24 relative bg-ambient-grid overflow-hidden">
      {/* Glow orb */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-brand-primary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" className="mb-4" icon={<User className="w-3.5 h-3.5" />}>
            Developer & Lead Engineer
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Get in <span className="text-gradient-brand">Touch</span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 font-body">
            Direct student contact card for queries, feedback, or collaboration on CampusPay.
          </p>
        </div>

        {/* Large Clean Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <GlassCard
            glowColor="accent"
            className="p-8 sm:p-12 bg-gradient-to-br from-zinc-900/90 via-purple-950/30 to-zinc-950/90 border-brand-secondary/30"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Avatar / Badge */}
              <div className="md:col-span-4 flex flex-col items-center text-center pb-6 md:pb-0 md:border-r md:border-white/10">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent p-1 shadow-glow mb-4">
                  <div className="w-full h-full rounded-[22px] bg-zinc-950 flex items-center justify-center text-white">
                    <User className="w-14 h-14 text-brand-accent" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-emerald-500 text-zinc-950 shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-extrabold font-heading text-white">
                  {contactInfo.name}
                </h3>
                <Badge variant="violet" className="mt-2">
                  CSE Student & Developer
                </Badge>
              </div>

              {/* Middle Column: Details List */}
              <div className="md:col-span-8 space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Department */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider">
                        Department
                      </p>
                      <p className="text-sm font-semibold text-white mt-0.5">
                        {contactInfo.department}
                      </p>
                    </div>
                  </div>

                  {/* University */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider">
                        University
                      </p>
                      <p className="text-sm font-semibold text-white mt-0.5">
                        {contactInfo.university}
                      </p>
                    </div>
                  </div>

                  {/* Room Number */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <DoorClosed className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider">
                        Campus Room
                      </p>
                      <p className="text-sm font-semibold text-white mt-0.5">
                        Room {contactInfo.room}
                      </p>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider">
                        Direct Phone
                      </p>
                      <p className="text-sm font-mono font-bold text-white mt-0.5">
                        {contactInfo.phone}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Direct Action Buttons: Call, WhatsApp, Portfolio */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a href={`tel:${contactInfo.phone}`} className="flex-1 min-w-[140px]">
                    <Button
                      variant="primary"
                      fullWidth
                      icon={<PhoneCall className="w-4 h-4" />}
                    >
                      Call Now
                    </Button>
                  </a>

                  <a
                    href={`https://wa.me/${contactInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px]"
                  >
                    <Button
                      variant="secondary"
                      fullWidth
                      className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border-emerald-500/30"
                      icon={<MessageSquare className="w-4 h-4" />}
                    >
                      WhatsApp
                    </Button>
                  </a>

                  <a
                    href={contactInfo.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px]"
                  >
                    <Button
                      variant="glow"
                      fullWidth
                      icon={<Globe className="w-4 h-4" />}
                    >
                      Portfolio
                    </Button>
                  </a>
                </div>

              </div>

            </div>
          </GlassCard>
        </motion.div>

      </div>
    </section>
  );
}
