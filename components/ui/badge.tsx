import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "violet" | "purple" | "emerald" | "amber" | "glass";
  className?: string;
  icon?: ReactNode;
}

export function Badge({
  children,
  variant = "violet",
  className,
  icon,
}: BadgeProps) {
  const variantStyles = {
    violet:
      "bg-brand-primary/15 text-purple-300 border-brand-primary/30 shadow-[0_0_15px_rgba(109,40,217,0.2)]",
    purple:
      "bg-brand-accent/15 text-purple-200 border-brand-accent/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]",
    emerald:
      "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    amber:
      "bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    glass:
      "bg-white/5 text-zinc-300 border-white/10 backdrop-blur-md",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md tracking-wider uppercase font-heading",
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="w-3.5 h-3.5">{icon}</span>}
      {children}
    </span>
  );
}
