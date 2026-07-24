"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, User, Mail, Lock, Building2, DoorClosed, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    room: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ambient-grid bg-zinc-950 flex items-center justify-center p-4 sm:p-6 relative">
      <div className="w-full max-w-lg relative z-10">
        
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent shadow-glow flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-extrabold font-heading text-white">
              Campus<span className="text-brand-accent">Pay</span>
            </span>
          </a>
          <h1 className="text-2xl font-bold font-heading text-white">Create Student Account</h1>
          <p className="text-xs text-zinc-400 mt-1">Get ৳1,000 welcome credit for campus financial services</p>
        </div>

        <GlassCard glowColor="primary">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="MD. MASUDUL HASAN"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full glass-input pl-11 pr-4 py-2.5 rounded-2xl text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                University Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="student@cs.sstu.ac.bd"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full glass-input pl-11 pr-4 py-2.5 rounded-2xl text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                  Department
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="CSE"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full glass-input pl-11 pr-4 py-2.5 rounded-2xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                  Room Number
                </label>
                <div className="relative">
                  <DoorClosed className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="401"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    className="w-full glass-input pl-11 pr-4 py-2.5 rounded-2xl text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="01572902196"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full glass-input pl-11 pr-4 py-2.5 rounded-2xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full glass-input pl-11 pr-4 py-2.5 rounded-2xl text-sm"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="glow"
              fullWidth
              size="lg"
              disabled={loading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {loading ? "Creating Account..." : "Create Account & Get ৳1,000"}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-zinc-400">
            Already have an account?{" "}
            <a href="/auth/login" className="text-brand-accent hover:underline font-semibold">
              Sign In
            </a>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
