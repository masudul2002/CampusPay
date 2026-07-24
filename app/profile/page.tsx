"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/features/navbar/navbar";
import { Footer } from "@/features/footer/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { formatBDT } from "@/lib/utils";
import { User, Building2, DoorClosed, Phone, CreditCard, Edit3, ShieldCheck } from "lucide-react";

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
  preferredPaymentMethod: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    department: "",
    room: "",
    phone: "",
    preferredPaymentMethod: "BKASH",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/auth/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data) {
          setProfile(data.data);
          setEditForm({
            name: data.data.name || "",
            department: data.data.department || "",
            room: data.data.room || "",
            phone: data.data.phone || "",
            preferredPaymentMethod: data.data.preferredPaymentMethod || "BKASH",
          });
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to update profile");
        return;
      }

      setProfile(data.data);
      setEditModalOpen(false);
    } catch (err: any) {
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white relative">
      <Navbar />

      <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <GlassCard glowColor="accent" className="p-8 sm:p-12">
          
          <div className="flex items-start justify-between pb-8 border-b border-white/10 mb-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent p-1 shadow-glow flex items-center justify-center">
                <div className="w-full h-full rounded-[20px] bg-zinc-950 flex items-center justify-center">
                  <User className="w-10 h-10 text-brand-accent" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  {profile?.name}
                </h1>
                <p className="text-sm text-zinc-400 font-mono mt-0.5">{profile?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="emerald" icon={<ShieldCheck className="w-3 h-3" />}>
                    Verified Student ID
                  </Badge>
                  <Badge variant="violet">{profile?.role}</Badge>
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              icon={<Edit3 className="w-4 h-4" />}
              onClick={() => setEditModalOpen(true)}
            >
              Edit Profile
            </Button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-brand-accent" />
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
                  Department
                </span>
                <span className="text-sm font-semibold text-white">
                  {profile?.department || "CSE"}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <DoorClosed className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
                  Campus Room
                </span>
                <span className="text-sm font-semibold text-white">
                  Room {profile?.room || "401"}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
                  Phone Number
                </span>
                <span className="text-sm font-mono font-bold text-white">
                  {profile?.phone || "01572902196"}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-purple-400" />
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
                  Preferred Payment Channel
                </span>
                <span className="text-sm font-bold font-mono text-brand-accent uppercase">
                  {profile?.preferredPaymentMethod || "BKASH"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-primary/20 via-brand-secondary/20 to-transparent border border-brand-primary/30 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider block">
                Current Wallet Balance
              </span>
              <span className="text-3xl font-extrabold font-mono text-gradient-brand">
                {formatBDT(profile?.balance || 0)}
              </span>
            </div>
            <Button variant="glow" onClick={() => (window.location.href = "/dashboard")}>
              Go to Dashboard
            </Button>
          </div>

        </GlassCard>

      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Student Profile"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full glass-input px-3.5 py-2.5 rounded-2xl text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                Department
              </label>
              <input
                type="text"
                value={editForm.department}
                onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                className="w-full glass-input px-3.5 py-2.5 rounded-2xl text-sm"
              />
            </div>
            <div>
              <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                Room Number
              </label>
              <input
                type="text"
                value={editForm.room}
                onChange={(e) => setEditForm({ ...editForm, room: e.target.value })}
                className="w-full glass-input px-3.5 py-2.5 rounded-2xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              className="w-full glass-input px-3.5 py-2.5 rounded-2xl text-sm"
            />
          </div>

          <div>
            <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
              Preferred Payment Method
            </label>
            <select
              value={editForm.preferredPaymentMethod}
              onChange={(e) => setEditForm({ ...editForm, preferredPaymentMethod: e.target.value })}
              className="w-full glass-input px-3.5 py-2.5 rounded-2xl text-sm"
            >
              <option value="BKASH" className="bg-zinc-900">bKash</option>
              <option value="NAGAD" className="bg-zinc-900">Nagad</option>
              <option value="ROCKET" className="bg-zinc-900">Rocket</option>
              <option value="CELLFIN" className="bg-zinc-900">Cellfin</option>
              <option value="BANK" className="bg-zinc-900">Direct Bank Transfer</option>
            </select>
          </div>

          <Button type="submit" variant="glow" fullWidth disabled={saving}>
            {saving ? "Saving Changes..." : "Save Profile Details"}
          </Button>
        </form>
      </Modal>

      <Footer />
    </main>
  );
}
