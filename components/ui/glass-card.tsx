"use client";

import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: "primary" | "accent" | "secondary" | "none";
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  glowColor = "primary",
  ...props
}: GlassCardProps) {
  const glowClasses = {
    primary: "hover:shadow-glow hover:border-brand-secondary/40",
    secondary: "hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] hover:border-brand-secondary/40",
    accent: "hover:shadow-glow-accent hover:border-brand-accent/40",
    none: "",
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative rounded-3xl bg-zinc-900/65 backdrop-blur-xl border border-white/[0.08]",
        "p-6 sm:p-8 transition-all duration-300 shadow-glass overflow-hidden",
        hoverEffect && glowClasses[glowColor],
        className
      )}
      {...props}
    >
      {/* Subtle top inner light stroke */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}
