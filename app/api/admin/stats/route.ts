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

    const totalUsers = await prisma.user.count({ where: { role: "STUDENT" } });
    const totalTransactions = await prisma.transaction.count();
    
    const volumeAggregate = await prisma.transaction.aggregate({
      _sum: { amount: true, fee: true },
    });

    const recentTransactions = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        user: {
          select: { name: true, email: true, department: true },
        },
      },
    });

    const stats = {
      totalUsers,
      totalTransactions,
      totalVolume: volumeAggregate._sum.amount || 0,
      totalRevenueFees: volumeAggregate._sum.fee || 0,
      recentTransactions,
    };

    return apiSuccess(stats, "Admin analytics retrieved successfully");
  } catch (err: any) {
    return apiError("Failed to fetch admin stats", 500);
  }
}
