import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { z } from "zod";

const CreateTransactionSchema = z.object({
  type: z.enum(["CASH_IN", "CASH_OUT", "RECHARGE", "BANK_TRANSFER", "BILL_PAYMENT"]),
  amount: z.number().positive("Amount must be greater than zero"),
  provider: z.enum(["BKASH", "NAGAD", "ROCKET", "CELLFIN", "BANK"]),
  recipient: z.string().optional(),
  reference: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);

    const transactions = await prisma.transaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return apiSuccess(transactions, "Transactions retrieved successfully");
  } catch (err: any) {
    return apiError("Failed to fetch transactions", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);

    const body = await req.json();
    const parsed = CreateTransactionSchema.parse(body);

    const serviceRate = await prisma.serviceCharge.findUnique({
      where: { provider: parsed.provider },
    });

    const feeRate = serviceRate ? serviceRate.appFeeRate : 1.85;
    const fee = parsed.type === "CASH_IN" ? 0 : (parsed.amount * feeRate) / 100;
    const netAmount = parsed.type === "CASH_IN" ? parsed.amount : parsed.amount + fee;

    if (parsed.type !== "CASH_IN" && user.balance < netAmount) {
      return apiError(
        `Insufficient balance. You need ৳${netAmount.toFixed(2)} but your current balance is ৳${user.balance.toFixed(2)}`,
        400
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const newBalance =
        parsed.type === "CASH_IN"
          ? user.balance + parsed.amount
          : user.balance - netAmount;

      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: { balance: newBalance },
      });

      const transactionRecord = await tx.transaction.create({
        data: {
          userId: user.id,
          type: parsed.type,
          amount: parsed.amount,
          fee,
          netAmount,
          provider: parsed.provider,
          recipient: parsed.recipient || "N/A",
          reference: parsed.reference || `CampusPay ${parsed.type}`,
          status: "COMPLETED",
        },
      });

      return { transaction: transactionRecord, newBalance: updatedUser.balance };
    });

    return apiSuccess(result, "Transaction processed successfully", 201);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return apiError(err.issues?.[0]?.message || "Validation error", 400);
    }
    return apiError(err.message || "Failed to process transaction", 500);
  }
}
