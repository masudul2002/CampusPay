"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  className,
  fullWidth = false,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs font-semibold rounded-xl gap-2",
    md: "px-6 py-3 text-sm font-semibold rounded-2xl gap-2.5",
    lg: "px-8 py-4 text-base font-bold rounded-2xl gap-3",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white shadow-glow hover:brightness-110 active:scale-[0.98]",
    secondary:
      "bg-zinc-800/80 hover:bg-zinc-700/80 text-white border border-white/10 backdrop-blur-md active:scale-[0.98]",
    outline:
      "border border-brand-secondary/40 text-brand-secondary hover:bg-brand-primary/10 hover:border-brand-secondary active:scale-[0.98]",
    ghost:
      "text-zinc-300 hover:text-white hover:bg-white/5 active:scale-[0.98]",
    glow:
      "bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_45px_rgba(168,85,247,0.65)] hover:brightness-110 active:scale-[0.98]",
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none font-heading tracking-wide",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className
      )}
      {...(props as any)}
    >
      {children}
      {icon && <span className="transition-transform duration-200 group-hover:translate-x-1">{icon}</span>}
    </motion.button>
  );
}
