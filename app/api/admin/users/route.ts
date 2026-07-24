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

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        room: true,
        phone: true,
        balance: true,
        isVerified: true,
        createdAt: true,
      },
    });

    return apiSuccess(users, "Users retrieved successfully");
  } catch (err: any) {
    return apiError("Failed to fetch users", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return apiError("Forbidden: Admin access required", 403);
    }

    const body = await req.json();
    const { userId, isVerified, balance } = body;

    if (!userId) return apiError("userId is required", 400);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(isVerified !== undefined && { isVerified }),
        ...(balance !== undefined && { balance: Number(balance) }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        balance: true,
      },
    });

    return apiSuccess(updatedUser, "User status updated successfully");
  } catch (err: any) {
    return apiError("Failed to update user status", 500);
  }
}
