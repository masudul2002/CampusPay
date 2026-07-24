import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const methods = await prisma.paymentMethod.findMany({
      orderBy: { createdAt: "asc" },
    });
    return apiSuccess(methods, "Payment methods retrieved successfully");
  } catch (err: any) {
    return apiError("Failed to fetch payment methods", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return apiError("Forbidden: Admin access required", 403);
    }

    const body = await req.json();
    const { name, slug, logo, description, isAvailable, estTime, dailyLimit, feeRate } = body;

    const pm = await prisma.paymentMethod.create({
      data: {
        name,
        slug,
        logo: logo || "/assets/payment.png",
        description: description || "",
        isAvailable: isAvailable ?? true,
        estTime: estTime || "Instant",
        dailyLimit: Number(dailyLimit) || 50000,
        feeRate: Number(feeRate) || 1.85,
      },
    });

    return apiSuccess(pm, "Payment method created successfully", 201);
  } catch (err: any) {
    return apiError("Failed to create payment method", 500);
  }
}
