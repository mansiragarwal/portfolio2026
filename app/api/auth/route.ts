import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";

const COOKIE_NAME = "portfolio_auth";
const SALT = "portfolio";

function getAuthToken(): string {
  const password = process.env.PORTFOLIO_PASSWORD;
  if (!password) {
    throw new Error("PORTFOLIO_PASSWORD is not set");
  }
  return crypto
    .createHash("sha256")
    .update(password + SALT)
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    const password = process.env.PORTFOLIO_PASSWORD;
    if (!password) {
      return NextResponse.json(
        { error: "Server not configured for password protection" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const submitted = body.password;

    if (submitted !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = getAuthToken();
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ success: true });
}
