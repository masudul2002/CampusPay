"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/features/navbar/navbar";
import { Footer } from "@/features/footer/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { CardSkeleton } from "@/components/ui/loading-skeleton";
import { Bell, Calendar, AlertCircle } from "lucide-react";

interface AnnouncementData {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  createdAt: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white relative">
      <Navbar />

      <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="purple" className="mb-4" icon={<Bell className="w-3.5 h-3.5" />}>
            Campus Notice Board
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Financial <span className="text-gradient-brand">Announcements</span>
          </h1>
          <p className="text-zinc-400 text-base mt-3 font-body">
            Stay updated with official university payment deadlines, MFS maintenance, and fee waiver updates.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="space-y-6">
            {announcements.map((item) => (
              <GlassCard key={item.id} glowColor="primary" className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-brand-primary/20 text-brand-accent border border-brand-primary/30">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold font-heading text-white">{item.title}</h2>
                      <span className="text-xs text-zinc-400 font-mono flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <Badge
                    variant={
                      item.priority === "HIGH"
                        ? "amber"
                        : item.priority === "MEDIUM"
                        ? "purple"
                        : "glass"
                    }
                  >
                    {item.priority} Priority
                  </Badge>
                </div>

                <p className="text-sm text-zinc-300 font-body leading-relaxed pl-12">
                  {item.description}
                </p>
              </GlassCard>
            ))}
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}
