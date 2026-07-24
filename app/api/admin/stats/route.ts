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

    const [totalUsers, totalTransactions, volumeAggregate, recentTransactions] = await Promise.all([
      prisma.user.count(),
      prisma.transaction.count(),
      prisma.transaction.aggregate({
        _sum: { amount: true, chargeAmount: true },
      }),
      prisma.transaction.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true, email: true } },
        },
      }),
    ]);

    return apiSuccess({
      totalUsers,
      totalTransactions,
      totalVolume: volumeAggregate._sum.amount || 0,
      totalRevenueFees: volumeAggregate._sum.chargeAmount || 0,
      recentTransactions,
    });
  } catch (err: any) {
    return apiError(err.message || "Failed to fetch admin stats", 500);
  }
}
