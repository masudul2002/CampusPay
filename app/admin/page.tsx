"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/utils";
import {
  ShieldCheck,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle,
  XCircle,
  LogOut,
  RefreshCw,
  Search,
  UserCheck,
} from "lucide-react";

interface StatsData {
  totalUsers: number;
  totalTransactions: number;
  totalVolume: number;
  totalRevenueFees: number;
  recentTransactions: any[];
}

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  room: string;
  phone: string;
  balance: number;
  isVerified: boolean;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "transactions">("users");

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const statsRes = await fetch("/api/admin/stats");
      if (!statsRes.ok) {
        router.push("/dashboard");
        return;
      }
      const statsData = await statsRes.json();
      setStats(statsData.data);

      const usersRes = await fetch("/api/admin/users");
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.data);
      }
    } catch (err) {
      console.error("Admin fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const toggleUserVerification = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isVerified: !currentStatus }),
      });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      console.error("Toggle error", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-zinc-400">Loading Admin Control Center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ambient-grid bg-zinc-950 text-white pb-20">
      
      {/* Admin Navbar */}
      <nav className="bg-zinc-900/90 border-b border-white/10 backdrop-blur-xl sticky top-0 z-30 py-4 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-accent to-purple-700 flex items-center justify-center shadow-glow">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold font-heading">
              Campus<span className="text-brand-accent">Pay</span> Admin HQ
            </span>
            <span className="text-[10px] text-zinc-400 block -mt-1 font-mono">
              System Control & Audit Panel
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={() => router.push("/dashboard")}>
            🎓 Student View
          </Button>
          <Button variant="outline" size="sm" onClick={fetchAdminData}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard glowColor="primary" className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                Total Registered
              </span>
              <Users className="w-5 h-5 text-brand-secondary" />
            </div>
            <p className="text-3xl font-extrabold font-heading text-white mt-2">
              {stats?.totalUsers || 0} Students
            </p>
            <p className="text-[11px] text-emerald-400 mt-1 font-semibold">100% Active Campus Access</p>
          </GlassCard>

          <GlassCard glowColor="accent" className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                System Volume
              </span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold font-heading text-gradient-brand mt-2 font-mono">
              {formatBDT(stats?.totalVolume || 0)}
            </p>
            <p className="text-[11px] text-zinc-400 mt-1">Across all MFS channels</p>
          </GlassCard>

          <GlassCard glowColor="secondary" className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                Revenue Fees
              </span>
              <DollarSign className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-3xl font-extrabold font-heading text-white mt-2 font-mono">
              {formatBDT(stats?.totalRevenueFees || 0)}
            </p>
            <p className="text-[11px] text-purple-300 mt-1">Platform Service Charges</p>
          </GlassCard>

          <GlassCard glowColor="accent" className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                Transactions Count
              </span>
              <Activity className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-extrabold font-heading text-white mt-2">
              {stats?.totalTransactions || 0} Logged
            </p>
            <p className="text-[11px] text-emerald-400 mt-1">● Database Operational</p>
          </GlassCard>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-3 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "users"
                ? "bg-brand-primary text-white shadow-glow"
                : "bg-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            User Management ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "transactions"
                ? "bg-brand-primary text-white shadow-glow"
                : "bg-white/5 text-zinc-400 hover:text-white"
            }`}
          >
            Recent System Logs ({stats?.recentTransactions.length || 0})
          </button>
        </div>

        {/* User Management Table */}
        {activeTab === "users" && (
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-white/5 text-zinc-400 font-heading uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Department & Room</th>
                  <th className="px-6 py-4">Current Balance</th>
                  <th className="px-6 py-4">Verification</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-brand-accent" />
                      {u.name}
                    </td>
                    <td className="px-6 py-4 text-zinc-300 font-mono">{u.email}</td>
                    <td className="px-6 py-4">
                      <Badge variant={u.role === "ADMIN" ? "amber" : "violet"}>
                        {u.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {u.department || "CSE"} (Room {u.room || "401"})
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-emerald-400">
                      {formatBDT(u.balance)}
                    </td>
                    <td className="px-6 py-4">
                      {u.isVerified ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          VERIFIED
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          PENDING
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleUserVerification(u.id, u.isVerified)}
                        className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Transactions Audit Log Table */}
        {activeTab === "transactions" && (
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-white/5 text-zinc-400 font-heading uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Provider</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Platform Fee</th>
                  <th className="px-6 py-4">Recipient</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats?.recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">
                      {tx.user?.name || "Student"}
                    </td>
                    <td className="px-6 py-4 font-bold text-brand-accent">{tx.type}</td>
                    <td className="px-6 py-4 font-mono text-purple-300">{tx.provider}</td>
                    <td className="px-6 py-4 font-mono font-bold text-white">{formatBDT(tx.amount)}</td>
                    <td className="px-6 py-4 font-mono text-emerald-400">{formatBDT(tx.fee)}</td>
                    <td className="px-6 py-4 text-zinc-400 font-mono">{tx.recipient || "N/A"}</td>
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
  );
}
