# Security Policy

## Reporting Security Issues

We take the security of CampusPay seriously. If you discover a vulnerability, please report it responsibly:

- **Email**: `security@campuspay.edu` or `masudul@cs.sstu.ac.bd`
- **Response Time**: We acknowledge reports within 24 hours.

## Security Architecture

1. **Authentication**: Auth.js / JWT session security with HTTP-only cookies.
2. **Database Integrity**: Atomic database transactions (`prisma.$transaction`) for balance updates.
3. **Data Sanitization**: Strict input validation using Zod schemas on all API endpoints.
4. **Audit Logging**: Immutable security audit trail logged in the `AuditLog` table.
