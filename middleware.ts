import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home/:path*"],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  if (pathname.includes("api/auth") || token) {
    return NextResponse.next();
  }

  if (!token || pathname !== "login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
