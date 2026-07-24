# CampusPay Deployment Guide

This guide covers deploying CampusPay to Vercel, Docker containers, and self-hosted Linux VPS servers.

---

## 1. Deploying to Vercel (Recommended)

1. Import your GitHub repository ([https://github.com/masudul2002/CampusPay.git](https://github.com/masudul2002/CampusPay.git)) in Vercel Dashboard.
2. Add Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `JWT_SECRET`: Secret key for JWT session encryption.
3. Click **Deploy**. Vercel will automatically build and publish your Next.js App Router project.

---

## 2. Deploying via Docker & Docker Compose

```bash
# Clone Repository
git clone https://github.com/masudul2002/CampusPay.git
cd CampusPay

# Start Container Cluster
docker-compose up --build -d
```
The application will be live at `http://localhost:3000`.

---

## 3. Self-Hosted PM2 Setup

```bash
npm install -g pm2
npm run build
pm2 start npm --name "campuspay" -- start
```
