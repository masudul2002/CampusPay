import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, signToken, TOKEN_COOKIE_NAME } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api-response";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: parsed.email.toLowerCase() },
    });

    if (!user) {
      return apiError("Invalid email or password", 401);
    }

    const isValid = await comparePassword(parsed.password, user.password);
    if (!isValid) {
      return apiError("Invalid email or password", 401);
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role as "STUDENT" | "ADMIN",
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      university: user.university,
      room: user.room,
      phone: user.phone,
      balance: user.balance,
      isVerified: user.isVerified,
    };

    const response = apiSuccess(userData, "Logged in successfully");
    response.cookies.set(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return apiError(err.issues?.[0]?.message || "Validation error", 400);
    }
    return apiError("Authentication failed", 500);
  }
}
