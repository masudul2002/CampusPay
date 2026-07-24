import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const item = await prisma.announcement.findUnique({ where: { id } });
    if (!item) return apiError("Announcement not found", 444);
    return apiSuccess(item, "Announcement retrieved");
  } catch (err: any) {
    return apiError("Failed to fetch announcement", 500);
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
    const updated = await prisma.announcement.update({
      where: { id },
      data: body,
    });

    return apiSuccess(updated, "Announcement updated");
  } catch (err: any) {
    return apiError("Failed to update announcement", 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return apiError("Forbidden: Admin access required", 403);
    }

    const { id } = await params;
    await prisma.announcement.delete({ where: { id } });

    return apiSuccess(null, "Announcement deleted");
  } catch (err: any) {
    return apiError("Failed to delete announcement", 500);
  }
}
