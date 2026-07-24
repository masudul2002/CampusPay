import React, { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-zinc-900/40 border border-white/10 my-6">
      <div className="p-4 rounded-2xl bg-brand-primary/10 text-brand-accent mb-4 border border-brand-primary/20">
        {icon || <Inbox className="w-8 h-8" />}
      </div>
      <h3 className="text-xl font-bold font-heading text-white">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-sm mt-1 mb-6 font-body">{description}</p>
      {actionText && onAction && (
        <Button variant="glow" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
