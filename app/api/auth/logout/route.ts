import { NextRequest } from "next/server";
import { apiSuccess } from "@/lib/api-response";
import { TOKEN_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const response = apiSuccess(null, "Logged out successfully");
  response.cookies.set(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
  return response;
}
