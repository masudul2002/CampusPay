# CampusPay — Student Financial Services Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma_ORM-5.22-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**CampusPay** is a production-ready, startup-quality **Student Financial Services Platform** designed specifically for university students. It provides a clean, premium interface inspired by Stripe, Apple Wallet, Linear, and Vercel for instant Cash In, Cash Out, Mobile Recharge, Bank Transfers, Utility Payments, and MFS Charge Calculations.

---

## 🌟 Key Features

- **Merchant Payment Flow**: Integrated official bKash Merchant Payment Link (`https://shop.bkash.com/masudul01572902196/paymentlink/default-payment`) with interactive zoomable/downloadable QR Code, 6-step payment instructions, and Transaction ID (TrxID) submission.
- **Admin Audit & Verification Queue**: Real-time admin review queue with atomic wallet balance updates upon approval and admin comment logging upon rejection.
- **Printable Digital Receipts**: Digital receipt generator with instant browser printing and PDF download interface (`/payment/success`).
- **Dedicated Service Pages**: Individual service sub-pages for `/services/cash-in`, `/services/cash-out`, `/services/send-money`, `/services/mobile-recharge`, `/services/bank-transfer`, `/services/utility-bill`.
- **Global Search Engine (`Ctrl+K`)**: Instant search dialog searching across Transactions, Students, Services, and Campus Announcements.
- **Drag & Drop Proof Uploader**: Proof of payment image uploader with live preview, max size check, and progress indicator.
- **Analytics Charts**: Responsive dark-mode SVG/CSS charts for weekly transaction volume trends and MFS market share.
- **PWA Ready**: Configured web application manifest (`public/manifest.json`) and offline fallback page (`/offline`).
- **Production DevOps**: Multi-stage `Dockerfile`, `docker-compose.yml`, and `.github/workflows/ci.yml` CI/CD pipeline.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router with Turbopack)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS & Glassmorphism
- **Animations**: Framer Motion
- **ORM & Database**: Prisma ORM with SQLite / PostgreSQL
- **Icons**: Lucide React Icons

---

## 🚀 Quickstart Guide

### Prerequisites
- Node.js 20+
- npm or pnpm

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/masudul2002/CampusPay.git
cd CampusPay
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="campus-pay-super-secret-jwt-key-2026"
```

### 3. Setup Database & Seed Demo Data
```bash
npx prisma db push --force-reset
npx tsx prisma/seed.ts
```

### 4. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐋 Run with Docker Compose

```bash
docker-compose up --build
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

Developed with ❤️ by **MD. MASUDUL HASAN** (Dept. of Computer Science & Engineering, Sunamganj Science and Technology University).
