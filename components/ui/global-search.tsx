"use client";

import React, { useState, useEffect } from "react";
import { Search, X, Zap, User, FileText, ArrowRight } from "lucide-react";
import { Modal } from "./modal";
import { Badge } from "./badge";

export function GlobalSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setResults(data.data))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:border-brand-secondary/40 transition-all text-xs font-medium"
      >
        <Search className="w-3.5 h-3.5 text-brand-accent" />
        <span>Search platform...</span>
        <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white/10 rounded-md text-zinc-300">
          Ctrl K
        </kbd>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Global Platform Search"
        subtitle="Search transactions, students, services, and announcements"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-brand-accent absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reference IDs, student names, services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full glass-input pl-12 pr-4 py-3.5 rounded-2xl text-sm text-white font-body"
              autoFocus
            />
          </div>

          {loading && (
            <div className="py-8 text-center text-xs text-zinc-400 font-mono">
              Searching CampusPay platform...
            </div>
          )}

          {results && (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {/* Transactions */}
              {results.transactions?.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-2">
                    Transactions
                  </h4>
                  <div className="space-y-2">
                    {results.transactions.map((tx: any) => (
                      <div
                        key={tx.id}
                        onClick={() => {
                          setIsOpen(false);
                          window.location.href = "/transactions";
                        }}
                        className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Zap className="w-4 h-4 text-brand-accent" />
                          <div>
                            <p className="text-xs font-bold font-mono text-white">
                              {tx.referenceId || tx.id.slice(0, 8)}
                            </p>
                            <p className="text-[10px] text-zinc-400">
                              {tx.type} • {tx.provider}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          ৳{tx.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services */}
              {results.services?.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-2">
                    Services
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.services.map((s: any) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          setIsOpen(false);
                          window.location.href = `/services/${s.slug}`;
                        }}
                        className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer flex items-center justify-between"
                      >
                        <span className="text-xs font-bold text-white">{s.name}</span>
                        <Badge variant="violet">{s.baseChargeRate}% Fee</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
