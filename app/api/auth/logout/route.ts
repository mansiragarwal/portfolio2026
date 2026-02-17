import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "portfolio_auth";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  const url = new URL("/login", request.url);
  return NextResponse.redirect(url);
}
