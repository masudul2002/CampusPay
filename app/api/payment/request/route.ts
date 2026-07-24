import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { z } from "zod";

const RequestSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  provider: z.string().default("BKASH"),
  serviceType: z.string().default("CASH_IN"),
});

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);

    const body = await req.json();
    const parsed = RequestSchema.parse(body);

    const refId = `TXN-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const paymentRequest = await prisma.paymentRequest.create({
      data: {
        referenceId: refId,
        userId: user.id,
        amount: parsed.amount,
        provider: parsed.provider,
        serviceType: parsed.serviceType,
        merchantLink: "https://shop.bkash.com/masudul01572902196/paymentlink/default-payment",
        merchantName: "MD. MASUDUL HASAN",
        status: "PENDING",
      },
    });

    return apiSuccess(paymentRequest, "Payment request created", 201);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return apiError(err.issues?.[0]?.message || "Validation error", 400);
    }
    return apiError(err.message || "Failed to create payment request", 500);
  }
}
