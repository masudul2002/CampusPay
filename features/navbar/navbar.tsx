"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Menu, X, Moon, Zap, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check auth status
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) setLoggedIn(true);
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "Calculator", href: "#calculator" },
    { name: "Why Us", href: "#why-us" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-xl border-b border-white/[0.08] py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Mark */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent shadow-glow group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="w-6 h-6 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold font-heading text-white tracking-tight flex items-center gap-1">
                Campus<span className="text-brand-accent">Pay</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-widest hidden sm:inline-block">
                Fintech Platform
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/10 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions: Sign In / Dashboard & Theme */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-2xl bg-zinc-900/70 border border-white/10 text-zinc-300 hover:text-white hover:border-brand-secondary/40 transition-all"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <div className="p-2.5 rounded-2xl bg-zinc-900/70 border border-white/10 text-brand-accent flex items-center gap-1.5 text-xs font-semibold px-3">
              <Moon className="w-4 h-4 text-brand-secondary" />
              <span>Dark UI</span>
            </div>

            {loggedIn ? (
              <a href="/dashboard">
                <Button variant="glow" size="sm" icon={<User className="w-4 h-4" />}>
                  Dashboard
                </Button>
              </a>
            ) : (
              <a href="/auth/login">
                <Button variant="glow" size="sm" icon={<Zap className="w-4 h-4" />}>
                  Student Sign In
                </Button>
              </a>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-2xl bg-zinc-900/80 border border-white/10 text-zinc-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950/95 border-b border-white/10 backdrop-blur-2xl overflow-hidden px-4 py-6"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-base font-semibold text-zinc-200 hover:text-white rounded-2xl hover:bg-white/5 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <a href={loggedIn ? "/dashboard" : "/auth/login"}>
                  <Button variant="glow" fullWidth>
                    {loggedIn ? "Go to Dashboard" : "Sign In to CampusPay"}
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
