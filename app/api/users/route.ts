import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return apiError("Unauthorized", 401);

    if (currentUser.role === "ADMIN") {
      const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
      return apiSuccess(users, "Users list retrieved");
    }

    return apiSuccess([currentUser], "User retrieved");
  } catch (err: any) {
    return apiError("Failed to fetch user list", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return apiError("Unauthorized", 401);

    const body = await req.json();
    const { name, department, room, phone, preferredPaymentMethod } = body;

    const updated = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        ...(name && { name }),
        ...(department && { department }),
        ...(room && { room }),
        ...(phone && { phone }),
        ...(preferredPaymentMethod && { preferredPaymentMethod }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        room: true,
        phone: true,
        balance: true,
        preferredPaymentMethod: true,
      },
    });

    return apiSuccess(updated, "Profile updated successfully");
  } catch (err: any) {
    return apiError("Failed to update profile", 500);
  }
}
