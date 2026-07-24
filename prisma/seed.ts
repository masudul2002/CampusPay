import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting CampusPay v1.3 Merchant Payment Seeding...");

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

  // 3. Payment Methods
  const paymentMethods = [
    {
      name: "bKash",
      slug: "bkash",
      logo: "/assets/bkash.png",
      description: "Official Merchant Payment Link (MD. MASUDUL HASAN)",
      isAvailable: true,
      estTime: "Instant",
      dailyLimit: 50000.0,
      feeRate: 1.85,
    },
    {
      name: "Nagad",
      slug: "nagad",
      logo: "/assets/nagad.png",
      description: "Postal MFS Merchant Channel",
      isAvailable: true,
      estTime: "Instant",
      dailyLimit: 50000.0,
      feeRate: 1.49,
    },
  ];

  for (const pm of paymentMethods) {
    await prisma.paymentMethod.upsert({
      where: { slug: pm.slug },
      update: pm,
      create: pm,
    });
  }

  // 4. Sample PaymentRequest & Verification Queue
  const refId = "TXN-2026-9901";
  const pr = await prisma.paymentRequest.upsert({
    where: { referenceId: refId },
    update: {},
    create: {
      referenceId: refId,
      userId: student.id,
      amount: 1200.0,
      provider: "BKASH",
      serviceType: "CASH_IN",
      merchantLink: "https://shop.bkash.com/masudul01572902196/paymentlink/default-payment",
      merchantName: "MD. MASUDUL HASAN",
      status: "UNDER_REVIEW",
    },
  });

  await prisma.verification.upsert({
    where: { trxId: "BKASH98X71QZ" },
    update: {},
    create: {
      paymentRequestId: pr.id,
      trxId: "BKASH98X71QZ",
      senderPhone: "01572902196",
      amountPaid: 1200.0,
      notes: "bKash Merchant Payment completed for Semester Deposit",
    },
  });

  await prisma.statusHistory.create({
    data: {
      paymentRequestId: pr.id,
      fromStatus: "PENDING",
      toStatus: "UNDER_REVIEW",
      remark: "User submitted bKash TrxID: BKASH98X71QZ",
    },
  });

  console.log("✅ CampusPay v1.3 Merchant Payment Seeding Completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
