import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { z } from "zod";

const VerificationSchema = z.object({
  referenceId: z.string().min(1, "Reference ID is required"),
  trxId: z.string().min(3, "Transaction ID (TrxID) is required"),
  senderPhone: z.string().min(10, "Valid sender phone number required"),
  amountPaid: z.number().positive("Amount paid must be greater than 0"),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);

    const body = await req.json();
    const parsed = VerificationSchema.parse(body);

    const paymentRequest = await prisma.paymentRequest.findUnique({
      where: { referenceId: parsed.referenceId },
    });

    if (!paymentRequest) {
      return apiError("Invalid Reference ID", 404);
    }

    // Check duplicate TrxID
    const existingVerification = await prisma.verification.findUnique({
      where: { trxId: parsed.trxId.toUpperCase() },
    });

    if (existingVerification) {
      return apiError("This Transaction ID (TrxID) has already been submitted", 400);
    }

    const verification = await prisma.verification.create({
      data: {
        paymentRequestId: paymentRequest.id,
        trxId: parsed.trxId.toUpperCase(),
        senderPhone: parsed.senderPhone,
        amountPaid: parsed.amountPaid,
        notes: parsed.notes || "Submitted by student",
      },
    });

    // Update PaymentRequest Status
    await prisma.paymentRequest.update({
      where: { id: paymentRequest.id },
      data: { status: "UNDER_REVIEW" },
    });

    await prisma.statusHistory.create({
      data: {
        paymentRequestId: paymentRequest.id,
        fromStatus: paymentRequest.status,
        toStatus: "UNDER_REVIEW",
        remark: `TrxID ${parsed.trxId.toUpperCase()} submitted for verification`,
      },
    });

    return apiSuccess(verification, "Verification request submitted successfully", 201);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return apiError(err.issues?.[0]?.message || "Validation error", 400);
    }
    return apiError(err.message || "Failed to submit verification", 500);
  }
}
