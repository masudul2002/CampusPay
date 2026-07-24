import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting CampusPay Database Seeding...");

  // 1. Password Hashing
  const adminPassword = await bcrypt.hash("admin123", 10);
  const studentPassword = await bcrypt.hash("student123", 10);

  // 2. Upsert Admin Account
  const admin = await prisma.user.upsert({
    where: { email: "admin@campuspay.edu" },
    update: {},
    create: {
      name: "CampusPay System Administrator",
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

  // 3. Upsert Demo Student Account (MD. MASUDUL HASAN)
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
      isVerified: true,
      balance: 24850.0,
    },
  });

  console.log(`👤 Created Admin (${admin.email}) and Student (${student.email})`);

  // 4. Upsert Service Charges
  const charges = [
    { provider: "BKASH", appFeeRate: 1.85, ussdFeeRate: 1.85, cashInFeeRate: 0.0, sendMoneyFee: 0.0 },
    { provider: "NAGAD", appFeeRate: 1.49, ussdFeeRate: 1.80, cashInFeeRate: 0.0, sendMoneyFee: 0.0 },
    { provider: "ROCKET", appFeeRate: 1.80, ussdFeeRate: 1.80, cashInFeeRate: 0.0, sendMoneyFee: 0.0 },
    { provider: "CELLFIN", appFeeRate: 1.00, ussdFeeRate: 1.00, cashInFeeRate: 0.0, sendMoneyFee: 0.0 },
    { provider: "BANK", appFeeRate: 0.00, ussdFeeRate: 0.00, cashInFeeRate: 0.0, sendMoneyFee: 0.0 },
  ] as const;

  for (const c of charges) {
    await prisma.serviceCharge.upsert({
      where: { provider: c.provider },
      update: { appFeeRate: c.appFeeRate, ussdFeeRate: c.ussdFeeRate },
      create: c,
    });
  }

  // 5. Create Sample Transactions for Demo Student
  const existingTxCount = await prisma.transaction.count({ where: { userId: student.id } });
  if (existingTxCount === 0) {
    await prisma.transaction.createMany({
      data: [
        {
          userId: student.id,
          type: "CASH_IN",
          amount: 5000,
          fee: 0,
          netAmount: 5000,
          provider: "BKASH",
          recipient: "Campus Agent #401",
          reference: "Agent Cash Deposit",
          status: "COMPLETED",
        },
        {
          userId: student.id,
          type: "RECHARGE",
          amount: 200,
          fee: 0,
          netAmount: 200,
          provider: "CELLFIN",
          recipient: "01572902196",
          reference: "Grameenphone Internet Pack",
          status: "COMPLETED",
        },
        {
          userId: student.id,
          type: "BANK_TRANSFER",
          amount: 1500,
          fee: 0,
          netAmount: 1500,
          provider: "BANK",
          recipient: "Islami Bank A/C 20501...",
          reference: "Hall Mess Fee Payment",
          status: "COMPLETED",
        },
      ],
    });
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
