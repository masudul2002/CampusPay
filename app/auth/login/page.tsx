"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to log in");
      }

      if (data.data.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoStudentLogin = () => {
    setEmail("masudul@cs.sstu.ac.bd");
    setPassword("student123");
  };

  const handleDemoAdminLogin = () => {
    setEmail("admin@campuspay.edu");
    setPassword("admin123");
  };

  return (
    <div className="min-h-screen bg-ambient-grid bg-zinc-950 flex items-center justify-center p-4 sm:p-6 relative">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent shadow-glow flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-extrabold font-heading text-white">
              Campus<span className="text-brand-accent">Pay</span>
            </span>
          </a>
          <h1 className="text-2xl font-bold font-heading text-white">Welcome Back</h1>
          <p className="text-xs text-zinc-400 mt-1">Access your student financial services dashboard</p>
        </div>

        {/* Login Form Card */}
        <GlassCard glowColor="accent">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="masudul@cs.sstu.ac.bd"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input pl-11 pr-4 py-3 rounded-2xl text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass-input pl-11 pr-4 py-3 rounded-2xl text-sm"
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
              {loading ? "Authenticating..." : "Sign In to CampusPay"}
            </Button>
          </form>

          {/* Quick Demo Credentials Picker */}
          <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
            <p className="text-[11px] text-zinc-400 uppercase font-semibold text-center tracking-wider">
              Quick Demo Accounts
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoStudentLogin}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition-colors text-center font-semibold"
              >
                🎓 Student Account
              </button>
              <button
                type="button"
                onClick={handleDemoAdminLogin}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition-colors text-center font-semibold"
              >
                ⚡ Admin Account
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-zinc-400">
            Don't have a student account?{" "}
            <a href="/auth/signup" className="text-brand-accent hover:underline font-semibold">
              Register here
            </a>
          </div>
        </GlassCard>

      </div>
    </div>
  );
}
