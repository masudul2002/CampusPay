# CampusPay — Production-Grade Student Financial Services Platform

<div align="center">
  <img src="public/logo.svg" alt="CampusPay Logo" width="128" height="128" />
  <h3>Production-Grade Student Financial Services Platform</h3>

  [![Version](https://img.shields.io/badge/version-v1.0.0-purple.svg?style=for-the-badge)](package.json)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
  [![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.0-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)](Dockerfile)
  [![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa)](public/manifest.json)
</div>

---

## 📖 About CampusPay

**CampusPay** is a production-grade, startup-quality **Student Financial Services Platform** built specifically for university students in Bangladesh. It bridges the gap between digital campus wallets and mobile financial services (MFS) like bKash, Nagad, Rocket, Upay, and NPSB Interbank Transfers.

Inspired by industry-leading designs from Stripe, Apple Wallet, Linear, and Vercel, CampusPay combines glassmorphic dark-mode aesthetics with robust backend APIs, interactive merchant payment workflows, printable receipt generators, and real-time administrative verification queues.

---

## ✨ Features Highlight

- **Official Merchant Checkout**: Integrated bKash Merchant Link (`https://shop.bkash.com/masudul01572902196/paymentlink/default-payment`) with interactive zoomable/downloadable QR code and 6-step instructions.
- **Admin Verification Queue**: Real-time admin review queue featuring **Approve** (atomic wallet balance updates) and **Reject** (with admin notes).
- **Printable Digital Receipts**: Digital receipt generator with instant browser printing and PDF export UI (`/payment/success`).
- **Dedicated Service Pages**: Dedicated sub-pages for Cash In, Cash Out, Send Money, Mobile Recharge, Bank Transfers, and Utility Bills (`/services/[slug]`).
- **Global Platform Search (`Ctrl+K`)**: Instant search dialog searching across Transactions, Students, Services, and Campus Notices.
- **Drag & Drop Proof Uploader**: Proof of payment image uploader with live preview, max size validation, and progress indicator.
- **Analytics Charts**: Responsive dark-mode SVG/CSS charts for weekly volume curves and MFS market share.
- **PWA & Offline Mode**: Configured web manifest (`public/manifest.json`) and custom offline fallback page (`/offline`).
- **DevOps Suite**: Multi-stage `Dockerfile`, `docker-compose.yml`, and `.github/workflows/ci.yml` CI/CD pipeline.

---

## 📷 Screenshots Overview

| View | Description | Screenshot Placeholder |
| :--- | :--- | :--- |
| **Landing Page** | Dark-mode glassmorphic hero & service grid | `/docs/screenshots/landing.png` |
| **Student Dashboard** | Wallet balance, recent payments & quick actions | `/docs/screenshots/dashboard.png` |
| **bKash Checkout** | Interactive QR Code & 6-step payment instructions | `/docs/screenshots/payment.png` |
| **Printable Slip** | Digital verification receipt slip | `/docs/screenshots/receipt.png` |
| **Admin Control** | Verification queue & analytics charts | `/docs/screenshots/admin.png` |

---

## 🏗️ Directory Hierarchy

```
Campus-Pay/
├── app/                  # Next.js 15 App Router Pages & REST API Routes
├── components/           # Reusable UI & Feature Components
├── features/             # Feature Modules (Navbar, Hero, Services, Calculator)
├── lib/                  # Utilities, Prisma Client, JWT Auth, CSV Exporters
├── prisma/               # Schema & Database Seeder
├── public/               # Static Assets, SVG Logos & PWA Web Manifest
├── .github/              # Issue templates, PR templates, Dependabot & CodeQL
├── Dockerfile            # Production Multi-Stage Dockerfile
├── docker-compose.yml    # App & PostgreSQL Container Composition
└── .env.example          # Environment Variables Template
```

---

## 🚀 Installation & Quickstart

```bash
# 1. Clone Repository
git clone https://github.com/masudul2002/CampusPay.git
cd CampusPay

# 2. Install Dependencies
npm install

# 3. Setup Database & Seed Demo Data
npx prisma db push --force-reset
npx tsx prisma/seed.ts

# 4. Start Development Server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the platform.

---

## 👤 Author Information

**MD. Masudul Hasan**  
Department of Computer Science & Engineering (CSE)  
Sunamganj Science and Technology University  
Sunamganj, Bangladesh  

- **GitHub**: [https://github.com/masudul2002](https://github.com/masudul2002)
- **Portfolio**: [https://masudulhasan.me](https://masudulhasan.me)
- **Repository**: [https://github.com/masudul2002/CampusPay](https://github.com/masudul2002/CampusPay)

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Vercel](https://vercel.com/)

---

## 📄 License & Copyright

Copyright (c) 2026 **MD. Masudul Hasan**.  
Licensed under the [MIT License](LICENSE).
