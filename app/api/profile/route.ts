import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);
    return apiSuccess(user, "Profile fetched");
  } catch (err: any) {
    return apiError("Failed to fetch profile", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return apiError("Unauthorized", 401);

    const body = await req.json();
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: body,
      select: {
        id: true,
        name: true,
        email: true,
        department: true,
        room: true,
        phone: true,
        balance: true,
        preferredPaymentMethod: true,
      },
    });

    return apiSuccess(updated, "Profile updated");
  } catch (err: any) {
    return apiError("Failed to update profile", 500);
  }
}
