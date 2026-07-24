"use client";

import React from "react";
import { ShieldCheck, Globe, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-white/10 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <a href="#hero" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-primary via-brand-secondary to-brand-accent shadow-glow flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold font-heading text-white tracking-tight">
                Campus<span className="text-brand-accent">Pay</span>
              </span>
            </a>
            <p className="text-zinc-400 text-sm max-w-md font-body leading-relaxed">
              Student Financial Services Platform designed for modern university students. Fast, secure, and transparent.
            </p>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-bold text-zinc-300 tracking-wider mb-4 font-heading">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {["Home", "Services", "Calculator", "Why Us", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-bold text-zinc-300 tracking-wider mb-4 font-heading">
              Connect With Developer
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-brand-secondary" />
                GitHub Repository
              </a>
              <a
                href="https://portfolio-placeholder.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4 text-brand-accent" />
                Developer Portfolio
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                LinkedIn Profile
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-body">
          <p>© {currentYear} CampusPay — Student Financial Services Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by{" "}
            <span className="text-zinc-300 font-semibold">MD. MASUDUL HASAN</span> (Dept of CSE)
          </p>
        </div>

      </div>
    </footer>
  );
}
