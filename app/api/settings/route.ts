import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const settings = await prisma.settings.findMany();
    return apiSuccess(settings, "Settings retrieved successfully");
  } catch (err: any) {
    return apiError("Failed to fetch settings", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return apiError("Forbidden: Admin access required", 403);
    }

    const body = await req.json();
    const { key, value, description } = body;

    const setting = await prisma.settings.upsert({
      where: { key },
      update: { value, description },
      create: { key, value, description },
    });

    return apiSuccess(setting, "Setting updated successfully");
  } catch (err: any) {
    return apiError("Failed to save setting", 500);
  }
}
