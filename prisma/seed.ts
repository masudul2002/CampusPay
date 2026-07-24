import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting CampusPay v1.1 Complete Database Seeding...");

  // 1. Password Hashing
  const adminPassword = await bcrypt.hash("admin123", 10);
  const studentPassword = await bcrypt.hash("student123", 10);

  // 2. Admin Model
  const adminAccount = await prisma.admin.upsert({
    where: { email: "admin@campuspay.edu" },
    update: {},
    create: {
      name: "CampusPay Super Admin",
      email: "admin@campuspay.edu",
      password: adminPassword,
      role: "SUPER_ADMIN",
    },
  });

  // 3. User Model (Admin & Demo Student)
  await prisma.user.upsert({
    where: { email: "admin@campuspay.edu" },
    update: {},
    create: {
      name: "System Administrator",
      email: "admin@campuspay.edu",
      password: adminPassword,
      role: "ADMIN",
      department: "Administration",
      phone: "01700000000",
      room: "Admin HQ",
      isVerified: true,
      balance: 1000000.0,
    },
  });

  const student = await prisma.user.upsert({
    where: { email: "masudul@cs.sstu.ac.bd" },
    update: {},
    create: {
      name: "MD. MASUDUL HASAN",
      email: "masudul@cs.sstu.ac.bd",
      password: studentPassword,
      role: "STUDENT",
      department: "Computer Science & Engineering",
      university: "Sunamganj Science and Technology University",
      room: "401",
      phone: "01572902196",
      preferredPaymentMethod: "BKASH",
      isVerified: true,
      balance: 24850.0,
    },
  });

  // 4. Services Model
  const services = [
    {
      name: "Cash In",
      slug: "cash-in",
      description: "Deposit cash directly into your digital student wallet via verified campus agents.",
      category: "DEPOSIT",
      icon: "Banknote",
      baseChargeRate: 0.0,
      estProcessingTime: "Instant (Sub-second)",
    },
    {
      name: "Cash Out",
      slug: "cash-out",
      description: "Withdraw physical cash from MFS agents at special student rates.",
      category: "WITHDRAWAL",
      icon: "ArrowUpRight",
      baseChargeRate: 1.49,
      estProcessingTime: "1-3 Minutes",
    },
    {
      name: "Send Money",
      slug: "send-money",
      description: "Transfer money to peer students, mess managers, or faculty.",
      category: "TRANSFER",
      icon: "Send",
      baseChargeRate: 0.0,
      estProcessingTime: "Instant",
    },
    {
      name: "Mobile Recharge",
      slug: "mobile-recharge",
      description: "Instant mobile talktime & data pack recharge for all BD mobile operators.",
      category: "RECHARGE",
      icon: "Smartphone",
      baseChargeRate: 0.0,
      estProcessingTime: "Instant",
    },
    {
      name: "Bank Transfer",
      slug: "bank-transfer",
      description: "Direct inter-bank transfer to IBBL, City Bank, DBBL via NPSB gateway.",
      category: "TRANSFER",
      icon: "Landmark",
      baseChargeRate: 0.0,
      estProcessingTime: "Instant (24/7 NPSB)",
    },
    {
      name: "Utility Bill",
      slug: "utility-bill",
      description: "Pay campus hall fees, mess charges, tuition fees, and DESCO/DPDC bills.",
      category: "UTILITY",
      icon: "Receipt",
      baseChargeRate: 0.0,
      estProcessingTime: "Instant Receipt",
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // 5. PaymentMethod Model
  const paymentMethods = [
    {
      name: "bKash",
      slug: "bkash",
      logo: "/assets/bkash.png",
      description: "Bangladesh's largest Mobile Financial Service provider",
      isAvailable: true,
      estTime: "Instant",
      dailyLimit: 50000.0,
      feeRate: 1.85,
    },
    {
      name: "Nagad",
      slug: "nagad",
      logo: "/assets/nagad.png",
      description: "Postal Department digital MFS with lowest Cash Out rates",
      isAvailable: true,
      estTime: "Instant",
      dailyLimit: 50000.0,
      feeRate: 1.49,
    },
    {
      name: "Rocket",
      slug: "rocket",
      logo: "/assets/rocket.png",
      description: "Dutch-Bangla Bank mobile financial banking system",
      isAvailable: true,
      estTime: "Instant",
      dailyLimit: 30000.0,
      feeRate: 1.80,
    },
    {
      name: "Upay",
      slug: "upay",
      logo: "/assets/upay.png",
      description: "UCB FinTech digital payment network",
      isAvailable: true,
      estTime: "Instant",
      dailyLimit: 25000.0,
      feeRate: 1.40,
    },
    {
      name: "Bank Transfer",
      slug: "bank-transfer",
      logo: "/assets/bank.png",
      description: "NPSB Instant Interbank transfer across all commercial banks",
      isAvailable: true,
      estTime: "Real-time (NPSB)",
      dailyLimit: 100000.0,
      feeRate: 0.0,
    },
  ];

  for (const pm of paymentMethods) {
    await prisma.paymentMethod.upsert({
      where: { slug: pm.slug },
      update: pm,
      create: pm,
    });
  }

  // 6. Announcement Model
  const announcements = [
    {
      title: "Semester Exam Fee Payment Portal Open",
      description: "Students of CSE & EEE departments can now clear semester examination fees directly through CampusPay with 0% extra gateway charges.",
      priority: "HIGH",
      isPublic: true,
    },
    {
      title: "Scheduled System Upgrade Notice",
      description: "CampusPay database servers will undergo a 15-minute optimization on Sunday at 3:00 AM. Services will resume immediately.",
      priority: "MEDIUM",
      isPublic: true,
    },
    {
      title: "Zero Cash In Fee Promo for Hall Residents",
      description: "Deposit cash at Hall #4 Agent Counter with zero service fees all month long.",
      priority: "LOW",
      isPublic: true,
    },
  ];

  for (const a of announcements) {
    const existing = await prisma.announcement.findFirst({ where: { title: a.title } });
    if (!existing) {
      await prisma.announcement.create({ data: a });
    }
  }

  // 7. Settings Model
  const settings = [
    { key: "platform_name", value: "CampusPay", description: "System application display name" },
    { key: "student_discount_rate", value: "100%", description: "Percentage discount on student internal transfers" },
    { key: "max_daily_transaction_limit", value: "100000", description: "Maximum daily transaction ceiling in BDT" },
    { key: "support_hotline", value: "01572902196", description: "Campus emergency support hotline" },
  ];

  for (const st of settings) {
    await prisma.settings.upsert({
      where: { key: st.key },
      update: st,
      create: st,
    });
  }

  // 8. Demo Transactions
  const bkashMethod = await prisma.paymentMethod.findUnique({ where: { slug: "bkash" } });
  const cashInService = await prisma.service.findUnique({ where: { slug: "cash-in" } });

  const existingTx = await prisma.transaction.count({ where: { userId: student.id } });
  if (existingTx === 0) {
    await prisma.transaction.createMany({
      data: [
        {
          referenceId: "TXN-2026-8801",
          userId: student.id,
          serviceId: cashInService?.id,
          paymentMethodId: bkashMethod?.id,
          type: "CASH_IN",
          amount: 5000,
          chargeAmount: 0,
          totalAmount: 5000,
          provider: "BKASH",
          recipient: "Campus Agent #401",
          reference: "Initial Student Deposit",
          status: "COMPLETED",
        },
        {
          referenceId: "TXN-2026-8802",
          userId: student.id,
          serviceId: cashInService?.id,
          paymentMethodId: bkashMethod?.id,
          type: "RECHARGE",
          amount: 200,
          chargeAmount: 0,
          totalAmount: 200,
          provider: "BKASH",
          recipient: "01572902196",
          reference: "GP Data Recharge",
          status: "COMPLETED",
        },
        {
          referenceId: "TXN-2026-8803",
          userId: student.id,
          serviceId: cashInService?.id,
          paymentMethodId: bkashMethod?.id,
          type: "BANK_TRANSFER",
          amount: 1500,
          chargeAmount: 0,
          totalAmount: 1500,
          provider: "BANK",
          recipient: "Islami Bank A/C 20501...",
          reference: "Hall Mess Fee",
          status: "COMPLETED",
        },
      ],
    });
  }

  console.log("✅ CampusPay v1.1 Complete Database Seeding Succeeded!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
