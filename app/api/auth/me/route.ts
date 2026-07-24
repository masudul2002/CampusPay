import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return apiError("Unauthorized", 401);
    }
    return apiSuccess(user, "User session fetched");
  } catch (err: any) {
    return apiError("Failed to fetch session", 500);
  }
}
