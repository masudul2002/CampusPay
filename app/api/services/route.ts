import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    });
    return apiSuccess(services, "Services retrieved successfully");
  } catch (err: any) {
    return apiError("Failed to fetch services", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return apiError("Forbidden: Admin access required", 403);
    }

    const body = await req.json();
    const { name, slug, description, category, icon, baseChargeRate, estProcessingTime } = body;

    if (!name || !slug) return apiError("Name and slug are required", 400);

    const service = await prisma.service.create({
      data: {
        name,
        slug,
        description: description || "",
        category: category || "GENERAL",
        icon: icon || "Zap",
        baseChargeRate: Number(baseChargeRate) || 0,
        estProcessingTime: estProcessingTime || "Instant",
      },
    });

    return apiSuccess(service, "Service created successfully", 201);
  } catch (err: any) {
    return apiError(err.message || "Failed to create service", 500);
  }
}
