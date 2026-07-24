import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const service = await prisma.service.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!service) return apiError("Service not found", 444);
    return apiSuccess(service, "Service retrieved successfully");
  } catch (err: any) {
    return apiError("Failed to fetch service", 500);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return apiError("Forbidden: Admin access required", 403);
    }

    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.service.update({
      where: { id },
      data: body,
    });

    return apiSuccess(updated, "Service updated successfully");
  } catch (err: any) {
    return apiError("Failed to update service", 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return apiError("Forbidden: Admin access required", 403);
    }

    const { id } = await params;
    await prisma.service.delete({ where: { id } });

    return apiSuccess(null, "Service deleted successfully");
  } catch (err: any) {
    return apiError("Failed to delete service", 500);
  }
}
