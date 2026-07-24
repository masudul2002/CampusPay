import { NextResponse } from "next/server";

export function apiSuccess<T>(data: T, message = "Success", status = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function apiError(message = "An error occurred", status = 400, details?: any) {
  return NextResponse.json(
    {
      success: false,
      message,
      details,
    },
    { status }
  );
}
