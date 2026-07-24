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
  LayoutDashboard,
  Users,
  Layers,
  Activity,
  Bell,
  Settings as SettingsIcon,
  LogOut,
  Plus,
  RefreshCw,
  TrendingUp,
  DollarSign,
  UserCheck,
  CheckCircle,
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalTransactions: number;
  totalVolume: number;
  totalRevenueFees: number;
  recentTransactions: any[];
}

type AdminSidebarTab = "dashboard" | "users" | "services" | "transactions" | "announcements" | "settings";

export default function EnhancedAdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminSidebarTab>("dashboard");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [newAnnouncementModal, setNewAnnouncementModal] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({ title: "", description: "", priority: "MEDIUM" });

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

      const [uRes, sRes, aRes, stRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/services"),
        fetch("/api/announcements"),
        fetch("/api/settings"),
      ]);

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

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(announcementForm),
      });
      if (res.ok) {
        setNewAnnouncementModal(false);
        setAnnouncementForm({ title: "", description: "", priority: "MEDIUM" });
        fetchAdminData();
      }
    } catch (err) {
      alert("Failed to create announcement");
    }
  };

  const toggleUserVerification = async (userId: string, currentStatus: boolean) => {
    try {
      await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, isVerified: !currentStatus }),
      });
      fetchAdminData();
    } catch (err) {
      console.error(err);
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
    { id: "users", label: "Users", icon: Users },
    { id: "services", label: "Services", icon: Layers },
    { id: "transactions", label: "Transactions", icon: Activity },
    { id: "announcements", label: "Announcements", icon: Bell },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ] as const;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row">
      
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-zinc-900/90 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-accent to-purple-600 flex items-center justify-center shadow-glow">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading">CampusPay</h2>
              <span className="text-[10px] text-brand-accent font-mono uppercase tracking-widest block -mt-1">
                Admin Control
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {sidebarItems.map((item) => {
              const IconComp = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminSidebarTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    active
                      ? "bg-brand-primary text-white shadow-glow"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-2 mt-6 md:mt-0">
          <Button variant="secondary" fullWidth size="sm" onClick={() => router.push("/dashboard")}>
            🎓 Student Portal
          </Button>
          <Button variant="outline" fullWidth size="sm" onClick={() => router.push("/")}>
            <LogOut className="w-4 h-4 mr-2" /> Home
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-ambient-grid">
        
        {/* Top Action Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white uppercase tracking-wide">
              {activeTab} Management
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Live Production Database Connected (dev.db)
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === "announcements" && (
              <Button
                variant="glow"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => setNewAnnouncementModal(true)}
              >
                New Announcement
              </Button>
            )}
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
                <span className="text-xs uppercase font-bold text-zinc-400">Transactions Count</span>
                <p className="text-3xl font-extrabold font-heading text-white mt-2">
                  {stats?.totalTransactions || 0}
                </p>
              </GlassCard>
            </div>

            {/* Visual Analytics Chart Representation */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold font-heading text-white mb-4">
                Monthly Transaction Volume Analytics
              </h3>
              <div className="h-48 flex items-end gap-3 pt-8 pb-4 px-4 bg-zinc-950/60 rounded-2xl border border-white/10">
                {[45, 60, 75, 50, 90, 80, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div
                      style={{ height: `${h}%` }}
                      className="w-full rounded-xl bg-gradient-to-t from-brand-primary via-brand-secondary to-brand-accent group-hover:brightness-125 transition-all shadow-glow"
                    />
                    <span className="text-[10px] font-mono text-zinc-400">Day {i + 1}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Tab 2: Users */}
        {activeTab === "users" && (
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-zinc-900/60">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-white/5 text-zinc-400 font-heading uppercase text-[10px]">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Balance</th>
                  <th className="px-6 py-4">Verification</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-bold text-white">{u.name}</td>
                    <td className="px-6 py-4 font-mono text-zinc-300">{u.email}</td>
                    <td className="px-6 py-4"><Badge variant="violet">{u.role}</Badge></td>
                    <td className="px-6 py-4 font-mono font-bold text-emerald-400">{formatBDT(u.balance)}</td>
                    <td className="px-6 py-4">
                      <Badge variant={u.isVerified ? "emerald" : "amber"}>
                        {u.isVerified ? "VERIFIED" : "PENDING"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleUserVerification(u.id, u.isVerified)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold hover:text-white"
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

        {/* Tab 3: Services */}
        {activeTab === "services" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <GlassCard key={s.id} className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{s.name}</h3>
                  <Badge variant="emerald">{s.baseChargeRate}% Fee</Badge>
                </div>
                <p className="text-xs text-zinc-400 mb-4">{s.description}</p>
                <span className="text-xs font-mono text-purple-300">Speed: {s.estProcessingTime}</span>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Tab 4: Transactions */}
        {activeTab === "transactions" && (
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-zinc-900/60">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-white/5 text-zinc-400 font-heading uppercase text-[10px]">
                <tr>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Provider</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats?.recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-mono font-bold text-purple-300">{tx.referenceId || tx.id.slice(0, 8)}</td>
                    <td className="px-6 py-4 font-bold text-white">{tx.type}</td>
                    <td className="px-6 py-4 font-mono">{tx.provider}</td>
                    <td className="px-6 py-4 font-mono font-bold text-white">{formatBDT(tx.amount)}</td>
                    <td className="px-6 py-4"><Badge variant="emerald">{tx.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 5: Announcements */}
        {activeTab === "announcements" && (
          <div className="space-y-4">
            {announcements.map((a) => (
              <GlassCard key={a.id} className="p-6 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{a.title}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">{a.description}</p>
                </div>
                <Badge variant={a.priority === "HIGH" ? "amber" : "violet"}>{a.priority}</Badge>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Tab 6: Settings */}
        {activeTab === "settings" && (
          <div className="space-y-4">
            {settings.map((st) => (
              <GlassCard key={st.id} className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-mono">{st.key}</h4>
                  <p className="text-xs text-zinc-400">{st.description}</p>
                </div>
                <span className="text-sm font-mono font-bold text-emerald-400">{st.value}</span>
              </GlassCard>
            ))}
          </div>
        )}

      </main>

      {/* New Announcement Modal */}
      <Modal
        isOpen={newAnnouncementModal}
        onClose={() => setNewAnnouncementModal(false)}
        title="Post New Campus Announcement"
      >
        <form onSubmit={handleCreateAnnouncement} className="space-y-4">
          <div>
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Notice title..."
              value={announcementForm.title}
              onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
              className="w-full glass-input px-3.5 py-2.5 rounded-2xl text-sm"
              required
            />
          </div>

          <div>
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Announcement details..."
              value={announcementForm.description}
              onChange={(e) => setAnnouncementForm({ ...announcementForm, description: e.target.value })}
              className="w-full glass-input px-3.5 py-2.5 rounded-2xl text-sm"
              required
            />
          </div>

          <div>
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
              Priority
            </label>
            <select
              value={announcementForm.priority}
              onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value })}
              className="w-full glass-input px-3.5 py-2.5 rounded-2xl text-sm"
            >
              <option value="HIGH" className="bg-zinc-900">HIGH Priority</option>
              <option value="MEDIUM" className="bg-zinc-900">MEDIUM Priority</option>
              <option value="LOW" className="bg-zinc-900">LOW Priority</option>
            </select>
          </div>

          <Button type="submit" variant="glow" fullWidth>
            Publish Announcement
          </Button>
        </form>
      </Modal>

    </div>
  );
}
