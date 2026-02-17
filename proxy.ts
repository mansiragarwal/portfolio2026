import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "portfolio_auth";
const SALT = "portfolio";

// Only these paths require a password (WCG case studies)
const PROTECTED_PATHS = ["/work/permissions"];

async function getExpectedToken(): Promise<string> {
  const password = process.env.PORTFOLIO_PASSWORD;
  if (!password) return "";
  const data = new TextEncoder().encode(password + SALT);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Only protect WCG case study routes
  const isProtected = PROTECTED_PATHS.some(
    (p) => path === p || path.startsWith(p + "/")
  );
  if (!isProtected) {
    return NextResponse.next();
  }

  if (!process.env.PORTFOLIO_PASSWORD) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const expected = await getExpectedToken();
  if (token && expected && token === expected) {
    return NextResponse.next();
  }

  const login = new URL("/login", request.url);
  login.searchParams.set("redirect", path);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/work/permissions", "/work/permissions/"],
};
