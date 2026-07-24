import React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-white/10 border border-white/5",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-3xl p-6 bg-zinc-900/60 border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-12" />
    </div>
  );
}
