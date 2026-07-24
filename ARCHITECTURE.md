# CampusPay System Architecture

CampusPay follows a modern **Feature-Based Architecture** designed for high scalability, separation of concerns, and rapid extension.

---

## 🏗️ Directory Hierarchy

```
Campus-Pay/
├── app/                  # Next.js 15 App Router Pages & REST API Routes
│   ├── (auth)/           # Authentication pages (login, signup)
│   ├── admin/            # Admin Control Center with Verification Queue
│   ├── api/              # REST Route Handlers (GET, POST, PUT, DELETE)
│   ├── payment/          # Verification, Printable Receipts, Failure pages
│   ├── services/         # Dedicated service sub-pages (/services/[slug])
│   ├── calculator/       # Fee Calculator
│   └── transactions/     # Transaction Audit Log
├── components/           # Reusable UI & Feature Components
│   ├── ui/               # Glassmorphism design system & data tables
│   ├── payment/          # Payment Modal, QR Section, Status Timeline
│   └── admin/            # Analytics Charts
├── features/             # Feature Modules (Navbar, Hero, Services, Calculator)
├── lib/                  # Utilities, Prisma Client, JWT Auth, API Helpers
├── prisma/               # Schema & Database Seeder
├── public/               # Static Assets & PWA Web Manifest
├── Dockerfile            # Multi-stage production container build
├── docker-compose.yml    # App & PostgreSQL composition
└── .github/workflows/    # CI/CD Actions pipeline
```
