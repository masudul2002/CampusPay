import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return apiError("Forbidden: Admin access required", 403);
    }

    const queue = await prisma.paymentRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true, department: true } },
        verifications: true,
        adminComments: true,
      },
    });

    return apiSuccess(queue, "Verification queue fetched");
  } catch (err: any) {
    return apiError("Failed to fetch verification queue", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return apiError("Forbidden: Admin access required", 403);
    }

    const body = await req.json();
    const { paymentRequestId, action, comment } = body; // action: "APPROVE" | "REJECT"

    if (!paymentRequestId || !action) {
      return apiError("paymentRequestId and action are required", 400);
    }

    const pr = await prisma.paymentRequest.findUnique({
      where: { id: paymentRequestId },
      include: { user: true },
    });

    if (!pr) return apiError("Payment request not found", 404);

    const newStatus = action === "APPROVE" ? "APPROVED" : "REJECTED";

    // Atomic Database Transaction for Approval & Wallet Credit
    const result = await prisma.$transaction(async (tx) => {
      // Update PaymentRequest Status
      const updatedPR = await tx.paymentRequest.update({
        where: { id: pr.id },
        data: { status: newStatus },
      });

      // If Approved, Credit User Wallet Balance & Create Transaction Log
      if (action === "APPROVE") {
        await tx.user.update({
          where: { id: pr.userId },
          data: { balance: pr.user.balance + pr.amount },
        });

        await tx.transaction.create({
          data: {
            referenceId: pr.referenceId,
            userId: pr.userId,
            type: pr.serviceType,
            amount: pr.amount,
            chargeAmount: 0,
            totalAmount: pr.amount,
            provider: pr.provider,
            reference: `Verified bKash Merchant Payment (${pr.referenceId})`,
            status: "COMPLETED",
          },
        });
      }

      // Add Admin Comment if provided
      if (comment) {
        const adminAccount = await tx.admin.findFirst();
        if (adminAccount) {
          await tx.adminComment.create({
            data: {
              paymentRequestId: pr.id,
              adminId: adminAccount.id,
              comment,
            },
          });
        }
      }

      // Status History Log
      await tx.statusHistory.create({
        data: {
          paymentRequestId: pr.id,
          fromStatus: pr.status,
          toStatus: newStatus,
          remark: comment || `Admin ${action.toLowerCase()}d payment verification`,
        },
      });

      return updatedPR;
    });

    return apiSuccess(result, `Payment request ${newStatus.toLowerCase()} successfully`);
  } catch (err: any) {
    return apiError(err.message || "Failed to process verification action", 500);
  }
}
