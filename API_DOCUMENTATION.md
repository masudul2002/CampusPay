# CampusPay REST API Reference

All API routes return JSON responses using a standardized format:

```json
{
  "success": true,
  "message": "Operation completed",
  "data": { ... }
}
```

---

## 1. Authentication APIs
- `POST /api/auth/register`: Create a new student profile.
- `POST /api/auth/login`: Authenticate student or admin credentials and receive JWT session cookie.
- `GET /api/auth/me`: Retrieve currently authenticated user session.
- `POST /api/auth/logout`: Terminate active user session.

## 2. Service & Payment Method APIs
- `GET /api/services`: Get full catalog of financial services.
- `GET /api/services/[id]`: Retrieve single service by ID or slug.
- `GET /api/payment-methods`: Get supported payment networks (bKash, Nagad, Rocket, Upay, Bank).

## 3. Merchant Payment & Verification APIs
- `POST /api/payment/request`: Initiate new payment request and generate Reference ID (`TXN-2026-XXXX`).
- `POST /api/payment/verify`: Submit bKash Transaction ID (TrxID) for verification.

## 4. Admin Queue & Management APIs
- `GET /api/admin/stats`: Get dashboard statistics, total volume, and active user counts.
- `GET /api/admin/verification`: Fetch pending payment verification queue.
- `POST /api/admin/verification`: Approve (atomic balance credit) or reject payment verification.

## 5. Search & System APIs
- `GET /api/search?q={query}`: Global search across transactions, services, students, and notices.
- `GET /api/audit-logs`: Retrieve system audit trail logs.
