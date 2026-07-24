import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    if (!query.trim()) {
      return apiSuccess({ transactions: [], services: [], users: [] }, "Empty search");
    }

    const [transactions, services, users] = await Promise.all([
      prisma.transaction.findMany({
        where: {
          OR: [
            { referenceId: { contains: query } },
            { provider: { contains: query } },
            { type: { contains: query } },
          ],
        },
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.service.findMany({
        where: {
          OR: [{ name: { contains: query } }, { description: { contains: query } }],
        },
        take: 5,
      }),
      prisma.user.findMany({
        where: {
          OR: [{ name: { contains: query } }, { email: { contains: query } }],
        },
        select: { id: true, name: true, email: true, department: true },
        take: 5,
      }),
    ]);

    return apiSuccess({ transactions, services, users }, "Search results fetched");
  } catch (err: any) {
    return apiError("Search failed", 500);
  }
}
