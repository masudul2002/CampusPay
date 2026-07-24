import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(announcements, "Announcements retrieved successfully");
  } catch (err: any) {
    return apiError("Failed to fetch announcements", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return apiError("Forbidden: Admin access required", 403);
    }

    const body = await req.json();
    const { title, description, priority, isPublic } = body;

    if (!title || !description) {
      return apiError("Title and description are required", 400);
    }

    const item = await prisma.announcement.create({
      data: {
        title,
        description,
        priority: priority || "MEDIUM",
        isPublic: isPublic ?? true,
      },
    });

    return apiSuccess(item, "Announcement created successfully", 201);
  } catch (err: any) {
    return apiError("Failed to create announcement", 500);
  }
}
