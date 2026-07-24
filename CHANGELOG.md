# Changelog

All notable changes to the CampusPay project will be documented in this file.

## [v3.0.0] - 2026-07-24
### Added
- Complete 11-file production documentation suite (`README.md`, `API_DOCUMENTATION.md`, `DATABASE_SCHEMA.md`, `ARCHITECTURE.md`, `DEPLOYMENT.md`, `SECURITY.md`, `ROADMAP.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `LICENSE`).
- PWA offline fallback route (`/offline`).
- Automated CI/CD build verification pipeline.

## [v2.1.0] - 2026-07-24
### Added
- Global Search engine (`components/ui/global-search.tsx`) accessible via `Ctrl+K` / `Cmd+K`.
- Drag & Drop file uploader (`components/ui/file-uploader.tsx`) with image preview and progress indicator.
- Pure SVG/CSS dark-mode responsive analytics charts (`components/admin/analytics-charts.tsx`).
- Browser CSV & Excel data export utility (`lib/export-utils.ts`).
- Production `Dockerfile`, `docker-compose.yml`, and `.github/workflows/ci.yml`.

## [v1.3.0] - 2026-07-24
### Added
- Official bKash Merchant Payment flow (`https://shop.bkash.com/masudul01572902196/paymentlink/default-payment`).
- Interactive Zoomable/Downloadable bKash Merchant QR Code modal.
- Payment verification submission form at `/payment/verify`.
- Printable digital receipts at `/payment/success`.
- Admin Payment Verification Queue with atomic balance credit upon approval.

## [v1.1.0] - 2026-07-24
### Added
- Dedicated pages for `/services`, `/calculator`, `/payment-methods`, `/transactions`, `/announcements`, `/profile`, `/admin`.
- Extended Prisma models (`User`, `Service`, `PaymentMethod`, `Transaction`, `Announcement`, `Settings`, `Admin`, `Notification`, `AuditLog`).
- Full REST APIs with GET, POST, PUT, DELETE route handlers.
