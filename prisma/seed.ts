import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting CampusPay Full Extension Database Seeding...");

  const adminPassword = await bcrypt.hash("admin123", 10);
  const studentPassword = await bcrypt.hash("student123", 10);

  // 1. Admin Model
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

  // 2. User Model
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

  // 3. Services Model
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

  // 4. PaymentMethods
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

  // 5. Notifications
  const existingNotifications = await prisma.notification.count({ where: { userId: student.id } });
  if (existingNotifications === 0) {
    await prisma.notification.createMany({
      data: [
        {
          userId: student.id,
          title: "Welcome ৳1,000 Sign-up Bonus Added!",
          message: "Welcome to CampusPay. Your initial student deposit has been credited to your wallet.",
          isRead: false,
        },
        {
          userId: student.id,
          title: "Student Verification Status: Verified",
          message: "Your CSE student identity was verified by the system administrator.",
          isRead: true,
        },
      ],
    });
  }

  // 6. Audit Logs
  const existingAudit = await prisma.auditLog.count();
  if (existingAudit === 0) {
    await prisma.auditLog.create({
      data: {
        adminId: adminAccount.id,
        action: "USER_VERIFICATION",
        target: student.email,
        details: "Verified student identity and assigned CSE department role",
      },
    });
  }

  console.log("✅ CampusPay Extension Database Seeding Succeeded!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
