"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";

export function AnalyticsCharts() {
  const lineData = [12000, 18000, 15000, 24000, 32000, 28000, 42000];
  const barData = [
    { label: "Cash In", val: 85, color: "bg-emerald-500" },
    { label: "Recharge", val: 65, color: "bg-purple-500" },
    { label: "Cash Out", val: 70, color: "bg-rose-500" },
    { label: "Transfer", val: 90, color: "bg-blue-500" },
    { label: "Bill Pay", val: 55, color: "bg-amber-500" },
  ];

  const pieData = [
    { label: "bKash", pct: 45, color: "#E2136E" },
    { label: "Nagad", pct: 30, color: "#F7941D" },
    { label: "Rocket", pct: 15, color: "#8B5CF6" },
    { label: "Bank/Cellfin", pct: 10, color: "#10B981" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-8">
      {/* 1. Line & Area Chart */}
      <GlassCard className="lg:col-span-8 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-heading text-white">Payment Volume Trend</h3>
            <p className="text-xs text-zinc-400 font-mono">Weekly transaction volume curve</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            +24.5% Growth
          </span>
        </div>

        {/* SVG Area Chart */}
        <div className="h-44 w-full relative pt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 700 150">
            <defs>
              <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 120 Q 100 80 200 95 T 400 40 T 600 50 L 700 20 L 700 150 L 0 150 Z"
              fill="url(#areaGlow)"
            />
            <path
              d="M 0 120 Q 100 80 200 95 T 400 40 T 600 50 L 700 20"
              fill="none"
              stroke="#A855F7"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-mono text-zinc-400">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </GlassCard>

      {/* 2. Donut / Distribution Chart */}
      <GlassCard className="lg:col-span-4 p-6 space-y-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold font-heading text-white">MFS Share</h3>
          <p className="text-xs text-zinc-400 font-mono">Channel distribution</p>
        </div>

        <div className="flex justify-center my-4">
          <div className="relative w-36 h-36 rounded-full border-8 border-purple-600/30 flex items-center justify-center shadow-glow">
            <div className="text-center">
              <span className="text-2xl font-extrabold font-mono text-white">100%</span>
              <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Active</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs font-mono">
          {pieData.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.label}</span>
              </div>
              <span className="font-bold text-white">{item.pct}%</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
