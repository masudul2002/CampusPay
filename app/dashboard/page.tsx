"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { formatBDT } from "@/lib/utils";
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  TrendingDown,
  Smartphone,
  Landmark,
  Banknote,
  LogOut,
  RefreshCw,
  User,
  Building2,
  DoorClosed,
  QrCode,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  university: string;
  room: string;
  phone: string;
  balance: number;
  isVerified: boolean;
}

interface TransactionItem {
  id: string;
  type: string;
  amount: number;
  fee: number;
  netAmount: number;
  provider: string;
  recipient?: string;
  reference?: string;
  status: string;
  createdAt: string;
}

export default function StudentDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Form State for new transaction
  const [txType, setTxType] = useState<"CASH_IN" | "RECHARGE" | "BANK_TRANSFER" | "CASH_OUT">("CASH_IN");
  const [provider, setProvider] = useState<"BKASH" | "NAGAD" | "ROCKET" | "CELLFIN" | "BANK">("BKASH");
  const [amount, setAmount] = useState<string>("500");
  const [recipient, setRecipient] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const meRes = await fetch("/api/auth/me");
      if (!meRes.ok) {
        router.push("/auth/login");
        return;
      }
      const meData = await meRes.json();
      setUser(meData.data);

      const txRes = await fetch("/api/transactions");
      if (txRes.ok) {
        const txData = await txRes.json();
        setTransactions(txData.data);
      }
    } catch (err) {
      console.error("Dashboard fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: txType,
          provider,
          amount: Number(amount),
          recipient: recipient || "Self Account",
          reference: `CampusPay ${txType}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Transaction failed");
        return;
      }

      setModalOpen(false);
      fetchDashboardData();
    } catch (err: any) {
      alert(err.message || "Failed to process transaction");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-zinc-400">Loading Student Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ambient-grid bg-zinc-950 text-white pb-20">
      
      {/* Dashboard Top Navbar */}
      <nav className="bg-zinc-900/80 border-b border-white/10 backdrop-blur-xl sticky top-0 z-30 py-4 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold font-heading">
            Campus<span className="text-brand-accent">Pay</span> Dashboard
          </span>
        </div>

        <div className="flex items-center gap-3">
          {user?.role === "ADMIN" && (
            <Button variant="outline" size="sm" onClick={() => router.push("/admin")}>
              ⚡ Admin Panel
            </Button>
          )}
          <Button variant="secondary" size="sm" icon={<LogOut className="w-4 h-4" />} onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Welcome Header & Student Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Wallet Card */}
          <GlassCard glowColor="accent" className="lg:col-span-7 bg-gradient-to-br from-zinc-900 via-purple-950/40 to-zinc-950 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="emerald" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                  Verified Student Account
                </Badge>
                <button
                  onClick={fetchDashboardData}
                  className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-white/10"
                  title="Refresh Balance"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                Total Wallet Balance
              </p>
              <h2 className="text-4xl sm:text-5xl font-extrabold font-heading text-gradient-brand mt-1 font-mono">
                {formatBDT(user?.balance || 0)}
              </h2>
            </div>

            {/* Wallet Quick Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => { setTxType("CASH_IN"); setModalOpen(true); }}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-accent/50 hover:bg-brand-primary/20 transition-all text-center group"
              >
                <Banknote className="w-5 h-5 text-emerald-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white block">Cash In</span>
              </button>

              <button
                onClick={() => { setTxType("RECHARGE"); setModalOpen(true); }}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-accent/50 hover:bg-brand-primary/20 transition-all text-center group"
              >
                <Smartphone className="w-5 h-5 text-purple-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white block">Recharge</span>
              </button>

              <button
                onClick={() => { setTxType("BANK_TRANSFER"); setModalOpen(true); }}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-accent/50 hover:bg-brand-primary/20 transition-all text-center group"
              >
                <Landmark className="w-5 h-5 text-blue-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white block">Transfer</span>
              </button>

              <button
                onClick={() => { setTxType("CASH_OUT"); setModalOpen(true); }}
                className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-accent/50 hover:bg-brand-primary/20 transition-all text-center group"
              >
                <ArrowUpRight className="w-5 h-5 text-rose-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white block">Cash Out</span>
              </button>
            </div>
          </GlassCard>

          {/* Student Profile Card */}
          <GlassCard glowColor="primary" className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/30 border border-brand-accent/40 flex items-center justify-center text-brand-accent">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-white">{user?.name}</h3>
                <p className="text-xs text-zinc-400">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-zinc-400 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-brand-secondary" /> Department
                </span>
                <span className="font-semibold text-white">{user?.department || "CSE"}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-zinc-400 flex items-center gap-2">
                  <DoorClosed className="w-4 h-4 text-emerald-400" /> Room
                </span>
                <span className="font-semibold text-white">Room {user?.room || "401"}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-zinc-400 flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-amber-400" /> Campus QR ID
                </span>
                <span className="font-mono text-purple-300 font-bold">QR-{user?.id.slice(0, 8).toUpperCase()}</span>
              </div>
            </div>
          </GlassCard>

        </div>

        {/* Transaction History Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-heading text-white">
              Recent Transaction History
            </h3>
            <span className="text-xs font-mono text-zinc-400">Total: {transactions.length} records</span>
          </div>

          {transactions.length === 0 ? (
            <GlassCard className="text-center py-12 text-zinc-400 text-sm">
              No transactions recorded yet. Click Cash In or Recharge to start!
            </GlassCard>
          ) : (
            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl">
              <table className="w-full text-left text-xs font-body">
                <thead className="bg-white/5 text-zinc-400 font-heading uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Provider</th>
                    <th className="px-6 py-4">Recipient / Reference</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Fee</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                        {tx.type === "CASH_IN" ? (
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-rose-400" />
                        )}
                        {tx.type}
                      </td>
                      <td className="px-6 py-4 font-semibold text-purple-300">{tx.provider}</td>
                      <td className="px-6 py-4 text-zinc-300 font-mono">{tx.recipient || tx.reference}</td>
                      <td className="px-6 py-4 font-mono font-bold text-white">
                        {tx.type === "CASH_IN" ? "+" : "-"} {formatBDT(tx.amount)}
                      </td>
                      <td className="px-6 py-4 font-mono text-zinc-400">{formatBDT(tx.fee)}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* New Transaction Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Execute ${txType}`}
        subtitle="Simulate real MFS transactions with live balance updates"
      >
        <form onSubmit={handleCreateTransaction} className="space-y-4">
          <div>
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
              Payment Provider
            </label>
            <select
              value={provider}
              onChange={(e: any) => setProvider(e.target.value)}
              className="w-full glass-input px-3 py-2.5 rounded-2xl text-sm"
            >
              <option value="BKASH" className="bg-zinc-900">bKash</option>
              <option value="NAGAD" className="bg-zinc-900">Nagad</option>
              <option value="ROCKET" className="bg-zinc-900">Rocket</option>
              <option value="CELLFIN" className="bg-zinc-900">Cellfin</option>
              <option value="BANK" className="bg-zinc-900">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
              Amount (BDT)
            </label>
            <input
              type="number"
              min="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full glass-input px-3 py-2.5 rounded-2xl text-sm font-mono"
              required
            />
          </div>

          <div>
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
              Target Phone / Account / Recipient
            </label>
            <input
              type="text"
              placeholder="01572902196 or IBBL Account"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full glass-input px-3 py-2.5 rounded-2xl text-sm"
            />
          </div>

          <Button type="submit" variant="glow" fullWidth disabled={submitting}>
            {submitting ? "Processing..." : `Confirm ${txType}`}
          </Button>
        </form>
      </Modal>

    </div>
  );
}
