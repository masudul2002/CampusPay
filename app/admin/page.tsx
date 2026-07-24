"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { AnalyticsCharts } from "@/components/admin/analytics-charts";
import { exportToCSV } from "@/lib/export-utils";
import { formatBDT } from "@/lib/utils";
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  Layers,
  Activity,
  Bell,
  Settings as SettingsIcon,
  Plus,
  RefreshCw,
  Clock,
  Download,
  Printer,
  FileSpreadsheet,
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalTransactions: number;
  totalVolume: number;
  totalRevenueFees: number;
  recentTransactions: any[];
}

type AdminSidebarTab = "dashboard" | "verification" | "users" | "services" | "transactions" | "announcements" | "settings";

export default function EnhancedAdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminSidebarTab>("dashboard");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [verificationQueue, setVerificationQueue] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedReqId, setSelectedReqId] = useState<string | null>(null);
  const [rejectComment, setRejectComment] = useState("");
  const [processing, setProcessing] = useState(false);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, vRes, uRes, sRes, aRes, stRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/verification"),
        fetch("/api/users"),
        fetch("/api/services"),
        fetch("/api/announcements"),
        fetch("/api/settings"),
      ]);

      if (!statsRes.ok) {
        router.push("/dashboard");
        return;
      }
      setStats((await statsRes.json()).data);
      if (vRes.ok) setVerificationQueue((await vRes.json()).data || []);
      if (uRes.ok) setUsers((await uRes.json()).data || []);
      if (sRes.ok) setServices((await sRes.json()).data || []);
      if (aRes.ok) setAnnouncements((await aRes.json()).data || []);
      if (stRes.ok) setSettings((await stRes.json()).data || []);
    } catch (err) {
      console.error("Admin fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleApproveVerification = async (paymentRequestId: string) => {
    try {
      setProcessing(true);
      const res = await fetch("/api/admin/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentRequestId, action: "APPROVE" }),
      });
      if (res.ok) fetchAdminData();
    } catch (err) {
      alert("Error approving verification");
    } finally {
      setProcessing(false);
    }
  };

  const handleExportCSV = () => {
    if (activeTab === "users") {
      exportToCSV("CampusPay_Users", users);
    } else {
      exportToCSV("CampusPay_Verifications", verificationQueue);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "verification", label: "Verification Queue", icon: Clock },
    { id: "users", label: "Users", icon: Users },
    { id: "services", label: "Services", icon: Layers },
    { id: "transactions", label: "Transactions", icon: Activity },
    { id: "announcements", label: "Announcements", icon: Bell },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ] as const;

  const pendingCount = verificationQueue.filter((v) => v.status === "UNDER_REVIEW" || v.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-zinc-900/90 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-accent to-purple-600 flex items-center justify-center shadow-glow">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading">CampusPay</h2>
              <span className="text-[10px] text-brand-accent font-mono uppercase tracking-widest block -mt-1">
                Admin Control v2.0
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {sidebarItems.map((item) => {
              const IconComp = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminSidebarTab)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    active
                      ? "bg-brand-primary text-white shadow-glow"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className="w-4 h-4" />
                    {item.label}
                  </div>
                  {item.id === "verification" && pendingCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-bold animate-pulse">
                      {pendingCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-2 mt-6 md:mt-0">
          <Button variant="secondary" fullWidth size="sm" onClick={() => router.push("/dashboard")}>
            🎓 Student Portal
          </Button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-ambient-grid">
        
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white uppercase tracking-wide">
              {activeTab.replace("-", " ")} Management
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              CampusPay Production FinTech Control Panel
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={<FileSpreadsheet className="w-4 h-4 text-emerald-400" />}
              onClick={handleExportCSV}
            >
              Export CSV
            </Button>

            <button
              onClick={fetchAdminData}
              className="p-2.5 rounded-2xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab 1: Dashboard Analytics */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <GlassCard glowColor="primary" className="p-6">
                <span className="text-xs uppercase font-bold text-zinc-400">Total Users</span>
                <p className="text-3xl font-extrabold font-heading text-white mt-2">
                  {stats?.totalUsers || 0}
                </p>
              </GlassCard>

              <GlassCard glowColor="accent" className="p-6">
                <span className="text-xs uppercase font-bold text-zinc-400">Transaction Volume</span>
                <p className="text-3xl font-extrabold font-mono text-gradient-brand mt-2">
                  {formatBDT(stats?.totalVolume || 0)}
                </p>
              </GlassCard>

              <GlassCard glowColor="secondary" className="p-6">
                <span className="text-xs uppercase font-bold text-zinc-400">Revenue Fees</span>
                <p className="text-3xl font-extrabold font-mono text-emerald-400 mt-2">
                  {formatBDT(stats?.totalRevenueFees || 0)}
                </p>
              </GlassCard>

              <GlassCard glowColor="accent" className="p-6">
                <span className="text-xs uppercase font-bold text-zinc-400">Pending Requests</span>
                <p className="text-3xl font-extrabold font-heading text-amber-400 mt-2">
                  {pendingCount}
                </p>
              </GlassCard>
            </div>

            {/* Analytics Charts Component */}
            <AnalyticsCharts />
          </div>
        )}

        {/* Tab 2: Verification Queue */}
        {activeTab === "verification" && (
          <div className="space-y-6">
            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl">
              <table className="w-full text-left text-xs font-body">
                <thead className="bg-white/5 text-zinc-400 font-heading uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Reference ID</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Submitted TrxID</th>
                    <th className="px-6 py-4">Sender Phone</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {verificationQueue.map((req) => {
                    const verification = req.verifications?.[0];
                    return (
                      <tr key={req.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-purple-300">
                          {req.referenceId}
                        </td>
                        <td className="px-6 py-4 font-semibold text-white">
                          {req.user?.name || "Student"}
                          <span className="block text-[10px] text-zinc-400 font-normal">{req.user?.email}</span>
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-amber-300">
                          {verification?.trxId || "Not Submitted"}
                        </td>
                        <td className="px-6 py-4 font-mono text-zinc-300">
                          {verification?.senderPhone || "N/A"}
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-emerald-400">
                          {formatBDT(req.amount)}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={
                              req.status === "APPROVED"
                                ? "emerald"
                                : req.status === "REJECTED"
                                ? "glass"
                                : "amber"
                            }
                          >
                            {req.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          {req.status === "UNDER_REVIEW" || req.status === "PENDING" ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleApproveVerification(req.id)}
                                disabled={processing}
                                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 text-xs font-bold transition-all"
                              >
                                Approve
                              </button>
                            </div>
                          ) : (
                            <span className="text-zinc-500 text-[10px] font-mono">Processed</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Users */}
        {activeTab === "users" && (
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-zinc-900/60">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-white/5 text-zinc-400 font-heading uppercase text-[10px]">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="px-6 py-4 font-bold text-white">{u.name}</td>
                    <td className="px-6 py-4 font-mono text-zinc-300">{u.email}</td>
                    <td className="px-6 py-4"><Badge variant="violet">{u.role}</Badge></td>
                    <td className="px-6 py-4 font-mono font-bold text-emerald-400">{formatBDT(u.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </main>

    </div>
  );
}
