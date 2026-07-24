import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken, TOKEN_COOKIE_NAME } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api-response";
import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  department: z.string().optional(),
  room: z.string().optional(),
  phone: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RegisterSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: parsed.email.toLowerCase() },
    });

    if (existing) {
      return apiError("An account with this email already exists", 400);
    }

    const hashedPassword = await hashPassword(parsed.password);

    const user = await prisma.user.create({
      data: {
        name: parsed.name,
        email: parsed.email.toLowerCase(),
        password: hashedPassword,
        role: "STUDENT",
        department: parsed.department || "General Student",
        room: parsed.room || "N/A",
        phone: parsed.phone || "01700000000",
        balance: 1000.0,
        isVerified: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        balance: true,
      },
    });

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role as "STUDENT" | "ADMIN",
    });

    const response = apiSuccess(user, "Account registered successfully", 201);
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
    return apiError(err.message || "Failed to register user", 500);
  }
}
